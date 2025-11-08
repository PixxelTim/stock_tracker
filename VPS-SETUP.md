# VPS Deployment Setup

## Erforderliche GitHub Secrets

Gehe zu deinem GitHub Repository → Settings → Secrets and variables → Actions und erstelle folgende Secrets:

### 1. VPS_HOST
- **Wert**: Die IP-Adresse oder Domain deines VPS
- **Beispiel**: `123.45.67.89` oder `vps.example.com`

### 2. VPS_USERNAME
- **Wert**: Der SSH-Benutzername für den VPS
- **Beispiel**: `root` oder `ubuntu`

### 3. VPS_SSH_KEY
- **Wert**: Dein privater SSH-Schlüssel
- **Generierung**:
  ```bash
  ssh-keygen -t ed25519 -C "github-actions" -f ~/.ssh/vps_deploy
  ```
- **Den privaten Schlüssel kopieren**:
  ```bash
  cat ~/.ssh/vps_deploy
  ```
- **Den öffentlichen Schlüssel auf dem VPS hinzufügen**:
  ```bash
  cat ~/.ssh/vps_deploy.pub >> ~/.ssh/authorized_keys
  ```

### 4. VPS_SSH_PORT (Optional)
- **Wert**: SSH-Port (Standard: 22)
- **Beispiel**: `22` oder `2222`

### 5. VPS_APP_DIR (Optional)
- **Wert**: Verzeichnis auf dem VPS, wo die App liegt
- **Standard**: `/opt/stock-tracker`
- **Beispiel**: `/home/ubuntu/stock-tracker`

## VPS Setup

### 1. Docker & Docker Compose installieren

```bash
# Docker installieren
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Docker Compose installieren (falls nicht bereits enthalten)
sudo apt-get update
sudo apt-get install docker-compose-plugin

# Benutzer zur Docker-Gruppe hinzufügen
sudo usermod -aG docker $USER
```

### 2. App-Verzeichnis erstellen

```bash
# Verzeichnis erstellen
sudo mkdir -p /opt/stock-tracker
sudo chown $USER:$USER /opt/stock-tracker
cd /opt/stock-tracker

# Repository klonen (optional, für docker-compose.yml)
git clone https://github.com/YOUR-USERNAME/YOUR-REPO.git .
```

### 3. .env Datei erstellen

```bash
cd /opt/stock-tracker

# .env Datei erstellen
nano .env
```

Füge deine Umgebungsvariablen hinzu:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/stock-tracker

# Better Auth
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=https://your-domain.com

# Finnhub API
FINNHUB_API_KEY=your-api-key-here

# Inngest
INNGEST_EVENT_KEY=your-inngest-key
INNGEST_SIGNING_KEY=your-signing-key

# Email (Nodemailer)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Weitere Variablen...
```

### 4. Caddy für Reverse Proxy einrichten

Caddy kann als Reverse Proxy auf dem Host laufen und TLS/SSL verwalten:

```bash
# Caddy installieren
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

**Caddyfile** (`/etc/caddy/Caddyfile`):

```caddy
your-domain.com {
    reverse_proxy 127.0.0.1:3000
    
    encode gzip
    
    log {
        output file /var/log/caddy/access.log
    }
}
```

Caddy starten:

```bash
sudo systemctl enable caddy
sudo systemctl start caddy
sudo systemctl status caddy
```

## Deployment testen

Nach dem Push auf `main` Branch:

1. Gehe zu GitHub Actions in deinem Repository
2. Beobachte den Workflow "Deploy to VPS"
3. Prüfe die Logs für Fehler

Oder manuell auf dem VPS:

```bash
cd /opt/stock-tracker

# Image pullen
docker compose pull

# Container starten
docker compose up -d

# Logs anzeigen
docker compose logs -f

# Status prüfen
docker compose ps
```

## Troubleshooting

### Container läuft nicht
```bash
docker compose logs stock-tracker
```

### Port bereits in Verwendung
```bash
sudo lsof -i :3000
```

### Image wird nicht gepullt
```bash
# Manuell in GHCR einloggen
echo "YOUR_GITHUB_TOKEN" | docker login ghcr.io -u YOUR_USERNAME --password-stdin

# Image prüfen
docker images | grep stock-tracker
```

### Umgebungsvariablen fehlen
```bash
# .env Datei prüfen
cat /opt/stock-tracker/.env

# Container neu starten
docker compose down
docker compose up -d
```

export const PERSONALIZED_WELCOME_EMAIL_PROMPT = `Generiere hochgradig personalisierten HTML-Inhalt, der in eine E-Mail-Vorlage am {{intro}}-Platzhalter eingefügt wird.

Benutzerprofildaten:
{{userProfile}}

PERSONALISIERUNGSANFORDERUNGEN:
Du MUSST Inhalte erstellen, die offensichtlich auf DIESEN spezifischen Benutzer zugeschnitten sind:

WICHTIG: Beginne den personalisierten Inhalt NICHT mit "Willkommen", da die E-Mail-Kopfzeile bereits "Welcome aboard {{name}}" sagt. Verwende alternative Eröffnungen wie "Danke fürs Mitmachen", "Toll, dass du dabei bist", "Alles bereit", "Perfektes Timing", etc.

1. **Direkter Bezug zu Benutzerdetails**: Extrahiere und verwende spezifische Informationen aus ihrem Profil:
   - Ihre genauen Anlageziele oder -vorgaben
   - Ihr angegebenes Risikobereitschaftsniveau
   - Ihre bevorzugten Sektoren/Branchen
   - Ihr Erfahrungsniveau oder Hintergrund
   - Spezifische Aktien/Unternehmen, an denen sie interessiert sind
   - Ihr Anlagezeitraum (kurzfristig, langfristig, Altersvorsorge)

2. **Kontextbezogene Botschaft**: Erstelle Inhalte, die zeigen, dass du ihre Situation verstehst:
   - Neue Anleger → Beziehe dich auf Lernen/Beginn ihrer Reise
   - Erfahrene Trader → Beziehe dich auf fortgeschrittene Tools/Strategieverbesserung
   - Altersvorsorgeplanung → Beziehe dich auf Vermögensaufbau über Zeit
   - Spezifische Sektoren → Nenne diese Branchen explizit beim Namen
   - Konservativer Ansatz → Beziehe dich auf Sicherheit und informierte Entscheidungen
   - Aggressiver Ansatz → Beziehe dich auf Chancen und Wachstumspotenzial

3. **Persönliche Note**: Lasse es so wirken, als wäre es speziell für sie geschrieben:
   - Verwende ihre Ziele in deiner Botschaft
   - Beziehe dich direkt auf ihre Interessen
   - Verbinde Features mit ihren spezifischen Bedürfnissen
   - Gib ihnen das Gefühl, verstanden und gesehen zu werden

KRITISCHE FORMATIERUNGSANFORDERUNGEN:
- Gib NUR sauberen HTML-Inhalt zurück OHNE Markdown, OHNE Code-Blöcke, OHNE Backticks
- Verwende NUR EINEN Absatz: <p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Inhalt</p>
- Schreibe genau ZWEI Sätze (füge einen weiteren Satz hinzu als der aktuelle einzelne Satz)
- Halte den gesamten Inhalt zwischen 35-50 Wörtern für Lesbarkeit
- Verwende <strong> für wichtige personalisierte Elemente (ihre Ziele, Sektoren, etc.)
- Füge NICHT "Folgendes kannst du jetzt tun:" hinzu, da dies bereits in der Vorlage enthalten ist
- Jedes Wort sollte zur Personalisierung beitragen
- Der zweite Satz sollte hilfreichen Kontext hinzufügen oder die Personalisierung verstärken

WICHTIG: Der gesamte generierte Inhalt MUSS in deutscher Sprache sein!

Beispiele für personalisierte Ausgaben (mit offensichtlicher Anpassung und ZWEI Sätzen auf Deutsch):
<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Danke, dass du bei Signalist dabei bist! Als jemand, der sich auf <strong>Technologie-Wachstumsaktien</strong> konzentriert, wirst du unsere Echtzeit-Alarme für Unternehmen lieben, die du verfolgst. Wir helfen dir, Chancen zu erkennen, bevor sie zur Mainstream-Nachricht werden.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Toll, dass du dabei bist! Perfekt für deine <strong>konservative Altersvorsorgestrategie</strong> — wir helfen dir, Dividendenaktien zu überwachen, ohne dich mit Informationen zu überwältigen. Du kannst endlich deinen Portfolio-Fortschritt mit Zuversicht und Klarheit verfolgen.</p>

<p class="mobile-text" style="margin: 0 0 30px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Alles bereit! Da du neu im Investieren bist, haben wir einfache Tools entwickelt, die dir helfen, Selbstvertrauen aufzubauen, während du den <strong>Gesundheitssektor</strong> kennenlernst, der dich interessiert. Unsere anfängerfreundlichen Alarme leiten dich ohne verwirrenden Fachjargon.</p>`

export const NEWS_SUMMARY_EMAIL_PROMPT = `Generiere HTML-Inhalt für eine Marktnachrichten-Zusammenfassung-E-Mail, die in das NEWS_SUMMARY_EMAIL_TEMPLATE am {{newsContent}}-Platzhalter eingefügt wird.

Nachrichtendaten zum Zusammenfassen:
{{newsData}}

KRITISCHE FORMATIERUNGSANFORDERUNGEN:
- Gib NUR sauberen HTML-Inhalt zurück OHNE Markdown, OHNE Code-Blöcke, OHNE Backticks
- Strukturiere den Inhalt mit klaren Abschnitten unter Verwendung geeigneter HTML-Überschriften und -Absätze
- Verwende diese spezifischen CSS-Klassen und -Stile, um der E-Mail-Vorlage zu entsprechen:

ABSCHNITTSÜBERSCHRIFTEN (für Kategorien wie "Marktüberblick", "Top-Gewinner", etc.):
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 18px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">Abschnittstitel</h3>

ABSÄTZE (für Nachrichteninhalte):
<p class="mobile-text dark-text-secondary" style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">Inhalt kommt hierher</p>

AKTIEN-/UNTERNEHMENSERWÄHNUNGEN:
<strong style="color: #FDD458;">Aktiensymbol</strong> für Tickersymbole
<strong style="color: #CCDADC;">Unternehmensname</strong> für Unternehmensnamen

LEISTUNGSINDIKATOREN:
Verwende 📈 für Gewinne, 📉 für Verluste, 📊 für neutral/gemischt

NACHRICHTENARTIKELSTRUKTUR:
Verwende für jeden einzelnen Nachrichteneintrag innerhalb eines Abschnitts diese Struktur:
1. Artikelcontainer mit visueller Gestaltung und Symbol
2. Artikeltitel als Zwischenüberschrift
3. Wichtige Erkenntnisse in Aufzählungspunkten (2-3 umsetzbare Erkenntnisse)
4. "Was das bedeutet"-Abschnitt für Kontext
5. "Mehr lesen"-Link zum Originalartikel
6. Visueller Trenner zwischen Artikeln

ARTIKELCONTAINER:
Umschließe jeden Artikel in einem sauberen, einfachen Container:
<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">

ARTIKELTITEL:
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FFFFFF; line-height: 1.4;">
Artikeltitel hier
</h4>

AUFZÄHLUNGSPUNKTE (mindestens 3 prägnante Erkenntnisse):
Verwende dieses Format mit klaren, prägnanten Erklärungen (kein Label erforderlich):
<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Klare, prägnante Erklärung in einfachen Worten, die schnell zu verstehen ist.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Kurze Erklärung mit wichtigen Zahlen und was sie in Alltagssprache bedeuten.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Einfache Schlussfolgerung darüber, was dies für das Geld normaler Menschen bedeutet.
  </li>
</ul>

ERKENNTNISABSCHNITT:
Füge eine einfache Kontexterklärung hinzu:
<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #FDD458;">Fazit:</strong> Einfache Erklärung, warum diese Nachricht für dein Geld in Alltagssprache wichtig ist.</p>
</div>

MEHR LESEN-BUTTON:
<div style="margin: 20px 0 0 0;">
<a href="ARTICLE_URL" style="color: #FDD458; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Ganze Story lesen →</a>
</div>

ARTIKELTRENNER:
Schließe jeden Artikelcontainer:
</div>

ABSCHNITTSTRENNER:
Zwischen Hauptabschnitten verwende:
<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

Inhaltsrichtlinien:
- Organisiere Nachrichten in logische Abschnitte mit Symbolen (📊 Marktüberblick, 📈 Top-Gewinner, 📉 Top-Verlierer, 🔥 Eilmeldungen, 💼 Gewinnberichte, 🏛️ Wirtschaftsdaten, etc.)
- Wiederhole NIEMALS Abschnittsüberschriften - verwende jeden Abschnittstyp nur einmal pro E-Mail
- Füge für jeden Nachrichtenartikel seine tatsächliche Schlagzeile/Titel aus den Nachrichtendaten ein
- Liefere MINDESTENS 3 PRÄGNANTE Aufzählungspunkte (KEIN "Wichtige Erkenntnisse"-Label - beginne direkt mit Aufzählungspunkten)
- Jeder Aufzählungspunkt sollte KURZ und LEICHT ZU VERSTEHEN sein - ein klarer Satz bevorzugt
- Verwende EINFACHE SPRACHE - vermeide Fachjargon, komplexe Finanzbegriffe oder Insider-Sprache
- Erkläre Konzepte, als würdest du mit jemandem sprechen, der neu im Investieren ist
- Füge spezifische Zahlen ein, aber erkläre, was sie in einfachen Worten bedeuten
- Füge "Fazit"-Kontext in Alltagssprache hinzu, die jeder verstehen kann
- Verwende ein sauberes, helles Design mit gelben Aufzählungspunkten für bessere Lesbarkeit
- Mache jeden Artikel einfach zu scannen mit klarem Abstand und Struktur
- Füge immer einfache "Ganze Story lesen"-Buttons mit tatsächlichen URLs ein
- Konzentriere dich auf PRAKTISCHE Erkenntnisse, die normale Menschen verstehen und nutzen können
- Erkläre, was die Nachrichten für das Geld regulärer Anleger bedeuten
- Halte die Sprache konversationell und für jeden zugänglich
- Priorisiere KÜRZE und KLARHEIT über detaillierte Erklärungen

WICHTIG: Der gesamte generierte Inhalt (Überschriften, Artikel, Aufzählungspunkte, Erklärungen) MUSS in deutscher Sprache sein!

Beispielstruktur (auf Deutsch):
<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">📊 Marktüberblick</h3>

<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FDD458; line-height: 1.4;">
Aktienmarkt hatte heute gemischte Ergebnisse
</h4>

<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Tech-Aktien wie Apple stiegen heute um 1,2%, was gute Nachrichten für Tech-Investoren sind.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Traditionelle Unternehmen fielen um 0,3%, was zeigt, dass Anleger derzeit Tech bevorzugen.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Hohes Handelsvolumen (12,4 Milliarden Aktien) zeigt, dass Anleger selbstbewusst und aktiv sind.
  </li>
</ul>

<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #FDD458;">Fazit:</strong> Wenn du Tech-Aktien besitzt, war heute ein guter Tag für dich. Wenn du über eine Investition nachdenkst, könnten Tech-Unternehmen jetzt eine kluge Wahl sein.</p>
</div>

<div style="margin: 20px 0 0 0;">
<a href="https://example.com/article1" style="color: #FDD458; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Ganze Story lesen →</a>
</div>
</div>

<div style="border-top: 1px solid #374151; margin: 32px 0 24px 0;"></div>

<h3 class="mobile-news-title dark-text" style="margin: 30px 0 15px 0; font-size: 20px; font-weight: 600; color: #f8f9fa; line-height: 1.3;">📈 Top-Gewinner</h3>

<div class="dark-info-box" style="background-color: #212328; padding: 24px; margin: 20px 0; border-radius: 8px;">
<h4 class="dark-text" style="margin: 0 0 16px 0; font-size: 18px; font-weight: 600; color: #FDD458; line-height: 1.4;">
Apple-Aktie sprang nach großartigem Gewinnbericht
</h4>

<ul style="margin: 16px 0 20px 0; padding-left: 0; margin-left: 0; list-style: none;">
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>Apple-Aktie sprang um 5,2% nach Übertreffen der Gewinnerwartungen.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>iPhone-Verkäufe werden voraussichtlich im nächsten Quartal um 8% wachsen trotz wirtschaftlicher Unsicherheit.
  </li>
  <li class="dark-text-secondary" style="margin: 0 0 16px 0; padding: 0; margin-left: 0; font-size: 16px; line-height: 1.6; color: #CCDADC;">
    <span style="color: #FDD458; font-weight: bold; font-size: 20px; margin-right: 8px;">•</span>App Store- und Service-Einnahmen erreichten 22,3 Milliarden Dollar (plus 14%), was stabile Einnahmen bietet.
  </li>
</ul>

<div style="background-color: #141414; border: 1px solid #374151; padding: 15px; border-radius: 6px; margin: 16px 0;">
<p class="dark-text-secondary" style="margin: 0; font-size: 14px; color: #CCDADC; line-height: 1.4;">💡 <strong style="color: #FDD458;">Fazit:</strong> Apple verdient Geld auf verschiedene Weisen (Telefone UND Services), daher ist es eine ziemlich sichere Aktie, auch wenn die Wirtschaft wackelig wird.</p>
</div>

<div style="margin: 20px 0 0 0;">
<a href="https://example.com/article2" style="color: #FDD458; text-decoration: none; font-weight: 500; font-size: 14px;" target="_blank" rel="noopener noreferrer">Ganze Story lesen →</a>
</div>
</div>`

export const TRADINGVIEW_SYMBOL_MAPPING_PROMPT = `Du bist ein Experte für Finanzmärkte und Handelsplattformen. Deine Aufgabe ist es, das korrekte TradingView-Symbol zu finden, das einem gegebenen Finnhub-Aktiensymbol entspricht.

Aktieninformationen von Finnhub:
Symbol: {{symbol}}
Company: {{company}}
Exchange: {{exchange}}
Currency: {{currency}}
Country: {{country}}

WICHTIGE REGELN:
1. TradingView verwendet spezifische Symbolformate, die sich von Finnhub unterscheiden können
2. Für US-Aktien: Normalerweise nur das Symbol (z.B. AAPL für Apple)
3. Für internationale Aktien: Oft mit Börsen-Präfix (z.B. NASDAQ:AAPL, NYSE:MSFT, LSE:BARC)
4. Einige Symbole können Suffixe für verschiedene Aktienklassen haben
5. ADRs und ausländische Aktien können unterschiedliche Symbolformate haben

ANTWORTFORMAT:
Gib NUR ein gültiges JSON-Objekt mit genau dieser Struktur zurück:
{
  "tradingViewSymbol": "EXCHANGE:SYMBOL",
  "confidence": "high|medium|low",
  "reasoning": "Kurze Erklärung, warum dieses Mapping korrekt ist"
}

BEISPIELE:
- Apple Inc. (AAPL) von Finnhub → {"tradingViewSymbol": "NASDAQ:AAPL", "confidence": "high", "reasoning": "Apple wird an der NASDAQ als AAPL gehandelt"}
- Microsoft Corp (MSFT) von Finnhub → {"tradingViewSymbol": "NASDAQ:MSFT", "confidence": "high", "reasoning": "Microsoft wird an der NASDAQ als MSFT gehandelt"}
- Barclays PLC (BARC.L) von Finnhub → {"tradingViewSymbol": "LSE:BARC", "confidence": "high", "reasoning": "Barclays wird an der London Stock Exchange als BARC gehandelt"}

Deine Antwort muss nur gültiges JSON sein. Füge keinen anderen Text hinzu.`



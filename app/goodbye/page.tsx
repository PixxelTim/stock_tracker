export default function GoodbyePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="max-w-md w-full mx-auto p-8 bg-gray-800 rounded-lg border border-gray-700 text-center">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-yellow-500 mb-4">
                        Account Deleted
                    </h1>
                    <p className="text-gray-300 mb-4">
                        Your account has been permanently deleted. We&apos;re sorry to see you go.
                    </p>
                    <p className="text-gray-400 text-sm">
                        All your data, including watchlists and alerts, has been removed from our system.
                    </p>
                </div>
                
                <div className="mt-8">
                    <a 
                        href="/sign-in"
                        className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-medium px-6 py-3 rounded-lg transition-colors"
                    >
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    )
}

function App() {
    try {
        const [isLoggedIn, setIsLoggedIn] = React.useState(false);
        const [user, setUser] = React.useState(null);
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
            lucide.createIcons();
            
            // Check for saved credentials on app start
            const savedCredentials = loadCredentials();
            if (savedCredentials) {
                setUser(savedCredentials);
                setIsLoggedIn(true);
            }
            setLoading(false);
        }, []);

        const handleLogin = (credentials) => {
            setUser(credentials);
            setIsLoggedIn(true);
        };

        const handleLogout = () => {
            clearCredentials();
            setUser(null);
            setIsLoggedIn(false);
        };

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                    <div className="text-center text-white">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                        <p>Loading...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="app-container" data-name="app" data-file="app.js">
                {isLoggedIn ? (
                    <AccountDetails user={user} onLogout={handleLogout} />
                ) : (
                    <LoginForm onLogin={handleLogin} />
                )}
            </div>
        );
    } catch (error) {
        console.error('App component error:', error);
        reportError(error);
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));

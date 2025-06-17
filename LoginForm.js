function LoginForm({ onLogin }) {
    try {
        const [formData, setFormData] = React.useState({
            username: '',
            password: '',
            serverUrl: 'http://172.16.10.80:8000'
        });
        const [loading, setLoading] = React.useState(false);
        const [error, setError] = React.useState('');
        const [rememberMe, setRememberMe] = React.useState(false);

        React.useEffect(() => {
            const savedData = loadSavedLoginData();
            if (savedData) {
                setFormData(savedData);
                setRememberMe(true);
            }
        }, []);

        const handleSubmit = async (e) => {
            e.preventDefault();
            setLoading(true);
            setError('');

            try {
                const success = await kohaLogin(formData);
                if (success) {
                    if (rememberMe) {
                        saveLoginData(formData);
                    } else {
                        clearSavedLoginData();
                    }
                    saveCredentials(formData);
                    onLogin(formData);
                } else {
                    setError('Invalid credentials or server error');
                }
            } catch (err) {
                setError('Connection failed. Please check server URL.');
            } finally {
                setLoading(false);
            }
        };

        const handleInputChange = (field, value) => {
            setFormData(prev => ({ ...prev, [field]: value }));
        };

        return (
            <div className="min-h-screen flex items-center justify-center p-4" data-name="login-container" data-file="components/LoginForm.js">
                <div className="wrapper">
                    <div className="text-center mb-8">
                        <img 
                            src="https://app.trickle.so/storage/public/images/usr_1187769fd0000001/a30611e1-3e53-4d25-8d10-35aeee92df7b.png" 
                            alt="PUC Logo" 
                            className="w-20 h-20 mx-auto mb-4 object-contain"
                        />
                        <h1 className="text-2xl font-bold">PUC Central Library</h1>
                        <p className="text-white/80 mt-2">Access your library account</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input
                                type="text"
                                value={formData.username}
                                onChange={(e) => handleInputChange('username', e.target.value)}
                                placeholder="Username"
                                required
                            />
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                value={formData.password}
                                onChange={(e) => handleInputChange('password', e.target.value)}
                                placeholder="Password"
                                required
                            />
                        </div>

                        <div className="input-box">
                            <input
                                type="url"
                                value={formData.serverUrl}
                                onChange={(e) => handleInputChange('serverUrl', e.target.value)}
                                placeholder="Server URL"
                                required
                            />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                Remember me
                            </label>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-400/50 text-red-200 px-4 py-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn disabled:opacity-50"
                        >
                            {loading ? 'Connecting...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
    }
}

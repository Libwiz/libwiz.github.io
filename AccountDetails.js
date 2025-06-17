function AccountDetails({ user, onLogout }) {
    try {
        const [accountData, setAccountData] = React.useState(null);
        const [loading, setLoading] = React.useState(true);
        const [activeTab, setActiveTab] = React.useState('borrowed');

        React.useEffect(() => {
            loadAccountData();
            lucide.createIcons();
        }, []);

        const loadAccountData = async () => {
            try {
                const data = await getAccountDetails(user);
                setAccountData(data);
            } catch (error) {
                console.error('Failed to load account data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) {
            return (
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading account...</p>
                    </div>
                </div>
            );
        }

        return (
            <div className="min-h-screen bg-gray-50" data-name="account-container" data-file="components/AccountDetails.js">
                <header className="bg-white shadow-sm border-b">
                    <div className="px-4 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <img 
                                src="https://app.trickle.so/storage/public/images/usr_1187769fd0000001/a30611e1-3e53-4d25-8d10-35aeee92df7b.png" 
                                alt="RIPANS Logo" 
                                className="w-10 h-10 object-contain"
                            />
                            <div>
                                <h1 className="font-semibold text-gray-800">Welcome, {user.username}</h1>
                                <p className="text-sm text-gray-600">RIPANS Central Library</p>
                            </div>
                        </div>
                        <button
                            onClick={onLogout}
                            className="p-2 text-gray-600 hover:text-gray-800"
                        >
                            <i data-lucide="log-out" className="w-6 h-6"></i>
                        </button>
                    </div>
                </header>

                <div className="p-4">
                    <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('borrowed')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'borrowed' 
                                    ? 'bg-white text-indigo-600 shadow-sm' 
                                    : 'text-gray-600'
                            }`}
                        >
                            Borrowed Books
                        </button>
                        <button
                            onClick={() => setActiveTab('search')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                                activeTab === 'search' 
                                    ? 'bg-white text-indigo-600 shadow-sm' 
                                    : 'text-gray-600'
                            }`}
                        >
                            Search Catalog
                        </button>
                    </div>

                    {activeTab === 'borrowed' && (
                        <div className="space-y-4">
                            {accountData?.borrowedBooks?.length > 0 ? (
                                accountData.borrowedBooks.map((book, index) => (
                                    <BookCard key={index} book={book} />
                                ))
                            ) : (
                                <div className="text-center py-12">
                                    <i data-lucide="book" className="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                                    <p className="text-gray-600">No borrowed books</p>
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'search' && <SearchCatalog user={user} />}
                </div>
            </div>
        );
    } catch (error) {
        console.error('AccountDetails component error:', error);
        reportError(error);
    }
}

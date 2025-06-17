function SearchCatalog({ user }) {
    try {
        const [searchQuery, setSearchQuery] = React.useState('');
        const [searchResults, setSearchResults] = React.useState([]);
        const [loading, setLoading] = React.useState(false);
        const [hasSearched, setHasSearched] = React.useState(false);

        React.useEffect(() => {
            lucide.createIcons();
        }, [searchResults]);

        const handleSearch = async (e) => {
            e.preventDefault();
            if (!searchQuery.trim()) return;

            setLoading(true);
            setHasSearched(true);

            try {
                const results = await searchCatalog(user, searchQuery);
                setSearchResults(results);
            } catch (error) {
                console.error('Search failed:', error);
                setSearchResults([]);
            } finally {
                setLoading(false);
            }
        };

        return (
            <div className="space-y-6" data-name="search-container" data-file="components/SearchCatalog.js">
                <form onSubmit={handleSearch} className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search books, authors, titles..."
                            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <i data-lucide="search" className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"></i>
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading || !searchQuery.trim()}
                        className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium disabled:opacity-50 hover:bg-indigo-700 transition-colors"
                    >
                        {loading ? 'Searching...' : 'Search Catalog'}
                    </button>
                </form>

                {loading && (
                    <div className="text-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                        <p className="mt-2 text-gray-600">Searching catalog...</p>
                    </div>
                )}

                {!loading && hasSearched && (
                    <div className="space-y-4">
                        {searchResults.length > 0 ? (
                            searchResults.map((book, index) => (
                                <div key={index} className="card p-4">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-16 bg-green-100 rounded flex items-center justify-center flex-shrink-0">
                                            <i data-lucide="book-open" className="w-6 h-6 text-green-600"></i>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{book.title}</h3>
                                            {book.author && (
                                                <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                                            )}
                                            {book.isbn && (
                                                <p className="text-xs text-gray-500 mt-2">ISBN: {book.isbn}</p>
                                            )}
                                            <div className="mt-2 flex items-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    book.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {book.available ? 'Available' : 'Checked Out'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-12">
                                <i data-lucide="search-x" className="w-16 h-16 text-gray-400 mx-auto mb-4"></i>
                                <p className="text-gray-600">No books found for "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    } catch (error) {
        console.error('SearchCatalog component error:', error);
        reportError(error);
    }
}

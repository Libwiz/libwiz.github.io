const kohaLogin = async (credentials) => {
    try {
        const response = await fetch(`${credentials.serverUrl}/api/v1/auth/session`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: credentials.username,
                password: credentials.password
            })
        });

        if (response.ok) {
            const data = await response.json();
            return data.session_id || true;
        }
        return false;
    } catch (error) {
        console.error('Koha login error:', error);
        return false;
    }
};

const getAccountDetails = async (user) => {
    try {
        // Simulate API call - replace with actual Koha API endpoints
        const response = await fetch(`${user.serverUrl}/api/v1/patrons/self/checkouts`, {
            headers: {
                'Authorization': `Bearer ${user.token || 'mock-token'}`,
                'Content-Type': 'application/json'
            }
        });

        // Mock data for demonstration
        return {
            borrowedBooks: [
                {
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    dueDate: "2024-12-25",
                    barcode: "123456789"
                },
                {
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    dueDate: "2024-12-20",
                    barcode: "987654321"
                },
                {
                    title: "1984",
                    author: "George Orwell",
                    dueDate: "2024-12-15",
                    barcode: "456789123"
                }
            ]
        };
    } catch (error) {
        console.error('Error fetching account details:', error);
        return { borrowedBooks: [] };
    }
};

const searchCatalog = async (user, query) => {
    try {
        // Simulate catalog search - replace with actual Koha API
        const response = await fetch(`${user.serverUrl}/api/v1/biblios?q=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': `Bearer ${user.token || 'mock-token'}`,
                'Content-Type': 'application/json'
            }
        });

        // Mock search results
        const mockResults = [
            {
                title: "JavaScript: The Good Parts",
                author: "Douglas Crockford",
                isbn: "978-0596517748",
                available: true
            },
            {
                title: "Clean Code",
                author: "Robert C. Martin",
                isbn: "978-0132350884",
                available: false
            }
        ];

        return mockResults.filter(book => 
            book.title.toLowerCase().includes(query.toLowerCase()) ||
            book.author.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error('Error searching catalog:', error);
        return [];
    }
};

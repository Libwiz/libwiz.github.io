function BookCard({ book }) {
    try {
        const getDaysUntilDue = (dueDate) => {
            const due = new Date(dueDate);
            const today = new Date();
            const diffTime = due - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        };

        const getStatusClass = (dueDate) => {
            const days = getDaysUntilDue(dueDate);
            if (days < 0) return 'overdue';
            if (days <= 3) return 'due-soon';
            return '';
        };

        const getStatusText = (dueDate) => {
            const days = getDaysUntilDue(dueDate);
            if (days < 0) return `Overdue by ${Math.abs(days)} day(s)`;
            if (days === 0) return 'Due today';
            if (days <= 3) return `Due in ${days} day(s)`;
            return `Due in ${days} day(s)`;
        };

        const formatDate = (dateString) => {
            return new Date(dateString).toLocaleDateString();
        };

        return (
            <div 
                className={`book-item card p-4 ${getStatusClass(book.dueDate)}`}
                data-name="book-card" 
                data-file="components/BookCard.js"
            >
                <div className="flex items-start space-x-4">
                    <div className="w-12 h-16 bg-indigo-100 rounded flex items-center justify-center flex-shrink-0">
                        <i data-lucide="book" className="w-6 h-6 text-indigo-600"></i>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{book.title}</h3>
                        {book.author && (
                            <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                        )}
                        
                        <div className="mt-3 flex flex-col space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                                <i data-lucide="calendar" className="w-4 h-4 mr-2"></i>
                                <span>Due: {formatDate(book.dueDate)}</span>
                            </div>
                            
                            <div className="flex items-center text-sm">
                                <i data-lucide="clock" className="w-4 h-4 mr-2"></i>
                                <span className={`font-medium ${
                                    getDaysUntilDue(book.dueDate) < 0 ? 'text-red-600' :
                                    getDaysUntilDue(book.dueDate) <= 3 ? 'text-amber-600' : 'text-green-600'
                                }`}>
                                    {getStatusText(book.dueDate)}
                                </span>
                            </div>
                            
                            {book.barcode && (
                                <div className="flex items-center text-sm text-gray-500">
                                    <i data-lucide="hash" className="w-4 h-4 mr-2"></i>
                                    <span>{book.barcode}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('BookCard component error:', error);
        reportError(error);
    }
}

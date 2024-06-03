import React, { useState, useEffect } from 'react';
import './BookApp.css'; // Import CSS file for styling

function BookApp() {
  // State variables
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newBook, setNewBook] = useState({ id: null, title: '', author: '', year: '', price: '' });

  // Fetch all books on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // Function to fetch all books
  const fetchBooks = () => {
    fetch('http://localhost:8080/api/books') // Replace with your API endpoint
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => console.error('Error fetching books:', error));
  };

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // Function to handle form submit for adding or updating a book
  const handleSubmitBook = (event) => {
    event.preventDefault();
    const { id, ...bookData } = newBook;
    const url = id ? `http://localhost:8080/api/books/${id}` : 'http://localhost:8080/api/books';
    const method = id ? 'PUT' : 'POST';
    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bookData)
    })
    .then(() => {
      setNewBook({ id: null, title: '', author: '', year: '', price: '' });
      fetchBooks(); // Refresh book list
      setShowForm(false); // Hide form after adding/updating book
    })
    .catch(error => console.error('Error adding/updating book:', error));
  };

  // Function to handle delete book
  const handleDeleteBook = (id) => {
    fetch(`http://localhost:8080/api/books/${id}`, {
      method: 'DELETE'
    })
    .then(() => fetchBooks()) // Refresh book list
    .catch(error => console.error('Error deleting book:', error));
  };

  // Function to handle edit book
  const handleEditBook = (book) => {
    setNewBook(book);
    setShowForm(true);
  };

  return (
    <div>
      <nav className="navbar">
        <h1>Book CRUD Application</h1>
        <button onClick={() => setShowForm(!showForm)}>Add Book</button>
      </nav>
      {/* Form to add/edit book */}
      {showForm && (
        <form onSubmit={handleSubmitBook} className="form">
          <input type="text" name="title" value={newBook.title} onChange={handleInputChange} placeholder="Title" required />
          <input type="text" name="author" value={newBook.author} onChange={handleInputChange} placeholder="Author" required />
          <input type="text" name="year" value={newBook.year} onChange={handleInputChange} placeholder="Year" required />
          <input type="text" name="price" value={newBook.price} onChange={handleInputChange} placeholder="price" required />
          <button type="submit">{newBook.id ? 'Update Book' : 'Add Book'}</button>
        </form>
      )}
      {/* Book list */}
      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>{book.price}</td>
              <td>
                <button onClick={() => handleEditBook(book)}>Edit</button>
                <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BookApp;

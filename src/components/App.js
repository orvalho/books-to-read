import React, {Component} from 'react';

import initialBookList from '../initialBookList';
import InputBox from './InputBox';
import BookList from './BookList';

export default class App extends Component {
    state = {
        books: JSON.parse(localStorage.getItem('books')) || initialBookList
    };

    componentDidUpdate() {
        localStorage.setItem('books', JSON.stringify(this.state.books));
    }

    addBook = book => this.setState({books: [...this.state.books, book]});
    
    updateBook = (id, author, title) => {
        const books = this.state.books.map(book => book.id === id ? {id, author, title} : book);
        this.setState({books});
    }

    deleteBook = id => {
        const books = this.state.books.filter(book => book.id !== id);
        this.setState({books});
    };

    deleteAllBooks = () => this.setState({books: []});

    render() {
        return (
            <div className="app">
                <h1>books to read</h1>
                <InputBox addBook={this.addBook}/>
                <BookList books={this.state.books} updateBook={this.updateBook} deleteBook={this.deleteBook}/>
                <button className="ui mini orange button" onClick={this.deleteAllBooks}>
                    DELETE ALL BOOKS
                </button>
            </div>
        );
    }
}
import React, {Component} from 'react';

export default class BookList extends Component {
    state = {editing: null};

    authorRef = React.createRef();
    titleRef = React.createRef();
    
    onUpdate = id => this.setState({editing: id});

    onSubmit = e => {
        e.preventDefault();
        const id = this.state.editing;
        const author = this.authorRef.current.value;
        const title = this.titleRef.current.value;
        this.props.updateBook(id, author, title);
        this.setState({editing: null});
    };

    renderBook = ({id, author, title}) => {
        return (
            <div className="item" key={id}>
                <div className="right floated content">
                    <button className="ui mini orange button" onClick={() => this.onUpdate(id)}>
                        UPDATE
                    </button>
                    <button className="ui mini orange button" onClick={() => this.props.deleteBook(id)}>
                        DELETE
                    </button>
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div>by {author}</div>
                </div>
            </div>
        );
    };

    renderUpdateForm = ({id, author, title}) => {
        return (
            <div className="ui segment" key={id}>
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <input ref={this.titleRef} defaultValue={title}/>
                    </div>
                    <div className="field">
                        <input ref={this.authorRef} defaultValue={author}/>
                    </div>
                    <button className="ui mini orange button">
                        SAVE UPDATES
                    </button>
                </form>
            </div>
        );
    };

    render() {
        return (
            <div className="ui middle aligned divided list">
                {this.props.books.map(book => {
                    if (this.state.editing !== book.id) {
                        return this.renderBook(book);
                    } else {
                        return this.renderUpdateForm(book);
                    }
                })}
            </div>
        );
    }
}
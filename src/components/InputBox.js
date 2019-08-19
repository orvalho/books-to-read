import React, {Component} from 'react';

export default class InputBox extends Component {
    authorRef = React.createRef();
    titleRef = React.createRef();

    onSubmit = e => {
        e.preventDefault();
        const author = this.authorRef.current.value.trim();
        const title = this.titleRef.current.value.trim(); 
        if (author.length && title.length) {
            this.props.addBook({
                author,
                title,
                id: new Date()                          
            });
            e.currentTarget.reset();
        }
    };

    render() {
        return (
            <form className="ui form" onSubmit={this.onSubmit}>
                <div className="field">
                    <input name="title" ref={this.titleRef} placeholder="Enter book title" required/>
                </div>
                <div className="field">
                    <input name="author" ref={this.authorRef} placeholder="Enter book author" required/>
                </div>
                <button className="ui mini orange button">ADD</button>
            </form>
        );
    }
}
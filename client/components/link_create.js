import React, { Component } from "react";

class LinkCreate extends Component {

    onFormSubmit(e) {
        e.preventDefault();

        Meteor.call("links.insert", this.refs.link.value, (err) => {
            if(err) {
                console.error(err);
            } else {
                console.log("Successo!!!");
                this.refs.link.value = "";
            }

        });
    }

    render() {
        return (
            <div className="link-create">
                <form onSubmit={this.onFormSubmit.bind(this)}>
                    <div className="form-group">
                        <input ref="link" className="form-control" />
                    </div>
                    <button className="btn btn-primary">Shorten!!</button>
                </form>
            </div>
        );
    }
    
}

export default LinkCreate;
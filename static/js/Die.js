import React from "react";
import "whatwg-fetch";

export default class Die extends React.Component {

    constructor() {
        super();
        this.state = {
            lastroll: 6,
            lastmult: 1,
            lastcd: 1,
            totalg: 0,
            active: 1,
            classes: "die die-active"
        }
    }

    componentDidMount() {
        this.roll();
    }

    roll() {
        var self = this
        fetch("/rolldie",
            {
                method: "GET",
                credentials: 'same-origin'
            }
        ).then(function(response) {
            if (response.status !== 200) {  
                console.log('Error ' +  
                response.status);  
                return;  
            }

            // Update the view with information about the last roll
            response.json().then(function(json) {  
                self.setState({
                    lastroll: json.data.roll,
                    lastmult: json.data.mult,
                    lastcd: json.data.cd,
                    totalg: json.data.totalg,
                    active: 0,
                    classes: "die die-inactive"
                })
                setTimeout(() => self.setState({active: 1, classes: "die die-active"}), self.state.lastcd * 1000);
                self.props.gameloop(json.data.cd)
            });
        });
    }

    render() {
        return(
            <div id="die-page" className="top-parent">
                <div className="totalg">{this.state.totalg}</div>
                <div className="counter">{this.props.cd}</div>
                <div className={this.state.classes} 
                    onClick={() => this.roll()}>
                    {this.state.lastroll}</div>
            </div>
        )
    }
}
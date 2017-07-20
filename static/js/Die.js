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
        }
    }

    componentDidMount() {
        var self = this;
        fetch("/loaddie",
            {
                method: "GET",
                credentials: "same-origin"
            }
        ).then(function(response) {
            if (response.status !== 200) {
                console.log("Error " +
                response.status);
                return;
            }

            response.json().then(function(json) {
                self.setState({
                    totalg: json.data.startg
                })
            })
        })
    }

    roll() {
        var self = this;
        if (this.props.dieClass == "die die-inactive") {
            return
        } else {
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
                    })
                    self.props.gameloop(json.data.cd, json.data.cd)
                });
            });
        }
    }

    render() {
        return(
            <div id="die-page" className="top-parent">
                <div className="totalg">{this.state.totalg}</div>
                <div className="counter">{this.props.cd}</div>
                <div className={this.props.dieClass} 
                    onClick={() => this.roll()}>
                    {this.state.lastroll}</div>
            </div>
        )
    }
}
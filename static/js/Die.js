import React from "react";

export default class Die extends React.Component {
    constructor() {
        super();
        this.state = {
            dieVal: 6
        }
        this.roll = this.roll.bind(this);
    }

    roll(min, max) {
        var newroll;
        newroll = Math.floor(Math.random() * (max - min + 1) + min);
        this.setState({
            dieVal: newroll
        });
    }

    render() {
        return(
            <div id="die-page" className="top-parent">
                <div className="die" onClick={() => this.roll(1, 6)}>{this.state.dieVal}</div>
            </div>
        )
    }
}
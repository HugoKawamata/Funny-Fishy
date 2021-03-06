import React from "react";
import "whatwg-fetch";

export default class Die extends React.Component {

    constructor() {
        super();
        this.state = {
            lastroll: 6,
            lastmult: 1,
            lastcd: 0,
            lastmin: 0,
            lastmax: 0,
            totalg: 0,
            rolling: "",
        }
    }

    /*
     * Get initial render information (gold)
     */
    componentDidMount() {
        var self = this;
        fetch("/loaddie",
            {
                method: "POST",
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
                    lastroll: json.data.roll,
                    lastmult: json.data.mult,
                    lastcd: json.data.savedCd,
                    lastmin: json.data.min,
                    lastmax: json.data.max,
                    totalg: json.data.totalg
                })
            })
        })
    }

    /*
     * The first part of the two part process of rolling the die.
     * Animate roll takes 800ms to complete. In this time, it will display
     * an animation of the die rolling by changing the css classes of the die.
     * 
     * The die should not be able to be rolled again while it is rolling
     * or while inactive.
     * 
     * Once this animation is complete, roll() is called to get roll information
     * from the backend
     */
    animateRoll() {
        if (this.props.dieClass === "die die-inactive" || this.state.rolling === "rolling") {
            return
        } else {
            this.setState({
                rolling: "rolling"
            })
            setTimeout(() => this.roll(), 800)
        }
    }

    /*
     * The second part of rolling the die. Gets all the useful information
     * needed for displaying and updating roll data (gold, multipliers, the roll result)
     * from the backend. 
     * 
     * Calling this endpoint has important side effects (updating the user class)
     */
    roll() {
        this.setState({rolling: ""})
        var self = this;
        fetch("/rolldie",
            {
                method: "POST",
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
                    lastmin: json.data.min,
                    lastmax: json.data.max,
                    totalg: json.data.totalg,
                })
                self.props.gameloop(json.data.cd, json.data.cd)
            });
        });
    }

    render() {
        return(
            <div id="die-page" className="top-parent">
                <div className="die-stat-container">
                    <div className="totalg">
                        Total Gold: <br />
                        {this.props.addCommas(this.state.totalg)}
                    </div>
                    <div className="counter">
                        Die Cooldown: <br />
                        {this.props.cd} second{this.props.cd !== 1 ? "s" : ""}
                    </div>
                </div>
                <div className="die-container">
                    <div className={"floating-number " + this.props.fnm}>{this.props.addCommas(this.state.lastroll * this.state.lastmult)}</div>
                    <div className={this.props.dieClass + " " + this.state.rolling} 
                        onClick={() => this.animateRoll()}>
                        {this.state.lastroll}</div>
                </div>
                <div className="die-stat-cont">
                    <div className="die-stat-head">
                        Die Stats
                    </div>
                    <div className="die-stats">
                        <p>Last roll: {this.state.lastroll}</p>
                        <p>Die min: {this.state.lastmin}</p>
                        <p>Die max: {this.state.lastmax}</p>
                        <p>Multiplier: {this.state.lastmult}</p>
                        <p>Cooldown per roll: {this.state.lastcd}</p>
                    </div>
                </div>
            </div>
        )
    }
}
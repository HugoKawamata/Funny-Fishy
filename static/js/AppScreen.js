import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            cd: 0,
            dieClass: "die die-inactive", // Until proven innocent (stops people speedclicking before it's rendered fully)
            fnm: "floating-number-still",
            counting: false, // Until proven guilty (necessity for preventing double cooldowns)
        }
        this.addCommas = this.addCommas.bind(this)
    }

    componentDidMount() {
        this.getSavedData();
    }

    getSavedData() {
        var self = this;
        fetch("/cooldown",
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

            response.json().then(function(json) {  
                self.setState({
                    cd: json.data.cd,
                    counting: json.data.cd === 0 ? false : true,
                    dieClass: json.data.cd === 0 ? "die die-active" : "die die-inactive",
                })
                if (json.data.cd === 0) { // If the die isn't already counting down
                    self.gameloop(0, "boot")
                } else {
                    self.gameloop(json.data.cd)
                }
            });
        });
    }

    addCommas(number) {
        number = Math.floor(number);
        let convNum = number + "";
        let commas = Math.ceil(convNum.length / 3) - 1;
        for (let i = 1; i <= commas; i++) {
            convNum = convNum.slice(0, convNum.length - (3 * i + i - 1)) + "," + convNum.slice(convNum.length - (3 * i + i - 1), convNum.length)
        }
        return convNum
    }

    getData(cooldown) {
        var self = this;
        fetch("/cooldown",
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

            response.json().then(function(json) {  
                self.setState({
                    cd: json.data.cd
                })
                if (cooldown === 0) {
                    self.setState({dieClass: "die die-active", counting: false})
                }
                self.gameloop(json.data.cd);
            });
        });
    }

    gameloop(cooldown, startingCooldown) {
        console.log("starting gameloop, cd == " + this.state.cd)
        if (cooldown === startingCooldown) {
            // Start cooldown
            this.setState({dieClass: "die die-inactive", fnm: "floating-number-move"});
            setTimeout(() => this.setState({fnm: "floating-number-still"}), 800);
        } else if (cooldown > 0 && startingCooldown == "boot") {
            this.setState({dieClass: "die die-inactive"})
        }
        this.setState({cd: cooldown, counting: true});
        if (this.state.cd > 0) {
            setTimeout((() => this.getData(cooldown - 1)), 1000);
        } else {
            // This part should be called in two cases:
            // 1. The initial cooldown is 0. This will occur
            //    when the game begins.
            // 2. The die has already been reset to die-active and gameloop
            //    is doing a final pass through.
            console.log("ending gameloop, cd == " + this.state.cd)
            this.setState({dieClass: "die die-active", counting: false})
        }
    }

    render() {
        var page;
        switch(this.props.current) {
            case "fish":
                page = <Fish addCommas={(number) => this.addCommas(number)} />
                break;
            default:
                page = <Die 
                        dieClass={this.state.dieClass}
                        fnm={this.state.fnm}
                        cd={this.state.cd} 
                        counting={this.state.counting}
                        addCommas={(number) => this.addCommas(number)}
                        gameloop={(cooldown, scd) => this.gameloop(cooldown, scd)} />
                        
                break;
        };
        return page;
    }
}
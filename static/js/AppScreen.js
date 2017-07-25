import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            cd: 0,
            dieClass: "die die-inactive", // Until proven guilty
            fnm: "floating-number-still"
        }
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
                    self.setState({dieClass: "die die-active"})
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
        this.setState({cd: cooldown});
        if (this.state.cd > 0) {
            setTimeout((() => this.getData(cooldown - 1)), 1000);
        } else {
            // This part should be called in two cases:
            // 1. The initial cooldown is 0. This will occur
            //    when the game begins.
            // 2. The die has already been reset to die-active and gameloop
            //    is doing a final pass through.
            console.log("ending gameloop, cd == " + this.state.cd)
            this.setState({dieClass: "die die-active"})
        }
    }

    render() {
        var page;
        switch(this.props.current) {
            case "fish":
                page = <Fish />
                break;
            default:
                page = <Die 
                        dieClass={this.state.dieClass}
                        fnm={this.state.fnm}
                        cd={this.state.cd} 
                        gameloop={(cooldown, scd) => this.gameloop(cooldown, scd)} />
                break;
        };
        return page;
    }
}
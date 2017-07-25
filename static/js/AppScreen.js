import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            cd: 0,
            dieClass: "die die-active",
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
        if (cooldown === startingCooldown) {
            // Start cooldown
            this.setState({dieClass: "die die-inactive", fnm: "floating-number-move"});
            setTimeout(() => this.setState({fnm: "floating-number-still"}), 800);
        }
        this.setState({cd: cooldown});
        if (this.state.cd > 0) {
            setTimeout((() => this.getData(cooldown - 1)), 1000);
        } else {
            // Cooldown finished
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
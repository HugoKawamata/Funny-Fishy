import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            cd: 0,
            dieClass: "die die-active"
        }
    }

    getData(cooldown) {
        console.log("getting data");
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
                console.log(json.data.cd)
                self.gameloop(json.data.cd);
            });
        });
    }

    gameloop(cooldown, startingCooldown) {
        if (cooldown === startingCooldown) {
            // Start cooldown
            this.setState({dieClass: "die die-inactive"})
        }
        this.setState({cd: cooldown});
        console.log("iterate gl")
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
                        cd={this.state.cd} 
                        gameloop={(cooldown, sc) => this.gameloop(cooldown, sc)} />
                break;
        };
        return page;
    }
}
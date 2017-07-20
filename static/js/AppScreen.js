import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            cd: 0
        }
    }

    getData() {
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
            });
        });
        this.gameloop(this.state.cd);
    }

    gameloop(cooldown) {
        this.setState({cd: cooldown});
        console.log("iterate gl")
        if (this.state.cd > 1) {
            setTimeout((() => this.getData()), 1000);
        }
    }

    render() {
        var page;
        switch(this.props.current) {
            case "fish":
                page = <Fish />
                break;
            default:
                page = <Die cd={this.state.cd} gameloop={(cooldown) => this.gameloop(cooldown)} />
                break;
        };
        return page;
    }
}
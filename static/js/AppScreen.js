import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {

    /*constructor() {
        super();
        this.state = {

        }
    }

    gameloop() {
        while(1) {
            setTimeout((() => this.getData()), 1000);
        }
    }*/

    render() {
        var page;
        switch(this.props.current) {
            case "fish":
                page = <Fish />
                break;
            case "die":
                page = <Die />
                break;
            default:
                page = <Die />
                break;
        };
        return page;
    }
}
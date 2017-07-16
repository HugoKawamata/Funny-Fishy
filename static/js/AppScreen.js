import React from "react";
import Fish from "./Fish";
import Die from "./Die";

export default class AppScreen extends React.Component {
    render() {
        var page;
        switch(this.props.current) {
            case "fish":
                page = <Fish />
                break;
            case "die":
                page = <Die />
                break;
            
        };
        return page;
    }
}
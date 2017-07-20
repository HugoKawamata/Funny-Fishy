import React from "react"
import AppScreen from "./AppScreen"

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            page: "die"
        };
        this.changePage = this.changePage.bind(this);
    }

    changePage(pagename) {
        this.setState({
            page: pagename
        });
    }

    render() {
        return(
            <div id="app" className="top-parent">
                <nav className="navbar">
                    <a className="navbar-item" href="/logout">
                        Log Out
                    </a>
                    <a className="navbar-item" onClick={() => this.changePage("fish")}>
                        See Fish
                    </a>
                    <a className="navbar-item" onClick={() => this.changePage("die")}>
                        Dive Die
                    </a>
                </nav>
                <AppScreen />
            </div>

        )
    }
}
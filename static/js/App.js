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
                    <a className="navbar-item" onClick={() => this.changePage("fish")}>
                        <div className={"navbar-tab" + (this.state.page === "fish" ? " active-navtab" : "")}>
                            See Fish
                        </div>
                    </a>
                    <a className="navbar-item" onClick={() => this.changePage("die")}>
                        <div className={"navbar-tab" + (this.state.page === "die" ? " active-navtab" : "")} >
                            Dive Die
                        </div>
                    </a>
                    <a className="navbar-item" href="/logout">
                        <div className="navbar-tab">
                            Log Out
                        </div>
                    </a>
                </nav>
                <AppScreen />
            </div>

        )
    }
}
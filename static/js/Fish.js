import React from "react";

export default class Fish extends React.Component {

    constructor() {
        super();
        this.state = {
            hooks: [],
            totalg: 0
        }
        this.getFishInfo = this.getFishInfo.bind(this)
        this.buyHook = this.buyHook.bind(this)
    }

    /*
     * Get initial render information
     */
    componentDidMount() {
        this.getFishInfo();
    }

    /*
     * Sends a json message to the backend to indicate the user wishes to buy a hook.
     * Validating that the user has enough gold is done in the backend (User class)
     */
    buyHook(hookNum) {
        var self = this;
        fetch("/buyhook",
            {
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({hook: hookNum}),
                headers: { "Content-Type": "application/json" }
            }
        ).then(function(response) {
            if (response.status !== 200) {
                console.log("Error " +
                response.status);
                return;
            }

            response.json().then(function(json) {
                self.setState({
                    hooks: json.data.hooks,
                    totalg: json.data.totalg
                })
            })
        })
    }

    /*
     * Gets the hook values (the fish the user has obtained)
     * as well as the user's gold in order to display it.
     */
    getFishInfo() {
        console.log("Starting fish info call");
        var self = this;
        fetch("/loadfish",
            {
                method: "POST",
                credentials: "same-origin",
            }
        ).then(function(response) {
            if (response.status !== 200) {
                console.log("Error " +
                response.status);
                return;
            }

            response.json().then(function(json) {
                self.setState({
                    hooks: json.data.hooks,
                    totalg: json.data.totalg
                })
            })
        })
    }
    
    /*
     * Renders the fish tab.
     * 
     * Generates the rows of fish the user owns. Unobtained cosmic rare fish are 
     * not displayed (as completionists will be annoyed by this since they are so rare)
     */
    render() {
        var collection = [];
        var hookprice = [
            20,
            40
        ];
        for (let rowI = 0; rowI < this.state.hooks.length; rowI++) {
            // add row of fish to "collection" for each hook before corrupt hooks // 6?
            var fishlist = [];
            for (let fishI = 0; fishI < this.state.hooks[rowI].length; fishI++) {
                if (fishI == 6 && this.state.hooks[rowI][fishI] == 0) {
                    // Nothing, because only reveal cosmic rare fish to people who have them already
                } else {
                    fishlist[fishI] = (
                        <div className="fish-card" key={"fish" + fishI + "row" + rowI}>
                            <div className="fish-number">
                                {this.state.hooks[rowI][fishI]}
                            </div>
                            <img 
                                className="fish-image"
                                src={"static/images/fish/r" + rowI + "-f" + fishI + "-" + (this.state.hooks[rowI][fishI] == 0 ? "0" : "1") + ".png"}
                                alt={"Hook " + rowI + ", Fish " + fishI}
                                key={"Hook " + rowI + ", Fish " + fishI}
                            />
                        </div>
                    )
                }
            }
            collection[rowI] = <div className="fish-section" key={"fish-section" + rowI}>
                    <div className="fish-row" key={"fish-row" + rowI}>{fishlist}</div>
                    <div 
                        className={"hook button hook" + rowI + " " + (this.state.totalg > hookprice[rowI] ? "" : "hook-inactive")}
                        key={"hook" + rowI}
                        onClick={() => this.buyHook(rowI)}>Buy hook {rowI}
                    </div>
                </div>
        }

        return(
            <div id="fish-page" className="top-parent">
                <div className="totalg">Total Gold:<br />{this.state.totalg}</div>
                <div className="fish-collection" >
                    {collection}
                </div>
            </div>
        )
    }
}
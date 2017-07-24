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

    componentDidMount() {
        this.getFishInfo();
    }

    buyHook(hookNum) {
        console.log("buy hook " + hookNum);
        var self = this;
        fetch("/buyhook",
            {
                method: "POST",
                credentials: "same-origin",
                body: JSON.stringify({hook: hookNum}),
                headers: { "Content-Type": "application/json" }
            }
        )
        return;
    }

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
    
    render() {
        var collection = [];
        for (let rowI = 0; rowI < this.state.hooks.length; rowI++) {
            // add row of fish to "collection" for each hook before corrupt hooks // 6?
            var fishlist = [];
            for (let fishI = 0; fishI < this.state.hooks[rowI].length; fishI++) {
                fishlist[fishI] = <div className="fish-card" key={"fish" + fishI + "row" + rowI}>
                    {this.state.hooks[rowI][fishI]}
                    <img 
                        src={"static/images/fish/r" + rowI + "-f" + fishI + "-" + (this.state.hooks[rowI][fishI] == 0 ? "0" : "1") + ".png"}
                        alt={"Hook " + rowI + ", Fish " + fishI}
                        key={"Hook " + rowI + ", Fish " + fishI}
                    />
                </div>
            }
            collection[rowI] = <div className="fish-row" key={"fish-row" + rowI}>
                    <div 
                        className={"hook hook" + rowI}
                        key={"hook" + rowI}
                        onClick={() => this.buyHook(rowI)}>Buy hook {rowI}
                    </div>
                    {fishlist}
                </div>
        }

        return(
            <div id="fish-page" className="top-parent">
                <div className="totalg">{this.state.totalg}</div>
                <div className="fish-collection" >
                    {collection}
                </div>
            </div>
        )
    }
}
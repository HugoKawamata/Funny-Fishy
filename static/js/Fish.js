import React from "react";

export default class Fish extends React.Component {

    constructor() {
        super();
        this.state = {
            hooks: []
        }
        this.getFishInfo = this.getFishInfo.bind(this)
    }

    componentDidMount() {
        this.getFishInfo();
    }

    getFishInfo() {
        console.log("Starting fish info call");
        var self = this;
        fetch("/loadfish",
            {
                method: "POST",
                credentials: "same-origin"
            }
        ).then(function(response) {
            if (response.status !== 200) {
                console.log("Error " +
                response.status);
                return;
            }

            response.json().then(function(json) {
                self.setState({
                    hooks: json.data.hooks
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
                fishlist[fishI] = <div className="fish-card" key={"fish" + fishI + "row" + rowI}>{this.state.hooks[rowI][fishI]}</div>
            }
            collection[rowI] = <div className="fish-row" key={"fish-row" + rowI}>{fishlist}</div>
        }

        return(
            <div id="fish-page" className="top-parent">
                <div className="fish-collection" >
                    {collection}
                </div>
            </div>
        )
    }
}
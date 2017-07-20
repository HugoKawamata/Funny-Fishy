import React from "react";

export default class Fish extends React.Component {

    constructor() {
        super();
        this.state = {
        }
    }
    
    render() {
        var collection;
        for (var i = 0; i < 6; i++) {
            // add row of fish to "collection" for each hook before corrupt hooks // 6?
        }

        return(
            <div id="fish-page" className="top-parent">
                <div className="fish-collection" >
                </div>
            </div>
        )
    }
}
import React from "react";

export default class FishRender extends React.Component {

    constructor() {
        super();
    }

    render() {
        var collection = [];
        for (let rowI = 0; rowI < this.props.hooks.length; rowI++) {
            // Get number of fish in the row (cause cosmic rare fish aren't automatically revealed)
            var numFishInRow = this.props.hooks[rowI][6] == 0 ? 6 : 7;
            // Which fish are on the right side?
            var rightSideFish = [];
            var minWidth = 80 * numFishInRow;
            if (this.props.width >= minWidth) {
                // All fish fit in screen
                rightSideFish[0] = numFishInRow - 3;
                rightSideFish[1] = numFishInRow - 2;
                rightSideFish[2] = numFishInRow - 1; // Minus 1 because indexes begin at 0
            } else {
                // There are two or more rows of flex wrapping fish

                if (Math.floor(this.props.width / 80) == 5) { // 5 fish on top row
                    rightSideFish[0] = 3;
                    rightSideFish[1] = 4;
                } else if (Math.floor(this.props.width / 80) == 4) { // 4 fish on top row
                    rightSideFish[0] = 2;
                    rightSideFish[1] = 3;
                    rightSideFish[2] = numFishInRow - 1;
                } else if (Math.floor(this.props.width / 80) == 3) { // 3 fish on top row, 3 fish bottom row
                    rightSideFish[0] = 2;
                    rightSideFish[1] = 5;
                }

                // Don't worry if there are 3 rows of fish because the screen has to be
                // ridiculously narrow for that to happen.
            }
            // add row of fish to "collection" for each hook before corrupt hooks // 6?
            var fishlist = [];
            var rightFishIndex = 0;
            for (let fishI = 0; fishI < this.props.hooks[rowI].length; fishI++) {
                var fishDescClass = "fish-desc"
                if (rightSideFish[rightFishIndex] === fishI) {
                    fishDescClass = "fish-desc fish-desc-right";
                    rightFishIndex += 1;
                }
                if (fishI == 6 && this.props.hooks[rowI][fishI] == 0) {
                    // Nothing, because only reveal cosmic rare fish to people who have them already
                } else {
                    fishlist[fishI] = (
                        <div className="fish-card" key={"fish" + fishI + "row" + rowI}>
                            <div className="fish-number">
                                {this.props.hooks[rowI][fishI]}
                            </div>
                            <img 
                                className="fish-image"
                                src={"static/images/fish/r" + rowI + "-f" + fishI + "-" + (this.props.hooks[rowI][fishI] == 0 ? "0" : "1") + ".png"}
                                alt={"Hook " + rowI + ", Fish " + fishI}
                                key={"Hook " + rowI + ", Fish " + fishI}
                            />
                            <div className={fishDescClass} >
                                {this.props.hookdesc[rowI][fishI]}
                            </div>
                        </div>
                    )
                }
            }
            collection[rowI] = <div className="fish-section" key={"fish-section" + rowI}>
                    <div className="fish-row" key={"fish-row" + rowI}>{fishlist}</div>
                    <div 
                        className={"hook button hook" + rowI + " " + (this.props.totalg > this.props.hookprices[rowI] ? "" : "hook-inactive")}
                        key={"hook" + rowI}
                        onClick={() => this.props.buyHook(rowI)}>Buy hook {rowI}: {this.props.addCommas(this.props.hookprices[rowI])}g
                    </div>
                </div>
        }

        return(
            <div id="fish-page" className="top-parent">
                <div className="totalg">Total Gold:<br />{this.props.addCommas(this.props.totalg)}</div>
                <div className="fish-collection" >
                    {collection}
                </div>
            </div>
        )
    }
}
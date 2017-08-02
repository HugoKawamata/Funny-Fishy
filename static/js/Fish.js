import React from "react";

export default class Fish extends React.Component {

    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0,
            hooks: [],
            totalg: 0,
            hookprices: [],
            hookdesc: []
        }
        this.getFishInfo = this.getFishInfo.bind(this)
        this.buyHook = this.buyHook.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.loadFishDescriptions = this.loadFishDescriptions.bind(this)
    }

    loadFishDescriptions() {
        let hook0 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +1</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +1</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +2</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>,
            <div>The Old Tome<br/>Cosmic<br/>Increase multiplier by 40!!!</div>
        ];
        let hook1 = [ // River hook - Regular looking hook with lure, maybe blue metal?
            <div>Toadfish<br/>Common<br/>Die Max +3, Cooldown +2s</div>,
            <div>Catfish<br/>Common<br/>Die Max +3, Cooldown +2s</div>,
            <div>Mangrove Jack<br/>Common<br/>Die Max +4, Cooldown +2s</div>,
            <div>Barramundi<br/>Uncommon<br/>Die Max +1 for each common river hook fish you own, Cooldown +3s</div>,
            <div>Mud Crab<br/>Uncommon<br/>Die Min +1, Cooldown -3s</div>,
            <div>Crocodile<br/>Rare<br/>Die Max +8, Cooldown -5s</div>, // Holy shit, you got a crocodile??
            <div>Scaled Monstrosity<br/>Cosmic<br/>Die Max +500!</div> // UHHHHHHHH
        ];
        let hook2 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +1</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +1</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +2</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>
        ];
        let hook3 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +1</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +1</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +2</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>
        ];
        let hook4 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +1</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +1</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +2</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>
        ];
        let hook5 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +1</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +1</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +2</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>
        ];
        let hook6 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +1</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +1</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +2</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>
        ];
        var descriptions = [];
        descriptions[0] = hook0;
        descriptions[1] = hook1;
        descriptions[2] = hook2;
        descriptions[3] = hook3;
        descriptions[4] = hook4;
        descriptions[5] = hook5;
        descriptions[6] = hook6;
        this.setState({hookdesc: descriptions})
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    /*
     * Get initial render information
     */
    componentDidMount() {
        this.updateWindowDimensions()
        window.addEventListener('resize', this.updateWindowDimensions);
        this.getFishInfo();
        this.loadFishDescriptions();
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
                    totalg: json.data.totalg,
                    hookprices: json.data.hookprices
                })
            })
        })
    }

    /*
     * Gets the hook values (the fish the user has obtained)
     * as well as the user's gold in order to display it.
     */
    getFishInfo() {
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
                    totalg: json.data.totalg,
                    hookprices: json.data.hookprices
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
        for (let rowI = 0; rowI < this.state.hooks.length; rowI++) {
            // Get number of fish in the row (cause cosmic rare fish aren't automatically revealed)
            var numFishInRow = this.state.hooks[rowI][6] == 0 ? 6 : 7;
            // Which fish are on the right side?
            var rightSideFish = [];
            var minWidth = 80 * numFishInRow;
            if (this.state.width >= minWidth) {
                // All fish fit in screen
                rightSideFish[0] = numFishInRow - 3;
                rightSideFish[1] = numFishInRow - 2;
                rightSideFish[2] = numFishInRow - 1; // Minus 1 because indexes begin at 0
            } else {
                // There are two or more rows of flex wrapping fish

                if (Math.floor(this.state.width / 80) == 5) { // 5 fish on top row
                    rightSideFish[0] = 3;
                    rightSideFish[1] = 4;
                } else if (Math.floor(this.state.width / 80) == 4) { // 4 fish on top row
                    rightSideFish[0] = 2;
                    rightSideFish[1] = 3;
                    rightSideFish[2] = numFishInRow - 1;
                } else if (Math.floor(this.state.width / 80) == 3) { // 3 fish on top row, 3 fish bottom row
                    rightSideFish[0] = 2;
                    rightSideFish[1] = 5;
                }

                // Don't worry if there are 3 rows of fish because the screen has to be
                // ridiculously narrow for that to happen.
            }
            // add row of fish to "collection" for each hook before corrupt hooks // 6?
            var fishlist = [];
            var rightFishIndex = 0;
            for (let fishI = 0; fishI < this.state.hooks[rowI].length; fishI++) {
                var fishDescClass = "fish-desc"
                if (rightSideFish[rightFishIndex] === fishI) {
                    fishDescClass = "fish-desc fish-desc-right";
                    rightFishIndex += 1;
                }
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
                            <div className={fishDescClass} >
                                {this.state.hookdesc[rowI][fishI]}
                            </div>
                        </div>
                    )
                }
            }
            collection[rowI] = <div className="fish-section" key={"fish-section" + rowI}>
                    <div className="fish-row" key={"fish-row" + rowI}>{fishlist}</div>
                    <div 
                        className={"hook button hook" + rowI + " " + (this.state.totalg > this.state.hookprices[rowI] ? "" : "hook-inactive")}
                        key={"hook" + rowI}
                        onClick={() => this.buyHook(rowI)}>Buy hook {rowI}: {this.props.addCommas(this.state.hookprices[rowI])}g
                    </div>
                </div>
        }

        return(
            <div id="fish-page" className="top-parent">
                <div className="totalg">Total Gold:<br />{this.props.addCommas(this.state.totalg)}</div>
                <div className="fish-collection" >
                    {collection}
                </div>
            </div>
        )
    }
}
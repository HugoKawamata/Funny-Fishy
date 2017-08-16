import React from "react";
import FishRender from "./FishRender"

export default class Fish extends React.Component {

    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0,
            hooks: [
                /*
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                */
            ],
            totalg: 0,
            hookprices: [],
            hookdesc: [
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0],
            ],
        }
        this.getFishInfo = this.getFishInfo.bind(this)
        this.buyHook = this.buyHook.bind(this)
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.loadFishDescriptions = this.loadFishDescriptions.bind(this)
    }

    loadFishDescriptions() {
        let hook0 = [ // Plastic hook - looks like baby toy
            <div>Clown Fish<br/>Common<br/>Multiplier +0.25</div>,
            <div>Baby Fish<br/>Common<br/>Die Max +4</div>, // They grow up so fast
            <div>Angel Fish<br/>Common<br/>Die Min +4</div>,
            <div>Fish of Paradise<br/>Uncommon<br/>Multiplier +1, Cooldown +1s</div>,
            <div>Fish Avenger<br/>Uncommon<br/>Die Max +10</div>,
            <div>Funny Fish<br/>Rare<br/>If you roll your die min, change it to your die max!</div>,
            <div>The Old Tome<br/>Cosmic<br/><em>You reel up, and dangling from your hook is a strange tome with inscriptions in an unknown language.</em><br/>Multiplier +20!</div>
        ];
        let hook1 = [ // River hook - Regular looking hook with lure, maybe blue metal?
            <div>Toadfish<br/>Common<br/>Die Max +7</div>,
            <div>Catfish<br/>Common<br/>Die Max +7</div>,
            <div>Mangrove Jack<br/>Common<br/>Die Max +12, Cooldown +1s</div>,
            <div>Barramundi<br/>Uncommon<br/>Die Max +2 for each common river hook fish you own, Cooldown +1s</div>,
            <div>Mud Crab<br/>Uncommon<br/>Die Min +10, Cooldown -3s</div>,
            <div>Crocodile<br/>Rare<br/>
                <em>{this.state.hooks[1][5] == 0 ?
                    "Don't worry, there aren't any stingrays around." :
                    "She's a BEAUT!"
                    }
                </em><br/>
                Max +15, Cooldown -5s
            </div>, 
            <div>Scaled Monstrosity<br/>Cosmic<br/><em>The line breaks. An enormous reptilian monster <strong>erupts</strong>, raging, out of the water and onto your boat. Exposed to the air, it expires in seconds.</em><br/>Die Max +200!</div> // UHHHHHHHH
        ];
        let hook2 = [ // Coral Hook - Looks like it made of coral yeet
            <div>Butterfly Fish<br/>Common<br/>Die Min +14</div>,
            <div>Parrotfish<br/>Common<br/>Multiplier +2, Cooldown +1s</div>, 
            <div>Coral Trout<br/>Common<br/>Multiplier +1</div>,
            <div>Box Jelly<br/>Uncommon<br/>Multiplier +4, Cooldown +3s</div>, 
            <div>Nurse Shark<br/>Uncommon<br/>Die Min +13, Die Max +13</div>,
            <div>Crown of Thorns<br/>Rare<br/>Multiplier +X, where X is the number of Crown of Thorns you own.</div>,
            <div>Crown of the Deep<br/>Cosmic<br/>
                <em>
                    The boat rocks. Giant, pulsing starfish arms grab hold of the boat from all sides, their barbs anchoring them deep into the hull. The arms harden into a pitch black stone. There's no getting them off.
                </em><br/>
                Cooldown -20s
            </div> // Terrifying looking starfish monster
        ];
        let hook3 = [ // Night Hook - stars in the night sky
            <div>Mystic Dragonet<br/>Common<br/>Die Min +20</div>,
            <div>Bluefin Tuna<br/>Common<br/>Die Max +20</div>, // They grow up so fast
            <div>Treasure Eel<br/>Common<br/>When you catch a Treasure Eel, triple your current gold.</div>,
            <div>Great White Shark<br/>Uncommon<br/>Multiplier +5, Cooldown +3s</div>,
            <div>Marlin<br/>Uncommon<br/>Multipler +10, Cooldown +6s</div>,
            <div>Nightfish<br/>Rare<br/>
                <em>{this.state.hooks[3][5] == 0 ? 
                "You've heard whispers of the elusive Nightfish, and rumours that its slick, black skin can never truly be touched by human hands." :
                "The Nightfish slips and slides out of your grasp, but its body bumps against your Die in the commotion. The Die glows with dark energy."
                }</em><br/>
                {this.state.hooks[3][5] == 0 ? 
                "" : 
                "Multiplier +2, Die Min + 10, Die Max +10, Cooldown -2s"}
                </div>,
            <div>A Shift In the Eventide<br/>Cosmic<br/>You feel a pull to the water, as if a dark tide has washed over your soul and is dragging you into the brackish deep.</div>
            // The above cosmic catch should increase the chance of other cosmic catches.
        ];
        let hook4 = [ // 
            <div><br/>Common<br/>Multiplier +0.25</div>,
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
                }, function(){
                    self.loadFishDescriptions();
                });
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

        return(
            <FishRender
                width={this.state.width}
                height={this.state.height}
                hooks={this.state.hooks}
                totalg={this.state.totalg}
                hookprices={this.state.hookprices}
                hookdesc={this.state.hookdesc}
                addCommas={this.props.addCommas}
                buyHook={(hooknum) => this.buyHook(hooknum)}
            />
        )
    }
}
import React from "react";
import "whatwg-fetch";

export default class Die extends React.Component {

    roll() {
        fetch("/rolldie",
        {
            method: "GET",
            credentials: 'same-origin'
        }
    ).then(function(response) {
            if (response.status !== 200) {  
                console.log('Error ' +  
                response.status);  
                return;  
            }

            // Examine the text in the response  
            response.json().then(function(data) {  
                console.log(data);  
            });
        })
    }

    render() {
        return(
            <div id="die-page" className="top-parent">
                <div className="die" onClick={() => this.roll()}>meme</div>
            </div>
        )
    }
}
// ==UserScript==
// @name         Shopping Game Helper
// @version      0.2
// @description  You have to do first game by yourself
// @author       CTAK_CO6AK
// @match        https://www.msn.com/*/shopping
// @icon         https://www.google.com/s2/favicons?sz=64&domain=msn.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const { fetch: originalFetch } = window;
    function clearOutlines() {
        for(let i=1;i<4;i++) {
            document.querySelector("#root > div > div > fluent-design-system-provider > div > div:nth-child(4) > div > shopping-page-base").shadowRoot
                .querySelector("div > div.shopping-page-content > shopping-homepage").shadowRoot
                .querySelector("div > msft-feed-layout").shadowRoot
                .querySelector("msn-shopping-game-pane").shadowRoot
                .querySelector(`div.shopping-game-pane-container > msft-stripe > div:nth-child(${i})`).style.outline = "";
        }
    }
    function applyOutline(aboba) {
        if(aboba == 0) return;
        document.querySelector("#root > div > div > fluent-design-system-provider > div > div:nth-child(4) > div > shopping-page-base").shadowRoot
                .querySelector("div > div.shopping-page-content > shopping-homepage").shadowRoot
                .querySelector("div > msft-feed-layout").shadowRoot
                .querySelector("msn-shopping-game-pane").shadowRoot
                .querySelector(`div.shopping-game-pane-container > msft-stripe > div:nth-child(${aboba})`).style.outline = "6px solid green";
    }
    let game = 0;
    let index = 0;

    window.fetch = async (...args) => {
        let [resource, config] = args;

        let response = await originalFetch(resource, config);

        const json = () => response.clone().json().then((data) => (data));

        let resp = await json();

        setTimeout(() => {
            
            let bebra = JSON.parse(resp[0].data);
            if(Array.isArray(bebra) && bebra.length == 4) {
                clearOutlines();
                let minPrice = parseFloat(bebra[0].priceInfo.price.slice(1), 10);
                let minIndex = 1;
                for(var i=0;i<3;i++){
                    let price = parseFloat(bebra[i].priceInfo.price.slice(1), 10);
                    //console.log(`[${i}] - ${price}`);
                    if(price < minPrice){
                        minPrice = price;
                        minIndex = i+1;
                    }
                }
                //console.log(`Min: ${minPrice}`);
                document.title = `Game #${game}, press ${index}`;
                applyOutline(index);
                index = minIndex;
                game++;
        }},100);

        response.json = json;
        return response;
    };

})();

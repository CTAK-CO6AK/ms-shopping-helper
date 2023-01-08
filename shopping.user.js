// ==UserScript==
// @name         Shopping Game Helper
// @version      1.0
// @description  You DO NOT have to do first game by yourself now!
// @downloadURL  https://github.com/CTAK-CO6AK/ms-shopping-helper/raw/main/shopping.user.js
// @updateURL    https://github.com/CTAK-CO6AK/ms-shopping-helper/raw/main/shopping.user.js
// @author       CTAK_CO6AK
// @match        https://www.msn.com/*/shopping
// @icon         https://www.google.com/s2/favicons?sz=64&domain=msn.com
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function() {
    'use strict';
    const { fetch: originalFetch } = window;
    function getCard(i) {
        return document.querySelector("#root > div > div > fluent-design-system-provider > div > div:nth-child(4) > div > shopping-page-base").shadowRoot
                .querySelector("div > div.shopping-page-content > shopping-homepage").shadowRoot
                .querySelector("div > msft-feed-layout").shadowRoot
                .querySelector("msn-shopping-game-pane").shadowRoot
                .querySelector(`div.shopping-game-pane-container > msft-stripe > div:nth-child(${i})`);
    }
    function clearOutlines() {
        for(let i=1;i<4;i++) {
            getCard(i).style.outline = "";
        }
    }
    function applyOutline(i) {
        if(aboba == 0) return;
        clearOutlines();
        getCard(i).style.outline = "6px solid green";
    }
    let game = 0;
    let index = 0;
    window.fetch = async (...args) => {
        let [resource, config] = args;
        let response = await originalFetch(resource, config);
        const json = () => response.clone().json().then((data) => (data));
        let resp = await json();

        setTimeout(() => {
            let data = resp[0]?.data;
            if(data == undefined) return;
            let bebra = JSON.parse(data);
            if(bebra.shoppingGamesDeals != undefined) 
                bebra = bebra.shoppingGamesDeals; //extracting game deals from big response

            if(Array.isArray(bebra) && bebra.length == 4) {
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

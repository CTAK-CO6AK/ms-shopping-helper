// ==UserScript==
// @name         Shopping Game Helper
// @version      0.1
// @description  You have to do first game by yourself
// @author       CTAK_CO6AK
// @match        https://www.msn.com/*/shopping
// @icon         https://www.google.com/s2/favicons?sz=64&domain=msn.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const { fetch: originalFetch } = window;
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
            index = minIndex;
            game++;
        }
                         },100);

        response.json = json;
        return response;
    };

})();

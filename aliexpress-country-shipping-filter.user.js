// ==UserScript==
// @name         AliExpress country shipping filter
// @namespace    pk-scripts
// @version      0.5
// @description  try to take over the AliExpress!
// @author       pKajan
// @match        *://*.aliexpress.com/*SearchText=*
// @match        *://*.aliexpress.com/w/*
// @match        *://*.aliexpress.com/category/*
// @match        *://*.aliexpress.com/*/category/*
// @icon         https://www.google.com/s2/favicons?domain=aliexpress.com
// @grant        window.onurlchange
// @downloadURL  https://github.com/pkajan/AliExpress-country-shipping-filter/raw/main/aliexpress-country-shipping-filter.user.js
// @updateURL    https://github.com/pkajan/AliExpress-country-shipping-filter/raw/main/aliexpress-country-shipping-filter.user.js
// ==/UserScript==

(function () {
    'use strict';
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    var countriesAssociative = { 'Poland': 'PL', 'France': 'FR', 'Czech': 'CZ', 'Spain': 'ES', 'Italy': 'IT', 'Germany': 'DE', 'Belgium': 'BE', 'United Kingdom': 'UK', 'China': 'CN' };
    var countries = document.createElement("div");

    var innerContent = "";
    var divStyle = "background-color: #544f4e; color: #FFFFFF;   position:fixed;    top:0;    width:auto;    z-index:100;";
    var aStyle = "color: #ff5733;";
    var bStyle = "color: #dbeb34; font-weight: bold;";

    Object.keys(countriesAssociative).forEach(function (key) {
        var style = aStyle;
        if (window.location.href.includes("shipFromCountry=" + countriesAssociative[key])) {
            console.log("DEPO changed to " + key);
            style = bStyle;
        }
        innerContent += "|<a style=\"" + style + "\" href=\"javascript:(function(){ document.cookie = 'customDEPO=" + countriesAssociative[key] + "'; var urlParams = new URLSearchParams(window.location.search);urlParams.set('shipFromCountry', '" + countriesAssociative[key] + "');window.location.search = urlParams; })();\"> " + key + " </a>|";
    });

    //combined delivery
    var CDYES = "<a href=\"javascript:(function(){ document.cookie = 'CombinedDeliverySelect=n';var urlParams2 = new URLSearchParams(window.location.search);urlParams2.set('isCombinedDelivery', 'n');window.location.search = urlParams2; })()\">YES</a>";
    var CDNO = "<a href=\"javascript:(function(){ document.cookie = 'CombinedDeliverySelect=y';var urlParams2 = new URLSearchParams(window.location.search);urlParams2.set('isCombinedDelivery', 'y');window.location.search = urlParams2; })()\">NO</a>";
    var CDSelected = (new URLSearchParams(window.location.search).get("isCombinedDelivery") == "y") ? CDYES : CDNO;
    innerContent += "<br>Combined Delivery " + CDSelected;
    countries.innerHTML = "<span style='" + divStyle + "'>Ship from " + innerContent + "</span>";
    document.body.appendChild(countries);
    ///////////////////////////////////////////////////////////////////////
    /* on url change -> 2nd, 3rd..... Xth page */
    if (window.onurlchange === null) { // feature is supported
        window.addEventListener('urlchange', (info) => {
            console.log(info.url);
            var urlParams = new URLSearchParams(window.location.search);
            urlParams.set('shipFromCountry', getCookie("customDEPO"));
            urlParams.set('isCombinedDelivery', getCookie("CombinedDeliverySelect"));
            window.location.search = urlParams;
            console.log("DEPO change to " + getCookie("customDEPO"));
        });
    }
})();

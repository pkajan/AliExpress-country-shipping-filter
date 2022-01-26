// ==UserScript==
// @name         AliExpress country shipping filter
// @namespace    pk-scripts
// @version      0.2
// @description  try to take over the AliExpress!
// @author       pKajan
// @match        *://*.aliexpress.com/*SearchText=*
// @match        *://*.aliexpress.com/w/*
// @match        *://*.aliexpress.com/category/*
// @match        *://*.aliexpress.com/*/category/*
// @icon         https://www.google.com/s2/favicons?domain=aliexpress.com
// @grant        window.onurlchange
// ==/UserScript==

(function() {
    'use strict';
    function getCookie(cname) {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for(let i = 0; i <ca.length; i++) {
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

    var countriesAssociative = { 'Poland': 'PL', 'France': 'FR', 'Czech': 'CZ', 'Spain': 'ES', 'Italy': 'IT', 'Germany': 'DE', 'Belgium': 'BE', 'United Kingdom': 'UK' };
    var countries = document.createElement("div");

    var innerContent = "";
    var divStyle = "background-color: #544f4e; color: #FFFFFF;   position:fixed;    top:0;    width:auto;    z-index:100;";
    var aStyle = "color: #ff5733;";
    var bStyle = "color: #dbeb34; font-weight: bold;";

    Object.keys(countriesAssociative).forEach(function(key) {
        var style = aStyle;
        if (window.location.href.includes("shipFromCountry=" + countriesAssociative[key])) {
            console.log("DEPO changed to " + key);
            style = bStyle;
        }
        innerContent += "|<a style=\"" + style + "\" href=\"javascript:(function(){ document.cookie = 'customDEPO=" + countriesAssociative[key] + "'; var urlParams = new URLSearchParams(window.location.search);urlParams.set('shipFromCountry', '" + countriesAssociative[key] + "');window.location.search = urlParams; })();\"> " + key + " </a>|";
    });

    countries.innerHTML = "<span style='" + divStyle + "'>Ship from " + innerContent + "</span>";
    document.body.appendChild(countries);

    ///////////////////////////////////////////////////////////////////////
    /* on url change -> 2nd, 3rd..... Xth page */
    if (window.onurlchange === null) { // feature is supported
        window.addEventListener('urlchange', (info) => {
            console.log(info.url);
            var urlParams = new URLSearchParams(window.location.search);
            urlParams.set('shipFromCountry', getCookie("customDEPO"));
            window.location.search = urlParams;
            console.log("DEPO change to " + getCookie("customDEPO"));
        });
    }
})();

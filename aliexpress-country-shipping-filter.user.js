// ==UserScript==
// @name         AliExpress country shipping filter
// @namespace    pk-scripts
// @version      0.1
// @description  try to take over the AliExpress!
// @author       pKajan
// @match        *://*.aliexpress.com/*SearchText=*
// @match        *://*.aliexpress.com/w/*
// @match        *://*.aliexpress.com/category/*
// @icon         https://www.google.com/s2/favicons?domain=aliexpress.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var countriesAssociative = { 'Poland': 'PL', 'France': 'FR', 'Czech': 'CZ', 'Spain': 'ES', 'Italy': 'IT', 'Germany': 'DE', 'Belgium': 'BE', 'United Kingdom': 'UK' };
    var countries = document.createElement("div");

    var innerContent = "";
    var divStyle = "background-color: #544f4e; color: #FFFFFF;   position:fixed;    top:0;    width:auto;    z-index:100;";
    var aStyle = "color: #ff5733;";
    var bStyle = "color: #dbeb34; font-weight: bold;";

    Object.keys(countriesAssociative).forEach(function(key) {
        var style = aStyle;
        if (window.location.href.includes("shipFromCountry=" + countriesAssociative[key])) {
            console.log("frantici utocia na " + key);
            style = bStyle;
        }
        innerContent += "|<a style=\"" + style + "\" href=\"javascript:(function(){ const urlParams = new URLSearchParams(window.location.search);urlParams.set('shipFromCountry', '" + countriesAssociative[key] + "');window.location.search = urlParams; })();\"> " + key + " </a>|";
        console.log(key);
    });


    countries.innerHTML = "<span style='" + divStyle + "'>Ship from " + innerContent + "</span>";
    document.body.appendChild(countries);


    Object.keys(countriesAssociative).forEach(function(key) {
        if (window.location.href.includes("shipFromCountry=" + countriesAssociative[key])) {
            console.log("frantici utocia na " + key);
        }
    });
})();

// ==UserScript==
// @name         Amazon Recommendation Remover
// @description  Marks all items as *Don't use for recommendations* on the Improve Your Recommendations page
// @author       ᴉʞuǝ
// @namespace    https://github.com/enki-code
// @match        https://www.amazon.com/gp/yourstore/*
// @grant        none
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
$(function() {
    $("span:contains('use for recommendations')").parent(":not('.s_checkMarked')").trigger("click");
    
    $("#iyrPrev, #iyrNext").click(function() {
        setTimeout(
        $("span:contains('use for recommendations')").parent(":not('.s_checkMarked')").trigger("click"), 300);
    });
});

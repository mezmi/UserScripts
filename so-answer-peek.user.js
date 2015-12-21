// ==UserScript==
// @name         Answer Quick Peek
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @match        https://stackoverflow.com/questions/*
// @grant        none
// @run-at document-end
// ==/UserScript==

/* jshint -W097 */
'use strict';

$(function () {
    $("#answers div.answer:first").before("<div id='top-answers-peek' style='width: 400px; margin:0 auto;'><table><tr></tr></table></div>");
    $(".answercell:lt(4)").each(function() {
        var href = $(this).find(".post-menu").find(".short-link").attr("href"),
            score = $(this).prev().find(".vote-count-post").text();
        
        $("#top-answers-peek table tr").append("<td style='width: 100px; text-align: center;'><a href=" + href + "><i class='vote-up-on'></i> Score: " + score + "</a></td>");
        
    });
});

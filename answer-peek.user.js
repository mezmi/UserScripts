// ==UserScript==
// @name         Answer Quick Peek
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @match        *://*.stackexchange.com/questions/*
// @match        *://*.stackoverflow.com/questions/*
// @match        *://*.superuser.com/questions/*
// @match        *://*.serverfault.com/questions/*
// @match        *://*.askubuntu.com/questions/*
// @match        *://*.stackapps.com/questions/*
// @match        *://*.mathoverflow.net/questions/*
// @grant        none
// @run-at document-end
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(function () {
    var count = 0;
    $("#answers div.answer:first").before("<div id='top-answers-peek' style='padding-bottom: 10px; border-bottom: 1px solid #eaebec; display: none;'><table style='margin:0 auto; '><tr></tr></table></div>");

    function score(e) {
      return new Number($(e).parent().find('.vote-count-post').text());
    }
    function compareByScore(a, b) {
      return score(b) - score(a);
    }
    $(":not(.deleted-answer) .answercell").slice(1).sort(compareByScore).slice(0, 5).each(function() {
        count++;
        var id = $(this).find(".short-link").attr("id").replace('link-post-', ''),
            score = $(this).prev().find(".vote-count-post").text(),
            icon = "vote-up-off";

        if (score > 0) {icon = "vote-up-on";}
        if (score < 0) {icon = "vote-down-on";}

        $("#top-answers-peek table tr").append("<td style='width: 100px; text-align: center;'><a href='#" + id + "'><i class='" + icon + "' style='margin-bottom: 0;'></i> Score: " + score + "</a></td>");
    });
    if (count > 0){
        $("#top-answers-peek").show();
        $("#top-answers-peek table").css("width", count * 100 + "px");
    }
});

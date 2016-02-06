// ==UserScript==
// @name         Flagging Percentages
// @description  Adds flagging percentages when viewing the Flag Summary page.
// @namespace    https://stackoverflow.com/users/1454538/
// @author       ᴉʞuǝ
// @match        *://*.askubuntu.com/users/flag-summary/*
// @match        *://*.mathoverflow.net/users/flag-summary/*
// @match        *://*.serverfault.com/users/flag-summary/*
// @match        *://*.stackapps.com/users/flag-summary/*
// @match        *://*.stackexchange.com/users/flag-summary/*
// @match        *://*.stackoverflow.com/users/flag-summary/*
// @match        *://*.superuser.com/users/flag-summary/*
// @exclude      *://api.stackexchange.com/*
// @exclude      *://blog.stackexchange.com/*
// @exclude      *://blog.stackoverflow.com/*
// @exclude      *://data.stackexchange.com/*
// @exclude      *://elections.stackexchange.com/*
// @exclude      *://stackexchange.com/*
// @run-at       document-end
// ==/UserScript==
/* jshint -W097 */
(function ($) {
    "use strict";
    var group = {
        POST: 1,
        SPAM: 2,
        OFFENSIVE: 3,
        COMMENT: 4
    };
    var type = {
        TOTAL: "flags",
        WAITING: "waiting",
        HELPFUL: "helpful",
        DECLINED: "declined",
        DISPUTED: "disputed",
        AGEDAWAY: "aged away"
    };

    var groupKey,
        typeKey,
        total,
        count,
        percentage;

    function addPercentage(group, type, percentage) {
        var $span = $("<span/>", {
            text: "({0}%)".replace('{0}', percentage),
            style: "margin-left:5px; color: #999; font-size: 12px;"
        });
        $("td > a[href*='group=" + group + "']:contains('" + type + "')").after($span);
    }

    function calculatePercentage(count, total) {
        var percent = (count / total) * 100;
        return +percent.toFixed(2);
    }

    function getFlagCount(group, type) {
        var flagCount = 0;
        flagCount += Number($("td > a[href*='group=" + group + "']:contains('" + type + "')")
            .parent()
            .prev()
            .text()
            .replace(",", ""));
        return flagCount;
    }

    // add percentages
    for (groupKey in group) {
        total = getFlagCount(group[groupKey], type.TOTAL);
        for (typeKey in type) {
            if (typeKey !== "TOTAL") {
                count = getFlagCount(group[groupKey], type[typeKey]);
                percentage = calculatePercentage(count, total);
                //console.log(groupKey + ": " + typeKey + " Flags -- " + count);
                addPercentage(group[groupKey], type[typeKey], percentage);
            }
        }
    }
}(jQuery));

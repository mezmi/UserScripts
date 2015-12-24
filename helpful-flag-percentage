// ==UserScript==
// @name         Helpful Flag Percentage
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @description  Displays the overall percentage of helpful/declined flags & shows total helpful flag count.
// @match        *://*.stackexchange.com/users/flag-summary/*
// @match        *://*.stackoverflow.com/users/flag-summary/*
// @match        *://*.stackapps.com/users/flag-summary/*
// ==/UserScript==
/*jslint browser: true, white: true*/
/*jslint this */
/*global $, jQuery*/
$(function () {
'use strict';
    
    var helpfulFlags = 0;
    $("td > a:contains('helpful')").parent().prev().each(function () {
        helpfulFlags += parseInt($(this).text().replace(",",""));
    });

    var declinedFlags = 0;
    $("td > a:contains('declined')").parent().prev().each(function () {
        declinedFlags += parseInt($(this).text().replace(",",""));
    });
    
    if (helpfulFlags > 0) {

        var percentHelpful = Number(Math.round((helpfulFlags / (helpfulFlags + declinedFlags)) * 100 + 'e2') + 'e-2');

        if (percentHelpful > 100 ) {
            percentHelpful = 100;
        }
        
        var percentColor;
        if(percentHelpful >= 90) {
            percentColor = "limegreen";
        } else if (percentHelpful >= 80) {
            percentColor = "darkorange";
        } else if (percentHelpful < 80) {
            percentColor = "red";
        } 

        var css = "<style>\
                    #progress {\
                        background: #ccc;\
                        height: 10px;\
                        width: 220px;\
                        margin: 6px 10px 10px 0;\
                        padding: 0px;\
                   }\
                    #progress:after {\
                        content: '';\
                        display: block;\
                        background: " + percentColor + ";\
                        width: " + percentHelpful + "%;\
                        height: 100%;\
                    }\
                    #percentHelpful {\
                        margin-bottom: 5px;\
                    }\
                    </style>";
        
        $('head').append(css);
        
        $("#flag-stat-info-table").before("<h3 id='percentHelpful' title='pending, aged away and disputed flags are not counted'><span id='percent'>" + percentHelpful + "%</span> helpful</h3>");
        $("span#percent").css("color", percentColor);
        $("#percentHelpful").after("<div id='progress'></div>");
        $("#flag-stat-info-table tbody").prepend("<tr class=''><td class='col1'>" + helpfulFlags + "</td><td class='col2'><b>total helpful flags</b></td></tr>");
    }
});

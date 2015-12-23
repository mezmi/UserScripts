// ==UserScript==
// @name         Flag Outcome Time
// @description  Appends the time of the flag outcome to the span element
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @match       *://*.stackoverflow.com/users/flag-summary/*
// @run-at document-end
// ==/UserScript==
$(function() {
    $(".flag-outcome").each(function() {
        $(this).append(" – " + $(this).attr("title"));
    });
});

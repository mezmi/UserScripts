// ==UserScript==
// @name         Tag Reposition
// @description  Repositions Tags at top of question in review queue
// @namespace    https://stackoverflow.com/users/1454538/
// @author       ᴉʞuǝ
// @match        *://*.stackoverflow.com/review/*
// @match        *://*.askubuntu.com/review/*
// @match        *://*.mathoverflow.net/review/*
// @match        *://*.serverfault.com/review/*
// @match        *://*.stackapps.com/review/*
// @match        *://*.stackexchange.com/review/*
// @match        *://*.stackoverflow.com/review/*
// @match        *://*.superuser.com/review/*
// @exclude      *://api.stackexchange.com/*
// @exclude      *://blog.stackexchange.com/*
// @exclude      *://blog.stackoverflow.com/*
// @exclude      *://data.stackexchange.com/*
// @exclude      *://elections.stackexchange.com/*
// @exclude      *://stackexchange.com/*
// @run-at       document-end
// ==/UserScript==
$(document).ajaxComplete(function(event, request, settings) {
    if (~settings.url.indexOf('/review/')) {
        repositionTags();
    }
});

function repositionTags() {
    var $taglist = $(".post-taglist").clone(),
        $header = $(".subheader h2:first");

    $taglist.css("clear", "none");
    $header.css({ "line-height": "1.6", 
                 "margin-right": "10px" }).after($taglist);
}

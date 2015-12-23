// ==UserScript==
// @name         Tag Reposition
// @description  Repositions Tags at top of question in review queue
// @namespace    https://stackoverflow.com/users/1454538/
// @author       ᴉʞuǝ
// @match        *://*.stackoverflow.com/review/*
// @run-at document-end
// ==/UserScript==

setTimeout( repositionTags , 600); 
    
function repositionTags() {
    var tagHTML = $("div.post-taglist").prop("outerHTML");
    $("div.post-taglist").remove(); //comment this line if you want to keep the tags at the bottom as well.
    $("div.post-text").before(tagHTML);
}

// polling method from this answer - http://stackoverflow.com/a/18997637/1454538
var fireOnHashChangesToo    = true;
var pageURLCheckTimer       = setInterval (
    function () {
        if (   this.lastPathStr  !== location.pathname
            || this.lastQueryStr !== location.search
            || (fireOnHashChangesToo && this.lastHashStr !== location.hash)
        ) {
            this.lastPathStr  = location.pathname;
            this.lastQueryStr = location.search;
            this.lastHashStr  = location.hash;
            repositionTags();
        }
    }
    , 111
);

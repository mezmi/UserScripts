// ==UserScript==
// @name         Tag Reposition
// @description  Repositions Tags at top of question in review queue
// @namespace    https://stackoverflow.com/users/1454538/
// @author       ᴉʞuǝ
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
(function($) {
    $(document).ajaxComplete(function(event, request, settings) {
        var $taglist;
        if(isReview(settings.url)){
            if(isEditReview(window.location.href)){
                $taglist = $("a.post-tag:first").parent().clone();
                $taglist.css("margin-bottom", "20px");

                var $choices = $("div.diff-choices");
                $choices.css("margin-bottom", "10px").after($taglist);
            } else {
                $taglist = $(".post-taglist").clone()
                $taglist.css("clear", "none");

                var $header = $(".subheader h2:first");
                $header.css({"line-height": "1.6", 
                             "margin-right": "10px"}).after($taglist);
            }

        } 
    });

    function isReview(url){
        return url.indexOf("/review/") === -1 ? false : true;
    }

    function isEditReview(url){
        return url.indexOf("edits") === -1 ? false : true;
    }
}(jQuery));

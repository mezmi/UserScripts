// ==UserScript==
// @name         Views Since Last Visit
// @description  Shows how many views since your last visit *ON YOUR OWN POSTS*
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @match        *://*.stackexchange.com/questions/*
// @match        *://*.stackoverflow.com/questions/*
// @match        *://*.superuser.com/questions/*
// @match        *://*.serverfault.com/questions/*
// @match        *://*.askubuntu.com/questions/*
// @match        *://*.stackapps.com/questions/*
// @match        *://*.mathoverflow.net/questions/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at document-end
// ==/UserScript==
/* jshint -W097 */
'use strict';
var postid = $("input[name='_id_']:first").val(),
    ownerid = $(".user-info div:contains('asked')").parent().find(".user-details").find("a").attr("href").split("/")[2],
    myid = $("a.profile-me").attr("href").split("/")[2],
    $views = $("#qinfo tr td p:contains('times')"),
    count = $views.text().replace(" times", ""),
    lastcount = GM_getValue(postid, count);

if(ownerid == myid){
    GM_setValue(postid, count);
    $views.text($views.text() + " / " + (count - lastcount));
}

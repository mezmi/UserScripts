// ==UserScript==
// @name         StackOverflow Post Reminder
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @match        *://stackoverflow.com/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @require      
// @run-at document-end
// ==/UserScript==

var reminders = {};

$(function () {
    Reminders.Load();

    // listen for changes on the
    GM_addValueChangeListener("reminders", function () {
        // reload reminders
        console.log("reminder data has changed, updating reminder list now...")
        Reminders.Load();
    });

    var postId = "1234",
        postUrl = "example.com/posts/1234",
        postTitle = "Post 1234",
        siteName = "example.com",
        reminderDate = "12/25/2015",
        reminderId = postId + siteName;

    var rem = new Reminder(reminderId, postId, postUrl, postTitle, siteName, reminderDate);


    Reminders.Add(rem);
    Reminders.Save();

    //make sure the reminder was added
    alert(reminders[reminderId].postTitle);

});


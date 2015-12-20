// ==UserScript==
// @name         StackOverflow Post Reminder
// @namespace    https://stackoverflow.com/users/1454538/
// @author       enki
// @match        *://*.stackexchange.com/*
// @match        *://*.stackoverflow.com/*
// @match        *://*.superuser.com/*
// @match        *://*.serverfault.com/*
// @match        *://*.askubuntu.com/*
// @match        *://*.stackapps.com/*
// @match        *://*.mathoverflow.net/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_addValueChangeListener
// @grant        GM_removeValueChangeListener
// @require      https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @require      https://rawgit.com/enki-code/UserScripts/master/reminders.js
// @run-at document-end
// ==/UserScript==

var reminders = {},
    sitename = window.location.hostname,
    title = $("#question-header h1 a").text();

$(function () {
    $("head").append("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'>");
    $("head").append("<link rel='stylesheet' href='https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css'>");
    
    $("div.network-items").append("<a id='reminders'\
                                      class='topbar-icon'\
                                      style='background-image: none; padding: 10px 0 0 10px; font-size: 12px; color: #999;'\
                                      title='Post Reminders'>\
                                          <i class=' fa fa-calendar-o'></i>\
                                      </a> '");

    $(".js-topbar-dialog-corral").append("<div id='reminder-dialog' class='topbar-dialog inbox-dialog dno' style='top: 34px; left: 236px; width: 377px; display: block; display:none;'>\
                                              <div class='header'>\
                                                  <h3>post reminders</h3>\
                                              </div>\
                                              <div class='modal-content'>\
                                                  <ul id='reminderlist'>\
                                                  </ul>\
                                              </div>\
                                          </div>");
    
    Reminders.Load();
    Notify();
    //Reminders.Clear();
    //Reminders.Save();

     // listen for changes (added or deleted reminders)
    GM_addValueChangeListener("reminders", function () {
        console.log("reminder data has changed, updating reminder list now...")
        Reminders.Load();
        Notify();
    });

    
    $(".vote").each(function(){
        var postId = $(this).find("input[name='_id_']").val();
        var reminderId = postId + sitename;

        $(this).append("<a class='reminder'\
                           title='Remind me of this post'\
                           style='color: #999; padding-left:1px;'>\
                                <i class='fa fa-calendar-plus-o fa-2x' style='padding-top:5px;'></i>\
                        </a>\
                        <input type='text' class='datepicker' data-reminderid='" + reminderId + "' style='display:none;'>")
               .on('click', '.vote a.reminder', function (e) {
                   $(this).next().show().focus().hide();            
               });
    });
    
    $(".datepicker").datepicker({
        minDate: 0,
        onSelect: function (dateText, inst) {
            var postId = $(this).data("postid"),
                postUrl = $(this).closest("tr").find(".post-menu").find(".short-link").attr("href"),
                reminderId = $(this).data("reminderid"),
                reminderDate = new Date($(this).val()),
                calendar = $(this).prev();

            var rem = new Reminder(reminderId, postId, postUrl, title, sitename, reminderDate.getTime());

            Reminders.Add(rem);
            Reminders.Save();

            highlightCalendar(calendar, reminderDate);

            //make sure the reminder was added
            console.log("Reminder Added: " + reminders[reminderId].postTitle);
            
            

        },
        beforeShow: function (input, instance) {
            //var offset = $("#reminder").offset();
            instance.dpDiv.css({
                marginTop: '-35px',
                marginLeft: '10px'
            });
        }
    });
    
    $("#reminders").click(function () {
        $("#reminder-dialog").toggle();
    });

    $('#reminderlist li a').click(function (e) {
        e.preventDefault();
        var id = $(this).data("reminderid");

        Reminders.Remove(id);
        Reminders.Save();
        
        $(this).remove();
        $("#reminder-dialog").hide();
        window.open($(this).attr('href'), '_blank');
    });
    
});

function highlightCalendar(calendar, reminderDate) {
    $(calendar).css("color", "dodgerblue").attr("title", "This post has a reminder set for " + reminderDate.toDateString());
}


function Notify() {
    $("#reminders").css("color", "#999");
    $("#reminderlist").empty();
    $.each(reminders, function (id, val) {
        var time = reminders[id].reminderDate;
        var currentTime = new Date().getTime();

        console.log("Reminder: " + reminders[id].postTitle +
                   "\nReminder Time: " + time +
                   "\nCurrent Time: " + currentTime);
        
        if (new Date().getTime() > time) {
            var reminderDate = new Date(reminders[id].reminderDate).toDateString();
            $("#reminders").css("color", "dodgerblue");
            
            $("#reminderlist").append("<li class='inbox-item '>\
                                           <a href='https://" + reminders[id].siteName + reminders[id].postUrl + "' data-reminderid='" + id + "'>\
                                               <div class='site-icon fa fa-calendar-o' title='Post Reminder'></div>\
                                               <div class='item-content'>\
                                                   <div class='item-header'>\
                                                       <span class='item-type'>Reminder</span>\
                                                       <span class='item-creation'><span title='" + reminderDate + "'>" + reminderDate + "</span></span>\
                                                   </div>\
                                                   <div class='item-location'>" + reminders[id].postTitle + "</div>\
                                                   <div class='item-summary'>" + reminders[id].siteName + "</div>\
                                               </div>\
                                           </a>\
                                         </li>");
            
            console.log("This is a Post Reminder for:" +
                  "\nTitle: " + reminders[id].postTitle +
                  "\nReminder ID: " + reminders[id].reminderId +
                  "\nPost Url: " + reminders[id].siteName + reminders[id].postUrl +
                  "\nReminder Date: " + reminderDate);
            
            
            
        }
        
    }); //end each
} //end Notify

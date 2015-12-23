// ==UserScript==
// @name         SPR-DEV
// @version      1.0
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
// @require      https://code.jquery.com/ui/1.11.4/jquery-ui.min.js
// @require      https://rawgit.com/enki-code/UserScripts/master/reminders.js
// @run-at document-end
// ==/UserScript==

var reminders = {},
    sitename = window.location.hostname,
    title = $("#question-header h1 a").text();

$(function () {
    $("head").append("<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css'>")
             .append("<link rel='stylesheet' href='https://code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css'>")
             .append("<style>.reminder, #reminders {color: #999;} .active-reminder, #reminders.active-reminder { color: dodgerblue; }</style>");

    $("div.network-items").append("<a id='reminders'\
                                      class='topbar-icon'\
                                      style='background-image: none; padding: 10px 0 0 10px; font-size: 12px; '\
                                      title='Post Reminders'>\
                                      <i class=' fa fa-calendar-o'></i>\
                                  </a> '")
                          .on('click', '#reminders', function (e) {
                                 $("#reminder-dialog").toggle();
                             });

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

    notify();

    // listen for changes and reload reminders
    GM_addValueChangeListener("reminders", function () {
        console.log("reminder data has changed, updating reminder list now...");
        Reminders.Load();
        notify();
    });

    $(".vote").each(function () {
        // add calendar icon to each vote cell and add generate reminderId from postId and sitename since post ids are not unique across all sites
        var postId = $(this).find("input[name='_id_']").val(),
            reminderId = postId + sitename,
            type = $(this).parent().next().attr("class"),
            postType = (type == "postcell" ? "question" : "answer");

        $(this).append("<a class='reminder'\
                       data-reminderid='" + reminderId + "'\
                       title='Remind me of this post'\
                       style=' padding-left:1px;'>\
                            <i class='fa fa-calendar-plus-o fa-2x' style='padding-top:5px;'></i>\
                    </a>\
                    <input type='text' class='datepicker' data-reminderid='" + reminderId + "' data-posttype='" + postType + "' style='display:none;'>")
               .on('click', '.vote a.reminder', function (e) {
                   $(this).next().show().focus().hide();
               });
    });

    $(".datepicker").datepicker({
        minDate: 0,
        onSelect: function (dateText, inst) {
            // date selected, add new reminder and save changes.
            var postId = $(this).data("postid"),
                postUrl = $(this).closest("tr").find(".post-menu").find(".short-link").attr("href"),
                postType = $(this).data("posttype"),
                reminderId = $(this).data("reminderid"),
                reminderDate = new Date($(this).val()),
                calendar = $(this).prev(),
                rem = new Reminder(reminderId, postId, postUrl, title, postType, sitename, reminderDate.getTime());

            Reminders.Add(rem);
            Reminders.Save();
        },
        beforeShow: function (input, instance) {
            instance.dpDiv.css({
                marginTop: '-35px',
                marginLeft: '10px'
            });
        }
    });


    setTimeout(function () { // had to delay this or it wouldn't work, still need to investigate why.
        $('#reminder-dialog .modal-content #reminderlist li a').click(function (e) {
            //notification item clicked, remove item and open link in new tab
            e.preventDefault();
            var id = $(this).data("reminderid");
            Reminders.Remove(id);
            Reminders.Save();
            $(this).remove();
            $("#reminder-dialog").hide();
            window.open($(this).attr('href'), '_blank');
        });
    }, 600);
});

function notify() {
    setTimeout(function () {
        // remove active reminder class from any calendars and hide the notification dialog
        $("#reminders, a.reminder").removeClass("active-reminder");
        $("#reminder-dialog").hide();
        $("#reminderlist").empty();

        $.each(reminders, function (id, val) {
            // find calendar associated with reminder and highlight it
            var calendar = $("a.reminder[data-reminderid='" + id + "']"),
                time = reminders[id].reminderDate,
                currentTime = new Date().getTime();
            $(calendar).addClass("active-reminder").attr("title", "This post has a reminder set for " + new Date(time).toDateString());

            // check if it is time to display reminder notification
            if (new Date().getTime() > time) {
                var reminderDate = new Date(reminders[id].reminderDate).toDateString();
                $("#reminders").addClass("active-reminder");

                $("#reminderlist").append("<li class='inbox-item '>\
                                       <a href='https://" + reminders[id].siteName + reminders[id].postUrl + "' data-reminderid='" + id + "'>\
                                           <div class='site-icon fa fa-calendar-o' title='Post Reminder'></div>\
                                           <div class='item-content'>\
                                               <div class='item-header'>\
                                                   <span class='item-type'>Reminder &mdash; " + reminders[id].postType + "</span>\
                                                   <span class='item-creation'><span title='" + reminderDate + "'>" + reminderDate + "</span></span>\
                                               </div>\
                                               <div class='item-location'>" + reminders[id].postTitle + "</div>\
                                               <div class='item-summary'>" + reminders[id].siteName + "</div>\
                                           </div>\
                                       </a>\
                                     </li>"); //onclick should be added here instead.

            }//end if
        }); //end each
    }, 500);//end setTimeout
} //end Notify

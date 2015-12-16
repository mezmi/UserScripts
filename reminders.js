
var Reminder = function (reminderId, postId, postUrl, postTitle, siteName, reminderDate) {
    this.reminderId = reminderId;
    this.postId = postId;
    this.postUrl = postUrl;
    this.postTitle = postTitle;
    this.siteName = siteName;
    this.reminderDate = reminderDate;
};

var Reminders = {

    Add(reminder) {
        reminders[reminder.reminderId] = {
            "postId": reminder.postId,
            "postUrl": reminder.postUrl,
            "postTitle": reminder.postTitle,
            "siteName": reminder.siteName,
            "reminderDate": reminder.reminderDate
        };
        alert(reminder.postUrl);
    },

    Clear() {
        console.log("Clearing Reminders");
    },

    HasReminder() {
        return reminders.hasOwnProperty(reminderId);
    },

    Load() {
        if (GM_getValue('reminders', undefined) == undefined) {
            GM_setValue('reminders', JSON.stringify(reminders));
        } else {
            reminders = JSON.parse(GM_getValue('reminders'));
        }
    },

    Remove() {
        if (reminders.hasOwnProperty(reminderID)) {
            delete reminders[reminderId];
        }

    },

    Save() {
        GM_setValue('reminders', JSON.stringify(reminders));
    }

};
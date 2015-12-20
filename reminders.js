
var Reminder = function (reminderId, postId, postUrl, postTitle, postType, siteName, reminderDate) {
    this.reminderId = reminderId;
    this.postId = postId;
    this.postUrl = postUrl;
    this.postTitle = postTitle;
    this.postType = postType;
    this.siteName = siteName;
    this.reminderDate = reminderDate;
};

var Reminders = {

    Add(reminder) {
        reminders[reminder.reminderId] = {
            "reminderId": reminder.reminderId,
            "postId": reminder.postId,
            "postUrl": reminder.postUrl,
            "postTitle": reminder.postTitle,
            "postType": reminder.postType,
            "siteName": reminder.siteName,
            "reminderDate": reminder.reminderDate
        };
        console.log("Adding Reminder" +
                    "\nreminderId" + reminder.reminderId + 
                    "\npostId" + reminder.postId +
                    "\npostUrl" + reminder.postUrl +
                    "\npostTitle" + reminder.postTitle +
                    "\npostType" + reminder.postType +
                    "\nsiteName" + reminder.siteName +
                    "\nreminderDate" + reminder.reminderDate
        );
    },

    Clear() {
        reminders = {};
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

    Remove(reminderId) {
        delete reminders[reminderId];
    },

    Save() {
        GM_setValue('reminders', JSON.stringify(reminders));
    }

};

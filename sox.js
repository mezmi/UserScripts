var sox = {
    hideHireMe: function() {
        $("#hireme").hide();
    },
    hideCommunityBulletin: function() {
        $("#sidebar .community-bulletin").hide();
    },
    
    flagOutcomeTime: function() {
        $(".flag-outcome").each(function() {
            $(this).append(" – " + $(this).attr("title"));
        });
    },

    scrollToTop: function() {
        var $scroll = $("<div/>", {
        id: "sox-scrollToTop",
        click: function(e) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
        }})
        .append($("<i/>", {
            class: "fa fa-angle-double-up fa-3x"
        })).appendTo("div.container");
    
        if ($(window).scrollTop() < 200) {
            $('#sox-scrollToTop').hide();
        }
        
        $(window).scroll(function() {
            if ($(this).scrollTop() > 200) {
                $('#sox-scrollToTop').fadeIn();
            } else {
                $('#sox-scrollToTop').fadeOut();
            }
        });
    },
     
     addFeature: function(name, description) {
        var $div = $("<div/>"),
            $label = $("<label/>"),
            $input = $("<input/>", {
                id: name,
                "type": "checkbox",
                style: "margin-right: 5px;"
            });
        $div.append($label);
        $label.append($input);
        $input.after(description);
        $("#sox-bar-features").append($div);
    },
    
    addCategory: function(name) {
        var $div = $("<div/>"),
            $h3 = $("<h3/>", {text: name});
            $div.append($h3);
        $("#sox-bar-features").append($div);
    },
    
    loadFeatures: function() {
        this.addCategory("Appearance");
        this.addFeature("scrollToTop", "Add Scroll To Top buttom");
        this.addFeature("hideHireMe", "Hides the Looking for a Job section in the sidebar");
        this.addFeature("hideCommunityBulletin", "Hides the Community Bulletin section in the sidebar");
        this.addCategory("Flagging");
        this.addFeature("flagOutcomeTime", "Append the time a flag was handled to the outcome");
        
    }

};

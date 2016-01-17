var sox = {
    hideHireMe: function() {
        $("#hireme").hide();
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
        }
    })
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
        var $label = $("<label/>"),
            $input = $("<input/>", {
                id: name,
                "type": "checkbox",
                style: "margin-right: 5px;"
            });
        $label.append($input);
        $input.after(description);
        $("#sox-bar-features").append($label)
            .append("<br/>");
    },
    
    addFeatures: function() {
        this.addFeature("scrollToTop", "Add Scroll To Top icon in navbar");
        this.addFeature("flagOutcomeTime", "Append the time a flag was handled to the outcome");
        this.addFeature("hideHireMe", "Hides the Looking for a Job section in the sidebar");
    }

};

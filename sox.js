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
        $(".topbar-links").append("<div id='scroll-container' class='links-container'><span><a id='scrollToTop' href='#' style='color: white;'>&#9650; TOP</a></span></div>");
        if ($(window).scrollTop() < 100) {
            $('#scroll-container').hide();
        }

        $(window).scroll(function() {
            if ($(this).scrollTop() > 100) {
                $('#scroll-container').fadeIn();
            } else {
                $('#scroll-container').fadeOut();
            }
        });

        $('#scrollToTop').click(function() {
            $('html, body').animate({
                scrollTop: 0
            }, 800);
            return false;
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
        $("#sox-features-list").append($label)
            .append("<br/>");
    },
    
    addFeatures: function() {
        this.addFeature("scrollToTop", "Add Scroll To Top icon in navbar");
        this.addFeature("flagOutcomeTime", "Append the time a flag was handled to the outcome");
        this.addFeature("hideHireMe", "Hides the Looking for a Job section in the sidebar");
    }

};

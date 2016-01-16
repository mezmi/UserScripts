var sox = { 

    flagOutcomeTime: function () {
        $(".flag-outcome").each(function() {
            $(this).append(" – " + $(this).attr("title"));
        });
    },
    
    scrollToTop: function(){
        $(".topbar-links").append("<div id='scroll-container' class='links-container'><span><a id='scrollToTop' href='#' style='color: white;'>&#9650; TOP</a></span></div>");
        if ($(window).scrollTop() < 100) {
            $('#scroll-container').hide();
        }
        
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('#scroll-container').fadeIn();                
            } else {
                $('#scroll-container').fadeOut();
            }
        });
        
        $('#scrollToTop').click(function(){
            $('html, body').animate({scrollTop : 0},800);
		        return false;
        });
    }

};

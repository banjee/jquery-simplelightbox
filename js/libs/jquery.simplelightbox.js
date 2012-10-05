(function($){
    $.simpleLightbox = function(el, options){
        
        var $element = $(element),  
             element = element,
             plugin = this;

        var defaults = {
	             
        	}
        
        plugin.$el = $(el);
        plugin.el = el;
        
        plugin.settings = {}
        
        plugin.$el.data("simpleLightbox", plugin);
        
        plugin.init = function(){
            plugin.settings = $.extend({}, defaults, options);
            
            plugin.$el.click(function(event){
            	event.preventDefault();
            	var url = $(this).attr('href');
            	
            	showLightbox(url);
            })
        };
        
        plugin.init();
    };
    
    function showLightbox(url){
        var lbHtml = '<div id="lightbox"><div class="lightbox-wrapper"><p>Click to close</p><div class="lightbox-content"></div></div></div>';
        
        if($('#lightbox').length === 0){

        	/* Appends lightbox HTML code */
        	$('body').append(lbHtml);

        	/* Displays lightbox and load image inside */
        	$('#lightbox').fadeIn('fast', function(){
	        	loadImage(url, $(this).find('.lightbox-content'));
        	});
        	
        	/* On click, hide lightbox and remove HTML */
        	$('#lightbox').click(function(){
	        	$(this).fadeOut('fast', function(){
		        	$(this).remove();
	        	});
        	})
        }
    }
    
    /* Loads specific image */
	function loadImage(url, container) {
		var src = url,
			loader = container;
			
			loader.each(function(){
			
				/* Creates a new image */
				var im = new Image();
				
				$(im).load(function(){
					$(this).hide();
					loader.append($(this));
					$(this).fadeIn('fast');
				})
				.error(function(){
					console.log('error');
				})
				.attr('src', src);
			});
	}
    
    $.fn.simpleLightbox = function(options){
        return this.each(function(){
            (new $.simpleLightbox(this, options));
        });
    };
    
})(jQuery);
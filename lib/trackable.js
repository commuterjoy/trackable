var Trackable = function(el, timestamp) {

    var el = el,
        timestamp = timestamp,
        height = el.offsetHeight,
        midpoint = height / 2,
        viewport = window.innerHeight,
        timeSincePageLoad = function() {
            return Date.now() - timestamp; 
        },
        top = function() {
            return -el.getBoundingClientRect().top;
        },
        log = function(event) {
            return {
                'timestamp': timeSincePageLoad(),
                'type': [el.id, event].join(':')
            }
        },
        events = [
            {   
                // is the centre point of the element visible to lower 1/5th of the viewport
                evaluate: function() {
                    return (midpoint < (top() + (viewport * 0.8))); 
                },
                log: function() { return log('middle') },
                logged: false
            },
            {
                // is the bottom margin of the element visible in the viewport
                evaluate: function() { 
                    return (height < (top() + (viewport)));
                },
                log: function() { return log('bottom') },
                logged: false
            },

        ];

        // events needs to form a closure
        return {  
          events: events  
          }
};


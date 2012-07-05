// Page load timestamp 
var start = Date.now()

// A trackable thing on a page
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

// ----------

// Create a list of elements we want to monitor
var things = [
    new Trackable(document.getElementById('headline'), start),
    new Trackable(document.getElementById('article-body-blocks'), start),
    new Trackable(document.getElementById('discussion'), start),
    new Trackable(document.getElementById('advert'), start)
    ]

var readable = function() {

    things.forEach(function(thing) {

        thing.events.forEach(function(event) {
            
            if (event.logged) // already run
                return false;

            if (event.evaluate.call()) {
                event.logged = true;
                console.log(event.log.call());
                return true;
                }

            return false;

        })
    });
};

// capture events
window.onscroll = readable 
window.onload = readable


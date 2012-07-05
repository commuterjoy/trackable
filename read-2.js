// Page load timestamp 
var start = Date.now()

// Support - (document.getBoundingClientRect && Array.forEach && Array.filter);

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
        events = [
            {
                evaluate: function() {
                    return (midpoint < (top() + (viewport * 1.2))); // visible to lower 1/5th of screen = 'seen'
                },
                log: function() {
                    return {
                        'timestamp': timeSincePageLoad(),
                        'type': el.id + ':middle'
                    }
                },
                logged: false
            },
            {
                evaluate: function() { 
                    return (height < (top() + (viewport * 1.2)));
                },
                log: function() {
                    return {
                        'timestamp': timeSincePageLoad(), 
                        'type': el.id + ':top' 
                    }
                },
                logged: false
            },

        ];

        // events needs to form a closure
        return {  
          events: events  
          }
};

// Create a list of elements we want to monitor
var things = [
    new Trackable(document.getElementById('article-body-blocks'), start),
    new Trackable(document.getElementById('discussion'), start),
    new Trackable(document.getElementById('advert'), start)
    ]

// Bootstrap
window.onscroll = function() {

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


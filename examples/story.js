
var mustard = (  (document.getElementById)
              && (document.firstChild && document.firstChild.getBoundingClientRect !== undefined)
              && ([].forEach)) ? true : false;

var start = Date.now()

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

if ( mustard ) {

    var things = [
        new Trackable(document.getElementById('headline'), start),
        new Trackable(document.getElementById('article-body-blocks'), start),
        new Trackable(document.getElementById('discussion'), start),
        new Trackable(document.getElementById('advert'), start)
        ]

    // capture events
    window.onscroll = readable 
    window.onload = readable

}


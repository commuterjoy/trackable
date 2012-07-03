// Page load timestamp 
var start = Date.now()

// A thing on a page
var Trackable = function(el) {
    this.trigged = false
    this.el = el
};

// Is the thing visible in the view port
Trackable.prototype.inview = function() {
    var rect = this.el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth 
    )
}

// Create a list of elements we want to fire triggers
var tracks = [
    new Trackable(document.getElementById('story')),
    new Trackable(document.getElementById('close'))
    ]

//
window.onscroll = function() {

    tracks.map(function(track) {
        if (!track.triggered && track.inview()){
            console.log(track.el.id + ',' + (Date.now() - start));
            track.triggered = true; // ... and log to ophan
        }
    });

    }


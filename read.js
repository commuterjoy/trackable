// Page load timestamp 
var start = Date.now()

// Support
var mustard = (document.getBoundingClientRect && Array.map);

// A thing on a page
var Trackable = function(el) {
    this.trigged = false
    this.el = el
};

// Is the thing visible in the view port
Trackable.prototype.inview = function() {
    if (!this.el)
        return;

    var rect = this.el.getBoundingClientRect()
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth 
    )
}

// Create a list of elements we want to fire triggers
var things = [
    new Trackable(document.getElementById('story')),
    new Trackable(document.getElementById('close')),
    ]

//
window.onscroll = function() {

    things.map(function(thing) {
        if (!thing.triggered && thing.inview()){
            console.log(thing.el.id + ',' + (Date.now() - start));
            thing.triggered = true; // ... and log to ophan
        }
    });

    }


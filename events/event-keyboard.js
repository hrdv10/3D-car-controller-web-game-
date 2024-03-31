var EventsKeyboard = pc.createScript('eventsKeyboard');

EventsKeyboard.attributes.add('keys', {
    type: 'json',
    schema: [{
        name: 'key',
        type: 'number',
        enum: [
            { 'BACKSPACE': 8 },
            { 'TAB': 9 },
            { 'ENTER': 13 },
            { 'ESCAPE': 27 },
            { 'SPACE': 32 },
            { 'ARROW UP': 38 },
            { 'ARROW DOWN': 40 },
            { 'ARROW LEFT': 37 },
            { 'ARROW RIGHT': 39 },
            { '0': 48 },
            { '1': 49 },
            { '2': 50 },
            { '3': 51 },
            { '4': 52 },
            { '5': 53 },
            { '6': 54 },
            { '7': 55 },
            { '8': 56 },
            { '9': 57 },
            { 'A': 65 },
            { 'B': 66 },
            { 'C': 67 },
            { 'D': 68 },
            { 'E': 69 },
            { 'F': 70 },
            { 'G': 71 },
            { 'H': 72 },
            { 'I': 73 },
            { 'J': 74 },
            { 'K': 75 },
            { 'L': 76 },
            { 'M': 77 },
            { 'N': 78 },
            { 'O': 79 },
            { 'P': 80 },
            { 'Q': 81 },
            { 'R': 82 },
            { 'S': 83 },
            { 'T': 84 },
            { 'U': 85 },
            { 'V': 86 },
            { 'W': 87 },
            { 'X': 88 },
            { 'Y': 89 },
            { 'Z': 90 }
        ],
        title: 'Key',
        description: 'The keyboard key that will fire events'
    }, {
        name: 'keyDownEvent',
        type: 'string',
        title: 'Key Down Event',
        description: 'The event fired when the specified key is pressed'
    }, {
        name: 'keyRepeatEvent',
        type: 'string',
        title: 'Key Repeat Event',
        description: 'The event fired when the specified key registers a repeat press after the initial press'
    }, {
        name: 'keyUpEvent',
        type: 'string',
        title: 'Key Up Event',
        description: 'The event fired when the specified key is released'
    }],
    array: true,
    title: 'Keys',
    description: 'The set of keyboard keys that are configured to fire events'
});

EventsKeyboard.prototype.initialize = function () {
    var app = this.app;

    var keyDown = function (e) {
        this.keys.forEach(function (key) {
            if (key.key === e.keyCode) {
                if (e.repeat && (key.keyRepeatEvent.length > 0)) {
                    app.fire(key.keyRepeatEvent, 1);
                } else if (!e.repeat && (key.keyDownEvent.length > 0)) {
                    app.fire(key.keyDownEvent, 1);
                }
            }
        });
    }.bind(this);

    var keyUp = function (e) {
        this.keys.forEach(function (key) {
            if ((key.key === e.keyCode) && (key.keyUpEvent.length > 0)) {
                app.fire(key.keyUpEvent, 0);
            }
        });
    }.bind(this);

    // Manage DOM event listeners
    var addEventListeners = function () {
        window.addEventListener('keydown', keyDown, true);
        window.addEventListener('keyup', keyUp, true);
    };
    var removeEventListeners = function () {
        window.addEventListener('keydown', keyDown, true);
        window.addEventListener('keyup', keyUp, true);
    };

    this.on('enable', addEventListeners);
    this.on('disable', removeEventListeners);

    this.on('destroy', removeEventListeners);

    addEventListeners();
};

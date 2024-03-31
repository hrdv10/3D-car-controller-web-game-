var EventsButton = pc.createScript('eventsButton');

EventsButton.attributes.add('clickEvent', { type: 'string' });
EventsButton.attributes.add('pressedStartEvent', { type: 'string' });
EventsButton.attributes.add('pressedEndEvent', { type: 'string' });
EventsButton.attributes.add('hoverStartEvent', { type: 'string' });
EventsButton.attributes.add('hoverEndEvent', { type: 'string' });

// initialize code called once per entity
EventsButton.prototype.initialize = function() {
    this.entity.button.on('click', function () {
        if (this.clickEvent && this.clickEvent.length > 0) {
            this.app.fire(this.clickEvent);
        }
    }, this);
    this.entity.button.on('pressedstart', function () {
        if (this.pressedStartEvent && this.pressedStartEvent.length > 0) {
            this.app.fire(this.pressedStartEvent);
        }
    }, this);
    this.entity.button.on('pressedend', function () {
        if (this.pressedEndEvent && this.pressedEndEvent.length > 0) {
            this.app.fire(this.pressedEndEvent);
        }
    }, this);
    this.entity.button.on('hoverstart', function () {
        if (this.hoverStartEvent && this.hoverStartEvent.length > 0) {
            this.app.fire(this.hoverStartEvent);
        }
    }, this);
    this.entity.button.on('hoverend', function () {
        if (this.hoverEndEvent && this.hoverEndEvent.length > 0) {
            this.app.fire(this.hoverEndEvent);
        }
    }, this);
};

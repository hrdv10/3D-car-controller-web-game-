var EventsVr = pc.createScript('eventsVr');

EventsVr.attributes.add('availableEvent', {
    type: 'string',
    default: 'vr:available',
    title: 'Available Event',
    description: 'Fired when a VR session becomes available.'
});
EventsVr.attributes.add('unavailableEvent', {
    type: 'string',
    default: 'vr:unavailable',
    title: 'Unvailable Event',
    description: 'Fired when a VR session becomes unavailable.'
});
EventsVr.attributes.add('startEvent', {
    type: 'string',
    default: 'vr:started',
    title: 'Start Event',
    description: 'Fired when a VR session starts.'
});
EventsVr.attributes.add('endEvent', {
    type: 'string',
    default: 'vr:ended',
    title: 'End Event',
    description: 'Fired when a VR session starts.'
});

// initialize code called once per entity
EventsVr.prototype.initialize = function() {
    this.app.xr.on('available:' + pc.XRTYPE_VR, function (available) {
        this.app.fire(available ? this.availableEvent : this.unavailableEvent);
    }, this);
    this.app.xr.on('start', function () {
        this.app.fire(this.startEvent);
    }, this);
    this.app.xr.on('end', function () {
        this.app.fire(this.endEvent);
    }, this);
};

EventsVr.prototype.postInitialize = function() {
    if (this.app.xr.supported && !this.app.xr.active) {
        var available = this.app.xr.isAvailable(pc.XRTYPE_VR);
        this.app.fire(available ? this.availableEvent : this.unavailableEvent);
    }
};

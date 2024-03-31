var ActionVr = pc.createScript('actionVr');

ActionVr.attributes.add('startEvent', {
    type: 'string',
    title: 'Start Event',
    description: 'Event that starts the VR session.'
});
ActionVr.attributes.add('endEvent', {
    type: 'string',
    title: 'End Event',
    description: 'Event that ends the VR session.'
});
ActionVr.attributes.add('space', {
    type: 'number',
    enum: [
        { 'Bounded Floor': 0 },
        { 'Local': 1 },
        { 'Local Floor': 2 },
        { 'Unbounded': 3 },
        { 'Viewer': 4 }
    ],
    default: 1,
    title: 'Space',
    description: 'The tracking space for the VR session.'
});

ActionVr.prototype.startVr = function() {
    var spaces = [
        pc.XRSPACE_BOUNDEDFLOOR,
        pc.XRSPACE_LOCAL,
        pc.XRSPACE_LOCALFLOOR,
        pc.XRSPACE_UNBOUNDED,
        pc.XRSPACE_VIEWER
    ];

    if (!this.app.xr.supported) {
        // WebXR is not supported
        return;
    }

    if (this.app.xr.active) {
        // session already active
        return;
    }

    if (! this.app.xr.isAvailable(pc.XRTYPE_VR)) {
        // this session type is not available
        return;
    }

    // ask for motion permissions if we can
    if (window.DeviceOrientationEvent && window.DeviceOrientationEvent.requestPermission) {
        DeviceOrientationEvent.requestPermission().then(
            function(response) {
                if (response == 'granted') {
                    window.addEventListener('deviceorientation', function (e) {
                        // start session
                        this.entity.camera.startXr(pc.XRTYPE_VR, spaces[this.space]);
                    }.bind(this));
                }
            }.bind(this)).catch(console.error);
    } else {
        // start session
        this.entity.camera.startXr(pc.XRTYPE_VR, spaces[this.space]);
    }
};

ActionVr.prototype.endVr = function() {
    this.app.xr.end();
};

// initialize code called once per entity
ActionVr.prototype.initialize = function() {
    if (this.startEvent && this.startEvent.length > 0) {
        this.app.on(this.startEvent, this.startVr, this);
    }
    if (this.endEvent && this.endEvent.length > 0) {
        this.app.on(this.endEvent, this.endVr, this);
    }

    this.on('attr:startEvent', function (value, prev) {
        if (prev && prev.length > 0) {
            app.off(prev, this.startVr, this);
        }
        if (value && value.length > 0) {
            app.on(value, this.startVr, this);
        }
    });

    this.on('attr:endEvent', function (value, prev) {
        if (prev && prev.length > 0) {
            app.off(prev, this.endVr, this);
        }
        if (value && value.length > 0) {
            app.on(value, this.endVr, this);
        }
    });
    
    this.on('destroy', function () {
        if (this.startEvent && this.startEvent.length > 0) {
            this.app.off(this.startEvent, this.startVr, this);
        }
        if (this.endEvent && this.endEvent.length > 0) {
            this.app.off(this.endEvent, this.endVr, this);
        }
    });
};

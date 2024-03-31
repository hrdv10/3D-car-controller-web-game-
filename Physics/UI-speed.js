var UiSpeed = pc.createScript('uiSpeed');

UiSpeed.attributes.add('car', { type: 'entity' });

// update code called every frame
UiSpeed.prototype.initialize = function() {
    var intervalHandle = setInterval(function () {
        if (this.car && this.car.script) {
            var speed = this.car.script.vehicle.speed;
            var absSpeed = Math.abs(speed);
            var text = 'Speed: ' + Math.round(absSpeed) + 'km/h';
            if (speed < 0) {
                text += ' (R)';
            } 
            this.entity.element.text = text;
        }
    }.bind(this), 100);
    
    this.on('destroy', function() {
        clearInterval(intervalHandle);
    }, this);
};

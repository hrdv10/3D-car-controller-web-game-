var Exhaust = pc.createScript('exhaust');

// initialize code called once per entity
Exhaust.prototype.update = function(dt) {
    var car = this.app.root.findByName('Car Physics');
    if (car && car.script && car.script.vehicle) {
        var throttle = car.script.vehicle.engineForce;
        if (throttle > 0) {
            this.entity.particlesystem.play();
        } else {
            this.entity.particlesystem.stop();
        }
    }
};

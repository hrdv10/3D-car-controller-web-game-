var ActionSetBoolean = pc.createScript('actionSetBoolean');

ActionSetBoolean.attributes.add('actions', {
    type: 'json',
    schema: [
        {
            name: 'event',
            title: 'Event',
            description: 'The event name that triggers this set action.',
            type: 'string'
        }, {
            name: 'entity',
            title: 'Entity',
            description: 'The entity from where the path starts. If unset, this entity is used.',
            type: 'entity'
        }, {
            name: 'path',
            title: 'Path',
            description: 'The path to set when the event fires.',
            type: 'string'
        }, {
            name: 'value',
            title: 'Value',
            type: 'number',
            enum: [
                { 'False': 0 },
                { 'True': 1 }
            ],
            description: 'The value to set the property to.',
            default: 1
        }
    ],
    array: true
});

// initialize code called once per entity
ActionSetBoolean.prototype.initialize = function() {
    this.actions.forEach(function (action) {
        this.app.on(action.event, function () {
            var pathSegments = action.path.split('.');
            var propertyOwner = action.entity ? action.entity : this.entity;
            for (var i = 0; i < pathSegments.length - 1; i++) {
                propertyOwner = propertyOwner[pathSegments[i]];
            }

            var propertyName = pathSegments[pathSegments.length - 1];
            propertyOwner[propertyName] = !!action.value;
        }, this);
    }, this);
};

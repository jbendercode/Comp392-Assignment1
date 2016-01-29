/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, superPunchSpeed) {
            this.rotationSpeed = rotationSpeed;
            this.superPunchSpeed = superPunchSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

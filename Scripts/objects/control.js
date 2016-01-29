/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, punchSpeed) {
            this.rotationSpeed = rotationSpeed;
            this.punchSpeed = punchSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

/// <reference path="../../typings/tsd.d.ts"/>
/*
Author:             Josh Bender
Modified By:        Josh Bender
Last Modified:      04/02/2016
Description:        Control Class for the GUI objects
Revision History:   Live build
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeedX, rotationSpeedY, rotationSpeedZ, punchSpeed, colour) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.punchSpeed = punchSpeed;
            this.colour = colour;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

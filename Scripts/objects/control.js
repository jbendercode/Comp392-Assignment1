/// <reference path="../../typings/tsd.d.ts"/>
/*
Author:             Josh Bender
Modified By:        Josh Bender
Last Modified:      01/02/2016
Description:        Control Class for the GUI objects
Revision History:   Live build
*/
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeedX, rotationSpeedY, rotationSpeedZ, punchSpeed) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.punchSpeed = punchSpeed;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

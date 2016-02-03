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
        Control.prototype.textureSwap = function (textureSwapped, container) {
            var textureToUse;
            // Check which texture to use
            if (textureSwapped == false) {
                textureToUse = "../../Assets/Textures/iceTexture.jpg";
            }
            else {
                textureToUse = "../../Assets/Textures/metalTexture2.jpg";
            }
            for (var m in container) {
                m.material.uniforms.texture.value = THREE.ImageUtils.loadTexture(textureToUse);
                m.material.needsUpdate = true;
            }
        };
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));

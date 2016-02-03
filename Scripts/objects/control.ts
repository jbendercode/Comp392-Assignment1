/// <reference path="../../typings/tsd.d.ts"/>

/* 
Author:             Josh Bender
Modified By:        Josh Bender
Last Modified:      01/02/2016
Description:        Control Class for the GUI objects
Revision History:   Live build
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeedX:number;
        public rotationSpeedY:number;
        public rotationSpeedZ:number;
        public punchSpeed:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeedX:number, rotationSpeedY:number, rotationSpeedZ:number, punchSpeed:number) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.punchSpeed = punchSpeed;
        }
        
        public textureSwap(textureSwapped:boolean, container:THREE.Object3D):void{
            var textureToUse:string;
            // Check which texture to use
            if (textureSwapped == false) {textureToUse = "../../Assets/Textures/iceTexture.jpg";}
            else {textureToUse = "../../Assets/Textures/metalTexture2.jpg";}
            for (var m in container){
                m.material.uniforms.texture.value = THREE.ImageUtils.loadTexture(textureToUse);
                m.material.needsUpdate = true;
            }
        }
    }
}
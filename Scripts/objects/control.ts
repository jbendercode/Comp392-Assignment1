/// <reference path="../../typings/tsd.d.ts"/>

/* 
Author:             Josh Bender
Modified By:        Josh Bender
Last Modified:      01/02/2016
Description:        Control Class for the GUI objects
Revision History:   Live buil
*/

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeedX:number;
        public rotationSpeedY:number;
        public rotationSpeedZ:number;
        public punchSpeed:number;
        public textureSwap:boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeedX:number, rotationSpeedY:number, rotationSpeedZ:number, punchSpeed:number, textureSwap:boolean) {
            this.rotationSpeedX = rotationSpeedX;
            this.rotationSpeedY = rotationSpeedY;
            this.rotationSpeedZ = rotationSpeedZ;
            this.punchSpeed = punchSpeed;
            this.textureSwap = textureSwap;
        }
        
    }
}
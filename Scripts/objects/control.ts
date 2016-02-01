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
        public rotationSpeed:number;
        public punchSpeed:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number, punchSpeed:number) {
            this.rotationSpeed = rotationSpeed;
            this.punchSpeed = punchSpeed;
        }
        
    }
}
/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        public superPunchSpeed:number;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number, superPunchSpeed:number) {
            this.rotationSpeed = rotationSpeed;
            this.superPunchSpeed = superPunchSpeed;
        }
        
    }
}
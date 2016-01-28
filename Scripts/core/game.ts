/// <reference path="_reference.ts"/>

// MAIN GAME FILE

// THREEJS Aliases
import Scene = THREE.Scene;
import Renderer = THREE.WebGLRenderer;
import PerspectiveCamera = THREE.PerspectiveCamera;
import BoxGeometry = THREE.BoxGeometry;
import CubeGeometry = THREE.CubeGeometry;
import PlaneGeometry = THREE.PlaneGeometry;
import SphereGeometry = THREE.SphereGeometry;
import Geometry = THREE.Geometry;
import AxisHelper = THREE.AxisHelper;
import LambertMaterial = THREE.MeshLambertMaterial;
import MeshBasicMaterial = THREE.MeshBasicMaterial;
import Material = THREE.Material;
import Mesh = THREE.Mesh;
import Object3D = THREE.Object3D;
import SpotLight = THREE.SpotLight;
import PointLight = THREE.PointLight;
import AmbientLight = THREE.AmbientLight;
import Control = objects.Control;
import GUI = dat.GUI;
import Color = THREE.Color;
import Vector3 = THREE.Vector3;
import Face3 = THREE.Face3;
import Point = objects.Point;

//Custom Game Objects
import gameObject = objects.gameObject;

var scene: Scene;
var renderer: Renderer;
var camera: PerspectiveCamera;
var axes: AxisHelper;
var plane: Mesh;
var sphere: Mesh;
var ambientLight: AmbientLight;
var spotLight: SpotLight;
var control: Control;
var gui: GUI;
var stats: Stats;
var step: number = 0;
var cubeGeometry:CubeGeometry;
var cubeMaterial:LambertMaterial;
var cubeMan: Object3D;
var cubes: Mesh[];


function init() {
    // Instantiate a new Scene object
    scene = new Scene();

    setupRenderer(); // setup the default renderer
	
    setupCamera(); // setup the camera
    
    cubes = []; // Initialize the array to hold the cubes
	
    // add an axis helper to the scene
    axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene..."); 
    
    //Add a Plane to the Scene
    plane = new gameObject(
        new PlaneGeometry(24, 24, 1, 1),
        new LambertMaterial({ color: 0xC0DEF4 }),
        0, 0, 0);

    plane.rotation.x = -0.5 * Math.PI;

    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    
    // Create Cube Man
    
    // Start with creating an empty group
    cubeMan = new Object3D();
    cubeMan.position.set(0, 1, -2);
    scene.add(cubeMan);
    console.log("Added Cube Man to scene...");

    // Set Mat and Geometry to use for cubes
    cubeMaterial = new LambertMaterial({color:0x7887AB});
    cubeGeometry = new CubeGeometry(1, 1, 1);
    
    //Add Cubes to the Cube Man
    for (var i = 0; i < 4; i++){
        for (var j = 0; j < 10; j++){
            for (var h = 0; h < 7; h++){
                cubes[(i*70) + (j*7) + h] = new Mesh(cubeGeometry, cubeMaterial);
                cubes[(i*70) + (j*7) + h].castShadow = true;
                cubes[(i*70) + (j*7) + h].receiveShadow = true;
                cubes[(i*70) + (j*7) + h].position.x = -3 + h * 1.1;
                cubes[(i*70) + (j*7) + h].position.y = 1 + j * 1.1;
                cubes[(i*70) + (j*7) + h].position.z = -4 + i * 1.1;
                cubeMan.add(cubes[(i*70) + (j*7) + h]);
            }
        }
    }
    
    // Remove Uneeded Cubes from the array
    
    // 1st Layer
    for (var i = 0; i < 28; i++){
       cubeMan.remove(cubes[i]);
    }
    
    for (var i = 49; i < 70; i++){
       cubeMan.remove(cubes[i]);
    }
    
    for (var i = 0; i < 3; i++){
        cubeMan.remove(cubes[28 + (i*7)]);
        cubeMan.remove(cubes[29 + (i*7)]);
        cubeMan.remove(cubes[33 + (i*7)]);
        cubeMan.remove(cubes[34 + (i*7)]);
    }
    
    // 2nd Layer
    for (var i = 0; i < 7; i++){
        if (i != 2 && i != 4){
            cubeMan.remove(cubes[i + 70]);
        }
    }
    
    for (var i = 77; i < 98; i++){
       cubeMan.remove(cubes[i]);
    }
    
    for (var i = 98; i < 105; i++){
        if (i%7 == 1 || i%7 == 5){
            cubeMan.remove(cubes[i]);
        }
    }
    
    for (var i = 105; i < 119; i++){
        if (i%7 != 2 && i%7 != 3 && i%7 != 4){
            cubeMan.remove(cubes[i]);
        }
    }
    
    for (var i = 119; i < 140; i++){
        if (i%7 != 2 && i%7 != 3 && i%7 != 4){
            cubeMan.remove(cubes[i]);
        }
    }
    
    // 3rd Layer
    for (var i = 140; i < 168; i++){
        if (i%7 != 2 && i%7 != 4){
            cubeMan.remove(cubes[i]);
        }
    }
    
    for (var i = 168; i < 182; i++){
        if (i%7 == 1 || i%7 == 5){
            cubeMan.remove(cubes[i]);
        }
    }
    
    for (var i = 189; i < 210; i++){
        if (i%7 != 2 && i%7 != 3 && i%7 != 4){
            cubeMan.remove(cubes[i]);
        }
    }
    
    // Layer 4
    for (var i = 210; i < 238; i++){
        cubeMan.remove(cubes[i]);
    }
    
    for (var i = 238; i < 280; i++){
        if (i%7 != 2 && i%7 != 3 && i%7 != 4){
            cubeMan.remove(cubes[i]);
        }
    }
    
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x949494);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
	
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xFFFFFF);
    spotLight.position.set(5.6, 43, 10.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    
    // add controls
    gui = new GUI();
    control = new Control(0.01);
    addControl(control);

    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");

    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    
    window.addEventListener('resize', onResize, false);
}

function onResize(): void {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function addControl(controlObject: Control): void {
    gui.add(controlObject, 'rotationSpeed', -0.5, 0.5);

}

function addStatsObject() {
    stats = new Stats();
    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild(stats.domElement);
}

// Setup main game loop
function gameLoop(): void {
    stats.update();

    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
	
    // render the scene
    renderer.render(scene, camera);
    
    // rotate cubeMan
    cubeMan.rotation.y += control.rotationSpeed;
}

// Setup default renderer
function setupRenderer(): void {
    renderer = new Renderer();
    renderer.setClearColor(0xFFFFFF, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}

// Setup main camera for the scene
function setupCamera(): void {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 6.5;
    camera.position.y = 16;
    camera.position.z = -32;
    camera.lookAt(new Vector3(-3, 0, 0));
    console.log("Finished setting up Camera...");
}

/// <reference path="_reference.ts"/>
/*
Author:             Josh Bender
Modified By:        Josh Bender
Last Modified:      01/02/2016
Description:        Main Game file
Revision History:   Live build
*/
// MAIN GAME FILE
// THREEJS Aliases
var Scene = THREE.Scene;
var Renderer = THREE.WebGLRenderer;
var PerspectiveCamera = THREE.PerspectiveCamera;
var BoxGeometry = THREE.BoxGeometry;
var CubeGeometry = THREE.CubeGeometry;
var PlaneGeometry = THREE.PlaneGeometry;
var SphereGeometry = THREE.SphereGeometry;
var Geometry = THREE.Geometry;
var AxisHelper = THREE.AxisHelper;
var LambertMaterial = THREE.MeshLambertMaterial;
var MeshBasicMaterial = THREE.MeshBasicMaterial;
var ImageUtils = THREE.ImageUtils;
var Material = THREE.Material;
var Mesh = THREE.Mesh;
var Object3D = THREE.Object3D;
var SpotLight = THREE.SpotLight;
var PointLight = THREE.PointLight;
var AmbientLight = THREE.AmbientLight;
var Control = objects.Control;
var GUI = dat.GUI;
var Color = THREE.Color;
var Vector3 = THREE.Vector3;
var Face3 = THREE.Face3;
var Point = objects.Point;
//Custom Game Objects
var gameObject = objects.gameObject;
var scene;
var renderer;
var camera;
var axes;
var plane;
var sphere;
var ambientLight;
var spotLight;
var control;
var gui;
var stats;
var step = 0;
var cubeGeometry;
var cubeMaterial;
var cubeMan;
var cubes;
var growth;
var punch;
var cubeColour;
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    cubes = []; // Initialize the array to hold the cubes
    cubeColour = new Color("0x00ff00");
    // add an axis helper to the scene
    axes = new AxisHelper(15);
    scene.add(axes);
    console.log("Added Axis Helper to scene...");
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(24, 24, 1, 1), new LambertMaterial({ map: ImageUtils.loadTexture("../../Assets/Textures/metalTexture2.jpg") }), 0, 0, 0);
    plane.castShadow = true;
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    // Set growth and punch variables for scaling and punching cubeMan parts to true
    growth = true;
    punch = true;
    // Create Cube Man
    // Start with creating an empty group
    cubeMan = new Object3D();
    cubeMan.position.set(0, 0, 0);
    scene.add(cubeMan);
    console.log("Added Cube Man to scene...");
    // Set Mat and Geometry to use for cubes
    cubeMaterial = new LambertMaterial({ color: String(cubeColour), map: ImageUtils.loadTexture("../../Assets/Textures/metalTexture.jpg") });
    cubeGeometry = new CubeGeometry(1, 1, 1);
    //Add Cubes to the Cube Man
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 10; j++) {
            for (var h = 0; h < 7; h++) {
                cubes[(i * 70) + (j * 7) + h] = new Mesh(cubeGeometry, cubeMaterial);
                cubes[(i * 70) + (j * 7) + h].castShadow = true;
                cubes[(i * 70) + (j * 7) + h].receiveShadow = true;
                cubes[(i * 70) + (j * 7) + h].position.x = -3.3 + h * 1.1;
                cubes[(i * 70) + (j * 7) + h].position.y = 1 + j * 1.1;
                cubes[(i * 70) + (j * 7) + h].position.z = -1.65 + i * 1.1;
                cubeMan.add(cubes[(i * 70) + (j * 7) + h]);
            }
        }
    }
    // Remove Uneeded Cubes from the array
    // 1st Layer
    for (var i = 0; i < 28; i++) {
        cubeMan.remove(cubes[i]);
    }
    for (var i = 49; i < 70; i++) {
        cubeMan.remove(cubes[i]);
    }
    for (var i = 0; i < 3; i++) {
        cubeMan.remove(cubes[28 + (i * 7)]);
        cubeMan.remove(cubes[29 + (i * 7)]);
        cubeMan.remove(cubes[33 + (i * 7)]);
        cubeMan.remove(cubes[34 + (i * 7)]);
    }
    // 2nd Layer
    for (var i = 0; i < 7; i++) {
        if (i != 2 && i != 4) {
            cubeMan.remove(cubes[i + 70]);
        }
    }
    for (var i = 77; i < 98; i++) {
        cubeMan.remove(cubes[i]);
    }
    for (var i = 98; i < 105; i++) {
        if (i % 7 == 1 || i % 7 == 5) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 105; i < 119; i++) {
        if (i % 7 != 2 && i % 7 != 3 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 119; i < 140; i++) {
        if (i % 7 != 2 && i % 7 != 3 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    // 3rd Layer
    for (var i = 140; i < 168; i++) {
        if (i % 7 != 2 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 168; i < 182; i++) {
        if (i % 7 == 1 || i % 7 == 5) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 189; i < 210; i++) {
        if (i % 7 != 2 && i % 7 != 3 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    // Layer 4
    for (var i = 210; i < 238; i++) {
        cubeMan.remove(cubes[i]);
    }
    for (var i = 238; i < 259; i++) {
        if (i % 7 != 2 && i % 7 != 3 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 259; i < 280; i++) {
        cubeMan.remove(cubes[i]);
    }
    // Add an AmbientLight to the scene
    ambientLight = new AmbientLight(0x949494);
    scene.add(ambientLight);
    console.log("Added an Ambient Light to Scene");
    // Add a SpotLight to the scene
    spotLight = new SpotLight(0xFFFFFF);
    spotLight.position.set(5.6, 23, 10.4);
    spotLight.rotation.set(-0.8, 42.7, 19.5);
    spotLight.castShadow = true;
    spotLight.shadowCameraFar = 1000;
    spotLight.shadowCameraNear = 0.1;
    spotLight.intensity = 2;
    scene.add(spotLight);
    console.log("Added a SpotLight Light to Scene");
    // add controls
    gui = new GUI();
    control = new Control(0, 0, 0, 0, cubeMaterial.color.getHex());
    addControl(control);
    // Add framerate stats
    addStatsObject();
    console.log("Added Stats to scene...");
    document.body.appendChild(renderer.domElement);
    gameLoop(); // render the scene	
    window.addEventListener('resize', onResize, false);
}
function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function addControl(controlObject) {
    gui.add(controlObject, 'rotationSpeedX', -0.2, 0.2);
    gui.add(controlObject, 'rotationSpeedY', -0.2, 0.2);
    gui.add(controlObject, 'rotationSpeedZ', -0.2, 0.2);
    gui.add(controlObject, 'punchSpeed', 0, 0.2);
    gui.addColor(controlObject, 'colour');
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
function gameLoop() {
    stats.update();
    // render using requestAnimationFrame
    requestAnimationFrame(gameLoop);
    // render the scene
    renderer.render(scene, camera);
    // rotate cubeMan
    cubeMan.rotation.x += control.rotationSpeedX;
    cubeMan.rotation.y += control.rotationSpeedY;
    cubeMan.rotation.z += control.rotationSpeedZ;
    // Update cube colours
    cubeColour = new Color(control.colour);
    // Auto scaling cubeMan animation loop
    for (var m in cubes) {
        if (cubes[m].scale.x < 1.1 && growth == true) {
            cubes[m].scale.x += 0.007;
            cubes[m].scale.y += 0.007;
            cubes[m].scale.z += 0.007;
        }
        else if (cubes[m].scale.x > 1 && growth == false) {
            cubes[m].scale.x -= 0.007;
            cubes[m].scale.y -= 0.007;
            cubes[m].scale.z -= 0.007;
        }
        else if (cubes[m].scale.x >= 1.1 && growth == true) {
            growth = false;
        }
        else {
            growth = true;
        }
    }
    // Punch control loop
    if (cubes[98].position.z < -0.6 && punch == true) {
        cubes[98].position.z += control.punchSpeed;
        cubes[104].position.z += control.punchSpeed;
    }
    else if (cubes[98].position.z > -2 && punch == false) {
        cubes[98].position.z -= control.punchSpeed;
        cubes[104].position.z -= control.punchSpeed;
    }
    else if (cubes[98].position.z >= -2 && punch == true) {
        punch = false;
    }
    else {
        punch = true;
    }
}
// Setup default renderer
function setupRenderer() {
    renderer = new Renderer();
    renderer.setClearColor(0xFFFFFF, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    console.log("Finished setting up Renderer...");
}
// Setup main camera for the scene
function setupCamera() {
    camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.x = 6.5;
    camera.position.y = 16;
    camera.position.z = -32;
    camera.lookAt(new Vector3(-3, 0, 0));
    console.log("Finished setting up Camera...");
}

/// <reference path="_reference.ts"/>
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
function init() {
    // Instantiate a new Scene object
    scene = new Scene();
    setupRenderer(); // setup the default renderer
    setupCamera(); // setup the camera
    cubes = []; // Initialize the array to hold the cubes
    // add an axis helper to the scene
    /* axes = new AxisHelper(10);
    scene.add(axes);
    console.log("Added Axis Helper to scene..."); */
    //Add a Plane to the Scene
    plane = new gameObject(new PlaneGeometry(24, 24, 1, 1), new LambertMaterial({ color: 0xC0DEF4 }), 0, 0, 0);
    plane.rotation.x = -0.5 * Math.PI;
    scene.add(plane);
    console.log("Added Plane Primitive to scene...");
    // Create Cube Man
    // Start with creating an empty group
    cubeMan = new Object3D();
    cubeMan.position.set(0, 1, 0);
    scene.add(cubeMan);
    console.log("Added Cube Man to scene...");
    // Set Mat and Geometry to use for cubes
    cubeMaterial = new LambertMaterial({ color: 0x7887AB });
    cubeGeometry = new CubeGeometry(1, 1, 1);
    //Add Cubes to the Cube Man
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 10; j++) {
            for (var h = 0; h < 7; h++) {
                cubes[(i * 70) + (j * 7) + h] = new Mesh(cubeGeometry, cubeMaterial);
                cubes[(i * 70) + (j * 7) + h].castShadow = true;
                cubes[(i * 70) + (j * 7) + h].receiveShadow = true;
                cubes[(i * 70) + (j * 7) + h].position.x = -3 + h * 1.1;
                cubes[(i * 70) + (j * 7) + h].position.y = 1 + j * 1.1;
                cubes[(i * 70) + (j * 7) + h].position.z = -4 + i * 1.1;
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
        if (i % 7 != 2 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 238; i < 280; i++) {
        if (i % 7 != 2 && i % 7 != 3 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    // Layer 5
    for (var i = 280; i < 308; i++) {
        if (i % 7 != 2 && i % 7 != 4) {
            cubeMan.remove(cubes[i]);
        }
    }
    for (var i = 308; i < 350; i++) {
        if (i % 7 != 2 && i % 7 != 3 && i % 7 != 4) {
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
    control = new Control();
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
    //gui.add(controlObject, 'clone');
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
    camera.position.x = 5;
    camera.position.y = 22;
    camera.position.z = -32;
    camera.lookAt(new Vector3(0, 5, 0));
    console.log("Finished setting up Camera...");
}

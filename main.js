import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const popup = document.getElementById('popup');
const closePopupButton = document.getElementById('popup-exit-button');

const loading = document.getElementById('loading');

const welcome = document.getElementById('welcome');
const closeWelcomeButton = document.getElementById('welcome-exit-button');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);
const canvas = document.getElementById('portfolio-canvas');
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
};

const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));

const raycaster = new THREE.Raycaster();

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;

let intersectedObjectName = "";
let intersectedObject;
const intersectObjects = [];
const intersectObjectsNames = [
    "Portfolio",
    "Github",
    "TwitterX",
    "Backpack",
    "Book",
    "Cactus",
    "Can1",
    "Can2",
    "Can3",
    "Mat",
    "Mug",
    "Name",
    "Pokeball",
    "Rubix Cube",
    "Skateboard",
    "Chair"
]

const loader = new GLTFLoader();
loader.load(
    "./public/portfolio_room.glb",
    function(glb){
        glb.scene.traverse(child=>{
            if(intersectObjectsNames.includes(child.name)){
                intersectObjects.push(child);
            }
            if(child.isMesh){
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
        scene.add(glb.scene);
        setupLights();
        loading.classList.toggle('hidden');
    },
    undefined,
    function(error){
        console.error();
    }
);

function setupLights(){
    const ambientLight = new THREE.AmbientLight(0xd0d0ff, 0.3);
    scene.add(ambientLight);

    const sun = new THREE.DirectionalLight(0xFFFFeb, 1.5);
    sun.position.set(15, 25, 10);
    sun.castShadow = true;

    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 50;
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.bias = -0.001;

    scene.add(sun);

    const fillLight = new THREE.DirectionalLight(0xddefff, 0.5);
    fillLight.position.set(-8, 12, 0);
    scene.add(fillLight);
}

const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    1000
);
const controls = new OrbitControls(camera, canvas);
controls.enablePan = false;
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minPolarAngle = Math.PI / 4; 
controls.maxPolarAngle = Math.PI / 2;
controls.minAzimuthAngle = 0;
controls.maxAzimuthAngle = Math.PI / 2;
controls.minDistance = 10; 
controls.maxDistance = 30;

camera.position.x = 14.7;
camera.position.y = 8.2;
camera.position.z = 6.1;

if(sizes.width < 800){
    camera.position.x = 25;   
    camera.position.y = 8;    
    camera.position.z = 15;  
    controls.maxDistance = 30;
}

controls.target.set(-1, 3, -1.5); 
controls.update();

// GSAP Animations
function jumpObject(object) {
    gsap.timeline()
        .to(object.position, { 
            y: object.position.y+0.5, 
            duration: 0.3, 
            ease: "power2.out" 
        })
        .to(object.position, { 
            y: object.position.y, 
            duration: 0.3, 
            ease: "bounce.out" 
        });
}

function spinObject(object) {
    gsap.to(object.rotation, { 
        y: object.rotation.y + Math.PI * 2, 
        duration: 1, 
        ease: "power2.inOut" 
    });
}

function onResize(){
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
}
window.addEventListener("resize", onResize);

function onClick(event){
    event.preventDefault();

    let clientX, clientY;

    if (event.touches) {
        clientX = event.touches[0].clientX;
        clientY = event.touches[0].clientY;
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 2 - 1;
    const y = -((clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

    const intersects = raycaster.intersectObjects(intersectObjects, true);

    if (intersects.length > 0) {
        let obj = intersects[0].object;
        while(obj && !intersectObjectsNames.includes(obj.name)){
            obj = obj.parent;
        }

        if(!obj) return;

        const name = obj.name;

        if (name === "Portfolio") {
            popup.classList.toggle("hidden");
        } else if (name === "Github") {
            window.open('https://github.com/rfannn', '_blank');
        } else if (name === "TwitterX") {
            window.open('', '_blank');
        } else if (name === "Chair") {
            spinObject(obj);
        } else {
            jumpObject(obj);
        }
    }
}

window.addEventListener("pointerdown", onClick);

closePopupButton.addEventListener("click", () => {
    popup.classList.toggle('hidden');
});

closeWelcomeButton.addEventListener("click", () =>{
    welcome.classList.toggle('hidden');
});

function animate(){
    controls.update(); 
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();

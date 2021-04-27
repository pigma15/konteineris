let container;
let camera;
let scene;
let renderer;
let konteineris;
let dangtis;
let raycaster;
let mouse;
let objects = [];

function init() {
    container = document.querySelector('.container');
    scene =  new THREE.Scene();

    const fov = 55;
    const aspect = container.clientWidth / container.clientHeight;
    const near = 0.1;
    const far = 500;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 2, 4);
    camera.rotation.x = -0.3

    const ambient = new THREE.AmbientLight(0x404040, 5);
    scene.add(ambient);

    light = new THREE.DirectionalLight(`hsl(0, 0%, 50%)`, 2);
    light.position.set(-2, 4, 12);
    scene.add(light);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    container.appendChild(renderer.domElement);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    let loader = new THREE.GLTFLoader();
    loader.load('./3D/konteineris.glb', function(gltf) {
        scene.add(gltf.scene);
        konteineris = gltf.scene.getObjectByName( "konteineris" );
        dangtis = gltf.scene.getObjectByName( "dangtis" );
        objects.push(konteineris);
        animate();
    });
}


function animate (){
    raycaster.setFromCamera( mouse, camera );
    const intersects = raycaster.intersectObjects( objects );
    if (intersects.length > 0) {
        if (dangtis.rotation.x > -0.5) dangtis.rotation.x -= 0.01;
    } else {
        if(dangtis.rotation.x < 0) dangtis.rotation.x += 0.01;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

function onMouseMove( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}

window.addEventListener( 'mousemove', onMouseMove, false );

init();



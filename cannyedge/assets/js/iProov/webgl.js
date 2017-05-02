function IProovWebgl(iProov) {

    this.flash = new IProovWebglFlashes(iProov);
    this.uniform = new IProovWebglUniforms(iProov);
    this.shader = new IProovWebglShaders(iProov);

    this.scene = new THREE.Scene();
    this.sceneFlasher = new THREE.Scene();
    this.aspectRatio = iProov.screen.width / iProov.screen.height;

    this.camera = new THREE.PerspectiveCamera(100, this.aspectRatio, 0.1, 20000);
    this.renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    this.renderParameters = {minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, format: THREE.RGBFormat, stencilBuffer: false, generateMipmaps: false};
    this.renderEdge = new THREE.WebGLRenderTarget(iProov.screen.width, iProov.screen.height, this.renderParameters);
    this.renderDiffuse = new THREE.WebGLRenderTarget(iProov.screen.width, iProov.screen.height, this.renderParameters);

    this.supported = (function() {try {return !! window.WebGLRenderingContext && !! document.createElement('canvas').getContext('experimental-webgl');} catch(e) {return false;}})();

    this.clock = new THREE.Clock();

    this.start = function() {
        iProov.webgl.scene.add(iProov.webgl.camera);
        iProov.webgl.camera.position.set(0, 150, 400);
        iProov.webgl.camera.lookAt(iProov.webgl.scene.position);

        if (!iProov.webgl.supported) {
            iProov.console.log('WebGL not supported');
            return;
        }

        iProov.webgl.videoTexture = new THREE.VideoTexture(iProov.dom.video[0]);

        iProov.webgl.renderer.autoClear = false;
        iProov.webgl.renderer.setSize(iProov.screen.width, iProov.screen.height);
        iProov.webgl.renderer.domElement.id = 'iproov-webgl';
        iProov.dom.container.append(iProov.webgl.renderer.domElement);

        if(iProov.debug) {
            iProov.webgl.stats = new Stats();
            iProov.webgl.stats.domElement.style.position = 'absolute';
            iProov.webgl.stats.domElement.style.bottom = '0px';
            iProov.webgl.stats.domElement.style.zIndex = 100;
            iProov.dom.container.append(iProov.webgl.stats.domElement);
        }

        iProov.webgl.videoTexture.minFilter = THREE.LinearFilter;
        iProov.webgl.videoTexture.magFilter = THREE.LinearFilter;
        iProov.webgl.aspectRatio = Math.min(iProov.screen.width/iProov.screen.height * 1000 / 800, 1000 / 600);

        var geometry = new THREE.PlaneGeometry(800 * iProov.webgl.aspectRatio, 600 * iProov.webgl.aspectRatio, 1, 1);
        var material = new THREE.MeshBasicMaterial({map: iProov.webgl.videoTexture, overdraw: true, side: THREE.DoubleSide});
        var screen = new THREE.Mesh(geometry, material);

        screen.position.set(0, 0, 0);
        iProov.webgl.scene.add(screen);

        iProov.webgl.camera.position.set(0, 0, -400);
        iProov.webgl.camera.lookAt(screen.position);
        iProov.webgl.renderEdge.texture.generateMipmaps = false;

        iProov.webgl.render();
    };

    this.render  = function()
    {
        iProov.webgl.composer = new THREE.EffectComposer(iProov.webgl.renderer, iProov.webgl.renderEdge);
        var effect = new THREE.RenderPass(iProov.webgl.scene, iProov.webgl.camera);
        effect.renderToScreen = false;
        iProov.webgl.composer.addPass(effect);

        // TODO - implement blur options
        // BLUR
        // var blur = new THREE.ShaderPass(THREE.MedianFilter);
        // blur.uniforms.dim.value.copy(new THREE.Vector2(1.0 / iProov.screen.width, 1.0 / iProov.screen.height));
        // blur.renderToScreen = false;
        // iProov.webgl.composer.addPass(blur);

        var blurH = new THREE.ShaderPass(THREE.HorizontalBlurShader);
        iProov.webgl.composer.addPass(blurH);
        var blurV = new THREE.ShaderPass(THREE.VerticalBlurShader);
        // set this shader pass to render to screen so we can see the effects
        blurV.renderToScreen = false;
        iProov.webgl.composer.addPass(blurV);

        // TODO - Try these others edge detectors:
        // https://github.com/arefin86/arefin86.github.io/blob/master/js/shaders/sobelFilter.js
        // https://github.com/arefin86/arefin86.github.io/blob/master/js/shaders/FreiChen.js

        // CANNY
        var canny = new THREE.ShaderPass(THREE.CannyEdgeFilterPass);
        canny.renderToScreen = false;
        iProov.webgl.composer.addPass(canny);

        // INVERT
        var invert = new THREE.ShaderPass(THREE.InvertThreshholdPass);
        invert.renderToScreen = false;
        iProov.webgl.composer.addPass(invert);

        iProov.webgl.renderDiffuse = new THREE.WebGLRenderTarget(iProov.screen.width, iProov.screen.height, iProov.webgl.renderDiffuse.renderParameters);

        iProov.webgl.flasher = new THREE.EffectComposer(iProov.webgl.renderer, iProov.webgl.renderDiffuse);
        var renderDiffuse = new THREE.RenderPass(iProov.webgl.sceneFlasher, iProov.webgl.camera);
        renderDiffuse.renderToScreen = false;
        iProov.webgl.flasher.addPass(renderDiffuse);

        var blend = new THREE.ShaderPass(THREE.MultiplyBlendShader);
        blend.renderToScreen = false;
        blend.uniforms.tEdge.value = iProov.webgl.composer.renderTarget2.texture;
        blend.needsSwap = true;
        iProov.webgl.flasher.addPass(blend);

        var copy = new THREE.ShaderPass(THREE.CopyShader);
        copy.renderToScreen = true;
        iProov.webgl.flasher.addPass(copy);

        var geometryFlasher = new THREE.BoxGeometry(iProov.screen.width/iProov.screen.height * 1000, 1000);

        var materialFlasher = new THREE.ShaderMaterial({
            uniforms: iProov.webgl.uniform.flash,
            vertexShader: iProov.webgl.shader.flash.vertex,
            fragmentShader: iProov.webgl.shader.flash.fragment
        });

        var flasher = new THREE.Mesh(geometryFlasher, materialFlasher);

        if(iProov.webgl.sceneFlasher.children.length)
        {
            delete iProov.webgl.sceneFlasher.children[0];
            iProov.webgl.sceneFlasher.children.splice(0, 1);
        }

        iProov.webgl.sceneFlasher.add(flasher);
    }

    this.animate = function() {
        requestAnimationFrame(iProov.webgl.animate);

        var delta = iProov.webgl.clock.getDelta();
        iProov.webgl.uniform.flash.time.value += delta * iProov.webgl.flash.speed;

        iProov.webgl.renderer.render(iProov.webgl.scene, iProov.webgl.camera);
        iProov.webgl.stats.update();
        iProov.webgl.composer.render(0.5);
        iProov.webgl.flasher.render(0.5);
    };
}
function IProovWebglShaders(iProov) {

    this.shader = null;

    this.load = function(data) {
        iProov.webgl.shader = data;

        THREE.CopyShader = {
            uniforms: iProov.webgl.uniform.copy,
            vertexShader: iProov.webgl.shader.copy.vertex,
            fragmentShader: iProov.webgl.shader.copy.fragment
        };

        THREE.InvertThreshholdPass = {
            uniforms: iProov.webgl.uniform.invert,
            vertexShader: iProov.webgl.shader.invert.vertex,
            fragmentShader: iProov.webgl.shader.invert.fragment
        };

        THREE.CannyEdgeFilterPass = {
            uniforms: iProov.webgl.uniform.canny,
            vertexShader: iProov.webgl.shader.canny.vertex,
            fragmentShader: iProov.webgl.shader.canny.fragment
        };

        THREE.MultiplyBlendShader = {
            uniforms: iProov.webgl.uniform.blend,
            vertexShader: iProov.webgl.shader.blend.vertex,
            fragmentShader: iProov.webgl.shader.blend.fragment
        };

        THREE.HorizontalBlurShader = {
            uniforms: iProov.webgl.uniform.blur.gaussianH,
            vertexShader: iProov.webgl.shader.blurH.vertex,
            fragmentShader: iProov.webgl.shader.blurH.fragment
        };

        THREE.VerticalBlurShader = {
            uniforms: iProov.webgl.uniform.blur.gaussianV,
            vertexShader: iProov.webgl.shader.blurV.vertex,
            fragmentShader: iProov.webgl.shader.blurV.fragment
        };

        // THREE.ShaderMaterial = {
        //     uniforms: iProov.webgl.uniform.flash,
        //     vertexShader: iProov.webgl.shader.flash.vertex,
        //     fragmentShader: iProov.webgl.shader.flash.fragment
        // };

        // THREE.MedianFilter = {
        //     uniforms: iProov.webgl.uniform.blur.median,
        //     vertexShader: iProov.webgl.shader.blur.vertex,
        //     fragmentShader: iProov.webgl.shader.blur.fragment
        // };

        // http://homepages.inf.ed.ac.uk/rbf/CVonline/LOCAL_COPIES/MANDUCHI1/Bilateral_Filtering.html
        // https://github.com/szimek/webgl-hdr/

        // THREE.MedianFilter = {
        //     uniforms: iProov.webgl.uniform.blur.median,
        //     vertexShader: iProov.webgl.shader.blur.vertex,
        //     fragmentShader: iProov.webgl.shader.blur.fragment
        // };

        iProov.webgl.start();
        iProov.webgl.animate();
    }
}
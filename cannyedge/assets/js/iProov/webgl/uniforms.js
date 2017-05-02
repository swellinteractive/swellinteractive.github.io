function IProovWebglUniforms(iProov) {

    this.seeds = function() {
        var seeds = [];
        for(var i = 0; i < 5; i++) {
            seeds[i] = Math.random() * 1.6 - 0.8;
        }
        return seeds;
    };

    this.flash = {
        time: {type: 'f', value: 1.0},
        timeDiff: {type: 'f', value: 20.0},
        delta: {type: 'f', value: 0.15},
        seedsX: {type: 'fv1', value: this.seeds()},
        seedsY: {type: 'fv1', value: this.seeds()},
        thisR : {type: 'f', value: 0.0},
        thisG : {type: 'f', value: 0.0},
        thisB : {type: 'f', value: 0.0},
        nextR: {type: 'f', value: 0.0},
        nextG: {type: 'f', value: 0.0},
        nextB : {type: 'f', value: 0.0},
        start : {type: 'f', value: 0.0}
    };

    this.copy = {
        tDiffuse: {type: 't', value: null},
        opacity: {type: 'float', value: 1.0}
    };

    this.invert = {
        tDiffuse: {type: 't', value: null},
        threshold: {type: 'float', value: 0.99}, // Adjusts thickness of edges
        cannyR: {type: 'float', value: 1.0},
        cannyG: {type: 'float', value: 1.0},
        cannyB: {type: 'float', value: 1.0}
    };

    this.canny = {
        tDiffuse: {type: 't', value: null },
        uWindow: {type: 'v2', value: new THREE.Vector2(parseFloat(iProov.screen.width), parseFloat(iProov.screen.height))},
        hCrop: {type: 'float', value: Math.max(0, 0.5 - (iProov.screen.height / 600) / (iProov.screen.width / 800) / 2)},
        vCrop: {type: 'float', value: Math.max(0, 0.5 - (iProov.screen.width / 800) / (iProov.screen.height / 600) / 2)},
        swidth: {type: 'float', value: 1.0},
        threshold: {type: 'float', value: 0.42} // Adjusts number of edges
    };

    this.blend = {
        tDiffuse: {type: 't', value: null},
        tEdge: {type: 't', value: null}
    };

    this.blur = {
        median: {
            tDiffuse: {type: 't', value: null},
            dim: {type: 'v2', value: new THREE.Vector2(1.0 / 2048.0, 1.0 / 2048.0)}
        },
        bilateral: {
            tLuminanceMap: {type: 't', value: 0},
            uImageIncrement: {type: 'v2', value: new THREE.Vector2(1 / window.innerWidth, 0)},
            cKernel: {type: 'fv1', value: buildKernel(0.35 * Math.pow(1.6, 6))}
        },
        gaussianH: {
            tDiffuse: {type: 't', value: null},
            radius : {type : "float", value : 0.0},
            resolution: {float : "float", value : 1024.0},
            h: {type: 'float', value: 1.0 / 512.0}
        },
        gaussianV: {
            tDiffuse: {type: 't', value: null},
            radius : {type : "float", value : 0.0},
            resolution: {float : "float", value : 1024.0},
            v: {type: 'float', value: 1.0 / 512.0}
        }
    };
}


function buildKernel(sigma) {
    var kMaxKernelSize = 43,
        kernelSize = 43, // 2 * Math.ceil( sigma * 3.0 ) + 1,
        i;

    if ( kernelSize > kMaxKernelSize ) kernelSize = kMaxKernelSize;
    var halfWidth = ( kernelSize - 1 ) * 0.5;

    var values = new Array( kernelSize );
    var sum = 0.0;
    for( i = 0; i < kernelSize; ++i ) {
        values[ i ] = gauss( i - halfWidth, sigma );
        sum += values[ i ];
    }

    // normalize the kernel
    for( i = 0; i < kernelSize; ++i ) values[ i ] /= sum;

    return values;
}

function gauss(x, sigma) {
    // return 1.0 / (sigma * Math.sqrt(2 * Math.PI)) * Math.exp( - (x * x) / (2.0 * sigma * sigma));
    return Math.exp( - (x * x) / (2.0 * sigma * sigma));
}
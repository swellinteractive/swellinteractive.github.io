function IProovWebglFlashes(iProov) {

    this.speed = 75;

    this.colour = {
        r: 0.0,
        g: 0.0,
        b: 0.0
    };

    this.change = function(count) {
        iProov.webgl.uniform.flash.seedsX.value = iProov.webgl.uniform.seeds();
        iProov.webgl.uniform.flash.seedsY.value = iProov.webgl.uniform.seeds();

        iProov.webgl.uniform.flash.nextR.value = iProov.screen.code.r[count];
        iProov.webgl.uniform.flash.nextG.value = iProov.screen.code.g[count];
        iProov.webgl.uniform.flash.nextB.value = iProov.screen.code.b[count];

        // if(iProov.screen.code.r[count] == iProov.webgl.flash.colour.r && iProov.screen.code.g[count] == iProov.webgl.flash.colour.g && iProov.screen.code.b[count] == iProov.webgl.flash.colour.b) {
        //     iProov.webgl.flash.colour.r = 0.0;
        //     iProov.webgl.flash.colour.g = 0.0;
        //     iProov.webgl.flash.colour.b = 0.0;
        // }

        iProov.webgl.uniform.flash.thisR.value = iProov.webgl.flash.colour.r;
        iProov.webgl.uniform.flash.thisG.value = iProov.webgl.flash.colour.g;
        iProov.webgl.uniform.flash.thisB.value = iProov.webgl.flash.colour.b;
        iProov.webgl.uniform.flash.start.value = iProov.webgl.uniform.flash.time.value;

        // iProov.webgl.flash.colour.r = iProov.screen.code.r[count];
        // iProov.webgl.flash.colour.g = iProov.screen.code.g[count];
        // iProov.webgl.flash.colour.b = iProov.screen.code.b[count];

        // TODO - not working
        iProov.webgl.uniform.invert.cannyR.value = 0.85;
        iProov.webgl.uniform.invert.cannyG.value = 0.5;
        iProov.webgl.uniform.invert.cannyB.value = 0.5;

        // iProov.webgl.render();
    };
}
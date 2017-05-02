/**
 * Represents an Iproov object.
 * @constructor
 */


function IProov() {

    this.debug = true;

    this.dom = {
        container: $('#ThreeJS'),
        canvas: null,
        video: $('#iproov-video'),
        webgl: null,
        svg: null
    };

    this.screen = new IProovScreen(this);
    this.webgl = new IProovWebgl(this);
    this.console = new IProovConsole(this);

    this.start = function() {
        SHADER_LOADER.load(iProov.webgl.shader.load);
    }

}
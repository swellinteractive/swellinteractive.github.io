//#gljs varname: 'iProov.webgl.shader.flash.fragment', type: 'fragment'

varying vec2 vUv;

uniform float nextR;
uniform float nextG;
uniform float nextB;

void main(void) {
    vec2 position = -1.0 + 2.0 * vUv;
    gl_FragColor = vec4(nextR, nextG, nextB, 1.0);
}
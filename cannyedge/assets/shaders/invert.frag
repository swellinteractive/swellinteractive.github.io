//#gljs varname: 'iProov.webgl.shader.invert.fragment', type: 'fragment'

uniform sampler2D tDiffuse;
uniform float threshold;
uniform float cannyR;
uniform float cannyG;
uniform float cannyB;

varying vec2 vUv;

void main() {
    vec4 colorSum = texture2D(tDiffuse, vUv);
    vec4 invert = vec4(1.0 - colorSum.r, 1.0 - colorSum.g, 1.0 - colorSum.b, 1.0);
    vec3 colour;

    if(invert.r < threshold || invert.g < threshold || invert.b < threshold) {
    	colour = vec3(cannyR, cannyG, cannyB);
    } else {
    	colour = vec3(0.0, 0.0, 0.0);
    }

    gl_FragColor = vec4(colour, 1.0);
}
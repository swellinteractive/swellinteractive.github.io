//#gljs varname: 'iProov.webgl.shader.blur.fragment', type: 'fragment'

uniform sampler2D tDiffuse;
uniform vec2 dim;

varying vec2 vUv;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / dim;
    vec4 colorSum = 	
    	texture2D(tDiffuse, vUv + ( onePixel * vec2(-1.0, -1.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2( 0.0, -1.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2( 1.0, -1.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2(-1.0,  0.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2( 0.0,  0.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2( 1.0,  0.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2(-1.0,  1.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2( 0.0,  1.0))) * 1.0 + 
    	texture2D(tDiffuse, vUv + ( onePixel * vec2( 1.0,  1.0))) * 1.0;

    gl_FragColor = vec4(colorSum.rgb / 9.0, 1.0);
}
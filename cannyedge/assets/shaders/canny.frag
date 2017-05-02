//#gljs varname: 'iProov.webgl.shader.canny.fragment', type: 'fragment'

uniform sampler2D tDiffuse;
uniform vec2 uWindow;
uniform float hCrop;
uniform float vCrop;
uniform float threshold;
uniform float swidth;

varying vec3 vWorldPosition;
varying float x;
varying float y;
varying vec2 vUv;

void main() {
    
    vec2 offset = swidth / (uWindow / threshold);
	vec2 right = vUv + vec2(offset.x, 0.0);
	vec2 left = vUv + vec2(-offset.x, 0.0);
	vec2 top = vUv + vec2(0.0, offset.y);
	vec2 bottom = vUv + vec2(0.0, -offset.y);
	vec2 gradient = vec2(length(texture2D(tDiffuse, right).xyz - texture2D(tDiffuse, left).xyz), length(texture2D(tDiffuse, top).xyz - texture2D(tDiffuse, bottom).xyz));

    if((vUv.x < hCrop) || (vUv.x > 1.0 - hCrop) || (vUv.y < vCrop) || (vUv.y > 1.0 - vCrop)) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        gl_FragColor = vec4(length(gradient));
    }
}
//#gljs varname: 'iProov.webgl.shader.blurV.fragment', type: 'fragment'

uniform sampler2D tDiffuse;
uniform float v;
uniform float resolution;
uniform float radius;

varying vec2 vUv;

void main() {

    vec4 sum = vec4( 0.0 );

    float blur = radius/resolution;

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * blur ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * blur ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * blur ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * blur ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * blur ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * blur ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * blur ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * blur ) ) * 0.051;

    gl_FragColor = sum;

}
//#gljs varname: 'iProov.webgl.shader.blend.fragment', type: 'fragment'

uniform sampler2D tDiffuse;
uniform sampler2D tEdge;

varying vec2 vUv;

void main() {
    vec4 diffuse = texture2D(tDiffuse, vUv);
    vec4 edge = texture2D(tEdge, vUv);

    gl_FragColor = diffuse + edge;
}
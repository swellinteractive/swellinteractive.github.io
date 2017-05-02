//#gljs varname: 'iProov.webgl.shader.normal.fragment', type: 'fragment'

varying vec3 vNormal;

void main(void) {
    gl_FragColor = vec4(0.5 * normalize(vNormal) + 0.5, 1.0);
}
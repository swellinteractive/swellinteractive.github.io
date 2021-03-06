//#gljs varname: 'iProov.webgl.shader.normal.fragment', type: 'fragment'

varying vec3 vNormal;

void main() {
    vNormal = normalize(normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
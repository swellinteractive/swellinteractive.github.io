//#gljs varname: 'iProov.webgl.shader.canny.vertex', type: 'vertex'

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
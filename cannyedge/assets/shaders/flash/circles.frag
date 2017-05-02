//#gljs varname: 'iProov.webgl.shader.flash.fragment', type: 'fragment'

#define FREQ_R 3.0
#define FREQ_G 4.0
#define FREQ_B 5.0
#define SIGMOID_A 10.0
#define SIGMOID_B 10.0
#define SCALE_FACTOR 0.2

uniform float time;
uniform float timeDiff;
uniform float delta;
uniform float seedsX[10];
uniform float seedsY[10];
uniform float thisR;
uniform float thisG;
uniform float thisB;
uniform float nextR;
uniform float nextG;
uniform float nextB;
uniform float start;

varying vec2 vUv;

float dist(float x, float y) {

    float distance = 10.0;

    for(int i = 0; i < 10; i++) {
        distance = min(pow(pow(x - seedsX[i], 2.0) + pow(y - seedsY[i], 2.0), 0.5), distance);
    }

    return distance;
}

void main(void) {

    vec2 position = -1.0 + 2.0 * vUv;

    float r = 0.0;
    float g = 0.0;
    float b = 0.0;

    if(start > 0.0) {
        float d = dist(position.x, position.y) + delta;
        float t = time - start;

        r = (1.0 / (1.0 + exp(-1.0 * SIGMOID_A * (FREQ_R * SCALE_FACTOR * d * t) + SIGMOID_B))) * ((nextR - thisR)) + thisR;
        g = (1.0 / (1.0 + exp(-1.0 * SIGMOID_A * (FREQ_G * SCALE_FACTOR * d * t) + SIGMOID_B))) * ((nextG - thisG)) + thisG;
        b = (1.0 / (1.0 + exp(-1.0 * SIGMOID_A * (FREQ_B * SCALE_FACTOR * d * t) + SIGMOID_B))) * ((nextB - thisB)) + thisB;

        if(time - start > timeDiff) {
            r = nextR;
            g = nextG;
            b = nextB;
        }
    }

    gl_FragColor = vec4(r, g, b, 1.0);
}
# Canny Edge Detection with Screen Transitions

We are in the process of replacing the iProov Flash client with an HTML5 implementation using WebRTC for streaming and WebGL for part of the user interface.

A demo of the existing Flash client can be seen at the bottom of this page:

https://www.waterloobank.co.uk/registration

This repo has a proof-of-concept implementation of applying Canny edge detection to the webcam output and flashing the screen with a sequences of colours. It makes use of parts of these open source projects:

## Webcam to texture

Demo: https://stemkoski.github.io/Three.js/Webcam-Texture.html
Code: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Webcam-Texture.html

## Canny edge detection

Demo: http://ar3f.in/goochShading.html
Code: https://github.com/arefin86/arefin86.github.io/tree/master/js/shaders

The existing transition effect we have developed and we will need to support a range of different transitions controlled trough JavaScript.

The specific tasks that are required are detailed in the [GitHub Issues](https://github.com/iProov/canny-flasher/issues).

## Notes

- For phase 1, this only needs to work in the latest 3 versions of Chrome
- Chrome blocks access to the webcam unless the page uses SSL or is on localhost
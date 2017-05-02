function IProovScreen(iProov) {

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.code = {
        r: [0, 1, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        g: [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0],
        b: [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
    };

}
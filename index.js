const initCanvas = () => {
    let ctx = document.getElementById("my_canvas").getContext("2d");
    let backgroundImage = new Image();
    let naveImage = new Image();
    let enemypic1 = new Image();
    let enemypic2 = new Image();

    backgroundImage.src = "imagenes/background-pic.jpg";
    naveImage.src = "imagenes/spaceship-pic.png";
    enemypic1.src = "imagenes/enemigo1.png";
    enemypic2.src = "imagenes/enemigo2.png";

    let ctxWidth = ctx.canvas.width;
    let ctxHeight = ctx.canvas.height;

    const enemyTemplate = (options) => {
        return {
            id: options.id || "",
            xPos: options.x || "",
            yPos: options.y || "",
            w: options.w || "",
            h: options.h || "",
            image: options.image || enemypic1,
        }
    }

    let enemies = [
        enemyTemplate({id: "1", x: 100, y: -20, w: 50, h: 30,}),
        enemyTemplate({id: "2", x: 225, y: -20, w: 50, h: 30,}),
        enemyTemplate({id: "3", x: 350, y: -20, w: 80, h: 30,}),
        enemyTemplate({id: "4", x: 100, y: -70, w: 80, h: 30,}),
        enemyTemplate({id: "5", x: 225, y: -70, w: 50, h: 30,}),
        enemyTemplate({id: "6", x: 350, y: -70, w: 50, h: 30,}),
        enemyTemplate({id: "7", x: 475, y: -70, w: 50, h: 30,}),
        enemyTemplate({id: "8", x: 600, y: -70, w: 80, h: 30,}),
        enemyTemplate({id: "9", x: 475, y: -20, w: 50, h: 30,}),
        enemyTemplate({id: "10", x: 600, y: -20, w: 50, h: 30,}),

        enemyTemplate({id: "11", x: 100, y: -220, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "12", x: 225, y: -220, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "13", x: 350, y: -220, w: 80, h: 30, image: enemypic2}),
        enemyTemplate({id: "14", x: 100, y: -270, w: 80, h: 30, image: enemypic2}),
        enemyTemplate({id: "15", x: 225, y: -270, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "16", x: 350, y: -270, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "17", x: 475, y: -270, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "18", x: 600, y: -270, w: 80, h: 30, image: enemypic2}),
        enemyTemplate({id: "19", x: 475, y: -200, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "20", x: 600, y: -200, w: 50, h: 30, image: enemypic2}),
    ];
}

window.addEventListener("load", (event) => {
    initCanvas();
})
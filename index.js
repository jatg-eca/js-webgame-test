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

    function enemyTemplate (options) {
        return {
            id: options.id || "",
            x: options.x || "",
            y: options.y || "",
            w: options.w || "",
            h: options.h || "",
            image: options.image || enemypic1,
        }
    }

    let enemies = [
        enemyTemplate({id: "1", x: 100, y: -20, w: 50, h: 30,}),
        enemyTemplate({id: "2", x: 225, y: -20, w: 50, h: 30,}),
        enemyTemplate({id: "3", x: 300, y: -20, w: 80, h: 30,}),
        enemyTemplate({id: "4", x: 100, y: -70, w: 80, h: 30,}),
        enemyTemplate({id: "5", x: 225, y: -70, w: 50, h: 30,}),
        enemyTemplate({id: "6", x: 300, y: -70, w: 50, h: 30,}),
        enemyTemplate({id: "7", x: 475, y: -70, w: 50, h: 30,}),
        enemyTemplate({id: "8", x: 600, y: -70, w: 80, h: 30,}),
        enemyTemplate({id: "9", x: 475, y: -20, w: 50, h: 30,}),
        enemyTemplate({id: "10", x: 600, y: -20, w: 50, h: 30,}),

        enemyTemplate({id: "11", x: 100, y: -220, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "12", x: 225, y: -220, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "13", x: 300, y: -220, w: 80, h: 30, image: enemypic2}),
        enemyTemplate({id: "14", x: 100, y: -270, w: 80, h: 30, image: enemypic2}),
        enemyTemplate({id: "15", x: 225, y: -270, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "16", x: 300, y: -270, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "17", x: 475, y: -270, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "18", x: 600, y: -270, w: 80, h: 30, image: enemypic2}),
        enemyTemplate({id: "19", x: 475, y: -200, w: 50, h: 30, image: enemypic2}),
        enemyTemplate({id: "20", x: 600, y: -200, w: 50, h: 30, image: enemypic2}),
    ];

    const renderEnemies = (enemies) => {
        for(let enemy of enemies) {
            //render
            ctx.drawImage(enemy.image, enemy.x, enemy.y += .5, enemy.w, enemy.h);
            //detecta si colisiona con jugador_
            launcher.enemyHitsPlayer(enemy);

        }
    }

    const Launcher = function() {
        this.y = 400,
        this.x = ctxWidth * .5 - 50,
        // this.x = ctxWidth * .5,
        this.w = 100,
        this.h = 100,
        this.direccion,
        this.bg = "white",
        this.misiles = []

        this.gameStatus = {
            over: false,
            message: "",
            fillStyle: "white",
            font: "italic bold 36px Arial, sans-serif",
        }

        this.render = () => {
            if(this.direccion === "left") {
                this.x -= 5;
            }
            else if(this.direccion === "right") {
                this.x += 5;
            }
            else if(this.direccion === "downArrow") {
                this.y += 5;
            }
            else if(this.direccion === "upArrow") {
                this.y -= 5;
            }

            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 0, 0) //fondo canvas
            ctx.drawImage(naveImage, this.x, this.y, 100, 90); // nave aliada

            for(let idx = 0; idx<this.misiles.length; idx++) {
                let misil = this.misiles[idx]
                ctx.fillRect(misil.x, misil.y -= 5, misil.w, misil.h); //direccion misil
                this.hitDetect(misil, idx);
                if(misil.y <= 0) {
                    this.misiles.splice(idx, 1);
                }
            }

            if(enemies.length === 0) {
                clearInterval(animateInterval); // termina juego
                ctx.font = this.gameStatus.font;
                ctx.fillText("Has ganao", ctxWidth*.5-80, 50);
            }
        }

        //funcion de impactos de misil
        this.hitDetect = function(misil, misilIdx) {
            for(let i = 0; i < enemies.length; i++) {
                let enemy = enemies[i];
                if((misil.x + misil.w) >= enemy.x &&
                    misil.x <= enemy.x + enemy.w && 
                    misil.y >= enemy.y &&
                    misil.y <= enemy.y + enemy.h) {
                        this.misiles.splice(this.misiles[misilIdx], 1); // eliminar misil
                        enemies.splice(i, 1); //eliminar nave enemiga
                        document.querySelector(".barra")
                        .textContent = "Enemigos destruidos: " + (20 - (enemies.length))  + " " ;
                    }
            }
        }

        this.enemyHitsPlayer = function(enemy) {
            if(enemy.y > ctxHeight - 50) {
                this.gameStatus.over = true;
                this.gameStatus.message = "¡Los enemigos han pasao!"
            }
            
            if(
                (enemy.y < this.y + 25 && enemy.y > this.y - 25) &&
                (enemy.x < this.x + 50 && enemy.x > this.x - 50)
            ) {
                    this.gameStatus.over = true;
                    this.gameStatus.message = "¡Chocao!"
            }

            if(this.gameStatus.over) {
                clearInterval(animateInterval);
                document.querySelector(".barra").textContent = "GameOver"
                ctx.fillStyle = this.gameStatus.fillStyle;
                ctx.font = this.gameStatus.font;
                ctx.fillText(this.gameStatus.message, ctxWidth * .5 - 140, 50);
            }
        }
    }
    
    let launcher = new Launcher();

    const animate = () => {
        ctx.clearRect(0, 0, ctxWidth, ctxHeight);
        launcher.render();
        renderEnemies(enemies);
    }

    let animateInterval = setInterval(animate, 6);

    //controles
    let leftBtn = document.getElementById("left-btn");
    let rightBtn = document.getElementById("right-btn")
    let fireBtn = document.getElementById("fire-btn")
    let resetBtn = document.getElementById("reset-btn")

    fireBtn.addEventListener("click", (event) => {
        launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3, h: 10});
    })

    leftBtn.addEventListener("mousedown", (event) => {
        launcher.direccion = "left";
    })
    leftBtn.addEventListener("mouseup", (event) => {
        launcher.direccion = "";
    })

    rightBtn.addEventListener("mousedown", (event) => {
        launcher.direccion = "right";
    })
    rightBtn.addEventListener("mouseup", (event) => {
        launcher.direccion = "";
    })

    resetBtn.addEventListener("mouseup", (event) => {
        location.reload();
    })


    window.addEventListener("keydown", (event) => {
        const {key} = event;
        console.log(event)
        if(key == ' ') {
            fireBtn.click()
        }
        if(key == "ArrowLeft") {
            launcher.direccion = "left"
            if(launcher.x < ctxWidth*.2 - 100) {
                launcher.x += 0;
                launcher.direccion = "";
            }
        }
        if(key == "ArrowRight") {
            launcher.direccion = "right"
            if(launcher.x > ctxWidth - 110) {
                launcher.x -= 0;
                launcher.direccion = "";
            }
        }
        if(key == "ArrowUp") {
            launcher.direccion = "upArrow"
            if(launcher.y < ctxHeight*.2 - 80) {
                launcher.y += 0;
                launcher.direccion = "";
            }
        }
        if(key == "ArrowDown") {
            launcher.direccion = "downArrow"
            if(launcher.y > ctxHeight-110) {
                launcher.y -= 0;
                launcher.direccion = "";
            }
        }
    })
    window.addEventListener("keyup", (event) => {
        const {key} = event;
        console.log(event)
        if(key == ' ') { }
        if(key == "ArrowLeft") {
            launcher.x +=0;
            launcher.direccion = ""
        }
        if(key == "ArrowRight") {
            launcher.x -=0;
            launcher.direccion = ""
        }
        if(key == "ArrowUp") {
            launcher.y +=0;
            launcher.direccion = ""
        }
        if(key == "ArrowDown") {
            launcher.y -=0;
            launcher.direccion = ""
        }
    })

}

window.addEventListener("load", (event) => {
    initCanvas();
})
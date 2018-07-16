function Canvas() {

    // Initialisation
    this.init = function () {
        this.insert();
        // Réglages de canvas
        var context = canvas.getContext("2d");


        var clickX = new Array();
        var clickY = new Array();
        var clickDrag = new Array();
        var paint;

        canvas.addEventListener("mousedown", mouseDown, false);
        canvas.addEventListener("mousemove", mouseXY, false);

        document.body.addEventListener("mouseup", mouseUp, false);


        //For Mobile
        canvas.addEventListener("touchstart", mouseDown, false);
        canvas.addEventListener("touchmove", mouseXY, true);
        canvas.addEventListener("touchend", mouseUp, false);

        document.body.addEventListener("touchcancel", mouseUp, false);

        function redraw() {
            context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas

            context.strokeStyle = "#000000";
            context.lineJoin = "round";
            context.lineWidth = 2;

            for (var j = 0; j < clickX.length; j++) {
                context.beginPath();
                if (clickDrag[j] && j) {
                    context.moveTo(clickX[j - 1], clickY[j - 1]);
                } else {
                    context.moveTo(clickX[j] - 1, clickY[j]);
                }
                context.lineTo(clickX[j], clickY[j]);
                context.closePath();
                context.stroke();
            }
        }


        function mouseDown(e) {
            var mouseX = e.pageX - this.offsetLeft;
            var mouseY = e.pageY - this.offsetTop;

            paint = true;
            addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            redraw();
        }

        function mouseUp() {
            paint = false;
        }

        function mouseXY(e) {
            if (paint) {
                addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                redraw();
            }
        }

        function addClick(x, y, dragging) {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
        }


    };


    this.insert = function () {

        var canvas = document.createElement("CANVAS");
        canvas.id = "canvas";
        canvas.style.width = "30%";
        canvas.style.height = "100px";
        
        /*var eraser = document.createElement("INPUT");
        eraser.id ="eraser";
        eraser.type = "button";
        eraser.value = "Effacer";
        eraser.onclick = "redraw()";*/
        
        // SI canvas n'existe pas , ajouter le à blocInfo SINON ne rien faire 
        if (!document.getElementById("canvas")) {

            document.getElementById("blocButton").appendChild(canvas);
            //document.getElementById("blocButton").appendChild(eraser);
        }
        
        

        var confirm = document.createElement("INPUT");
        confirm.id = "confirm";
        confirm.type = "button";
        confirm.value = "Confirmer";
        

        // Quand clique sur Canvas , afficher bouton confirmer

        canvas.addEventListener('click', function () {
            if (!document.getElementById("confirm")) {

                document.getElementById("blocButton").appendChild(confirm);
            }

        })
        
        confirm.addEventListener('click', function () {

            var velo = new maReservation();
            velo.init();
        });
    }
}




self.context = this.canvas.getContext("2d");

        $('canvas').mousedown(function (e) {
            self.mouseX = e.pageX - this.offsetLeft;
            self.mouseY = e.pageY - this.offsetTop;

            self.paint = true;
            self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
            self.redraw();
        });

        $('canvas').mousemove(function (e) {
            if (self.paint) {
                self.addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
                self.redraw();
            }
        });

        $('canvas').mouseup(function (e) {
            self.paint = false;
        });

        $('canvas').mouseleave(function (e) {
            self.paint = false;
        });

        self.clickX = new Array();
        self.clickY = new Array();
        self.clickDrag = new Array();
        self.paint;


    };

    this.addClick = function (x, y, dragging) {
        self.clickX.push(x);
        self.clickY.push(y);
        self.clickDrag.push(dragging);
    }

    this.redraw = function () {
        self.context.clearRect(0, 0, self.context.canvas.width, self.context.canvas.height); // Clears the canvas

        self.context.strokeStyle = "#afe54f";
        self.context.lineJoin = "round";
        self.context.lineWidth = 2;

        for (var i = 0; i < self.clickX.length; i++) {
            self.context.beginPath();
            if (self.clickDrag[i] && i) {
                self.context.moveTo(self.clickX[i - 1], self.clickY[i - 1]);
            } else {
                self.context.moveTo(self.clickX[i] - 1, self.clickY[i]);
            }
            self.context.lineTo(self.clickX[i], self.clickY[i]);
            self.context.closePath();
            self.context.stroke();
        }
    }
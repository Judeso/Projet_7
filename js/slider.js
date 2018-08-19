function Slider() {

    var self = this;


    // Initialise l'objet
    this.init = function () {

        self.i = 0;
        self.imgArray = [];
        self.myImg;


        console.log(Array.isArray(self.imgArray));

        var imageUn = new Image();
        imageUn.src = 'welcome.jpg';
        self.imgArray.push(imageUn);

        var imageDeux = new Image();
        imageDeux.src = 'img_marker.png';
        self.imgArray.push(imageDeux);

        var imageTrois = new Image();
        imageTrois.src = 'img_etape.png';
        self.imgArray.push(imageTrois);

        self.insert();





        // Gestion du diaporama avec touche 
        document.addEventListener('keydown', function (e) {
            var key = e.keyCode;

            if ((key === 37) && (self.i > 0)) {
                self.i--;
                self.myImg.src = self.imgArray[self.i].src;
                console.log("valeur de l'indice" + self.i);


            } else if ((key === 39) && (self.i < 2)) {
                self.i++;

                self.myImg.src = self.imgArray[self.i].src;
                console.log("valeur de l'indice" + self.i);
                console.log(self.total)

            }
        })

    }

    // Insertion DOM
    self.insert = function () {


        self.myImg = document.createElement("IMG");
        self.myImg.src = self.imgArray[self.i].src;


        document.getElementById("slider").appendChild(self.myImg);


    }

    self.slideControl = function () {
        var prec = document.getElementById('prec');
        var nxt = document.getElementById('nxt');

        prec.addEventListener('click', function () {
            if(self.i !== 0) {
            self.i--;
            }
            self.myImg.src = self.imgArray[self.i].src;
            console.log("valeur de l'indice" + self.i);
        })

        nxt.addEventListener('click', function () {
            if(self.i !== 2) {
            self.i++;
            }
            
            self.myImg.src = self.imgArray[self.i].src;
            console.log("valeur de l'indice" + self.i);
            console.log(self.total)
        })
    }


};

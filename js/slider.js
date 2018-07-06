function Slider() {
    
    var self = this;


    // Initialise l'objet
    this.init = function () {

        self.i = 0;
        self.imgArray = [];
        self.myImg;


        console.log(Array.isArray(this.imgArray));

        var imageUn = new Image();
        imageUn.src = 'welcome.jpg';
        self.imgArray.push(imageUn);

        var imageDeux = new Image();
        imageDeux.src = 'img_marker.png';
        self.imgArray.push(imageDeux);

        var imageTrois = new Image();
        imageTrois.src = 'vélo.jpg';
        self.imgArray.push(imageTrois);

        self.insert();
        self.total = self.imgArray.length;
        
        console.log(imageDeux.src)

        // Gestion du diaporama avec touche 
        document.addEventListener('keydown', function (e) {
            var key = e.keyCode;
           
            if ((key === 37) && (self.i > 0)) {
                
                self.myImg.src = self.imgArray[self.i--].src;
                console.log("valeur de l'indice" + self.i);

                
            } else if ((key === 39) && (self.i <= ())) {
                
                
                self.myImg.src = self.imgArray[self.i++].src;
                console.log("valeur de l'indice" + self.i);
                console.log(self.total)

                }
        })

    }

    // Insertion DOM
    self.insert = function () {

        var sliderElt = document.createElement("div");
        sliderElt.id = "slider";

        self.myImg = document.createElement("IMG");
        self.myImg.src = self.imgArray[self.i].src;

        document.body.appendChild(sliderElt);
        document.getElementById("slider").appendChild(self.myImg);


    };


};

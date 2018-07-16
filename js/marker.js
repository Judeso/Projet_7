function MarkerClusterer() {
    var self = this;

    this.init = function () {

        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=90d56fda9dae12541b7880cee24755e11513db5c", function (reponse) {

            var statMark = new Array();

            statMark = JSON.parse(reponse);
            var iconImage = "cycling.png";



            // Ouverture boucle marker
            for (var z = 0; z < statMark.length; z++) {

                var position = statMark[z].position;
                var latLng = new google.maps.LatLng(position);
                var name = statMark[z].name;
                createMarker(z, latLng);
            }

            // Initialiser marker
            function createMarker(z, latLng) {
                var Marker = new google.maps.Marker({
                    position: latLng,
                    map: map,
                    name: name,
                    animation: google.maps.Animation.DROP,
                    id: z,
                    icon: iconImage
                });



                // Ouverture infobulle
                Marker.addListener('click', function () {

                    blocInfo.innerHTML = contentInfo;


                    if (statMark[z].available_bikes === 0) {
                        document.getElementById("blocInfo").appendChild(self.indispo);
                    } else {
                        document.getElementById("blocInfo").appendChild(self.blocButton);
                        document.getElementById("blocButton").appendChild(self.reservation);
                    }

                })


                // Contenu Infobulle
                var contentInfo = '<div id="contentInfo">' +
                    '<h1 id="infoTitle">' + statMark[z].name + '</h1>' +
                    '<div id="paragraphe">' +
                    '<p>Adresse : ' + statMark[z].address + '-' + statMark[z].contract_name + '</p>' +
                    '<p>Statut : ' + statMark[z].status + '</p>' +
                    '<p>Vélos Total : ' + statMark[z].bike_stands + '</p>' +
                    '<p>Vélos restants : ' + statMark[z].available_bikes + '</p>' +
                    '<p>Vélos réservés : ' + statMark[z].available_bike_stands + '</p>' + '</div' +
                    '</div>';
                document.getElementById("blocMap").appendChild(this.blocInfo);
            }
        })

        
    }



    this.insert = function () {
        self.blocInfo = document.getElementById("blocInfo");

        var Info = "<p id ='info'>Cliquez <br/> sur un marqueur pour afficher les informations de la station associée !</p>";
        self.blocInfo.innerHTML = Info;

        self.indispo = document.createElement("p");
        self.indispo.id = "indispo";
        self.indispo.textContent = "Il n'y à plus de vélo disponible à cette station";
        
        self.blocButton = document.createElement("div");
        self.blocButton.id = "blocButton";
        

        // Création bouton reserver
        this.reservation = document.createElement("INPUT");
        this.reservation.id = "reservation";
        this.reservation.type = "button";
        this.reservation.value = "Réserver";

        // quand clique sur bouton , Canvas apparait
        this.reservation.addEventListener('click', function () {
            var canvas = new Canvas();
            canvas.init();
            
        })
    }
}

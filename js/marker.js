function MarkerClusterer() {
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
                document.getElementById("blocInfo").appendChild(reservation);
                
            });

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
            document.getElementById("blocMap").appendChild(blocInfo);

        }

    })

    var blocInfo = document.createElement("div");
    blocInfo.id = "blocInfo";
    var Info = "<p id ='info'>Cliquez <br/> sur un marqueur pour afficher les informations de la station associé !</p>";
    blocInfo.innerHTML = Info;

    // Création bouton reserver
    var reservation = document.createElement("INPUT");
    reservation.id = "reservation";
    reservation.type = "button";
    reservation.value = "Réserver";

    // quand clique sur bouton , Canvas apparait
    reservation.addEventListener('click', function () {
        var canvas = new Canvas();
        canvas.init();
    })
}

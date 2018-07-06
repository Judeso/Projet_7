// Création de la div contenu
var contenuElt = document.createElement("div");
contenuElt.id = "content";
document.body.appendChild(contenuElt);


// Ajout du titre dans contenu
var titreElt = document.createElement("h1");
titreElt.id = "mainTitle";
titreElt.textContent = "Locations de Velos";
titreElt.style.textAlign = "center";
titreElt.style.backgroundColor = "aqua";
titreElt.style.color = "white";
titreElt.style.border = "5px solid aqua";
document.getElementById("content").appendChild(titreElt);


// Diaporama controlable
var slider = document.createElement("div");
slider.id = "slider";
slider.style.width = "100%";
slider.style.height = "450px";
document.getElementById("content").appendChild(slider);

// Div contenu slider
var slideContent = document.createElement("div");
slideContent.id = "slideContent";
slideContent.style.width = "100%";
slideContent.style.height = "450px";

document.getElementById("slider").appendChild(slideContent);


var imgArray = [];

var imageUn= new Image();
imageUn.src = 'welcome.jpg';
imgArray.push(imageUn);
var imageDeux = new Image();
imageDeux.src = 'bike.png';
imgArray.push(imageDeux);
var imageTrois= new Image();
imageTrois.src = 'vélo.jpg';
imgArray.push(imageTrois);

var i = 0;

var myImg = document.createElement("IMG");
myImg.src = imgArray[i].src;
myImg.id = "myImg";
myImg.style.width = "100%";
myImg.style.height = "450px";
document.getElementById("slideContent").appendChild(myImg); // L'image est ajoutée au DOM

// Gestion du diaporama avec touche 
window.onkeydown = function (e) {
    var key = e.keyCode;
    
    if ((key === 37) && (i > 0)) {
            myImg.src = imgArray[i - 1].src;
        i = i - 1;
    
    }else if ((key === 39) && (i <= imgArray.length)) {
            myImg.src = imgArray[i++].src;
        i = i++;
        
    }};



var blocMap = document.createElement("div");
blocMap.id = "blocMap";
blocMap.style.width = "100%";
blocMap.style.height = "500px";
blocMap.style.backgroundColor = "#CED8F6";
document.body.appendChild(blocMap);


// Carte Gmap velo'v
var map = document.createElement("div");
map.id = "map";
map.style.width = "50%";
map.style.height = "100%";
document.getElementById("blocMap").appendChild(map);
 
function initMap() {
    var lyon ={lat: 45.750000, lng: 4.850000};
map = new google.maps.Map(document.getElementById('map'), {
     center: lyon,
    zoom: 15
});


ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=90d56fda9dae12541b7880cee24755e11513db5c", function (reponse) {
    
    var statMark = new Array();
        
    statMark = JSON.parse(reponse);
    var iconImage = "cycling.png";
 

    // Ouverture boucle marker
    for(var z = 0; z < statMark.length; z++) {
        
        var position = statMark[z].position;
        var latLng = new google.maps.LatLng(position);
        var name = statMark[z].name;
        createMarker(z, latLng);
    }
            
        // Initialiser marker
   function createMarker(z, latLng) {
        var marker = new google.maps.Marker({
        position: latLng,
        map: map,
        name: name,
        animation: google.maps.Animation.DROP,
        id: z,
        icon: iconImage
        });
               
        
        
        // Ouverture infobulle
        marker.addListener( 'click', function() {
        
        blocInfo.innerHTML = contentInfo;
        document.getElementById("blocInfo").appendChild(reservation);
        });
        
         // Contenu Infobulle
        var contentInfo = '<div id="contentInfo">' +
        '<h1 id="infoTitle">' + statMark[z].name + '</h1>'+
        '<p>Adresse : ' + statMark[z].address + '-' + statMark[z].contract_name + '</p>' +
        '<p>Statut : ' + statMark[z].status + '</p>' +
        '<p>Vélos Total : ' + statMark[z].bike_stands + '</p>' + 
        '<p>Vélos restants : ' + statMark[z].available_bikes + '</p>' + 
        '<p>Vélos réservés : ' + statMark[z].available_bike_stands + '</p>' + 
        '</div>';
        
       // lancement marker 
       marker.setMap(map); 
       
       

    //Création de bouton Confirmer
    var confirm = document.createElement("INPUT");
    confirm.id = "confirm";
    confirm.type = "button";
    confirm.value = "Confirmer";
    confirm.style.width = "25%";
    confirm.style.height = "100px";
    confirm.style.backgroundColor = "red";
    confirm.style.color = "white";
    confirm.style.border = "1px solid red";
    confirm.style.float = "right";
    // Event sur bouton confirmer pour afficher reservation
    confirm.addEventListener('click', function () {
        var time = document.createElement("span");
        time.id = "time";
        time.textContent = "20:00";

        
    var twentyMinutes = 60 * 20,
        display = document.querySelector('#time');
    startTimer(twentyMinutes, display);
    
  
        function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        time.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            blocReserv.textContent = "Votre Réservation à éxpiré ! ";
            time.textContent = "Expiré";
            
        }
    }, 1000);
}
        
        var statName = statMark[z].name;
        
        sessionStorage.setItem("Réservation", statName);
        blocReserv.textContent = "Vous avez réservé un vélo à la station " + statName + " pendant encore : ";
        
        document.getElementById("blocReserv").appendChild(time);
       });
    
   
   
   
 // Création bouton reserver
var reservation = document.createElement("INPUT");
reservation.id = "reservation";
reservation.type = "button";
reservation.value = "Réserver";
reservation.style.textAlign = "center";
reservation.style.cursor = "pointer";
reservation.style.float = "left";
   
// quand clique sur bouton , Canvas apparait
reservation.addEventListener('click', function () {
       
var canvas = document.createElement("CANVAS");
canvas.id = "canvas";
canvas.style.width = "30%";
canvas.style.height = "100px";
canvas.style.marginLeft = "10%";    
canvas.style.backgroundColor = "white";
canvas.style.border = "1px solid black";

    // SI canvas n'existe pas , ajouter le à blocInfo SINON ne rien faire 
    if (!document.getElementById("canvas")) {
        
document.getElementById("blocInfo").appendChild(canvas); 
    }
    
    
    
    var reservStation = document.createElement("p");
    reservStation.id = "reservStation";
    reservStation.style.textAlign = "center";
    reservStation.style.size = "24px";  
    
    
    
    document.getElementById("blocReserv").appendChild(reservStation);

                             
    // Quand clique sur Canvas , afficher bouton confirmer
    canvas.addEventListener('click', function () {
        document.getElementById("blocInfo").appendChild(confirm);
    })
    
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
        
    function redraw(){
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  
  context.strokeStyle = "#000000";
  context.lineJoin = "round";
  context.lineWidth = 2;
			
  for(var j=0; j < clickX.length; j++) {		
    context.beginPath();
    if(clickDrag[j] && j){
      context.moveTo(clickX[j-1], clickY[j-1]);
     }else{
       context.moveTo(clickX[j]-1, clickY[j]);
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
    
    function addClick(x, y, dragging)
    {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
    }

})
   }
     // Création du conteneur infowindow
var blocInfo = document.createElement("div");
blocInfo.id = "blocInfo";
blocInfo.style.width = "50%";
blocInfo.style.height = "70%";
document.getElementById('blocMap').appendChild(blocInfo);

 
})
};
        

 
  // Bloc pied blocReserv (Affichage de la révervation)
var blocReserv = document.createElement("div");
blocReserv.id = "blocReserv";
blocReserv.style.width = "100%";
blocReserv.style.height = "100px";
blocReserv.style.textAlign = "center";
blocReserv.style.marginTop = "50px";
document.getElementById("content").appendChild(blocReserv);


    





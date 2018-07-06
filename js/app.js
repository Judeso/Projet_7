var titreElt = document.createElement("h1");
titreElt.id = "titre";
titreElt.textContent = "Locations de Velo'V";
document.body.appendChild(titreElt);



// SLIDER 


var slider = new Slider();
slider.init();

// FIN DE SLIDER


// MAP
var map = new GMap();
map.insert();

// Bloc Reservation
var velo = new maReservation();
velo.insert();

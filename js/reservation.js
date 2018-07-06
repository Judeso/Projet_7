function maReservation() {

    this.init = function () {

        var user = {
            name: document.getElementById("infoTitle").textContent,
            nb: 1,
            expire: setTimeout(function () {
                localStorage.removeItem('user');
            }, 1000 * 60 * 20),
            time: setInterval(function () {
                
            })
             
        }

        localStorage.setItem('user', JSON.stringify(user));
        this.obj = JSON.parse(localStorage.getItem('user'));
        console.log(this.obj);

        this.time()

    }

    this.insert = function () {
        //window.onbeforeunload = function (){
        //localStorage.removeItem('user')};
    
        
        if (localStorage.getItem('user')) {
            var blocReserv = document.createElement("div");
            blocReserv.id = "blocReserv";

            var obj = JSON.parse(localStorage.getItem('user'));


            blocReserv.innerHTML = "<p>Vous avez un vélo de réserver : " + obj.name + " jusqu'a : </p>";
            console.log(obj);
            document.body.appendChild(blocReserv);

        } else {
            var blocReserv = document.createElement("div");
            blocReserv.id = "blocReserv";
            blocReserv.innerHTML = "<p>Vous n'avez aucun vélo de réservé.</p>";
            document.body.appendChild(blocReserv);
        }

    }

    this.time = function () {


        this.timer = document.createElement("span");
        this.timer.id = "timer";
        this.timer.textContent = "20:00";
        blocReserv.innerHTML = "<p>Vous avez réservé un vélo à la station " + this.obj.name + " pendant encore : </p>";
        document.getElementById("blocReserv").appendChild(this.timer);


        var twentyMinutes = 60 * 20,
            display = document.querySelector('#timer');
        startTimer(twentyMinutes, display);


        function startTimer(duration, display) {
            var timing = duration,
                minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timing / 60, 10)
                seconds = parseInt(timing % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                this.timer.textContent = minutes + ":" + seconds;

                if (--timing < 0) {
                    blocReserv.textContent = "Votre Réservation à éxpiré ! ";
                    this.timer.textContent = "Expiré";
                    clearInterval();

                }
            }, 1000);
        }

    }
}

function maReservation() {

    // Initialise l'objet reseration
    this.init = function () {

        var user = {
            name: document.getElementById("infoTitle").textContent,
            nb: 1,
            expire: setTimeout(function () {
                localStorage.removeItem('user');
            }, 1000 * 60 * 20)
        }

        localStorage.setItem('user', JSON.stringify(user));
        this.obj = JSON.parse(localStorage.getItem('user'));
        console.log(this.obj);


        this.insertTime();


    }

    // Insertion du span time
    this.insertTime = function () {

        this.timer = document.createElement("span");
        this.timer.id = "timer";

        this.min = 20;
        this.sec = 00;

        this.timer.textContent = this.min + ':' + this.sec;

        blocReserv.innerHTML = "<p>Vous avez réservé un vélo à la station " + this.obj.name + " pendant encore : </p>";
        document.getElementById("blocReserv").appendChild(this.timer);
        this.countDown();

    }

    // Insertion bloc Reservation au démarrage
    this.insert = function () {
        this.timer = document.createElement("span");
        this.timer.id = "timer";

        this.timing = JSON.parse(localStorage.getItem('timing'));
        console.log(this.timing);
        this.timer.textContent = this.timing.min + ':' + this.timing.sec;

        var blocReserv = document.createElement("div");
        blocReserv.id = "blocReserv";

        this.obj = JSON.parse(localStorage.getItem('user'));

        if (localStorage.getItem('user')) {

            blocReserv.innerHTML = "<p>Vous avez un vélo de réserver : " + this.obj.name + " pour encore : </p>";
            console.log(this.obj);
            document.body.appendChild(blocReserv);
            document.getElementById("blocReserv").appendChild(this.timer)
            this.countDown();


        } else {

            blocReserv.innerHTML = "<p>Vous n'avez aucun vélo de réservé.</p>";
            document.body.appendChild(blocReserv);
        }

    }

    // TIMER
    this.countDown = function () {
        
        function startTimer() {
            setInterval(function () {
                if (this.sec === 0) {

                    this.sec = 59;
                    this.min = this.min - 1;

                    console.log(this.min + ":" + this.sec);
                    document.getElementById("timer").textContent = this.min + ":" + this.sec;


                } else if (this.sec > 0) {

                    this.sec = this.sec - 1;
                    console.log(this.min + ":" + this.sec);
                    document.getElementById("timer").textContent = this.min + ":" + this.sec;


                } else if (this.sec === 0 && this.min === 0) {

                    console.log(this.min + ":" + this.sec);
                    document.getElementById("timer").textContent = "Votre réservation à expiré !";
                    clearInterval(startTimer);
                }

            }, 1000)  
        };
        
        startTimer();
    }
}




window.addEventListener("beforeunload", function () {

    this.temps = {
        min: this.min,
        sec: this.sec
    };

    localStorage.setItem('timing', JSON.stringify(this.temps));

});

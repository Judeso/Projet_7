function maReservation() {

    var self = this;

    // Initialise l'objet reseration
    this.init = function () {

        var user = {
            name: document.getElementById("infoTitle").textContent,
            nb: 1,
            
        }

        sessionStorage.setItem('user', JSON.stringify(user));
        self.obj = JSON.parse(sessionStorage.getItem('user'));
        console.log(self.obj);


        this.insertTime();


    }

    // Insertion du span time
    this.insertTime = function () {

        self.timer = document.createElement("span");
        self.timer.id = "timer";

        self.min = 20;
        self.sec = 00;


        self.timer.textContent = self.min + ':' + self.sec;

        blocReserv.innerHTML = "<p>Vous avez réservé un vélo à la station " + self.obj.name + " pendant encore : </p>";
        document.getElementById("blocReserv").appendChild(self.timer);
        this.countDown();

    }

    // Insertion bloc Reservation au démarrage
    this.insert = function () {
        self.timer = document.createElement("span");
        self.timer.id = "timer";

        if ((sessionStorage.getItem('timing')) && (sessionStorage.getItem('user'))) {
            self.timing = JSON.parse(sessionStorage.getItem('timing'));
            self.min = self.timing.min;
            self.sec = self.timing.sec;

            console.log(self.timing);
            self.timer.textContent = self.min + ':' + self.sec;

            self.blocReserv = document.getElementById("blocReserv");
            self.obj = JSON.parse(sessionStorage.getItem('user'));

            if (self.obj != null) {


                blocReserv.innerHTML = "<p>Vous avez un vélo de réserver : " + self.obj.name + " pour encore : </p>";
                console.log(self.obj);

                document.getElementById("blocReserv").appendChild(self.timer)


            } else {

                document.getElementById("blocReserv").innerHTML = "<p>Vous n'avez aucun vélo de réservé.</p>";

            }


        } else {
            document.getElementById("blocReserv").innerHTML = "<p>Vous n'avez aucun vélo de réservé.</p>";
        }
    }

    // TIMER
    this.countDown = function () {

        
        self.myVar;

        function startTimer() {
            self.myVar = setInterval(Timer, 1000)
        }

        function Timer() {
            if ((self.sec == 0) && (self.min != 0)) {

                self.sec = 59;
                self.min = self.min - 1;
                console.log(self.min + ":" + self.sec);
                self.timer.textContent = self.min + ":" + self.sec;

            } else if (self.sec > 0) {

                self.sec = self.sec - 1;
                console.log(self.min + ":" + self.sec);

                if (self.sec < 10) {
                    self.timer.textContent = self.min + ":0" + self.sec;
                } else {
                    self.timer.textContent = self.min + ":" + self.sec;
                }

            } else if ((self.min == 0) && (self.sec == 0)) {
                console.log(self.min + ":" + self.sec);
                
                document.getElementById("timer").textContent = self.min + ":" + self.sec;
                
                blocReserv.innerHTML = "<p>Votre réservation a expirée ! </p>";
                sessionStorage.removeItem('user');
                
                console.log(sessionStorage.getItem('user'));
                stop();
            }
        };

        function stop() {
            clearInterval(self.myVar);
        }

        startTimer();
    }

    window.addEventListener("beforeunload", function () {

        self.temps = {
            min: self.min,
            sec: self.sec
        };

        sessionStorage.setItem('timing', JSON.stringify(self.temps));

    })

}

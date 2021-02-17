var xhttp = new XMLHttpRequest();
xhttp.open("GET", "data.json", true);
xhttp.send(null);


xhttp.onreadystatechange = function() {
    var nothing = true;
    var url = new URL(window.location.href);
    var q = decodeURIComponent(url.searchParams.get('q'));
    var low = parseInt(url.searchParams.get('low'));
    var high = parseInt(url.searchParams.get('high'));
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(xhttp.response).posts;
        for(var i=0; i < json.length; i++){
            if(json[i].sold == false){
                //matching keywords
                if(q != "" && q != null && q != "null"){
                    document.getElementById("q").value = q;
                    var keywords = q.split(" ");
                    var pass = false;
                    keywords.forEach(element => {
                        if(json[i].title.toLowerCase().indexOf(element.toLowerCase()) > -1 || json[i].des.toLowerCase().indexOf(element.toLowerCase()) > -1){
                            pass = true;
                        }
                    });
                    if(pass == false){
                        console.log("Skipped by key");
                        continue;
                    }
                }
                //matching price
                if(low != NaN && high != NaN && low <= high){
                    document.getElementById("low").value = low;
                    document.getElementById("high").value = high;
                    if(json[i].price < low || json[i].price > high){
                        console.log("Skipped by price");
                        continue;
                    }
                }

                nothing = false;
                var body = "<div class=\"box text-center\">\
                <h5>"+json[i].title+"</h5>\
                <img src=\"images/"+json[i].img+"\" class=\"mx-auto img-fluid\">\
                <br>\
                <p>"+json[i].des+"</p>\
                Dimention: "+json[i].dim+"<br>\
                Product ID: RS010<br>\
                <b class=\"mt-5 text-success\">Price: BDT "+json[i].price;
                if(json[i].frame > 0){
                    body += "<br><small>(*Optional)</small> Frame: BDT +"+json[i].frame+"<br><small> [N.B: The frame may not look alike as shown in this picture]</small></b>";
                }
                body += "<br><br>\
                <a href=\"http://m.me/338444737555231\" target=\"_blank\"><button type=\"button\" class=\"btn btn-outline-primary\">Send message to buy</button></a>\
                </div>";
                document.getElementById("feed").innerHTML += body;
            }
        }
        if(nothing == true){
            document.getElementById("feed").innerHTML = "<div class=\"box text-center\"><h4>Oops!</h4>No artworks are currently available.<br><small>Redirecting you to Sold Artworks section in <b id=\"sec\">5</b> seconds.</small></div>";
            var timeLeft = 4;
            var elem = document.getElementById('sec');
    
            var timerId = setInterval(countdown, 1000);
    
            function countdown() {
                if (timeLeft == -1) {
                    clearTimeout(timerId);
                    window.location.href = "sold.html";
                } else {
                    elem.innerHTML = timeLeft;
                    timeLeft--;
                }
            }
        }
    }
};
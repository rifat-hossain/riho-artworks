var xhttp = new XMLHttpRequest();
xhttp.open("GET", "data.json", true);
xhttp.send(null);

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

xhttp.onreadystatechange = function () {
    var nothing = true;
    var url = new URL(window.location.href);
    var q = decodeURIComponent(url.searchParams.get('q'));
    var low = parseInt(url.searchParams.get('low'));
    var high = parseInt(url.searchParams.get('high'));
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(xhttp.response).posts;
        for (var i = 0; i < json.length; i++) {
            if (json[i].sold == false) {
                //matching keywords
                if (q != "" && q != null && q != "null") {
                    document.getElementById("q").value = q;
                    var keywords = q.split(" ");
                    var pass = false;
                    keywords.forEach(element => {
                        if (json[i].title.toLowerCase().indexOf(element.toLowerCase()) > -1 || json[i].des.toLowerCase().indexOf(element.toLowerCase()) > -1) {
                            pass = true;
                        }
                    });
                    if (pass == false) {
                        console.log("Skipped by key");
                        continue;
                    }
                }
                //matching price
                if (low != NaN && high != NaN && low <= high) {
                    document.getElementById("low").value = low;
                    document.getElementById("high").value = high;
                    if (json[i].price < low || json[i].price > high) {
                        console.log("Skipped by price");
                        continue;
                    }
                }
                nothing = false;
                var body = "<div class=\"box text-center\">\
                <h5>"+ json[i].title + "</h5>";
                if(json[i].img.length == 1){
                    body += "<img src=\"images/"+ json[i].img + "\" class=\"mx-auto img-fluid\"><br>"
                }
                else if(json[i].img.length > 1){
                    body += "<div id=\""+json[i].id+"\" class=\"carousel slide\" data-ride=\"carousel\">\
                    <ul class=\"carousel-indicators\">\
                    <li data-target=\"#"+json[i].id+"\" data-slide-to=\"0\" class=\"active\"></li>"
                    for(var j = 1; j < json[i].img.length; j++){
                        body += "<li data-target=\"#"+json[i].id+"\" data-slide-to=\""+j+"\"></li>"
                    }
                    body += "</ul>\
                    <!-- The slideshow -->\
                    <div class=\"carousel-inner\">"
                    body += "<div class=\"carousel-item active\">\
                            <img src=\"images/"+ json[i].img[0] + "\">\
                        </div>";
                    for(var j = 1; j < json[i].img.length; j++){
                        body += "<div class=\"carousel-item\">\
                            <img src=\"images/"+ json[i].img[j] + "\">\
                        </div>";
                    }
                    body += "</div>\
                    <!-- Left and right controls -->\
                    <a class=\"carousel-control-prev\" href=\"#"+json[i].id+"\" data-slide=\"prev\">\
                        <span class=\"carousel-control-prev-icon\"></span>\
                    </a>\
                    <a class=\"carousel-control-next\" href=\"#"+json[i].id+"\" data-slide=\"next\">\
                        <span class=\"carousel-control-next-icon\"></span>\
                    </a>\
                </div>";
                }
                body += "<p>"+ json[i].des + "</p>\
                Dimention: "+ json[i].dim + "<br>\
                Product ID: "+ json[i].id + "<br>\
                <b class=\"mt-5 text-success\">Price: BDT "+ json[i].price;
                if (json[i].frame == "-") {
                    console.log("no frames");
                }
                else if (json[i].frame > 0) {
                    body += "<br><small>(*Optional)</small> Frame: BDT +" + json[i].frame + "<br><small> [N.B: The frame may not look alike as shown in this picture]</small></b><br><br>\
                    <a href=\"http://m.me/338444737555231\" target=\"_blank\"><button type=\"button\" class=\"btn btn-outline-primary\">Send message to buy</button></a>\
                    </div>";
                }
                else {
                    body += "<br>(Including frame)<br><small> [N.B: The frame may not look alike as shown in this picture]</small></b><br><br>\
                    <a href=\"http://m.me/338444737555231\" target=\"_blank\"><button type=\"button\" class=\"btn btn-outline-primary\">Send message to buy</button></a>\
                    </div>";
                }
                document.getElementById("feed").innerHTML += body;
            }
        }
        if (nothing == true) {
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
var xhttp = new XMLHttpRequest();
xhttp.open("GET", "data.json", true);
xhttp.send(null);

var n = 0;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(xhttp.response).posts;
        for(var i=0; i < json.length; i++){
            if(json[i].sold == true){
                var body = "<div class=\"box text-center\">\
                <h5>"+json[i].title+"</h5>\
                <div><img src=\"images/"+json[i].img+"\" class=\"mx-auto img-fluid\">\
                <div class=\"sold\">SOLD</div></div>\
                <br>\
                <p>"+json[i].des+"</p>\
                Dimention: "+json[i].dim+"<br>\
                Product ID: "+json[i].id+"<br>";
                if(n % 2 == 0){
                    document.getElementById("feed1").innerHTML += body;
                }
                else{
                    document.getElementById("feed2").innerHTML += body;
                }
                n++;
            }
        }
        if(n == 0){
            document.getElementById("feed1").innerHTML = "<div class=\"box text-center\"><h4>Nothing to show!</h4></div>";
        }
    }
};
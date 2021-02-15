var xhttp = new XMLHttpRequest();
xhttp.open("GET", "data.json", true);
xhttp.send(null);

var nothing = true;

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(xhttp.response).posts;
        for(var i=0; i < json.length; i++){
            if(json[i].sold == false){
                nothing == false;
                var body = "<div class=\"box text-center\">\
                <h5>"+json[i].title+"</h5>\
                <img src=\"images/"+json[i].img+"\" class=\"mx-auto img-fluid\">\
                <br><br>\
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
            document.getElementById("feed").innerHTML = "<div class=\"box text-center\"><h4>Nothing to show!</h4></div>";
        }
    }
};
"use strict"

$( document ).ready(function() { 

    var searchbar = document.getElementById("search");

    searchbar.addEventListener('click', function(e){

        e.preventDefault();

        var httpRequest = new XMLHttpRequest();
        var url = "http://localhost/info2180-lab4/superheroes.php";


        httpRequest.onreadystatechange = function(){
            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                if (httpRequest.status === 200) {
                var response = httpRequest.responseText;
                console.log(response)
                alert(response);
                } else {
                alert('There was a problem with the request.');
                }
            } 
        };
        httpRequest.open('GET', url);
        httpRequest.send();

    })

});
"use strict"

$( document ).ready(function() { 

    var searchbar = document.getElementById("search");

    searchbar.addEventListener('click', function(e){

        e.preventDefault();

        var httpRequest = new XMLHttpRequest();
        var url = "superheroes.php?query=Thor";


        httpRequest.onreadystatechange = function(){

            if (httpRequest.readyState === XMLHttpRequest.DONE) {
                
                if (httpRequest.status === 200) {
                var response = httpRequest.responseText;
                // console.log(response)
                alert(response);

                } else {
                alert('There was a problem with the request.');
                }

            } 
        }; 
        
        httpRequest.open('GET', url);
        httpRequest.send();

        httpRequest.onreadystatechange = function(){
            var resultDiv = document.getElementById('result');
            var heroList = httpRequest.responseText;

            var formData = document.getElementById("superhero").value;
            
            if (formData === ""){
                resultDiv.innerHTML = heroList;

            }else{
                // let reply = fetch('superheroes.php',{
                //     method:'post',
                //     headers:{'Content-Type': 'application/json'},
                //     body: JSON.stringify(formData)})
                console.log("do the right thing")
            }
        };
    })
});
"use strict"
window.onload = function(){
    var searchbar = document.getElementById("search");
    searchbar.addEventListener('click', handleRequest)
}

   
async function recieveJSON(formData){
    if (formData !== ''){
    const request  = await fetch('superheroes.php', {
        method: 'POST',
        Elements:{
            // Datatype 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });
    const data =  request.json();
    return data;


    }else{
        recieveList();
    }   
}

function heroData(resultDiv, data){
    if(resultDiv.innerHTML !== ''){
        resultDiv.innerHTML = '';
    }
    if(typeof(data) === 'string'){
        result.innerHTML = data;
    }else{
        var nameElement = document.createElement('h2');
        var name = document.createTextNode(data.name);
        nameElement.appendChild(name);
        result.appendChild(nameElement);
        var aliasElement = document.createElement('h3');
        var alias = document.createTextNode(`A.K.A ${data.alias}`);
        aliasElement.appendChild(alias);
        result.appendChild(aliasElement);
        var biographyArea = document.createElement('p');
        var biography = document.createTextNode(data.biography);
        biographyArea.appendChild(biography);
        result.appendChild(biographyArea);
    }
    
}

function recieveList(){
    var httpRequest = new XMLHttpRequest();
    var url = `superheroes.php`;
    httpRequest.open('GET', url);
    httpRequest.send();
    
    httpRequest.onreadystatechange = function(){
        var resultDiv = document.getElementById('result');
        var heroList = httpRequest.responseText;
    
        var formData = document.getElementById("superhero").value;
        
        if (formData === ""){
            resultDiv.innerHTML = heroList;
        }
    };
}

async function handleRequest(event){
    event.preventDefault();
    let formData = document.getElementById("superhero").value;
    let result = document.getElementById("result");
    if (formData === ''){
        recieveList();
    }
    try{
        let data = await recieveJSON(formData, result);
        heroData(result, data)
    }catch(err){
        console.log(`Error: ${err.toString()}`)
    }
}
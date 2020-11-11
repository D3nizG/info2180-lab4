"use strict"
$(document) .ready(function(){
    var searchbar = document.getElementById("search");
    searchbar.addEventListener('click', handleRequest)

    var clearBtn = document.getElementById("clear");
    clearBtn.addEventListener('click', clearText)
})


function clearText(){
    document.getElementById("superhero").value = ''
    console.log("clicked")
    let resultSpace = document.getElementById("result");
    if(resultSpace.innerHTML !== ''){
        resultSpace.innerHTML = '';
    }
}

async function recieveJSON(){

        recieveList(); 
}

function heroData(resultDiv, data){
    if(resultDiv.innerHTML !== ''){
        resultDiv.innerHTML = '';
    }
    if(typeof(data) === 'string'){
        result.innerHTML = data;
    }else{
        var nameElement = document.createElement('h4');
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

function convertJSON(data){

    try{
        let parsedData = JSON.parse(data);
        return parsedData;
    }catch (error){
        return data;
    }
}

function recieveList(){
    var httpRequest = new XMLHttpRequest();
    var formData = document.getElementById("superhero").value;
    var url = `superheroes.php?query=${formData}`;
    httpRequest.open('GET', url);
    httpRequest.send();
    
    httpRequest.onreadystatechange = function(){
        var resultDiv = document.getElementById('result');
        var stringObj = httpRequest.responseText;
        var heroList = convertJSON(stringObj)
        // console.log(heroList)
        heroData(resultDiv, heroList);
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

function chargeImgFetch(apiUrl, cb){ 
    fetch(apiUrl).then(function (data){ 
        return data.json()
    }).then(function (data){
        console.log(data)
        cb(data)
    })
}

function creationGraphique(images, section){
    images.forEach(img => {
        createImg(img, section);
        
    });
}

function createImg(img, section) {
    let article = document.createElement("article");
    let image = document.createElement("img");
    image.setAttribute("src", img.flag);
    article.classList.add("article");
    section.appendChild(article);
    article.appendChild(image);
    return { article, article };
}

let getFile = function() {
    let filesInput = document.querySelector("#fileItem");
    let file = filesInput.files;
    let imageType = /^image\//;

    if((!imageType.test(file[0].type))){
        alert("veuillez sélectionner une image");
    }else {
        let section = document.querySelector("#fileImg")
        let preview = document.createElement("img");
        section.innerHTML = ''
        section.appendChild(preview);

        let file    = document.querySelector('input[type=file]').files[0];
        let reader  = new FileReader();
      
        reader.addEventListener("load", function () {
          preview.src = reader.result;
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
        
    }
}

function base64(callback){
    console.log("DANS LA base64")
    let data = document.querySelector("#fileItem").files[0]
    let reader = new FileReader();
    reader.onload = function() {    
      callback(reader.result);
    }
    reader.readAsDataURL(data);
}


async function sendData(data) {

    let name = document.querySelector("#fileItem").files[0].name;
    let obj = {
        name : name,
        file : data
    }
    console.log("OBJ", obj)

    let XHR = new XMLHttpRequest();
    XHR.open('POST', 'https://example.com/cors.php');
    //XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.send(obj);
}


document.addEventListener("DOMContentLoaded", function(){

    let apiUrl = "http://restcountries.eu/rest/v2";
    chargeImgFetch(apiUrl, function(data){
        console.log(data)
        creationGraphique(data, document.getElementById("library"));
    })
    
    document.querySelector("#fileItem").onchange = getFile;

    let form = document.querySelector('form');

    form.addEventListener("submit", function(e){
        e.preventDefault();
        base64(sendData);
        let section = document.querySelector("#fileImg");
        section.innerHTML = '';
        
    });
});
//----------------------escoger palabra al azar--------------------------
    
let buttonNewWord = document.getElementById("newWord");
buttonNewWord.addEventListener("click",playAgain);
let gameBoard = document.getElementById("gameBoard");
let userText = document.getElementById("userText");
let prewords = ["FELIZ","DIFICIL","FACIL","JAVASCRIPT","GUARDAR","AZAR","INGENIO","ASOMBRO","FUNCION","CLASES","OBJETO","APRENDER","ESFUERZO","PACIENCIA","ANALISIS"];
let words = JSON.parse(localStorage.getItem("allWords")) || prewords;
         
function newWord(){
    let currentWord = words[Math.floor(Math.random()*words.length)];
    console.log(currentWord);
    let split = Array.from(currentWord);
    return split
}

function playAgain(){
    let split = newWord();
    let antiqueLabel = document.querySelector("label");
    if(antiqueLabel != null){
        antiqueLabel.remove();
    }
    gameBoard.appendChild(dynamicWord(split));
    let antiqueErrors = document.querySelectorAll(".sectionError p");
    antiqueErrors.forEach(element => {
        element.remove();
    })
    let wrongs = [];
    userText.oninput = (event)=>{
        event.preventDefault();
        showLetters(split,wrongs);
        winOrLose(wrongs);
    }
    see.textContent = "¿Empezamos?";
    see.classList.remove("win");
    particles.classList.add("hidden");
    emoji.classList.add("hidden");
    see.classList.remove("losing");
    see.style.fontSize = "2rem"

    //----------muñeco-------------
    document.getElementById("first").style.display = "none";
    document.querySelector(".second").style.display = "none";
    document.querySelector(".third").style.display = "none";
    document.querySelector(".four").style.display = "none";
    document.querySelector(".five").style.display = "none";
    document.querySelector(".six").style.display = "none";
    document.querySelector(".seven").style.display = "none";
    document.querySelector(".eight").style.display = "none";
    document.querySelector(".nine").style.display = "none";
    document.querySelector(".ten").style.display = "none";
}
playAgain()
//----------------------mostrar palabra en pantalla----------------------------------
    
function dynamicWord(split){
    let letters = document.createElement("label");
    letters.classList.add("currentWord");
    letters.setAttribute("for","userText");
    
    let counter = 0;
    for (let i = 0; i < split.length; i++) {
            let letter = document.createElement("span");
            letter.classList.add("underscore");
            letter.setAttribute("id",counter);
            letters.appendChild(letter);
            counter++
    }
        return letters;
}
      
//-------------------------mostrar letras--------------------------------

function showLetters(split,wrongs){
    let writing = userText.value.toUpperCase();
    let actualId = 0;

    let letterNoIncluded = 0;
    let sectionError = document.querySelector(".sectionError");

    for (let i = 0; i < split.length; i++) {
        let actualLetter = split[i];

        if(writing == actualLetter){
            let sumLetter = document.getElementById(actualId);
            sumLetter.textContent = actualLetter;
        } else {
            letterNoIncluded++
            if(letterNoIncluded == split.length && (/[A-Z]/).test(writing) && !wrongs.includes(writing)){
                wrongs.push(writing);
                let errorLetter = document.createElement("p");
                errorLetter.textContent = writing;
                sectionError.appendChild(errorLetter);
            }
        }
        userText.value = "";
        actualId++
    }
}
// fetching all the elements
const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-length]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copyBtn]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const indicator = document.querySelector("[strength-indicator]")
const generateBtn = document.querySelector(".generateButton")
const allCheckBox = document.querySelectorAll("input[type=checkbox]")
const symbols='~`!@#$%^&*()_-+={}[]:;"<,|\>.?/'

let password="";
let passwordLength=10;
let checkCount=1;//because uppercase one is already marked
// set strength circle color to grey

// operations-copy(),handleSlider(),generatepassword(),setIndicator,getRandomInteger(min,max),getRandomNumber,getRandomUppercase,getRandomLowercase,getRandomSymbols,calculeteStrength

// set passwordLength
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

}

function setIndicator(color){
    indicator.style.background=color;
    indicator.style.boxShadow="20px 20px 20px 20px color"
}

function getRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

function generateRandomNumber(){
    return getRandomInteger(0,9)
}

function generateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,123));  //asci value of a-97  z-123
}
// String.fromCharCode()->return character from ascii value
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90));
}

function generateSymbols(){
    const randNum=getRandomInteger(0,symbols.length);
    return symbols.charAt[randNum]
}

function calcStrength()
{
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if (uppercaseCheck.checked) hasUpper=true;
    if (lowercaseCheck.checked) hasLower=true;
    if (numbersCheck.checked) hasNum=true;
    if (symbolsCheck.checked) hasSym=true;

    if(hasUpper&&hasLower&&(hasNum||hasSym)&&passwordLength>=8){
        setIndicator("#0f0")
    }else if((hasUpper||hasLower)&&(hasNum||hasSym)&&passwordLength>=6){
        setIndicator("#ff0")
    }else{
        setIndicator("#f00")
    }
}


// calling functions
handleSlider();
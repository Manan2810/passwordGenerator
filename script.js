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
const symbols='~`!@#$%^&*()_-+={}[]:;"<,|\>.?/';

let password="";
let passwordLength=10;
let checkCount=0;//because uppercase one is already marked
// set strength circle color to grey
uppercaseCheck.checked=true;

// operations-copy(),handleSlider(),generatepassword(),setIndicator,getRandomInteger(min,max),getRandomNumber,getRandomUppercase,getRandomLowercase,getRandomSymbols,calculeteStrength

// set passwordLength
function handleSlider()
{
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

}

function setIndicator(color){
    indicator.style.background=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
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
    return symbols.charAt(randNum);
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

// writeText() method returns a promise-asynchronus operation.Also this method returns something on clipboard
async function copyContent(){
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);//this method copies anything on clip board and returns a promise
        copyMsg.innerText="copied";
    }catch(error){
        copyMsg.innerText="Failed";
    }
    // to make copyMsg vaala span visible
    copyMsg.classList.add("active");
    setTimeout(()=>{
        copyMsg.classList.remove("active")
    },2000)
}

inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value)
    {
        copyContent();
    }
})
function handleCheckBoxChange(){
    checkCount=0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    })
    //special condition
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
}
allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

function shufflePassword(array)
{
    // here we will apply Fisher Yates Method which shuffles the Array
    for(let i=array.length-1;i>0;i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i]=array[j];
        array[j]=temp;
    
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;

}

function generatePassword(){
    if(checkCount<=0)
    {
        return;
    }
    if(passwordLength<checkCount)
    {
        passwordLength=checkCount;
        handleSlider();
    }
    console.log("lets start the journey")
    //remove old password
    password="";

    let funcArr=[];

    if(uppercaseCheck.checked)
    {
        funcArr.push(generateUpperCase);
    }
    if(lowercaseCheck.checked)
    {
        funcArr.push(generateLowerCase);
    }
    if(numbersCheck.checked)
    {
        funcArr.push(generateRandomNumber);
    }
    if(symbolsCheck.checked)
    {
        funcArr.push(generateSymbols);
    }

    // compulsary addition
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    console.log("compulsary function")
    //remaining addition
    for(let i=0;i<passwordLength-funcArr.length;i++)
    {
        let randIndex=getRandomInteger(0,funcArr.length);
        console.log("randIndex"+ randIndex)
        password+=funcArr[randIndex]();
    }
    console.log("remainining thing done")
    // shuffle the password
    password=shufflePassword(Array.from(password));
    console.log("shuffling done")
    // show in UI
    passwordDisplay.value=password;
    // calculate strenght
    calcStrength();
}
// calling functions
handleSlider();
setIndicator("#ccc")
var textDisplay = document.querySelector(".text");
let lastInputIsOperator = false;
let resultHasBeenCalculated = false;
let hasDot = false;
let lastWasDot = false;
let wasPi = false;


const savedDisplayValue = localStorage.getItem('calculator');
if(savedDisplayValue){
    textDisplay.value=savedDisplayValue;
    total= textDisplay.value;
    var displayIsZero = false;
}
else{
    var total = [];
    var displayIsZero = true;
}



/*ENTER THE NUM*/ 


function buttonClicked(num) {

    /*AFTER CALCULATE*/ 

   
    if( resultHasBeenCalculated){
        if(isOperator(num)){
            total=textDisplay.value;
            resultHasBeenCalculated = false;
        }
        else{
            total = [];
            resultHasBeenCalculated = false;
        }
    }

    /*CHECKS FOR DOT*/  
    
    if(num==='.'){
        if(lastInputIsOperator){
            return;
        }
        if(hasDot){
            return;
        }
        hasDot=true;
        lastWasDot=true;
    }
    if(isNumber(num)){
        lastWasDot=false;
        
    }

    if(num==="3.14"){
        if(hasDot){
            return;
        }
        if(wasPi){
            return;
        }
        wasPi=true;
        hasDot=true;
    }
    
    /*CHECKS FOR OPERATOR*/    

    if (isOperator(num)) {
        wasPi=false;
        hasDot=false;
        if(lastWasDot){
            return;
        }
        if(displayIsZero){
            return;
        }
        if (lastInputIsOperator) {
            return;
        }
        lastInputIsOperator = true; 
    }   
    else {
        lastInputIsOperator = false;  
    }

    /*DISPLAY*/  

    total = total + num;
    textDisplay.value = total;
    displayIsZero=false;
    localStorage.setItem('calculator',textDisplay.value)
}


/*SET  OPERATORS*/ 


function isOperator(num) {
    return ['+', '-', '*', '/','**'].includes(num);
}

function isNumber(num) {
    return ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '3.14'].includes(num);
}

function hasDecimal(total){
    return total.toString().includes(".");
}


/*CLEARS DISPLAY*/ 


function clearResult() {
    total=[];
    textDisplay.value = total;
    resultHasBeenCalculated = false;
    displayIsZero = true;
    localStorage.removeItem('calculator')
    hasDot=false;
    wasPi=false;
}


/*CALCULATE DISPLAY*/ 


function calculateResult() {
    textDisplay.value = eval(textDisplay.value);
    resultHasBeenCalculated = true;
    localStorage.setItem('calculator',textDisplay.value)
}


/*BACKSPACE FUNCTION*/ 


function backSpace() {
    let currentDisplay = textDisplay.value;
    if(currentDisplay[currentDisplay.length-1]==='.'){
        hasDot=false;
    }
    if(currentDisplay[currentDisplay.length-1]==='+', '-', '*', '/','**'){
        lastInputIsOperator = false; 
    }
    textDisplay.value = currentDisplay.slice(0, -1);
    total = textDisplay.value;
    localStorage.setItem('calculator',textDisplay.value)
}
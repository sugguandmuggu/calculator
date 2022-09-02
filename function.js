const numBtns = document.querySelectorAll(".numBtn");
const currentScreen = document.querySelector(".currentScreen");
const lastScreen = document.querySelector(".lastScreen");
const btns = document.querySelectorAll(".btn");
const clearBtn = document.querySelector(".clearBtn");
const backspaceBtn = document.querySelector(".backspaceBtn");

let num1="";
let num2="";
let operator="";

let operatorFlag=0;
let result = 0;
let resultFlag=0;
let strike=0;
let strikeFlag=0;
let temp1= "";
let temp2= "";


numBtns.forEach((numBtn) => numBtn.addEventListener('click', () => {
    if(operatorFlag==0){    
        num1=`${num1}${numBtn.textContent}`;
        currentScreen.textContent=num1;
    }
    else if(resultFlag===1 && operatorFlag==2){
        num1=`${numBtn.textContent}`;
        operatorFlag=0; 
        lastScreen.textContent="";
        currentScreen.textContent=num1;
    }
    else{
        num2=`${num2}${numBtn.textContent}`;
        currentScreen.textContent=`${currentScreen.textContent}${numBtn.textContent}`;
        operatorFlag=1;
    }
}));

btns.forEach((btn) => btn.addEventListener("click", () => {
    if(btn.id=="equalsBtn" && num1 !== "" && num2 !== "")
    {
        //console.log("hello");
        console.log(num1);
        console.log(num2);
        result=operate(operator, +num1, +num2);
        if(strikeFlag != 1){
            lastScreen.textContent=`${currentScreen.textContent}${btn.textContent}`;
            currentScreen.textContent=`${result}`;
            num1=`${result}`;
            num2="";
            operatorFlag=2;
            resultFlag=1;
        }
        else{
            num1="";
            num2="";
            resultFlag=0;
            operatorFlag=0;
        }
        strikeFlag=0;
        
    }
    else if(operatorFlag==1){
        currentScreen.textContent=`${currentScreen.textContent}${btn.textContent}`;
        temp1=num1;
        temp2=num2;
        num1=`${operate(operator, +num1, +num2)}`;
        num2="";
        console.log(num1);
        operator=btn.textContent;
        operatorFlag=3;
    }
    else {
        if(operatorFlag != 3 && num1 !== ""){
            operator=btn.textContent;
            currentScreen.textContent = `${currentScreen.textContent}${operator}`;
            operatorFlag=3;
        }
        
    }
}));

clearBtn.addEventListener("click", () => {
    num1 = "";
    num2 = "";
    operatorFlag=0;
    result = 0;
    resultFlag=0;
    currentScreen.textContent="";
    lastScreen.textContent="";
});

backspaceBtn.addEventListener("click", () => {
    if( operatorFlag===0 || operatorFlag===2 ){
        num1 = num1.substring(0, num1.length-1);
        currentScreen.textContent=num1;
    }
    else if(operatorFlag==1){
        num2 = num2.substring(0, num2.length-1);
        //console.log('op1');
        let temp = `${currentScreen.textContent}`;
        //console.log(temp.slice(0,length-1));
        currentScreen.textContent = temp.slice(0,length-1);
        if(num2 === "")
        {
            operatorFlag=3;
        }
    }
    else if(operatorFlag===3){
        //console.log('op3');
        operator="";

        let temp = `${currentScreen.textContent}`;
        currentScreen.textContent = temp.slice(0, length-1);
        if(temp2==="")
        {
            operatorFlag=0;
        }
        else{
            num1=temp1;
            num2=temp2;
            operatorFlag=1;
            temp1="";
            temp2="";
        }
    }
});


const add = (a,b)=> {
    /*console.log(typeof(a));
    console.log(typeof(b));
    console.log(a);
    console.log(b);
    a=parseInt(a);
    b=parseInt(b);
    console.log(typeof(a));
    console.log(typeof(b));
    console.log(a);
    console.log(b);
    let newresult=a;
    console.log(newresult);*/
	return a+b;
};

const subtract = function(a,b) {
	return a-b;
};

const multiplication = function(a,b){
    //console.log(a);
    //console.log(b);
    return a*b;
}

const division = function(a,b){
    if(b!=0){
        return a/b;
    }
    else{
        strike++;
        if(strike === 3){
            alert("You really thought something would happen on the third try huh?");
            strike=0;
            strikeFlag=1;
        }

        else{
            currentScreen.textContent=`Strike ${strike}`;
            lastScreen.textContent="";
            strikeFlag=1;
        }
    }
}

function operate(operator, a, b){
    if(operator=== "÷")
    {
        return division(a,b);
    }
    if(operator=== "x")
    {
        return multiplication(a,b);
    }
    if(operator === "+")
    {
        return add(a,b);
    }
    if(operator === "-")
    {
        return subtract(a,b);
    }
}
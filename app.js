const totalBill = document.querySelector(".bill-input");
const noOfPeople = document.querySelector(".people-input");
const percentList = document.querySelector(".percent-selection").childNodes;
let percent;
let billAmt;
let people;
// selecting text-field on focus
function textSelect(selectorName){
    document.querySelector(`${selectorName}`).addEventListener("click", () => {
        document.querySelector(`${selectorName}`).select();
    });
};
textSelect("#custom-tip");
textSelect(".bill-input");
textSelect(".people-input");

// getting value of custom tip and calculation
document.querySelector("#custom-tip").addEventListener("blur", (ele) => {
    percent = document.querySelector("#custom-tip").value;
    document.querySelector(".selectedTip").innerText = percent;
    calculation();
});

// getting value of tip button
percentList.forEach((ele) => {
    ele.addEventListener("click", (child) => {
        if (child.target.className.includes("custom")) {
            document.querySelector(".custom").style.display = "none";
            document.querySelector("#custom-tip").style.display = "block";
            document.querySelector("#custom-tip").focus();
        }
        else if (Number(child.target.outerText.replace("%", "")) / 100 == 0) {
            return;
        }
        else {
            percent = child.target.outerText.replace("%", "");
            document.querySelector(".selectedTip").innerText = percent;
            document.querySelector(".custom").style.display = "block";
            document.querySelector("#custom-tip").style.display = "none";
            calculation();
        }
    })
});

function removeBg(){
    for(let i=1; i<=12; i=i+2){
        percentList[i].style.backgroundColor = "";
    }
};

percentList.forEach((ele) =>{
    ele.addEventListener("click",() =>{
        removeBg();
        ele.style.backgroundColor = "#26c0ab";

    });
});


// show custom button if custom tip is not given
document.querySelector("#custom-tip").addEventListener("blur",()=>{
    let customTipInnerText = document.querySelector("#custom-tip").value;
    if(customTipInnerText == ""){
        document.querySelector(".custom").style.display = "block";
        document.querySelector("#custom-tip").style.display = "none";
    }
    
});

// retrieve value from html and perform calculation
totalBill.addEventListener("blur", ()=>{
    billAmt = totalBill.value;
    document.querySelector(".billAmount").innerText = billAmt;
    calculation();

});

// retrieve value from html and perform calculation
noOfPeople.addEventListener("blur",()=>{
    people = noOfPeople.value;
    console.log(people);
    if(people<=0){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".people-input").style.borderColor = "#ff0000";
    }
    else{
        document.querySelector(".error").style.display = "none";
        document.querySelector(".people-input").style.borderColor = "";
        document.querySelector(".totalPeople").innerText = people;
        calculation();
    }
});



function calculation(){
    let billAmt = Number(document.querySelector(".billAmount").innerText);
    let totalPerson = Number(document.querySelector(".totalPeople").innerText);
    let percent = Number(document.querySelector(".selectedTip").innerText)/100;

    if(billAmt != null && totalPerson != null && totalPerson >= 1 && percent!= null){
        let tipPerPerson = (percent * billAmt)/totalPerson;
        let billPerPerson = billAmt/totalPerson;
        let totalPerPerson = tipPerPerson + billPerPerson;

    document.querySelector(".tip-amount-output").innerText = tipPerPerson.toFixed(2);
    document.querySelector(".total-amount-output").innerText = totalPerPerson.toFixed(2);
    }
};

document.querySelector(".reset").addEventListener("click", ()=>{
    window.location.reload();
});




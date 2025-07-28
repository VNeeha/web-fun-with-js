const BASE_URL =
  "https://api.frankfurter.app/latest";


  // DOM elements
  let amtInput=document.querySelector(".amtInput");
  let selectDropdowns=document.querySelectorAll(".dropdown"); 
  let from= document.querySelector("#from"); 
  let to= document.querySelector("#to"); 
  let msg=document.querySelector(".msg");
  let btn=document.querySelector(".btn");
  
  
  // Adding countries currency for both select lists
  for(dropdown of selectDropdowns){

    for(let countryCurr in countryList){
    let newOption=document.createElement("option");
    newOption.value=countryCurr;
    newOption.innerText=countryCurr;
    if(dropdown.name=="from"&&countryCurr=="USD"||dropdown.name=="to"&&countryCurr=="INR"){
      newOption.selected="selected";
    }
    dropdown.append(newOption);
    }

    // update flagpicture
    dropdown.addEventListener("change",(evt)=>{
       let changedEle=evt.target;
        updateFlag(changedEle);
    });

  }
  
  // update flagpicture function
  let updateFlag=(changedEle)=>{
       let img=changedEle.parentElement.querySelector("img");
       let country=changedEle.value;
       let countryCode=countryList[country];
       img.src=`https://flagsapi.com/${countryCode}/flat/64.png`;
       
  };
  

// Calculating exchange rate
 let getExchangeRate=async()=>{
  try{
    let amtValue=amtInput.value;
    if(amtValue==""||amtValue<1 ||isNaN(amtValue)){
      amtValue=1;
      amtInput.value="1";
    }
    let fromCurr=from.value,toCurr=to.value,rate;
    if(fromCurr===toCurr){
      rate=1;
    }
    else{
      let rateURL=`${BASE_URL}?from=${fromCurr}&to=${toCurr}`;
      let response=await fetch(rateURL);
      let rateObj=await response.json();
      rate = rateObj.rates[toCurr];
    }
    let finalAmt=amtValue*rate;
    msg.innerText=`${amtValue} ${fromCurr} = ${finalAmt.toFixed(2)} ${toCurr}`;
  }
  catch{
    msg.innerText = "Failed to fetch exchange rate.";
  }
  
 }



  // Event listeners
  btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    getExchangeRate();
  });
  window.addEventListener("load",()=>{
      getExchangeRate();
  });

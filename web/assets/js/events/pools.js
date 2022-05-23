 

buttonPoolsSet.addEventListener("click", async() => {
console.log('---------------inside cl')
    
     var select = document.getElementById('chainIdDrop');
    var text = select.options[select.selectedIndex].value; 



    var radioVal = document.querySelector('input[name="dexName"]:checked').value; 

    console.log('---------------inside cl' ,radioVal ,text )

    if(text && radioVal){

        await populatePools(text,radioVal)
    }else{
        errorNotification("Please selct Some value ..");

    }

});
//unprotected


function zaporFormClicked(){
	
        // 1-check input data 
        const header = document.getElementById("headerZapor");
        const zaplneto = document.getElementById("zaplneto");
        const mrz = document.getElementById("mrz");
		const checkBoxChildren = document.getElementById("children");
        const udrsuma = document.getElementById("udrsuma");
        const ostsuma = document.getElementById("ostsuma");

        let errCnt = 0;
        let semicolon = "";

        header.innerText = "Моля попълнете всичко:";
        header.style.color = "white";

        if(zaplneto.value.length === 0 || parseFloat(zaplneto.value) < 0){
            header.innerText+=" Грешен нетен доход";
            errCnt++;
        };
		if(mrz.value.length === 0 || parseFloat(mrz.value) < 0){
            header.innerText+=" Грешна МРЗ";
            errCnt++;
        };
        
        if(errCnt>0){
            header.style.color = "#ff9900";
			udrsuma.value=null;
			ostsuma.value=null;
            return;
        }else{
			header.style.color = "#ff9900";
			header.innerText = "Моля попълнете данните за изчисление:";
		};
        
        // No errors - then calculate
		console.log("Children="+checkBoxChildren.checked);
		if( parseFloat(zaplneto.value) <= parseFloat(mrz.value) ){
			console.log("zaplneto <= mrz.value");
			udrsuma.value = (0.00).toFixed(2);
			ostsuma.value = (parseFloat(zaplneto.value)).toFixed(2) ;
			header.innerText = "";
			header.style.color = "white";
		}else if( parseFloat(zaplneto.value) <= parseFloat(2*mrz.value) ){
			console.log("mrz.value < zaplneto <= 2 * mrz.value");
			if(!checkBoxChildren.checked){
				
				let udr = zaplneto.value/3 ;
				let ost = zaplneto.value - udr ;
				if( ost < parseFloat(mrz.value) ){
					console.log("ost < mrz.value");
					udrsuma.value = (zaplneto.value - mrz.value).toFixed(2) ;
					ostsuma.value = ( parseFloat(mrz.value)).toFixed(2) ;
				}else{
					console.log("ost => mrz.value");
					udrsuma.value = udr.toFixed(2) ;
					ostsuma.value = ost.toFixed(2) ;
				}
				
			}else{
				let udr = zaplneto.value/4 ;
				let ost = zaplneto.value - udr ;
				if( ost < parseFloat(mrz.value) ){
					console.log("ost < mrz.value");
					udrsuma.value = (zaplneto.value - mrz.value).toFixed(2) ;
					ostsuma.value = ( parseFloat(mrz.value)).toFixed(2) ;
				}else{
					console.log("ost => mrz.value");
					udrsuma.value = udr.toFixed(2) ;
					ostsuma.value = ost.toFixed(2) ;
				}
			}
			
		}else if( parseFloat(zaplneto.value) <= parseFloat(4*mrz.value) ){
			console.log("2 * mrz.value < zaplneto <= 4 * mrz.value");
			if(!checkBoxChildren.checked){
				udrsuma.value = (zaplneto.value/2).toFixed(2) ;
				ostsuma.value = (zaplneto.value/2).toFixed(2) ;
			}else{
				udrsuma.value = (zaplneto.value/3).toFixed(2)  ;
				ostsuma.value = (zaplneto.value - zaplneto.value/3).toFixed(2)  ;
			}
			
		}else{
			console.log("zaplneto > 4 * mrz.value");
			if(!checkBoxChildren.checked){
				udrsuma.value = (zaplneto.value-2*mrz.value - 0.01).toFixed(2) ;
				ostsuma.value = 2*mrz.value + 0.01 ;
			}else{
				udrsuma.value = (zaplneto.value-2.5*mrz.value - 0.01).toFixed(2)  ;
				ostsuma.value = 2.5*mrz.value + 0.01  ;
			}
			
		}

		
 
        // Testing
        console.log("zaplneto: "+ zaplneto.value);
		console.log("mrz: "+ mrz.value);
		console.log("udrsuma: "+ udrsuma.value);
        console.log("ostsuma: "+ ostsuma.value);       
    };


// init
let zaporForm = document.getElementById("zapor-form" );
let buttonComp = document.getElementById("buttonComp");

// add event listeners
buttonComp.addEventListener("click",zaporFormClicked);


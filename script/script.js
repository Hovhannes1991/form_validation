let json = JSON.parse(JSON.stringify(countryes))

let option = ''
json.forEach( (country) => {
	let name = country.name
	option += `<option value="${name}">${name}</option>`
} )

document.getElementById('sh_country').innerHTML += option;
document.getElementById('country').innerHTML += option;


let step = 0;
let step1_inputs = Array.from(document.getElementsByClassName('step')[0].getElementsByClassName('field'));
let step2_inputs = Array.from(document.getElementsByClassName('step')[1].getElementsByClassName('field'));


let prev_buttons = document.getElementsByClassName('prev_button')
let next_buttons = document.getElementsByClassName('next_button')
let shipping_checkbox = document.getElementById('shipping_checkbox')


prev_buttons[0].addEventListener('click', prevStep);
prev_buttons[1].addEventListener('click', prevStep);

//for step 1
next_buttons[0].addEventListener('click', () => {
    let incorrect = 0;	
	step1_inputs.forEach( (i) => {
		if(!i.value.trim() && !i.disabled){
			i.classList.remove('valideInput');
			i.classList.add('invalideInput');
			incorrect++
		}
		else if(!i.disabled){
			i.classList.add('invalideInput');
			i.classList.remove('invalideInput');
		}
	})
    
	for(let i = 0; i < 3; i++){
		if(step1_inputs[i].value.length && checkIsLetter(step1_inputs[i].value)){
			console.log(step1_inputs[i].value)
			step1_inputs[i].classList.add('valideInput');
			step1_inputs[i].classList.remove('invalideInput');
			incorrect++
		}
		else if(step1_inputs[i].value.length){
			step1_inputs[i].classList.remove('valideInput');
			step1_inputs[i].classList.add('invalideInput');
		}
	}

	if(incorrect == 0){		
		nextStep()
	}
})





shipping_checkbox.addEventListener('change', function(){
	if(this.checked){
		for(let i = 6; i < 10; i++){
			step1_inputs[i].disabled = 'true';
			step1_inputs[i].style.border = '2px solid grey'
			step1_inputs[i].value = step1_inputs[i-4].value
		}
	}
	else{
		for(let i = 6; i < 10; i++){
			step1_inputs[i].disabled = false;
			step1_inputs[i].style.border = '2px solid green'			
		}
	}
})


for(let i = 0; i < 6; i++){
	step1_inputs[i].addEventListener('input', () => {
		if(shipping_checkbox.checked){
			step1_inputs[i+4].value = step1_inputs[i].value;
		}		
	})
}




//for step 2
next_buttons[1].addEventListener('click', () => {
    let incorrect = 0;
    let login = step2_inputs[0].value;	
	let loginCheck = checkLogin(login);
	if(!loginCheck){
		step2_inputs[0].classList.remove('valideInput');
		step2_inputs[0].classList.add('invalideInput');
		incorrect++
	}
	else{
		step2_inputs[0].classList.remove('invalideInput');
		step2_inputs[0].classList.add('valideInput');
	}

	if(step2_inputs[1].value.length < 4 || step2_inputs[1].value != step2_inputs[2].value){
	    step2_inputs[1].classList.remove('valideInput');
	    step2_inputs[2].classList.remove('valideInput');
	    step2_inputs[2].classList.add('invalideInput');
	    step2_inputs[2].classList.add('invalideInput');
	    incorrect++
	}
	else {
		step2_inputs[1].classList.add('valideInput');
	    step2_inputs[2].classList.add('valideInput');
	    step2_inputs[2].classList.remove('invalideInput');
	    step2_inputs[2].classList.remove('invalideInput');
	}

	if(radioButtons.every( (item) => {
		return item.checked == false
	})){
		radioButtons[0].parentNode.classList.add('not_selected');
	    radioButtons[1].parentNode.classList.add('not_selected');
		incorrect++

	}



	if(incorrect == 0){console.log(incorrect)
	    cc_full_name.value = step1_inputs[0].value + ' ' + step1_inputs[1].value; //add fullname from step1  to step3		
		nextStep()
	}
})





//regex check for email
function checkLogin(login){
    let patt = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let regex = RegExp(patt);
    return regex.test(login)
}







// if all inputs are correct go to next step
function nextStep(){
	    document.getElementsByClassName('step')[step].style.display = 'none';
	    step++;
		if(step < 3){
			document.getElementsByClassName('step')[step].style.display = 'block'
		}
		else{
			aler('Done')
		}
}


//go to previous step
function prevStep(){
	    document.getElementsByClassName('step')[step].style.display = 'none';
	    step--;	
		document.getElementsByClassName('step')[step].style.display = 'block'
}








//for customize radio buttons

let radioButtons = Array.from(document.getElementsByName('package'));
radioButtons[0].onchange = radioButtonSelect;
radioButtons[1].onchange = radioButtonSelect;

function radioButtonSelect(){	
	radioButtons[0].parentNode.classList.remove('selected_radio_button');
	radioButtons[0].parentNode.classList.remove('not_selected');
	radioButtons[1].parentNode.classList.remove('selected_radio_button');
	radioButtons[1].parentNode.classList.remove('not_selected');
	this.parentNode.classList.add('selected_radio_button');	
}






//for step 3

//credit card
let ccn = document.getElementById('credit_card');
let cc_full_name = document.getElementById('cc_full_name');
let cc_cvc = document.getElementById('cc_cvc');
let cc_exp_date = document.getElementById('cc_exp_date');

let cc_icon = document.getElementById('cc_icon');


next_buttons[2].addEventListener('click', function(){
	let incorrect = 0;
	if(ccn.value.length < 13 || ccn.value.length > 19){
		ccn.classList.remove('valideInput');
		ccn.classList.add('invalideInput');
		incorrect++;
	}
	else {
		ccn.classList.add('valideInput');
		ccn.classList.remove('invalideInput');
	}

	if(cc_full_name.value.trim().length < 5 || cc_full_name.value.trim().length > 100 || !checkIsLetter(cc_full_name.value)){
		cc_full_name.classList.remove('valideInput');
		cc_full_name.classList.add('invalideInput');
		incorrect++;
	}
	else {
		cc_full_name.classList.add('valideInput');
		cc_full_name.classList.remove('invalideInput');
	}

	if(cc_cvc.value.trim().length < 3 || cc_cvc.value.trim().length > 4){
		cc_cvc.classList.remove('valideInput');
		cc_cvc.classList.add('invalideInput');
		incorrect++;
	}
	else {
		cc_cvc.classList.add('valideInput');
		cc_cvc.classList.remove('invalideInput');
	}

	if(!checkExpDate.call(cc_exp_date)){		
		cc_exp_date.classList.remove('valideInput');
		cc_exp_date.classList.add('invalideInput');
		incorrect++;
	}
	else {		
		cc_exp_date.classList.add('valideInput');
		cc_exp_date.classList.remove('invalideInput');
	}
})

ccn.addEventListener('keydown', () => {	
	if(!checkIsNumber(event)){		
		event.preventDefault()
	}

	getCardType(ccn.value);
})

ccn.addEventListener('keyup', () => {
	chekFourDigits();
})


cc_cvc.addEventListener('keydown', () => {	
	if(!checkIsNumber(event)){		
		event.preventDefault()
	}
})

cc_exp_date.addEventListener('change', checkExpDate)



function checkIsNumber(e){
	e = e.keyCode;
	// 8 - del, 46 - backspace, 37 - left arrow, 39 - right arrow
	if( ((e < 96 && (e < 48 || e > 57)) || e > 105) && e != 8 && e != 46 && e != 37 && e != 39){
		return false
	}	
	else {
		return true
	}
}

function checkIsLetter(str) {
  return /^[a-zA-Z]+$/.test(str);
}



function chekFourDigits(){
	let value = ccn.value.replace(/\s/g, '');
	let parts = [];
	for(let i = 0; i < value.length; i += 4){
		parts.push(value.substring(i, i + 4))
	}
	if(parts.length){
		ccn.value = (parts.join( ' '))
	}
}


function getCardType( num ) {   
    num = num.replace(/[^\d]/g,'');

    var regexps = {
        'mastercard' : /^5[1-5][0-9]{3,}$/,
        'visa' : /^4[0-9]{3,}$/,
        'amex' : /^3[47][0-9]{3,}$/,
        'discover' : /^6(?:011|5[0-9]{2})[0-9]{3,}$/,
        'diners' : /^3(?:0[0-5]|[68][0-9])[0-9]{4,}$/,
        'jcb' : /^(?:2131|1800|35[0-9]{3})[0-9]{3,}$/,
        'unknown' : /.*/,
    };

    for( var card in regexps ) {
        if ( num.match( regexps[ card ] ) ) {            
            cc_icon.className = card == 'unknown' ? 'fa fa-credit-card fa-lg' : `fa fa-lg fa-cc-${card}`
            return card;
        }
    }
}


function checkExpDate(){	
	let dateExp = (Date.parse(this.value));
	let today = (Date.now());
	isActive = (dateExp > today);	
	return (isActive);
}
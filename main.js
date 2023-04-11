const keys = document.querySelectorAll('.key');
const display_input = document.querySelector('.display .input')
const display_output = document.querySelector('.display .output')
let input = "";

for (let key of keys) {
    const value = key.dataset.key
    key.addEventListener('click',() => {
        if (value=="clear"){
            input = "";
                display_input.innerHTML = "";
                display_output.innerHTML= "";
        }
        else if(value=="backspace"){
            input = input.slice(0,-1);
            display_input.innerHTML = InputCleaner(input);
        }
        else if(value=="="){
            let result = eval(InputPrep(input));
            display_output.innerHTML = OutputCleaner(result);
        }
        else if(value=="brackets"){
            if(input.indexOf("(") == -1 || input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") < input.lastIndexOf(")")){
                input += "(";
            }
            else if(input.indexOf("(") != -1 && input.indexOf(")") == -1 || input.indexOf("(") != -1 && input.indexOf(")") != -1 && input.lastIndexOf("(") > input.lastIndexOf(")")) {
                input += ")";
            }
            display_input.innerHTML = InputCleaner(input);
        }
        else{
            if(Inputvalidate(value)){

                input += value; 
                display_input.innerHTML = InputCleaner(input); 
            }
        }
    })
}

function InputCleaner(input) {
    let input_array = input.split("");
    let input_array_length = input_array.length;

    for (let i=0;i<input_array_length;i++){
        if(input_array[i]=="*"){
            input_array[i] = ` <span class="operator">x</span> `;
        }
        else if(input_array[i]=="/"){
            input_array[i] = ` <span class="operator">÷</span> `;
        }
        else if(input_array[i]=="-"){
            input_array[i] = ` <span class="operator">-</span> `;
        }
        else if(input_array[i]=="+"){
            input_array[i] = ` <span class="operator">+</span> `;
        }
        else if(input_array[i]=="("){
            input_array[i] = `<span class="brackets">(</span> `;
        }
        else if(input_array[i]==")"){
            input_array[i] = `<span class="brackets">)</span> `;
        }
        else if(input_array[i]=="%"){
            input_array[i] = `<span class="percent">%</span> `;
        }
    }
    return input_array.join("");
}
function OutputCleaner(output){
    let output_string = output.toString();
    let decimal = output_string.split(".")[1];
    output_string = output_string.split(".")[0];
    let output_array = output_string.split("");
    if (output_array.length > 3) {
        for (let i = output_array.length - 3 ; i >0 ; i-=3) { //comma at every third digit
            output_array.splice(i,0,","); 
        }
    }
        if (decimal) {
            output_array.push(".");
            output_array.push(decimal);
        }
        return output_array.join("");
}
function Inputvalidate(value){
    let operators = ['+',"-","/","*"];
    let lastinput = input.slice(-1);
    if (value=="." && lastinput == "."){
        return false;
    }
    if (operators.includes(value)){
        if (operators.includes(lastinput)){
            return false;
        }
        else{
            return true;
        }
    }
    return true;
}
function InputPrep(input){
    let input_array = input.split("");
    for (let i=0;i<input_array.length;i++){
        if(input_array[i] == "%"){
            input_array[i] = "/100";
        }
    }
    return input_array.join("");
}
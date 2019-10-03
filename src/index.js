const EMPTY_STRING = '';
const MULTIPLE_SIGN = '*';
const EXCLAMATION_POINT_SIGN = '!';

// Error messages
const NOT_VALID_INPUT = 'The input is not valid.';

const zeros = function (expression) {
  let countZeros = 0;

  let numberString = EMPTY_STRING;
  let factorialCounter = 0;
  let lastDigit = 1;

  const calculate = () => {
    let factorialLastDigit = 1;
    const balanceOf10 = number => number % 10;


    // calculate
    const number = +numberString;
    let increment = 1;
    let startValue = 1;

    if(factorialCounter === 2){
      if(number % 2 === 0){
        startValue = 2;
      }

      increment = 2;
    }

    for(let j = startValue; j <= number; j += increment) {        
      const lastDigitCurrentFactorial = balanceOf10(j);

      if(lastDigitCurrentFactorial === 0){
        countZeros++;
        continue;
      }

      const multiply = factorialLastDigit * lastDigitCurrentFactorial;
      factorialLastDigit = balanceOf10(multiply);

      if(factorialLastDigit === 0 ){
        countZeros++;
        factorialLastDigit = balanceOf10((multiply / 10));
      }
    }

    numberString = EMPTY_STRING;
    factorialCounter = 0;
    const multiply = lastDigit * factorialLastDigit;
    lastDigit = balanceOf10(multiply);

    if(lastDigit === 0){
      countZeros++;
      lastDigit = balanceOf10(multiply / 10);
    }
  };

  for(let i = 0; i <= expression.length; i++){
    const currentSymbol = expression[i];

    if(!currentSymbol){
      calculate();      
      break;
    }

    
    if(currentSymbol === EXCLAMATION_POINT_SIGN){
      if(factorialCounter === 2) {
        throw new Error(NOT_VALID_INPUT);
      }

      factorialCounter++;
      continue;
    }

    if(currentSymbol === MULTIPLE_SIGN){
      calculate();
      continue;
    }

    const convertedDigit = Number(currentSymbol);

    if(isNaN(convertedDigit)){
      throw new Error(NOT_VALID_INPUT);
    }
    
    numberString += convertedDigit.toString();
  }

  return countZeros;
}

module.exports = zeros;

const result = zeros('9!!*10!!*7!!');
console.log(result);
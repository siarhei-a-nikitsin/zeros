const EMPTY_STRING = '';
const MULTIPLE_SIGN = '*';
const EXCLAMATION_POINT_SIGN = '!';

// Error messages
const NOT_VALID_INPUT = 'The input is not valid.';

const zeros = function (expression) {
  let stringNumber = EMPTY_STRING;  
  let exclamationCounter = 0;
  let count2 = 0;
  let count5 = 0;  

  const balanceOf10 = number => number % 10;

  for(let i = 0; i <= expression.length; i++){
    const currentSymbol = expression[i];
    
    if(currentSymbol === EXCLAMATION_POINT_SIGN){
      if(exclamationCounter === 2) {
        throw new Error(NOT_VALID_INPUT);
      }

      exclamationCounter++;
      continue;
    }

    if(currentSymbol === MULTIPLE_SIGN || !currentSymbol){
      // calculation zeros
      const number = +stringNumber;
      let startNumber = 1;
      let increment = 1;
      if(exclamationCounter === 2){
        if((number % 2) === 0){
          startNumber = 2;
        }
        increment = 2;
      }
      
      for(let j = startNumber; j <= number; j += increment){
        let j2 = j;
        while((j2 % 2) === 0) {
          count2++;
          j2 /= 2;
        }

        let j5 = j;
        while((j5 % 5) === 0){
          count5++;
          j5 /= 5;
        }
      }
      //
      stringNumber = EMPTY_STRING;
      exclamationCounter = 0;
      continue;
    }

    const convertedDigit = Number(currentSymbol);

    if(isNaN(convertedDigit)){
      throw new Error(NOT_VALID_INPUT);
    }
    
    stringNumber += convertedDigit.toString();
  }

  const countZeros = Math.min(count2, count5);

  return countZeros;
}

module.exports = zeros;
function convertToRoman(num) {
  num += ''
  let val ='';
  for (let i = 0; i < num.length; i++) {
    let switchCase = num.length - i;
    switch (switchCase) {
      case 4:
        val += specificConverter(parseInt(num[i]), 'M', '', '');
        break;

      case 3:
        val += specificConverter(parseInt(num[i]), 'C', 'D', 'M');
        break;
      
      case 2:
        val += specificConverter(parseInt(num[i]), 'X', 'L', 'C');
        break;
      
      case 1:
        val += specificConverter(parseInt(num[i]), 'I', 'V', 'X');
        break;
    }
  }
  return val;
}

function specificConverter(num, numeral, numeralMid, numeralNext){
  let acc = '';
  if (num > 0 && num < 4 ) {
    for (let i = 0; i < num; i++) {
      acc += numeral;
    }
  } else if (num === 4 ) {
    acc += (numeral + numeralMid);
  } else if (num === 5) {
    acc += numeralMid
  } else if (num < 9 && num > 5) {
    acc += numeralMid;
    for (let i = 0; i < num - 5; i++){
      acc += numeral;
      } 
    } else if (num === 9) {
      acc += (numeral + numeralNext);
    }
  return acc;
}

// console.log(convertToRoman(3006));
console.log(convertToRoman(134))
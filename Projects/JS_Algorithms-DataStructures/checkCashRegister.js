/* 
JavaScript Algorithms and Data Structures Projects: Cash Register
Design a cash register drawer function checkCashRegister() that accepts purchase price as the first argument (price), payment as the second argument (cash), and cash-in-drawer (cid) as the third argument.

cid is a 2D array listing available currency.

The checkCashRegister() function should always return an object with a status key and a change key.

Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is less than the change due, or if you cannot return the exact change.

Return {status: "CLOSED", change: [...]} with cash-in-drawer as the value for the key change if it is equal to the change due.

Otherwise, return {status: "OPEN", change: [...]}, with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.

Remember to use Read-Search-Ask if you get stuck. Try to pair program. Write your own code.
 */

function checkCashRegister(price, cash, cid) {
  let difference, cidAmount, changeObj, output ={ status: '', change:[]};

  cidAmount = getCIDAmount(cid);
  difference = cash.toFixed(2) - price.toFixed(2);
  
  if (difference === 0) {
    output.status = 'CLOSED';
    return output;
  }
  
  if (difference < cidAmount) {
    output.status = 'OPEN';
    // call make change function
    changeObj = getChange(difference.toFixed(2), cid);
    for (const prop in changeObj){
      output.change.push([prop, changeObj[prop]]);
    }

    if (getCIDAmount(output.change) < difference) {
      output.status = 'INSUFFICIENT_FUNDS';
      output.change = [];
    }
  } else if (difference > cidAmount) {
    output.status = 'INSUFFICIENT_FUNDS';
  } else {
    output.status = 'CLOSED';
    output.change= cid;
  }
  // Here is your change, ma'am.
  return output;
}

function getCIDAmount(cid) {
  let amount = 0;

  for (let idx of cid){
    amount += idx[1];
  }

  return amount.toFixed(2);
}

function getChange(change, cid, val={}) {

  if (change >= 100 && (cid[8][1] >= change || cid[8][1] > 0)) {
    val['ONE HUNDRED'] = val['ONE HUNDRED'] + 100 || 100;
    change -= 100;
    cid[8][1] -= 100;
    getChange(change, cid, val);
  } 
  else if (change >= 20 && (cid[7][1] >= change || cid[7][1] > 0)) {
    val['TWENTY'] = val['TWENTY'] + 20 || 20;
    change -= 20;
    cid[7][1] -= 20;
    getChange(change, cid, val);
  } 
  else if (change >= 10 && (cid[6][1] >= change || cid[6][1] > 0)) {
    val['TEN'] = val['TEN'] + 10 || 10;
    change -= 10;
    cid[6][1] -= 10;
    getChange(change, cid, val);
  } 
  else if (change >= 5 && (cid[5][1] >= change || cid[5][1] > 0)) {
    val['FIVE'] = val['FIVE'] + 5 || 5;
    change -= 5;
    cid[5][1] -= 5;
    getChange(change, cid, val);
  } 
  else if (change >= 1 && (cid[4][1] >= change || cid[4][1] > 0)) {
    val['ONE'] = val['ONE'] + 1 || 1;
    change -= 1;
    cid[4][1] -= 1;
    getChange(change, cid, val);
  }
  else if (change >= .25 && (cid[3][1] >= change || cid[3][1] > 0)) {
    val['QUARTER'] = val['QUARTER'] + .25 || .25;
    change -= .25.toFixed(2);
    cid[3][1] -= .25.toFixed(2);
    getChange(change.toFixed(2), cid, val);
  }
  else if (change >= .1 && (cid[2][1] >= change || cid[2][1] > 0)) {
    val['DIME'] = val['DIME'] + .1 || .1;
    change -= .1.toFixed(2);
    cid[2][1] -= .1.toFixed(2);
    getChange(change.toFixed(2), cid, val);
  }
  else if (change >= .05 && (cid[1][1] >= change || cid[1][1] > 0)) {
    val['NICKEL'] = val['NICKEL'] + .05 || .05;
    change -= .05.toFixed(2);
    cid[1][1] -= .05.toFixed(2);
    getChange(change.toFixed(2), cid, val);
  }
  else if (change >= .01 && (cid[0][1] >= change || cid[0][1] > 0)) {
    val['PENNY'] = val['PENNY'] + .01 || .01;
    change -= .01.toFixed(2);
    cid[0][1] -= .01.toFixed(2);
    getChange(change.toFixed(2), cid, val);
  } 

  return val

}

// Example cash-in-drawer array:
// [["PENNY", 1.01],
// ["NICKEL", 2.05],
// ["DIME", 3.1],
// ["QUARTER", 4.25],
// ["ONE", 90],
// ["FIVE", 55],
// ["TEN", 20],
// ["TWENTY", 60],
// ["ONE HUNDRED", 100]]

// {status: "OPEN", change: [["QUARTER", 0.5]]}
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));

console.log(/* ' should return {status: "OPEN", change: [["QUARTER", 0.5]]}.', */ checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]))

// let cid = [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]];
// console.log('Amount is: ', getCIDAmount(cid));

console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])) //should return {status: "INSUFFICIENT_FUNDS", change: []}.
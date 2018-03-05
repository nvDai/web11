'use strict'

function search(input, target) {
  //return  input.indexOf(target);  // Remove this line and change to your own algorithm
  var index = -1;
  for (var i = 0; i < input.length; i++) {
    if(input[i] == target) {
        index = i;
        return {"input": input, "target": target, "index": index};
        break;
    }
  }
  return -1;
}

// var arr = [1, 2, 3, 4, 5, 6, 7];
// var target = 5;
// var result = search(arr, target);
// console.log(result);

module.exports = search

'use strict'

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  for (var i = 0; i < input.length - 1; i++) {
  	for (var j = i + 1; j < input.length; j++) {
  		if(input[j] < input[i]) {
  			var temp = input[j];
  			input[j] = input[i];
  			input[i] = temp;
  		}
  	}
  }
  return input;
}

module.exports = sort

'use strict'

	const rangeTarget = 10;
	var result = {};

	function creatArray(length) {
		var arr = [];
		for (var i = 0; i < length; i++) {
			arr[i] = Math.floor((Math.random() * rangeTarget) + 1);
		}
		return arr;
	}

	function creatObj(input, target) {
		var index = -1;

	  	for (var i = 0; i < input.length; i++) {
	    	if(input[i] == target) {
	        	index = i;
	        	if (input.length >= 5) {
	        		if (index === 0) {
	        			return {"input": input, "target": target, "index": index, "fisrtIndex": true, "middleIndex": false, "lastIndex": false};
	        		} else if (index == input.length - 1) {
	        			return {"input": input, "target": target, "index": index, "fisrtIndex": false, "middleIndex": false, "lastIndex": true};
	        		} else {
	        			return {"input": input, "target": target, "index": index, "fisrtIndex": false, "middleIndex": true, "lastIndex": false};
	        		}
	        	}
	        	break;
	    	}
	  	}
	  return {"input": input, "target": target, "index": index};
	}

	function generate(testLengthArray){
	 	for (var i = 0; i < testLengthArray.length; i++) {
	 		var itemObj = {};
	 		var lengthItem = testLengthArray[i];

	 		var itemArr = creatArray(lengthItem);
	 		var itemTarget = Math.floor((Math.random() * rangeTarget) + 1);

	 		itemArr.sort(function(a, b) { return (a - b)});	//Sắp xếp mảng số nguyên tăng dần

	 		itemObj = creatObj(itemArr, itemTarget);
	 		result[i] = itemObj; 
	 	}
	 	return result;
	}

	// var arr = [6, 4, 6, 8, 9, 12];
	// generate(arr);
	// console.log(arr);
	// console.log(result);

module.exports = generate

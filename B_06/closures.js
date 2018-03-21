// let val = 7
// function createAdder() {
//     function addNumbers(a, b) {
//        let ret = a + b
//          return ret
//     }
//     return addNumbers();
//  }
// let adder = createAdder()
// let sum = adder(val, 8)
// console.log('example of function returning a function: ', sum)

// function createCounter() {
//    let counter = 0
//    let myFunction = function() {
//         counter = counter + 1
//         return counter
//     }
//     return myFunction
// }
// const increment = createCounter()
// const c1 = increment()
// const c2 = increment()
// const c3 = increment()
// console.log('example increment', c1, c2, c3)

// lexical scope of outerFn
// var outerFn = function() {
//     var n = 5;
//     // console.log(innerItem);
//     // lexical scope of innerFn
//     var innerFn = function() {  
//         var innerItem = "inner";    // Error. Can only go upwards with the elevator. Not downwards.
//         console.log(n);
//     };
//     return innerFn;
// };
// (outerFn())();

var object = {
    data: [1,2,3],
    dataDouble: [1,2,3],
    double: function() {
        console.log("this inside of outerFn double()");
        console.log(this);
        return this.data.map(function(item) {
            console.log(this);      // What is this ???
            return item * 2;
            });
    },
    doubleArrow: function() {
        console.log("this inside of outerFn doubleArrow()");
        console.log(this);
        return this.dataDouble.map(item => {
            console.log(this);      // What is this ???
            return item * 2;
        });
    }
};
object.double();
object.doubleArrow();
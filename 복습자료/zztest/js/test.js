function showName (firstName, lastName) {
	var nameIntro = "Your name is ";
		// this inner function has access to the outer function's variables, including the parameter
	function makeFullName () {
		return nameIntro + firstName + " " + lastName;
	}

	return makeFullName ();
}


showName ("Michael", "Jackson"); // Your name is Michael Jackson

console.log(showName("Michael", "Jackson"));


///////////////

//클로저는 외부 함수가 반환 된 후에도 외부 함수의 변수에 액세스 할 수 있습니다 :
//클로저의 가장 중요한 기능 중 하나는 외부 함수가 반환 된 후에도 내부 함수가 여전히 외부 함수의 변수에 액세스 할 수 있다는 것입니다.
//JavaScript의 함수가 실행될 때 함수는 생성되었을 때 적용되었던 것과 동일한 범위 체인을 사용합니다.
//즉, 외부 함수가 반환 된 후에도 내부 함수는 여전히 외부 함수의 변수에 액세스 할 수 있습니다.
//따라서 나중에 프로그램에서 내부 함수를 호출 할 수 있습니다. 이 예제에서는 다음을 보여 줍니다.


function celebrityName (firstName) {
	var nameIntro = "This celebrity is ";
	// this inner function has access to the outer function's variables, including the parameter
	function lastName (theLastName) {
		return nameIntro + firstName + " " + theLastName;
	}
	return lastName;
}

var mjName = celebrityName ("Michael"); // At this juncture, the celebrityName outer function has returned.

// The closure (lastName) is called here after the outer function has returned above
// Yet, the closure still has access to the outer function's variables and parameter
mjName ("Jackson"); // This celebrity is Michael Jackson

console.log(mjName ("Jackson"));



/////////////////////////////



//클로저는 외부 함수의 변수에 대한 참조를 저장합니다.
//실제 값을 저장하지 않습니다. 클로저는 클로저가 호출되기 전에 외부 함수의 변수 값이 변경


function celebrityID () {
	var celebrityID = 999;
	// We are returning an object with some inner functions
	// All the inner functions have access to the outer function's variables
	return {
		getID: function ()  {
			// This inner function will return the UPDATED celebrityID variable
			// It will return the current value of celebrityID, even after the changeTheID function changes it
			return celebrityID;
		},
		setID: function (theNewID)  {
			// This inner function will change the outer function's variable anytime
			celebrityID = theNewID;
		}
	}

}

var mjID = celebrityID (); // At this juncture, the celebrityID outer function has returned.
mjID.getID(); // 999
mjID.setID(567); // Changes the outer function's variable
mjID.getID(); // 567: It returns the updated celebrityId variable


////////////////////////


// //클로저 사라진 Awry
// //클로저는 외부 함수 변수의 업데이트 된 값에 액세스 할 수 있기 때문에 외부 함수의 변수가 for 루프로 변경 될 때 버그가 발생할 수도 있습니다.

// // This example is explained in detail below (just after this code box).
// function celebrityIDCreator (theCelebrities) {
// 	var i;
// 	var uniqueID = 100;
// 	for (i = 0; i < theCelebrities.length; i++) {
// 		theCelebrities[i]["id"] = function () {
// 		return uniqueID + i;
// 		}
// 	}

// 	return theCelebrities;
// }

// var actionCelebs = [
// 	{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}
// ];

// var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

// var stalloneID = createIdForActionCelebs[0];

// console.log(stalloneID.id); // 103


// //앞의 예시 에서 익명 함수가 호출될 때까지 i의 값은 3(배열의 길이와 그 다음에 증가)입니다. 숫자 3이 고유 ID에 추가되어 모든 유명인 ID에 대해 103을 만들었습니다.
// //따라서 반환 된 배열의 모든 위치는 의도 된 100, 101, 102 대신 id = 103을 얻습니다.

// //이것이 일어난 이유는 이전 예제에서 설명한 것처럼 클로저 (이 예제의 익명 함수)가 값이 아닌 참조로 외부 함수의 변수에 액세스 할 수 있기 때문입니다.
// //이전 예제에서 클로저를 사용하여 업데이트 된 변수에 액세스 할 수 있음을 보여 주듯이이 예제는 외부 함수가 전체 for 루프를 실행하고 i의 마지막 값 인 103을
// //반환하기 때문에 변경 될 때 i 변수에 유사하게 액세스했습니다.




// /////////////////////////////////////////


// //클로저에서 이러한 부작용(버그)을 수정하려면 다음과 같이 IIFE(즉시 호출된 함수 표현식)를 사용할 수 있습니다.


// function celebrityIDCreator (theCelebrities) {
// 	var i;
// 	var uniqueID = 100;
// 	for (i = 0; i < theCelebrities.length; i++) {
// 		theCelebrities[i]["id"] = function (j)  { // the j parametric variable is the i passed in on invocation of this IIFE
// 			return function () {
// 				return uniqueID + j; // each iteration of the for loop passes the current value of i into this IIFE and it saves the correct value to the array
// 			} () // BY adding () at the end of this function, we are executing it immediately and returning just the value of uniqueID + j, instead of returning a function.
// 		} (i); // immediately invoke the function passing the i variable as a parameter
// 	}

// 	return theCelebrities;
// }

// var actionCelebs = [{name:"Stallone", id:0}, {name:"Cruise", id:0}, {name:"Willis", id:0}];

// var createIdForActionCelebs = celebrityIDCreator (actionCelebs);

// var stalloneID = createIdForActionCelebs [0];
// console.log(stalloneID.id); // 100

// var cruiseID = createIdForActionCelebs [1];

// console.log(cruiseID.id); // 101




/////////////////

// constructor function
function Website() {

	// private members
	var privateUrl = 'https://www.internalpointers.com';
	var privatePrint = function() {
		console.log(privateUrl);
	};

	// public members
	this.printUrl = function() {
		privatePrint();
	};
};

var InternalPointers = new Website();
InternalPointers.printUrl();               // 'https://www.internalpointers.com'
console.log(InternalPointers.privateUrl);  // undefined
// InternalPointers.privatePrint();           // TypeError: InternalPointers.privatePrint is not a function


////////////////////////
//  https://ko.javascript.info/closure

function makeCounter() {
	let count = 0;

	return function() {
		return count++;
	};
}

let counter = makeCounter();
let counter2 = makeCounter();

console.log( counter() ); // 0
console.log( counter() ); // 1
console.log( counter() ); // 2
console.log( counter2() ); // 0




////////////////////////

function inBetween(a, b) {
	return function(x) {
		return x >= a && x <= b;
	};
}

function inArray(arr) {
	return function(x) {
		return arr.includes(x);
	};
}

let arr = [1, 2, 3, 4, 5, 6, 7];

console.log(arr.filter(inBetween(3, 6))); // 3,4,5,6

console.log(arr.filter(inArray([1, 2, 10]))); // 1,2


/////////////////////////////////////////

//  https://ko.javascript.info/new-function
//  https://ko.javascript.info/arrow-functions-basics
//  https://ko.javascript.info/intro
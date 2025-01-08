## **Javascript Foundation** and Basics.

---

### 1. Why Languages ?&#x20;

Whenever you Executes something goes into the ram. What goes into the ram -> not C++ codes not any sourcecode. -- our hardware read high level code. with the help of _compilers_. which will convert high level code into Zero's and One's. (011001010...).&#x20;

Languages are required to make a conversation between us (humans) and machines. because computer only understands 010010101. and we speak english, hindi, french. so we needed some common language. wo make it work.

> - Languarges are used to write qpplications.
>
> - Developers write high level code in these languages.
>
> - Every language has a compiler which converts the developer code into 0110011p0

### 2. Interpreted vs compiled Languages.&#x20;

What are Compilers? : Compilers convert high level developer friendly code into 0s and 1s. (c++ compiler is called g++)&#x20;

There are three Steps require to run a c++ code code. which is **`compiled.`** &#x20;

1.  Writing a code.

2.  Compiling a Code.&#x20;

3.  Running the code (Putting it into ram)

There will be only two Steps while running a javascript code which is `Interpreted`

1.  writing a code.

2.  Running a code.

> Unlike c++ it does not compiled the whole code. then run it. Javascript compiles every line and then it runs. so every line which is written in js. get's comverted into 0s and 1s. then it runs.&#x20;
>
> eg: for a 10 line js program. it will run 10 lines saparately.

| Compiled Languages                                      | Interpreted Languages                      |
| :------------------------------------------------------ | :----------------------------------------- |
| First need to compile, then need to run.                | Usually go line by line.                   |
| Usually don't compile if there is an error in the code. | Can run partially if the error comes later |
| Example - C++, Java, Rust, Golang                       | Example - Javascript, Python               |

### 3. Why JS? >> Other Languages in some use cases.&#x20;

Browsers can only understand HTML / CSS / JS (not technically true ) - browsers can understand other languages like c++, rust, java and others. b;ut js is mandatory.

> Thanks to node.js. now js can be used for "Backend Development"

### 4. Strict vs dynamic languages.

There are two types of Languages. One is Strict and another is Dynamic Typped Languages. Forexample: In strict before initializing any variable we need to specify the types to it. (int number = 5;) in c++. is stricted. and it will not hold any other type of variable other than number. while in js: (var number = 5) here we can specify even "vishal" on the place of 5. and it will happily accept.&#x20;

> While Strictly types languages are more strict code. we can move fast with javascript as it is dynamically typed.&#x20;

### 5. Single-Threaded Nature of JavaScript

The single-threaded nature of JavaScript means that it executes code line by line, completing one task before starting the next. Unlike other languages like Java or C++, which can handle multiple processes at the same time, JavaScript does not split tasks into concurrent threads.

While JavaScript is single-threaded, it runs on only one thread, meaning it processes tasks sequentially on a single core of your machine.

- **JavaScript can only use one core** of your laptop or computer at a time.

- This is one of the reasons why JavaScript is sometimes considered less suitable for highly scalable systems.

- However, there **are ways to make it use all cores** of your machine.

> For example, when I rented a 20-core machine on AWS and ran Node.js, it used only one core at a time.

In short, **JavaScript runs line by line**, processing one line of code at a time. While basic code in C++ also executes sequentially, C++ allows you to create new processes that can run on different cores.

Solution : **`Subroutines`**&#x20;

Subroutines, such as `worker_threads` in Node.js, can help solve this issue by offloading tasks to separate threads, making use of all available cores. (To be explored later)

### 6. Simple primitives in JS( number, string, booleans)

| **Variables**                                                                                                                     | **Data Types**                                                                                                                                                                                                                                                                                    | **If/Else**                                                                                                                                                     | **Loops**                                                                                                                                                                                           |     |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-- |
| Variables are containers for storing data values, which can change during execution.                                              | Data types classify the kind of value a variable can hold, determining what operations can be performed on it.                                                                                                                                                                                    | Conditional statements that execute different blocks of code based on specified conditions.                                                                     | Constructs used to repeat a block of code multiple times until a specified condition is met.                                                                                                        |     |
| In JavaScript, we use `let` (block-scoped), `const` (block-scoped and immutable), and `var` (function-scoped and less preferred). | **Primitive data types**: - `String`: Represents text. - `Number`: Represents numeric values. - `Boolean`: Represents logical values (`true` or `false`). - `Null`: Intentional absence of value. - `Undefined`: Unassigned variables. - `BigInt`: Large integers. - `Symbol`: Unique identifier. | - `if`: Executes code if the condition is true. - `else`: Executes code if the `if` condition is false. - `else if`: Tests additional conditions if `if` fails. | - **Common types**: - `For`: Iterates over a block for a set number of times. - `While`: Runs as long as a condition is true. - `Do-While`: Executes at least once, even if the condition is false. |     |
| Example: `let age = 25; const name = "John"; var isStudent = true;`                                                               | **Non-primitive types**: - `Object`: Key-value pairs. - `Array`: Ordered list of values. - `Function`: Block of reusable code.                                                                                                                                                                    | Example: `if (age > 18) { console.log("Adult"); } else { console.log("Minor"); }`                                                                               | Example: `for (let i = 0; i < 5; i++) { console.log(i); }`                                                                                                                                          |     |

### 7. Complex primitives in JS ( arrays, objects )

| Arrays                                                                                                                 | Objects                                                                                                                              |
| ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Arrays are ordered collections of values. They can hold multiple values of any type (strings, numbers, objects, etc.). | Objects are collections of key-value pairs. The keys are strings (or symbols), and the values can be any valid JavaScript data type. |
| Example: `let arr = [1, 2, 3, 'hello', {name: 'John'}];`                                                               | Example: `let obj = {name: 'John', age: 30, city: 'New York'};`                                                                      |
| Arrays are zero-indexed, meaning the first element has an index of 0.                                                  | Objects do not have a specific order for the properties.                                                                             |
| Arrays can have elements of different data types.                                                                      | Objects are used to store related data in a structured format, often used to model real-world entities.                              |
| Arrays have built-in methods like `.push()`, `.pop()`, `.shift()`, etc.                                                | Objects allow access to values using the key (property name) like `obj.name`.                                                        |

```javascript
const allUser = [
  {
    firstName: "vishal",
    gender: "male",
  },
  {
    firstName: "deepa",
    gender: "female",
  },
];

for (let i = 0; i < allUser.length; i++) {
  if (allUser[i]["gender"] == "male") {
    console.log(allUser[i]["firstName"]);
  }
}
```

This was an example of how can we use objects inside an array.

### 8. Functions in Javascript.

1.  Abstract out logic in your program.

2.  Take arguments as a input.

3.  Return a value as an output.

4.  You can think of them as an independent program that is supposed to do something given an input.

5.  Functions can take other functions as input - this will cofuse you (callbacks)

```javascript
// Basic Syntax of Function :

function findSum(a, b) {
  // a and b are called arguments. the goal is to do things with the input and return a output.
  return a + b;
}

// calling the same function

const value = findSum(5, 6); // should return 11
```

There are many types of Functions in Javascript some of them are :&#x20;

| Function Type                                      | Description                                                                                                                                                                       |
| :------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Regular Function**                               | A normal function created using the `function` keyword. You can call it by its name. Example: `function greet() { console.log("Hello"); }`                                        |
| **Anonymous Function**                             | A function without a name. Often used as arguments to other functions or assigned to variables. Example: `const greet = function() { console.log("Hello"); };`                    |
| **Arrow Function**                                 | A shorter way to write functions using `=>`. It doesn’t have its own `this`, which can be useful in certain situations. Example: `const greet = () => { console.log("Hello"); };` |
| **IIFE (Immediately Invoked Function Expression)** | A function that runs as soon as it’s defined. It’s useful for avoiding global variables. Example: `(function() { console.log("Hello"); })();`                                     |
| **Generator Function**                             | A function that can pause and resume. It is defined with a `*` and allows you to control the flow of execution. Example: `function* greet() { yield "Hello"; }`                   |
| **Async Function**                                 | A function that works with promises. It allows you to use `await` for handling asynchronous code. Example: `async function fetchData() { await data(); }`                         |
| **Callback Function**                              | A function passed as an argument to be executed later. It’s used in many async operations. Example: `function fetchData(callback) { callback(); }`                                |
| **Higher-Order Function**                          | A function that takes other functions as arguments or returns a function. Example: `function add(a, b) { return a + b; }`                                                         |
| **Method**                                         | A function that is a property of an object. Example: `const person = { greet() { console.log("Hello"); } };`                                                                      |
| **Constructor Function**                           | A function used to create and set up new objects. It’s called with the `new` keyword. Example: `function Person(name) { this.name = name; }`                                      |
| **Pure Function**                                  | A function that doesn’t change anything outside itself and always returns the same result for the same input. Example: `function add(a, b) { return a + b; }`                     |
| **Recursive Function**                             | A function that calls itself to solve a problem. Example: `function factorial(n) { return n === 0 ? 1 : n * factorial(n - 1); }`                                                  |
| **SetTimeout/SetInterval Function**                | Functions used to delay or repeatedly execute code. Example: `setTimeout(() => { console.log("Hello"); }, 1000);`                                                                 |

```javascript
function sun(num1, num2, fntoCall) {
  let result = num1 + num2;
  fntoCall(result);
}

function displayResult(data) {
  console.log("Result of the sum is " + data);
}

function displayPassiveResult(data) {
  console.log("Sum's result is  " + data);
}

// you are only allowed to call one function after this.
// how will you displayResult of a sum
const ans = sum(1, 2, displayResult);

// callbacks means passing function as an argunment in another function.

// Need to read more about callbacks function and other types of function.
```

### 9. Practise Problem Solving

1.  Create a counter in javascript (counts down from 30 to 0).

2.  Clculate the time it takes between a setTimeout call and the inner function actually running.

3.  Create a terminl clock (HH:MM:SS)

### 10. Callback functions, Event loop, callback queue, Asynchronous Programing

### 11. Callback hell and Promises

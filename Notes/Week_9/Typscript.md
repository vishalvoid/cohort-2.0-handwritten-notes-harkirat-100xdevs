## **Typescript basics to advance**

### Strongly Typed vs Loosely Typed.&#x20;

The term strongly tylped and loosely typed refer to howe programming languages handle tylpes, particularly how strict they are about type conversion and type safety.&#x20;

| Strongly Typed                        | Loosely Typed                                             |
| ------------------------------------- | --------------------------------------------------------- |
| lesser runtime errors                 | easy to write code.                                       |
| stricter codebase                     | fast to bootstrap                                         |
| Explicit                              | Implicit (Type Coercion)                                  |
| easy to catch errors at compile type. | Can be challenging (runtime errors) - low learning curve. |
| Eg: Java, C++, C, Rust                | Eg: Python, Javascript, perl, php                         |

People realised that js ia a very power language, but lacks types, Typescript was introduced as a new language add types on top of js.&#x20;

### what is Typescript.&#x20;

Typescript is a programing language developed and maintained by Microsoft.&#x20;

it is strict syntactical superset of JavaScript and adds optional static typing to the languge.

```typescript
                  XXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXXXXXXXXXXX
         XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
       XXXXXXXXXXXXX            XXXXXXXXXXXX
     XXXXXXXXXXXXXXX Typescript XXXXXXXXXXXXXX
   XXXXXXXXXXXXXXXXX            XXXXXXXXXXXXXXXX
  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
 XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXXXXX           XXXXXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXXXX                 XXXXXXXXXXXXXXX
XXXXXXXXXXXXXXXXX                     XXXXXXXXXXXXX
 XXXXXXXXXXXXXXX                       XXXXXXXXXXX
 XXXXXXXXXXXXXXX      Javascript       XXXXXXXXXXX
  XXXXXXXXXXXXXX                       XXXXXXXXXX
   XXXXXXXXXXXXXX                     XXXXXXXXXX
     XXXXXXXXXXXXXX                 XXXXXXXXXX
       XXXXXXXXXXXXXXX           XXXXXXXXXXX
         XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            XXXXXXXXXXXXXXXXXXXXXXXXXXX
                  XXXXXXXXXXXXXXX
```

### How/ Where does Typescript code runs. &#x20;

Typescript code never runs in your Browser. Your browser can only understand javascript.&#x20;

1.  Javascript is the runtime language (the things that actually runs in your browser/node runtime)

2.  Typescript is somethign that comiles down to js.

3.  When typescript is compiled down to js, you get type checking (similar to c++). if there is an error, the conversation to javascript fails.&#x20;

```typescript
                                                                                    XXXXXXXXX
                                                                                 XXX         XXX
                                                                               XX               XX
                                                                              X                   X
                                                                              X      Browser      X
                                                                              X                   X
        XXXXXXXXXXX                              XXXXXXXXXXX               XX  XX               XX
    XXXX           XXXX                      XXXX           XXXX       XXXX      XXX         XXX
  XX                   XX                  XX                   XX  XXX             XXXXXXXXX
 X                       X           X    X                       X
X                         X           X  X                         X
X       Typescript        X  XXXXXXXXXXX X       Javascript        X
X                         X    tsc    X  X                         X                XXXXXXXXX
 X                       X           X    X                       X XX           XXX         XXX
  XX                   XX                  XX                   XX    XXXX     XX               XX
    XXXX           XXXX                      XXXX           XXXX          XX  X                   X
        XXXXXXXXXXX                              XXXXXXXXXXX                  X      Browser      X
                                                                              X                   X
                                                                               XX               XX
                                                                                 XXX         XXX
                                                                                    XXXXXXXXX



```

> Typescript never runs at all.

### Typescript compiler

tsc is the official typescript compiler that you can use to convert Typescript code into javascript.&#x20;

There are many other famous compilers/transpilers for converting Typescript to javascrip. some famous ones are.&#x20;

1.  esbuild

2.  swc

## The tsc compiler

Let's bootstrap a simple Typescript Node.js application locally on our machines.&#x20;

```typescript
// Step : 1 To Install Typescript globally

npm install -g typescript

---------------------------------

// Step 2 : To initiliaze an empty Node.js project with typescript

mkdir node-app
cd node-app
npm init -y
npx tsc --init

// Step 3 : Create a a.ts file
const x: number = 1;
console.log(x)

// Step 4: compile the ts file to js file
tsc -b

```

### Basic Types in TypeScript

*   Number

*   String

*   boolean

*   null

*   undefined

**How a function returns Specific Types:**&#x20;

```typescript
function sum(a: Number, b: number) {
  return a + b;
}

const value = sum (1,2)
console.log(value)
```

## Type Inference

Where typescript figures out that a is number and b is number so sum of both will also be a number.

### TypeScript Compiler Configuration :&#x20;

1.  **Target** : A target option in a tsconfig.json file specifies the ECMAscript target version to thwich version to thwich the typescript compiler will compile the Typescript code. { target: "es2025" }.

2.  **rootDir**: Where should the compiler look for .ts files good practice to keep this inside src foler.

3.  **outDir**: Where should the compiler look for split out the .js files.&#x20;

4.  **noimplicitAny**: try enabling it and see the compilation errors on the code.&#x20;

5.  **removeComments**: weather or not to add comments in .js file.&#x20;

### **Interfaces**

How can you assign types to objects is via interfaces. to assign a type to the User object we can use Interfaces.&#x20;

Example :&#x20;

```typescript
interface User {
  firstName: string;
  lastName: string;
  email: string;
  age: number
}

// to use optional we sue "?" in the end.

example : [ email?: string;]
```

**Inplementing Interfaces**&#x20;

Interfaces have another special property you can implement interfaces as class.&#x20;

```typescript
interface Person {
  name: string;
  age: number;
  greet(phrase: string): void;
}
```

We can create a class which implements this interface.&#x20;

```typescript
class Employee implements Person {
  name: string;
  age: number;

  constructor(n: string, a: number) {
    this.name = n;
    this.age = a;
  }

  greet(phrase: string): void {
    console.log(phrase);
  }
}
```

### What does Implements Does ?&#x20;

when we say class employee implements Person it means ;&#x20;

*   employee is promising to follow the rules that are defined in person.&#x20;

*   it's like saying "I Employee promise to have everything that a aperson is supposed to have.&#x20;

### Difference B/W Extends and Implements.&#x20;

| **Feature**         | extends\*\* (Inheritance)\*\*                                       | implements\*\* (Interface Implementation)\*\*              |
| :------------------ | :------------------------------------------------------------------ | :--------------------------------------------------------- |
| **Purpose**         | Inherit properties and methods from a base class                    | Enforce a contract by defining the required structure      |
| **Relationship**    | Parent-Child relationship                                           | Implements the structure of an interface or abstract class |
| **Implementation**  | Automatically inherits and can override methods from the base class | Must define all the members declared in the interface      |
| **Use Cases**       | Code reuse and shared logic (e.g., base class for users)            | Define a consistent structure across different classes     |
| **Example Syntax**  | class B extends A {}                                                | class C implements D {}                                    |
| **Practical Scope** | One class can extend only one parent class                          | A class can implement multiple interfaces                  |
| **Flexibility**     | Extends is more rigid due to the fixed parent-child structure       | Implements allows flexibility and polymorphism             |

**What Does It Mean in TypeScript?**

1\. **extends (Inheritance):**

&#x20; • Used to create a subclass that inherits properties and methods from a base class.

&#x20; • Great for reusing code logic.

**Example:**

```typescript
class Animal {
  move() {
    console.log("I can move");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Woof!");
  }
}

const dog = new Dog();
dog.move(); // Output: "I can move"
dog.bark(); // Output: "Woof!"
```

**Metaphor:** Think of a child who automatically gets some abilities (like walking or talking) from their parents.

2\. **implements (Interface Implementation):**

&#x20; • Enforces a contract for what a class should look like, without providing actual implementation.

&#x20; • Great for ensuring consistency across different classes.

**Example:**

```typescript
interface Flyable {
  fly(): void;
}

class Bird implements Flyable {
  fly() {
    console.log("I am flying!");
  }
}

const bird = new Bird();
bird.fly(); // Output: "I am flying!"
```

**Metaphor:** Think of it as a “job description”—you must fulfill all the requirements to qualify, but you get to decide how to do the job.

3\. **Combined Usage of extends** and **implements**:

&#x20; You can combine both when a class extends another class and also implements an interface.

**Example:**

```typescript
interface Swimmer {
  swim(): void;
}

class Animal {
  move() {
    console.log("I can move");
  }
}

class Dolphin extends Animal implements Swimmer {
  swim() {
    console.log("I can swim!");
  }
}

const dolphin = new Dolphin();
dolphin.move(); // Output: "I can move"
dolphin.swim(); // Output: "I can swim!"
```

**Why Combine?**

• Inherits shared behavior (extends) while ensuring a specific structure (implements).

**Visual Summary**

```typescript
// Extends (Inheritance)
class A {
  name: string;
}
class B extends A {
  age: number;
} // Adds more to what it inherits

// Implements (Interface Implementation)
interface C {
  print(): void;
}
class D implements C {
  print() {
    console.log("Implementing print");
  }
}
```

**When to Use?**

1\. Use extends when:

&#x20; • Classes share common behavior and logic.

&#x20; • You need a single parent-child relationship.

2\. Use implements when:

&#x20; • You want to enforce a consistent structure across classes.

&#x20; • You need multiple types of behavior in one class.

> Interfaces can be Implemented or Extenced by classes. also Types let you do Unions and Intersections

### **TYPES**

Very Similar to Interfaces, types let you aggregate data together.&#x20;

```typescript
type User = {
  name: String,
  lastname: String,
  age: number
}

// here in tyeps we use "=" while in interface we do not 
```

But they let us do few other things.&#x20;

### Unions : Cannot do using Interfaces&#x20;

Let's say I want to Print the id of a user hwich can be a number or a string:&#x20;

```typescript
typeStringOrNumber = string | number ;
```

### Intersection : Only types let us do.&#x20;

What if you wnat to create a type that has every property to multiple types/interfaces

```typescript
type Employee = {
  name: String,
  startDate: Date
}

type Manager = {
  name: String,
  department: String
}

type TechLead = Employee & Manager

// "&" is the real operator here. 
```

**Interview Questions :**&#x20;

What is the difference b/w Interfaces and types:&#x20;

*   Interfaces youc an Extends in a class

*   types can be used with unions and Intersections.&#x20;

### Arrays in TypeScript&#x20;

If you wnat to access arrays in ts. it's as simple as adding \[] annotaton next to the type.&#x20;

```typescript
function maxValue (arr: number[]){
...
}

maxValue([1,2,3])
```

or we can write as : **type numberArr = number\[ ]**

**Example : Given an array of positive intergers as input, return the maximum value in the array.**&#x20;

```typescript
function maxValue(arr: number[]): number {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

console.log(maxValue([1, 2, 3]));
```

### Enums

Enums (short for enumeratins) in TypeScript are a feature that allows you to define a set of **named** constants.&#x20;

The concepts brhind an enumeration is to create a human-redable way to represent a set of constant values, which might otherwise be represented as numbers or strings.&#x20;

```typescript
// Define an Enum for different user roles
enum UserRole {
    Admin = "ADMIN",
    Editor = "EDITOR",
    Viewer = "VIEWER"
}

// Function to check permissions based on user role
function getPermissions(role: UserRole): string {
    switch (role) {
        case UserRole.Admin:
            return "Full Access: Can Read, Write, and Delete.";
        case UserRole.Editor:
            return "Limited Access: Can Read and Write.";
        case UserRole.Viewer:
            return "Read-Only Access.";
        default:
            return "Invalid Role.";
    }
}

// Example usage
console.log(getPermissions(UserRole.Admin));  // Output: Full Access: Can Read, Write, and Delete.
console.log(getPermissions(UserRole.Editor)); // Output: Limited Access: Can Read and Write.
console.log(getPermissions(UserRole.Viewer)); // Output: Read-Only Access.
```

### Generics&#x20;

**What are Generics?**

Generics allow you to **write reusable and flexible code** by making functions, classes, and interfaces work with **any data type** instead of a fixed one.

**Why Use Generics?**

&#x20;   • Helps in **code reusability**.

&#x20;   • Provides **type safety** while keeping flexibility.

&#x20;   • Avoids **duplicate functions** for different types.

**Example 1: Identity Function (Basic Generic Function)**

The **identity function** simply returns whatever is passed in.

```typescript
function identity<T>(value: T): T {
    return value;
}

console.log(identity<number>(42));    // Output: 42
console.log(identity<string>("Hello")); // Output: Hello
console.log(identity<boolean>(true));   // Output: true
```

**Explanation:**

• \<T> is a **type variable** that acts as a placeholder for any data type.

• When calling identity, we specify the type (e.g., \<number>, \<string>).

• This ensures **type safety** while allowing flexibility.

**Example 2: Generic Function with Arrays**

You can also use generics with **arrays**.

```typescript
function getFirstElement<T>(arr: T[]): T {
    return arr[0];
}

console.log(getFirstElement([10, 20, 30]));   // Output: 10
console.log(getFirstElement(["A", "B", "C"])); // Output: A
```

**Example 3: Generic Interface**

Generics work with **interfaces** too.

```typescript
interface Box<T> {
    value: T;
}

let numberBox: Box<number> = { value: 100 };
let stringBox: Box<string> = { value: "TypeScript" };

console.log(numberBox.value); // Output: 100
console.log(stringBox.value); // Output: TypeScript
```

**Example 4: Generic Class**

You can use **Generics in classes** to define reusable structures.

```typescript
class Storage<T> {
    private data: T;

    constructor(value: T) {
        this.data = value;
    }

    getData(): T {
        return this.data;
    }
}

let numStorage = new Storage<number>(123);
let strStorage = new Storage<string>("Hello");

console.log(numStorage.getData()); // Output: 123
console.log(strStorage.getData()); // Output: Hello
```

### **Exporting and Importing Modules in TypeScript**

TypeScript follows the **ES6 module system** to **share code** between different files using export and import statements.

**1. Named Exports (Constant Exports)**

Named exports allow exporting **multiple values** from a module.

**Example: Exporting Constants (mathConstants.ts)**

```typescript
export const PI = 3.14159;
export const E = 2.718;
export const GOLDEN_RATIO = 1.618;
```

**Importing Named Exports (app.ts)**

```typescript
import { PI, E } from "./mathConstants";

console.log(PI); // Output: 3.14159
console.log(E);  // Output: 2.718
```

📌 **Tip:** You must use the **exact name** when importing named exports.

**2. Default Exports**

A module can have **only one default export**.

**Example: Exporting a Default Value (greeting.ts)**

```typescript
export default function greet(name: string) {
    return `Hello, ${name}!`;
}
```

**Importing a Default Export (app.ts)**

```typescript
import greet from "./greeting"; // No need for curly braces {}

console.log(greet("John")); // Output: Hello, John!
```

📌 **Tip:** Default exports can be imported with **any name**.

**Combining Named and Default Exports**

You can **mix both types** in the same file.

**Example: (utils.ts)**

```typescript
export const square = (num: number) => num * num;
export const cube = (num: number) => num * num * num;

export default function logMessage(message: string) {
    console.log(message);
}
```

**Importing Both Types (app.ts)**

```typescript
import logMessage, { square, cube } from "./utils";

logMessage("Using Utility Functions");
console.log(square(4)); // Output: 16
console.log(cube(3));   // Output: 27
```




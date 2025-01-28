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

Typescript provides you some basic types. `number`, `string`, `boolean`, `null`, `undefined`.&#x20;

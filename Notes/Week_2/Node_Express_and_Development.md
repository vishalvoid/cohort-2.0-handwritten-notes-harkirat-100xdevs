## **Node.js and Express with Development Tools**

### 1. Node.Js Runtime | HTTP

| ECMAScript                                                                                                                                    | JavaScript                                                                                                                                                                                                          | Node.js                                                                                                                                             | Bun                                                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ECMAScript is a **scripting** language specification on which JavaScript is based. Ecma Internation is in charge of stardardizing ECMAScript. | JavaScript is a scripting language that conforms to the EcmaScript specification. It's the most widely known and used implementation of ECMAScript.                                                                 |  Some Smart people took out the v8 engine added some backend things (filesystem reads) on top to create a new runtime to compete with BE like Java. | Other than the fact that JS is single threaded, Node.js is slow( multiple reasons for it ). Some smart people said they wanted to re-write the JS runtime for the backend and introduced Bun |
| In Short : It Serves as a guideline or the 'rules' for scripting language design.                                                             | JavaScript includes additional features that are not part of the ECMAScript specificaton, like the Document Object Model (DOM) manipulation, which is crucial for web development but is not defined by ECMAScript. | JS was never meant to be run in the backend Eventually became very popular and is the popular choice of runtime on the backend.                     | IT is significantly faster runtime.                                                                                                                                                          |
|                                                                                                                                               | Famous JS Browser Engines : v8 Engine used by Chrome (C), SpiderMonkey used by Firefox (C++, Rust).                                                                                                                 |                                                                                                                                                     | IT is written in Zig                                                                                                                                                                         |

V8: V8 Engine is an open source js engine developed by the chromium project for google chrome and chromium web browsers. it's written in c++ and is responsible for compiling js code into natiive machine code before excuting it, which greatly improves performance.

**`What can we do with Node.js ?`**&#x20;

*   Create clis

*   Create a video player

*   create a game

*   create an HTTP Server

*   Much more...

**`What is an HTTP Server ?`**

Hyper text transfer protocol. A protocol that is defined for machines to communicate. Specifically for websites, it is the most common way for your website's frontend to talk to it's backend.&#x20;

### 2.


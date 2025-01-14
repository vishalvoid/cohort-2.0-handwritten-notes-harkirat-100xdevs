## **Node.js and Express with Development Tools**

### 1. Node.Js Runtime | HTTP

| ECMAScript                                                                                                                                    | JavaScript                                                                                                                                                                                                          | Node.js                                                                                                                                            | Bun                                                                                                                                                                                          |
| :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ECMAScript is a **scripting** language specification on which JavaScript is based. Ecma Internation is in charge of stardardizing ECMAScript. | JavaScript is a scripting language that conforms to the EcmaScript specification. It's the most widely known and used implementation of ECMAScript.                                                                 | Some Smart people took out the v8 engine added some backend things (filesystem reads) on top to create a new runtime to compete with BE like Java. | Other than the fact that JS is single threaded, Node.js is slow( multiple reasons for it ). Some smart people said they wanted to re-write the JS runtime for the backend and introduced Bun |
| In Short : It Serves as a guideline or the 'rules' for scripting language design.                                                             | JavaScript includes additional features that are not part of the ECMAScript specificaton, like the Document Object Model (DOM) manipulation, which is crucial for web development but is not defined by ECMAScript. | JS was never meant to be run in the backend Eventually became very popular and is the popular choice of runtime on the backend.                    | IT is significantly faster runtime.                                                                                                                                                          |
|                                                                                                                                               | Famous JS Browser Engines : v8 Engine used by Chrome (C), SpiderMonkey used by Firefox (C++, Rust).                                                                                                                 |                                                                                                                                                    | IT is written in Zig                                                                                                                                                                         |

V8: V8 Engine is an open source js engine developed by the chromium project for google chrome and chromium web browsers. it's written in c++ and is responsible for compiling js code into natiive machine code before excuting it, which greatly improves performance.

**`What can we do with Node.js ?`**&#x20;

*   Create clis

*   Create a video player

*   create a game

*   create an HTTP Server

*   Much more...

**`What is an HTTP Server ?`**

Hyper text transfer protocol. A protocol that is defined for machines to communicate. Specifically for websites, it is the most common way for your website's frontend to talk to it's backend.&#x20;

Some code that follows the HTTP Protocol and is able to communicate with clients(browsers/mobile apps). think of it to be similarto the call app in your phone Which lets you communicate with your friends.

> **HTTP Protocol** : In the end, it's the cient throwing some information at the server.
>
> Server doing something with that information Server responding back with the final result.&#x20;
>
> Think of them as functions, where :&#x20;
>
> 1.  Arguments are something the client sends.
>
> 2.  Rather than calling a function using its name, the client uses a url.
>
> 3.  Rather than the function body, the server does something witht he request.
>
> 4.  Rather than the function returning a value, the server responds with some data.

`What heppens if I go to Google.com and press Enter?`

things that heppen in your browser after you fire this request&#x20;

1.  Browser parses the url

2.  Does a DNS Lookup(Converts Google.com to IP).

3.  Extablishes a connection tot he IP(does handshake...)

`What is DNS Resolution`

URLs are just like contacts in your phone. In the end, they mao to an IP. if you ever buy a URL of your own, you will need to point it tothe ip of your server.&#x20;

### 2. Express.Js

Similarly, there are many libraries that let you create http Servers. the most famous one is express.&#x20;

**How to print Hello World by creating a server?**

```javascript
// code to Print Hello world using Express.
const express = require("express");

const app = express();

const port = 3000;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Example app listening on port " + port);
});
```

We can hit portman with the url and it should responds "Hello World".

> req: will consists of headers, body, query parameters etc.

We can Send all type of request. Get, Post, Patch, Delete, Etc..

```javascript
// to get back the request from the bowser or client.
app.post("/", (req, res) => {
  console.log(req.body);
  console.log(req.headers);
  res.send("hello world");
});
```

to get the data. we need bodyparser(depreciated) now express gives this feature under the hood. so we can use `app.use(express.json())`

we can use body-parser the body-parsermodule enables us to parse incoming request bodies in a middleware. Express.js server needs to know what type of data you're sending oer thenetwork, so it knows how to parse it.

> We should use nodemon for auto start of server after every change made saved.

**What is an Environment Variable ( ENV ) ?**

env typically refers to **environment variables** stored in a .env file. These variables are used to manage sensitive or configuration data, like database connection strings, API keys, or server settings, without hardcoding them into the codebase. we can access them in node js with `process.env.declared_name`

> There are two ways to send data to backend. one is `body` and another is `query` parameters.
>
> used as : http\://localhost:3000/backend/`?message=123`

Alright, here's how you can make the command names bold, bigger, and left-aligned in your markdown file:

### 3. Bash and Terminal Basics

Bash is a shell that lets you interact with your operating system via the terminal. Below are common commands explained:

**Commands Overview**

`PWD - Print Working Directory`

*   Prints the current working directory.

*   **Usage:**

```bash
pwd

```

`CD - Change Directory`

*   Changes the directory.

*   Usage:

```bash
cd /path/to/directory   # Go to a specific directory
cd ..                   # Go up one level
cd                      # Go to the home directory

```

`LS - List`&#x20;

*   Lists files and directories.

*   Usage:

```bash
ls                      # List all files
ls -l                   # Detailed view
ls -a                   # Include hidden files
ls -t                   # last modified
ls -s                   # gives the size of file or directory
ls -lR | grep .json.    # to find all the json files. will look for directories & subdirectories.


```

`MKDIR - Make Directory`

*   Creates a new directory.

*   Usage:

```bash
mkdir my_folder         # Create a directory named `my_folder`
mkdir -p parent/child   # Create nested directories

```

`TOUCH`

*   Creates an empty file or updates the timestamp of an existing file.

*   Usage:

```bash
touch file.txt          # Create a file named `file.txt`

```

`CAT - Concatinate`

*   Displays file content or combines files.

*   Usage:

```bash
cat file.txt            # Show the content of `file.txt`
cat file1.txt file2.txt > combined.txt  # Merge files

```

`Vi - Visual Editor`

*   Opens a file in the vi text editor.

*   Usage:

```bash
vi file.txt             # Edit `file.txt`

```

Basics in vi: • Press i to enter insert mode. • Press Esc to exit insert mode. • Type :wq to save and quit.

`MV - Move`

*   Moves or renames a file.

*   Usage:

```bash
mv file.txt /path/to/destination     # Move file
mv old_name.txt new_name.txt         # Rename file

```

`CP - Copy`

*   Copies files or directories.

*   Usage:

```bash
cp file.txt /path/to/destination     # Copy file
cp -r folder/ /path/to/destination   # Copy folder recursively

```

`NVM - Node Version Manager`

*   Manages Node.js versions.

*   Usage:

```bash
nvm install node         # Install the latest Node.js
nvm use 16               # Use Node.js version 16
nvm list                 # List installed Node.js versions

```

`NPM - Node Package Manager`

*   Node.js package manager for managing libraries and dependencies.

*   Usage:

```bash
npm init                 # Initialize a project
npm install package_name # Install a package
npm uninstall package_name # Remove a package
npm start                # Start a project

```

`NODE`

*   Executes JavaScript code in the terminal.

*   Usage:

```bash
node                     # Open the Node.js REPL
node script.js           # Run a JS file

```

> Quick Tips • Use Tab to autocomplete file or directory names. • Use Ctrl + C to terminate running commands. • Combine commands using && (e.g., mkdir test && cd test) in the document.

&#x20;

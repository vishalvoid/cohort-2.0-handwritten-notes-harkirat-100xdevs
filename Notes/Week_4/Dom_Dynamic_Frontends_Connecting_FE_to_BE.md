## **DOM, Dynamic Frontends, Connecting FE to BE.**

### What does DOM Strands for ?

The Dom (Document Object Model) api is a programing interface for web documents, it represents the page so that programs can change the document structure, style and content. The DOM represents the document as a tree of objects; each object represents a part of the page.

### What was JavaScript?

It was an implementation of the ECMAScript spec. but the javascript that runs in your browser has some extra functionality. (Example WebAPI , also setTimeout was never a part of ECMAScript ).&#x20;

But the javaScript that runs on the browser has some other functionalities.&#x20;

```javascript
                #############                                   
           #####             #####                              
        ###                       ###                           
      ##        setTimeout           ##                         
    ##          fetch                  ##                       
   #            setInterval              #                      
  #             document                  #                     
 #                                         #                    
#               #########                   #                   
#            ###         ###                #                   
#          ##               ##              #                   
#         #                   #             #   < === Browser JS
#        #                     #            #                   
 #       #       JS Spec       #           #                    
  #      #                     #          #                     
   #      #                   #          #                      
    ##     ##               ##         ##                       
      ##     ###         ###         ##                         
        ###     #########         ###                           
           #####             #####                              
                #############                                  
```

> If you try to write document in node.js application it will not exist. if  you write same in browser it does exist.&#x20;

What is a Dynamic Website : \
Changing the elements on the website once the website is loaded. is somewhat called dynamic.&#x20;

Code to Add two Number in browser using dom manupulation.

```html
<html>
    <script>
        function populateDiv() {
            const a = document.getElementById("firstNumber").value;
            const b = document.getElementById("secondNumber").value;
            const element = document.getElementById("finalSum")
            element.innerHTML = parseInt(a) + parseInt(b);
            // string => number
            // "1111" => 1111
        }
    </script>
    <body>
        <input id="firstNumber" type="text" placeholder="First number"></input> <br></br>
        <input id="secondNumber" type="text" placeholder="Second number"></input> <br></br>
        <button onclick="populateDiv()">Calculate sum</button> <br></br>
        <div id="finalSum"></div>
    </body>
</html>
```

Now, lets say you don't have access tot he calculation logic on the frontend. Let's assume its a hard problem that someont has exposed on a backend server and you need to hit backend server and get back the value.&#x20;

```javascript
               Give me sum of 100,200
Browser code -------------------------> Backend
             <-------------------------
                        300

For this we need some backend Server : 
Example we need to hit a api or server : calculatesu.vishalvoid.com?a=10&b=20. returns 30

this can only de done by fetch() 
            
example : fetch("https://sum-server.vishalvoid.com/sum?a=10")
                .then(function(fesponse){
                     .then(function(ans){
                        document.getElementById("finalSum").innerHTML = ans;
                }   
                })

```

### Debouncing.

Debouncing is a way to delay a function from running until a certain amount of time has passed without repeated events. It’s useful for tasks like search suggestions or resize events, where you don’t want to trigger the function too often.

**Example Without Debouncing.**

````javascript
Typing in a search box triggers a function every time a key is pressed.

```javascript
input.addEventListener('input', () => {
  console.log('Function called'); // Called for every keystroke
});
````

**Example with Debouncing**

```javascript
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

input.addEventListener('input', debounce(() => {
  console.log('Function called'); // Runs after user stops typing for 300ms
}, 300));
```

## **React Foundation (Why Frontend Frameworks)**

**Dom Manupulation** : When we start change or add data to the initial html loaded on the website. Through dom manupulation people were able to create dynamic websites.&#x20;

HTML is being **injected** to the **dom** by js. is called DOM Manupulation in literal value. Example LinkedIn poasts loading.&#x20;

DOM manupulation is very hard to write as a developer. Making dynamic websites, with the primitives that DOM provides you is very hard.&#x20;

What are primitives : document.createElement, document.appendChild, element.setAttribute, element.children

```javascript
const element = document.createElement("div")
element.innerHTML = "some random title"
document.getElementById("container").appendChild(element)
<div>some random title </div>

// Problem with this approach
Very hard to add and remove elements. no Central State. 
```

What if there is a server where these todos are put What if you update a TODO form your mobile app. You will be get back the new array of TODOs on a frontend. \
How will you update the DOM then ? \
you only have a **addTodo** Function. You don't have an **updateTodo** or **removeTodo** Function yet.&#x20;

]

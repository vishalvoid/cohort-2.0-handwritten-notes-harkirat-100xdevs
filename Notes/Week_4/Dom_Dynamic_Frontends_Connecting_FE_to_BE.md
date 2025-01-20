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


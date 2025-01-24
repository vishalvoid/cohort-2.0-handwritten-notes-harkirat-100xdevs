## **Context, State Management, Recoil**

**Why do we need context API ?**&#x20;

*   Incorrect : To make rendering more performant.&#x20;

*   Correct : To make syntax cleaner/get  rid of prop drilling.&#x20;

**Problem with Context API ?**

```javascript
                                                                                
                                    changing state                                            
                   Component 1  ■■■■■■■■■■■■■■■■■■■■■■■■■  Context API          
                       ∙                                   ■■       ■           
                       ∙                                 ■■■        ■           
                       ∙                                ■■          ■           
                       ∙                              ■■            ■           
      re-renders ? Component 2                    ■■■■              ■           
                    ∙∙∙∙∙∙                     ■■■■                 ■           
                ∙∙∙∙      ∙∙∙∙              ■■■■ changing state     ■ changing state.       
           ∙∙∙∙∙              ∙∙∙∙        ■■■                       ■           
        ∙∙∙                       ∙∙     ■■                         ■           
    Component 3                  Component 4                        ■           
        ■                                                           ■           
        ■                                                           ■           
        ■                                                           ■           
        ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■           
                                                                                
                                                                                
                                                                                
The real problem is if the state schanges in component 1, 3, and 4. technically component 2 should not re-render. but in context api it also does. 
to get rid of this problem we useuse other state management tools. 

```

### What is State Management.

A cleaner way to store the state of your app.&#x20;

Unitl now, the cleanest thing you can do is use the Context API. it let's you teleport state But there are better solutions that lets you teleport  state.&#x20;

But there are better solutions that geet rid of the problems that context api has (unnecessary re-renders)

### State management using Recoil.&#x20;

Recoil : A state management library for react. Written by some ex React folks (i think).&#x20;

Other popular ones are&#x20;

1.  Zustand

2.  Redux

**Recoil has a concept of an atom to store the state. An atom can be defined outside the component and Can be teleported to any component.**&#x20;

It is somewaht similar to useState. it's just atom let's you create state variable in the recoil world.&#x20;

> just like the previous chart. if we create state management. using recoil. then only component. 3,4 and 1 will be re-rendered and component 2 will not re-render.&#x20;

Things to Learn in Recoil :

*   RecoilRoot

*   atom

*   useRecoilState

*   useRecoilValue

*   useSetRecoilState

*   selector




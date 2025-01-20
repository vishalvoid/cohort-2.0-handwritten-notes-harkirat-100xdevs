## **React Deep Dive**&#x20;

> Jargons that are important to learn : Jsx, class vs className, static vs dynamic websites, state, components, re-rendering.

**Why do we need React ?**

For dynamic Websites, these libraries make it easier to do DOM Manipulation.

React is just an esaier way to write normal HTML/CSS/JS, it's a new syntac, that under the hood gets converted to HTML/CSS/JS.&#x20;

    React ---------npm run build------------> HTML/CSS/JS

People realised it's harder to do DOM manipulation the conventational way. there were libraries that came into the picture that made it slightly easy, but still for a very big app it's very hard (JQuery) Eventually, VueJs/React created a new syntax to do frontends. Under the hood. the react compiler convert your code to HTML/CSS/JS.

To Create a React app. you usually need to worry about two things. Creators of frontend frameworks realised that all websites can effictively be divided into two parts.&#x20;

    State  & Components

`What is State. `

An object that represents the current state of the app. it represents the dynamic things in your app. (things that change. ) for example the value of the counter.&#x20;

`What is a component.`&#x20;

How a Dom element should rneder, given a stae. it is a re-usable, dynamic, HTML snippet that change given the state.&#x20;

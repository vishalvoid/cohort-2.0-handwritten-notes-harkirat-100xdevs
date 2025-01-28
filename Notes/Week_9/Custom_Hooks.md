## Custom Hooks.

class based component vs functional component.
Lifecycle Events.  for classed based and functional components.



What are custom hooks.&#x20;

Hooksthat you create yourself, so other people cna use them are called custom hooks.&#x20;

A Custom hook is effictevely a function, but witht the followint properties. :&#x20;

1.  use another hook internally (useState, useEffect, another custom hook)

2.  starts with use

A few good example can be&#x20;

1.  Data fetching hooks. with loading and auto&#x20;

2.  Browser functionality related hooks, -useOnlineStartus, usewindowSize, useMousePosition

3.  Performance/Timer based - useInterval, useDebounce

4.  Browser functionality related hooks. 1. useIsOnline hook. create a hook that returns true or false based on weather the suer is currently online. window\.navigatior.onLine returns true or false based on whether the user is online&#x20;

5.  useMousePointer hooke : Create a hook that returns you the currentl mosut pointer position. the final react app that uses it looks like this.&#x20;


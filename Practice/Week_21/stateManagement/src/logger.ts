import { gameManager } from "./store";

export function startLogger() {
  setInterval(() => {
    console.log(gameManager.log());
  }, 3000);
}

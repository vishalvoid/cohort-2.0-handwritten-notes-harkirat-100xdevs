interface Game {
  id: string;
  whitePlayer: string;
  blackPlayer: string;
  moves: string[];
}

export class GameManager {
  games: Game[] = [];

  private static instance: GameManager;
  private constructor() {
    this.games = [];
  }

  static getInstance() {
    if (GameManager.instance) {
      return GameManager.instance;
    }
    GameManager.instance = new GameManager();
    return GameManager.instance;
  }

  addmove(gameId: string, move: string) {
    console.log("Adding move to game", gameId + ":", move);
    const game = this.games.find((game) => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
  }

  addGame(gameId: string) {
    const game = {
      id: gameId,
      whitePlayer: "Alice",
      blackPlayer: "Bob",
      moves: [],
    };
    this.games.push(game);
  }

  log() {
    console.log(this.games);
  }
}

export const gameManager = GameManager.getInstance();

import { Todo } from "./todo";

export type TodoCreationParam = Pick<Todo, "title" | "description">;

export class TodoService {
  public get(todoId: string): Todo {
    return {
      id: todoId,
      title: "mocked todo",
      description: "mocked description",
      done: false,
    };
  }

  public create(todoCreationParam: TodoCreationParam): Todo {
    console.log("Mocking DB Call");
    return {
      id: "1",
      title: "mocked todo",
      description: "mocked description",
      done: false,
    };
  }
}

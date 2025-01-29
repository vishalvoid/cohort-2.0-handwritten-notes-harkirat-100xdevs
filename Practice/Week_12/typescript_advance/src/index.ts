interface User {
  id: string;
  name: String;
  age: number;
  email: string;
  password: string;
}

type UpdateProps = Pick<User, "name" | "email" | "age">;

function sumOfAge(UpdateProps: UpdateProps) {
  // do whatever you want to
}

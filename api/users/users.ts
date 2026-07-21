import { User } from "@/types/user";

export default async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: User[] = await response.json();

  return data;
}
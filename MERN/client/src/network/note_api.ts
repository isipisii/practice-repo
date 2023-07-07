import {
  INote,
  INoteInput,
  IUser,
  ISignUpCredentials,
  ILoginCredentials,
} from "../types";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);

  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errMessage = errorBody.error;

    throw Error(errMessage);
  }
}

export async function getLoggedInUser(): Promise<IUser> {
  const response = await fetchData("http://localhost:5000/api/users", {
    method: "GET",
  });
  return response.json();
}

export async function signUp(credentials: ISignUpCredentials): Promise<IUser> {
  const response = await fetchData("http://localhost:5000/api/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logIn(credentials: ILoginCredentials): Promise<IUser> {
  const response = await fetchData("http://localhost:5000/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
}

export async function logOut(): Promise<void> {
  await fetchData("http://localhost:5000/api/users/logout", { method: "POST" });
}

export async function fetchNotes(): Promise<INote[]> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "GET",
  });
  return response.json();
}

export async function createNote(note: INoteInput): Promise<INote> {
  const response = await fetchData("http://localhost:5000/api/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });

  return response.json();
}

export async function deleteNote(noteId: string): Promise<void> {
  await fetchData(`http://localhost:5000/api/notes/${noteId}`, {
    method: "DELETE",
  });
}

export async function updateNote(
  noteId: string,
  note: INoteInput
): Promise<INote> {
  const response = await fetchData(
    `http://localhost:5000/api/notes/${noteId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}

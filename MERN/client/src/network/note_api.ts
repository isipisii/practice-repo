import { INote, INoteInput } from "../types";

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

export async function deleteNote(noteId: string) {
  await fetchData(`http://localhost:5000/api/notes/${noteId}`, { method: "DELETE" });
}

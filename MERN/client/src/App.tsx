import { useEffect, useState, FC } from "react";
import { INote } from "./types";
import Note from "./components/Note";

const App: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    async function getNotes(): Promise<void> {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        });
        const data = await response.json();

        const notes: INote[] = (data as INote[]).map(
          (note): INote => ({
            _id: note._id,
            title: note.title,
            text: note.text,
            createdAt: note.createdAt,
            updatedAt: note.updatedAt,
          })
        );

        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, []);

  console.log(notes);

  return (
    <div>
      {notes.map((note, index) => (
        <Note createdAt={note.createdAt} title={note.title} text={note.text} key={index} />
      ))}
    </div>
  );
};

export default App;

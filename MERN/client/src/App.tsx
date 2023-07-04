import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState, FC } from "react";
import { INote } from "./types";
import Note from "./components/Note";
import "./styles/index.css";
import styles from "./styles/NotesPage.module.css"

const App: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  useEffect(() => {
    async function getNotes(): Promise<void> {
      try {
        const response = await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        });
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const notes: INote[] = (data as any).map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (note: any): INote => ({
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
    <Container>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              className={styles.note}
              createdAt={note.createdAt}
              title={note.title}
              text={note.text}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;

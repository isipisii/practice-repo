/* eslint-disable @typescript-eslint/no-empty-function */
import { Col, Container, Row, Button } from "react-bootstrap";
import { useEffect, useState, FC } from "react";
import { INote } from "./types";
import Note from "./components/Note";
import AddNoteDialog from "./components/AddNoteDialog";
import "./styles/index.css";
import styles from "./styles/NotesPage.module.css";
import styleUtils from "./styles/utils.module.css";
import * as NotesApi from "./network/note_api";
import { AiOutlinePlusCircle } from "react-icons/ai";

const App: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);

  useEffect(() => {
    async function getNotes(): Promise<void> {
      try {
        const notes = await NotesApi.fetchNotes();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        // const notes: INote[] = (data).map(
        //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
        //   (note: any): INote => ({
        //     _id: note._id,
        //     title: note.title,
        //     text: note.text,
        //     createdAt: note.createdAt,
        //     updatedAt: note.updatedAt,
        //   })
        // );
        setNotes(notes);
      } catch (error) {
        console.error(error);
      }
    }
    getNotes();
  }, []);

  async function deleteNote(note: INote): Promise<void> {
    try {
      await NotesApi.deleteNote(note._id);
      const filteredNotes: INote[] = notes.filter(
        (existingNote) => existingNote._id !== note._id
      );
      setNotes(filteredNotes);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <Container>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`${styleUtils.blockCenter} mb-4 ${styleUtils.flexCenter}`}
      > 
        <AiOutlinePlusCircle />
        Add new Note
      </Button>
      <Row xs={1} md={2} xl={3} className="g-4">
        {notes.map((note) => (
          <Col key={note._id}>
            <Note
              className={styles.note}
              note={note}
              onDeleteNoteClicked={deleteNote}
            />
          </Col>
        ))}
      </Row>

      {showAddNoteDialog && (
        <AddNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
        />
      )}
    </Container>
  );
};

export default App;

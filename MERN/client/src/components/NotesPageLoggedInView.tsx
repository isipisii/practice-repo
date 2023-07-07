import { Button, Col, Row, Spinner } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddEditNoteDialog from "./AddEditNoteDialog";
import { useState, FC, useEffect } from "react";
import { INote } from "../types";
import styleUtils from "../styles/utils.module.css"
import Note from "./Note";
import styles from "../styles/NotesPage.module.css";
import * as NotesApi from "../network/note_api";

const NotesPageLoggedInView: FC = () => {
  const [notes, setNotes] = useState<INote[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState<boolean>(false);
  const [noteToEdit, setNoteToEdit] = useState<INote | null>(null);
  const [notesLoading, setNotesLoading] = useState<boolean>(true);
  const [showNotesLoadingError, setShowNotesLoadingError] =
    useState<boolean>(false);

  useEffect(() => {
    async function getNotes(): Promise<void> {
      try {
        setNotesLoading(true);
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
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
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

  const Notes = (
    <Row xs={1} md={2} xl={3} className={`g-4 ${styles.noteGrid}`}>
      {notes.map((note) => (
        <Col key={note._id}>
          <Note
            className={styles.note}
            note={note}
            onDeleteNoteClicked={deleteNote}
            onNoteClicked={setNoteToEdit}
          />
        </Col>
      ))}
    </Row>
  );

  return (
    <>
      <Button
        onClick={() => setShowAddNoteDialog(true)}
        className={`${styleUtils.blockCenter} mb-4 ${styleUtils.flexCenter}`}
      >
        <AiOutlinePlusCircle />
        Add new Note
      </Button>
      {notesLoading && <Spinner animation="border" variant="primary" />}
      {showNotesLoadingError && <p>Something went wrong</p>}
      {!notesLoading && !showNotesLoadingError && (
        <>{notes.length > 0 ? Notes : <p>You dont have any notes yet.</p>}</>
      )}

      {showAddNoteDialog && (
        <AddEditNoteDialog
          onDismiss={() => setShowAddNoteDialog(false)}
          onNoteSaved={(newNote) => {
            setNotes([...notes, newNote]);
            setShowAddNoteDialog(false);
          }}
          noteToEdit={noteToEdit}
        />
      )}

      {noteToEdit && (
        <AddEditNoteDialog
          onDismiss={() => setNoteToEdit(null)}
          onNoteSaved={(updatedNote) => {
            const updatedNotes: INote[] = notes.map((note) =>
              note._id === updatedNote._id ? updatedNote : note
            );
            setNotes(updatedNotes);
            setNoteToEdit(null);
          }}
          noteToEdit={noteToEdit}
        />
      )}
    </>
  );
};

export default NotesPageLoggedInView;

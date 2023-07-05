import { FC } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { INote, INoteInput } from "../types";
import { useForm } from "react-hook-form";
import * as NotesApi from "../network/note_api";

interface Props {
  noteToEdit?: INote | null;
  onDismiss: () => void;
  onNoteSaved: (note: INote) => void;
}

const AddEditNoteDialog: FC<Props> = ({
  onDismiss,
  onNoteSaved,
  noteToEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<INoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  async function onSubmit(input: INoteInput) {
    try {
      let noteResponse: INote;

      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit?._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }

      onNoteSaved(noteResponse);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>{noteToEdit ? "Edit" : "Add"} Note</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              {...register("title", { required: "Required" })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Text</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Text"
              rows={5}
              {...register("text")}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button type="submit" form="addEditNoteForm" disabled={isSubmitting}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEditNoteDialog;

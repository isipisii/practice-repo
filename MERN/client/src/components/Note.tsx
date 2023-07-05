import React, { FC } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css";
import { formatDate } from "../utils/formatDate";
import { AiFillDelete } from "react-icons/ai";
import styleUtils from "../styles/utils.module.css";
import { INote } from "../types";

interface NoteProps {
  note: INote;
  className?: string;
  onDeleteNoteClicked(note: INote): void
}

const Note: FC<NoteProps> = ({ note, className, onDeleteNoteClicked }) => {
  const {updatedAt, createdAt, title, text} = note

  let createdUpdatedText: string;

  if (updatedAt > createdAt) {
    createdUpdatedText = `Updated at: ${formatDate(updatedAt)}`;
  } else {
    createdUpdatedText = `Created at: ${formatDate(createdAt)}`;
  }

  return (
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body className={styles.cardBody}>
        <Card.Title className={styleUtils.flexCenter}>
          {title}
          <AiFillDelete
            className="text-muted ms-auto"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              onDeleteNoteClicked(note)
              e.stopPropagation();
            }}
          />
        </Card.Title>
        <Card.Text className={styles.cardText}>{text}</Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">{createdUpdatedText}</Card.Footer>
    </Card>
  );
};

export default Note;

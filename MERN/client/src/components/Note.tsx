import { FC } from "react";
import { Card } from "react-bootstrap";
import styles from "../styles/Note.module.css"

interface NoteProps {
  title: string;
  createdAt: string;
  text: string;
  className?: string
}

const Note: FC<NoteProps> = ({ title, createdAt, text, className }) => {
  return ( 
    <Card className={`${styles.noteCard} ${className}`}>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Text className={styles.cardText}>
          {text}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Note

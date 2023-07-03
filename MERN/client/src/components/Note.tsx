import { FC } from "react";
import { Card } from "react-bootstrap";

interface NoteProps {
  title: string;
  createdAt: string;
  text: string;
}

const Note: FC<NoteProps> = ({ title, createdAt, text }) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default Note

import * as NotesController from "../controllers/notes";
import  express from "express";

const router = express.Router()

router.get("/", NotesController.getNotes);

router.post("/", NotesController.createNote);

router.get("/:noteId", NotesController.getNote)

router.delete("/:noteId", NotesController.deleteNote)

router.patch("/:noteId", NotesController.updateNote)

export default router 
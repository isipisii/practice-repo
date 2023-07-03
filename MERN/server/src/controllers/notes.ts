import { RequestHandler } from "express";
import NoteModel from "../models/note";
import createHttpError from "http-errors";
import mongoose from "mongoose";

interface INoteBody {
  title?: string;
  text?: string;
}

// interface IUpdateNoteBody {
//   title?: string;
//   text?: string;
// }

interface IUpdateNoteParams {
  noteId: string;
}

//CREATE NOTE
export const createNote: RequestHandler<
  unknown,
  unknown,
  INoteBody,
  unknown
> = async (req, res, next) => {
  const { title, text } = req.body;

  try {
    if (!title) {
      throw createHttpError(400, "Bad request, not must have a title");
    }

    const newNote = await NoteModel.create({
      title: title,
      text: text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// GET NOTES
export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

//GET SINGLE NOTE
export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

//UPDATE NOTE
export const updateNote: RequestHandler<
  IUpdateNoteParams,
  unknown,
  INoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const { title, text } = req.body;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    if (!title) {
      throw createHttpError(
        400,
        "Bad request, not must have a title when updating"
      );
    }

    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    note.title = title;
    note.text = text;

    const updatedNote = await note.save();

    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// DELETE NOTE
export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note id");
    }

    const note = await NoteModel.findByIdAndRemove(noteId);

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

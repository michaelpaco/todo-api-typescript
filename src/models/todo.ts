import { Document, Schema, Model, model } from "mongoose";
import { ITodo } from "../interfaces/todo";

export interface ITodoModel extends ITodo, Document {
}

export const TodoSchema: Schema = new Schema({
  description: { type: String, required: true },
  done: { type: Boolean, default: false },
  date: { type: Date, default: Date.now() }
}, { timestamps: true });

export const Todo: Model<ITodoModel> = model<ITodoModel>("Todo", TodoSchema);

import { Todo, ITodoModel } from "../models/todo";
import { IData, Status } from "../interfaces/data";
import { ITodo } from "../interfaces/todo";
import { Types } from "mongoose";

class TodoService {
  static async getAll(): Promise<IData> {
    const todos: Array<ITodoModel> = await Todo.find({});
    return {
      status: Status.success,
      data: todos
    };
  }

  static async create(data: ITodo): Promise<IData> {
    try {
      const todo: ITodoModel = await Todo.create(data);
      return {
        status: Status.success,
        data: todo
      };
    } catch (err) {
      return {
        status: Status.fail,
        data: err
      };
    }
  }

  static async getById(id: Types.ObjectId): Promise<IData> {
    try {
      const todo: ITodoModel = await Todo.findById(id);
      return {
        status: Status.success,
        data: todo
      };
    } catch (err) {
      return {
        status: Status.fail,
        data: err
      };
    }
  }

  static async checkById(id: Types.ObjectId): Promise<IData> {
    try {
      let todo: ITodoModel = await Todo.findById(id);
      todo = await Todo.findByIdAndUpdate(id, { done: !todo.done }, { new: true });
      return {
        status: Status.success,
        data: todo
      };
    } catch (err) {
      return {
        status: Status.fail,
        data: err
      };
    }
  }

  static async deleteById(id: Types.ObjectId): Promise<IData> {
    try {
      await Todo.deleteOne({ _id: id });
      return {
        status: Status.success
      };
    } catch (err) {
      return {
        status: Status.fail,
        data: err
      };
    }
  }
}

export default TodoService;

import { Response, Request } from "express";
import TodoService from "../services/todo";

export const getAll = async (req: Request, res: Response): Promise<void> => {
  const response = await TodoService.getAll();
  res.send(response);
};

export const create = async (req: Request, res: Response): Promise<void> => {
  const response = await TodoService.create(req.body);
  res.send(response);
};

export const getById = async (req: Request, res: Response): Promise<void> => {
  const response = await TodoService.getById(req.params.id);
  res.send(response);
};

export const checkById = async (req: Request, res: Response): Promise<void> => {
  const response = await TodoService.checkById(req.params.id);
  res.send(response);
};

export const deleteById = async (req: Request, res: Response): Promise<void> => {
  const response = await TodoService.deleteById(req.params.id);
  res.send(response);
};

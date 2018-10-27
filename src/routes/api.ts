import { Response, Request } from "express";
import { Status } from "../interfaces/data";

export const status = (req: Request, res: Response): void => {
  res.send({
    status: Status.success,
    data: "OK"
  });
};

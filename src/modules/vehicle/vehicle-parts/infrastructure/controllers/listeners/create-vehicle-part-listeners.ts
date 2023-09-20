import { Response } from "express";
import { StatusCodes } from "http-status-codes";

export function onSuccess(res: Response): () => Promise<void> {
  return async (): Promise<void> => {
    res.status(StatusCodes.OK).send();
  };
}


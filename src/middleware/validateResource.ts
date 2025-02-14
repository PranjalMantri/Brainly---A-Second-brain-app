import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";

export const validateResource =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res
        .status(400)
        .json({
          error: result.error.errors.map((error) => error.message).join(" "),
        });
      return;
    }

    req.body = result.data;
    next();
  };

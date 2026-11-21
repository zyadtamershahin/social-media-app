



import type { NextFunction, Request, Response } from "express";
import { ZodError, type ZodType } from "zod";
import { bad_Request_error } from "../exception/error.exception";

type ValidationKey = "body" | "query" | "params";
type ValidationSchema = Partial<Record<ValidationKey, ZodType>>;

export const validation = (schema: ValidationSchema) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const validation_error: { key: ValidationKey; issue: ZodError["issues"] }[] = [];

    for (const key of Object.keys(schema) as ValidationKey[]) {
      const rule = schema[key];
      if (!rule) continue;

      const parsed = rule.safeParse(req[key]);
      if (!parsed.success) {
        validation_error.push({ key, issue: parsed.error.issues });
      }
    }

    if (validation_error.length > 0) {
      return next(new bad_Request_error("Validation Error", validation_error));
    }

    return next();
  };
};
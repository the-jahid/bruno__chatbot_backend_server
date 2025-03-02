import { Request, Response, NextFunction } from 'express';

// functional way
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};


//Using OOP 
export class AsyncHandler {
    static handle (
        controllerMethod: (req: Request, res: Response, next?: NextFunction) => Promise<any>
    ) {
        return (req: Request, res:Response, next: NextFunction): void => {
            Promise.resolve(controllerMethod(req, res, next)).catch(next)
        }
    }
}








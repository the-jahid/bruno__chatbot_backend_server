import { Response } from 'express';

export const apiResponse = (res: Response, status: number, success: boolean, message: string, data?: any) => {
  const response = {
    success,
    message,
    data,
    timestamp: new Date().toISOString()
  };
  
  return res.status(status).json(response);
};



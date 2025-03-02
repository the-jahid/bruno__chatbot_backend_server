import { NextFunction, Request, Response } from 'express';
import { CompanyService } from '../services/company';
import { apiResponse } from '../utils/apiResponseBuilder';
import { asyncHandler } from '../utils/asyncHandler';

// Initialize service
const companyService = new CompanyService();

export class CompanyController {
  // Create company
  create = asyncHandler(async (req: Request, res: Response) => {
    const company = await companyService.create(req.body);
    return apiResponse(res, 201, true, 'Company created successfully', company);
  });

  // Get all companies
  findAll = asyncHandler(async (_req: Request, res: Response) => {
    const companies = await companyService.findAll();
    return apiResponse(res, 200, true, 'Companies retrieved successfully', companies);
  });

  // Get single company
  findOne = asyncHandler(async (req: Request, res: Response) => {
    const company = await companyService.findOne(req.params.id);
    return apiResponse(res, 200, true, 'Company retrieved successfully', company);
  });

  // Update company
  update = asyncHandler(async (req: Request, res: Response) => {
    const company = await companyService.update(req.params.id, req.body);
    return apiResponse(res, 200, true, 'Company updated successfully', company);
  });

  // Delete company
  delete = asyncHandler(async (req: Request, res: Response) => {
    await companyService.delete(req.params.id);
    return apiResponse(res, 200, true, 'Company deleted successfully', null);
  });
}        

// Export instance for routes
export const companyController = new CompanyController();
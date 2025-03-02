import { Router } from 'express';
import { companyController } from '../controllers/company';


const companyRouter = Router();


companyRouter.post('', companyController.create.bind(companyController));
companyRouter.get('', companyController.findAll.bind(companyController));
companyRouter.get('/:id', companyController.findOne.bind(companyController));
companyRouter.patch('/:id', companyController.update.bind(companyController));
companyRouter.delete('/:id', companyController.delete.bind(companyController));

export default companyRouter;



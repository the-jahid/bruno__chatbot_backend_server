import {Router} from 'express'
import companyRouter from './company';

const router = Router();

router.use('/companies', companyRouter);

export default router;
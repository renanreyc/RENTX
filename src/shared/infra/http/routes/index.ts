import { Router } from 'express';

import { specificationsRoutes } from "./specifications.routes";
import { categoriesRoutes } from "./categories.routes";
import { usersRoutes } from "./users.routes";
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { rentalRoutes } from './rental.routs';

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);
router.use("/users", usersRoutes);
router.use("/cars", carsRoutes);
router.use("/rentals", rentalRoutes);
router.use(authenticateRoutes);


export { router }
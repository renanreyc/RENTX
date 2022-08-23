import { Router } from 'express';

import { specificationsRoutes } from "./specifications.routes";
import { categoriesRoutes } from "./categories.routes";

const router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationsRoutes);

export { router }
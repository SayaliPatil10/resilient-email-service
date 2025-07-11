import app from './src/app.js';
import logger from "./src/utils/logger.js";

import { PORT } from './src/config/env.config.js';

app.listen(PORT || 3000, () => {
    logger.info(`Server is running at http://localhost:${PORT}`);
});
import logger from "../utils/logger.js";

/**
 * Middleware to log incoming requests and responses
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
export const requestLogger = (req, res, next) => {
	const { method, url } = req;
	const start = Date.now();

	// Log the incoming request
	logger.info(`Incoming Request: ${method} ${url} from IP ${req.ip}`);

	// Log the response details once the request is finished
	res.on("finish", () => {
		const duration = Date.now() - start;
		logger.info(
			`Response: ${method} ${url} - ${res.statusCode} [${duration}ms]`
		);
	});

	// Capture errors that might occur during processing
	res.on("error", (err) => {
		logger.error(`Error during processing: ${err.message}`);
	});

	next();
};

/**
 * Log an event
 * @param {string} eventType - The type of event
 * @param {string} message - The event message
 */
export const logEvent = (eventType, message) => {
	logger.info(`[Event: ${eventType}] ${message}`);
};

/**
 * Log a user action
 * @param {string} username - The username of the user
 * @param {string} action - The action performed by the user
 */
export const logUserAction = (username, action) => {
	logger.info(`[User: ${username}] performed action: ${action}`);
};

/**
 * Log a critical error
 * @param {Error} error - The error object
 */
export const logCriticalError = (error) => {
	logger.error(`[Critical] ${error.stack || error.message || error}`);
};

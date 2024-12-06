import logger from "../utils/logger.js";

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

// Additional logging functions
export const logEvent = (eventType, message) => {
	logger.info(`[Event: ${eventType}] ${message}`);
};

export const logUserAction = (username, action) => {
	logger.info(`[User: ${username}] performed action: ${action}`);
};

export const logCriticalError = (error) => {
	logger.error(`[Critical] ${error.stack || error.message || error}`);
};

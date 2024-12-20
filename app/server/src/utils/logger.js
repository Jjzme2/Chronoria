import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf, colorize } = format;

// Define the log format
const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
	level: "info", // Log level (info, error, warn, etc.)
	format: combine(
		timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // Add timestamps
		colorize(), // Colorize the log output for better readability
		logFormat // Use the custom format defined above
	),
	transports: [
		new transports.Console(), // Log to the console
		// Log to a file as well, named by type and date
		new transports.File({
			filename: `logs/info-${new Date().toISOString().split("T")[0]}.log`,
			level: "info",
		}),
		new transports.File({
			filename: `logs/warn-${new Date().toISOString().split("T")[0]}.log`,
			level: "warn",
		}),
		new transports.File({
			filename: `logs/error-${new Date().toISOString().split("T")[0]}.log`,
			level: "error",
		}),
		new transports.File({
			filename: `logs/combined-${new Date().toISOString().split("T")[0]}.log`,
		}),
	],
});

export default logger;

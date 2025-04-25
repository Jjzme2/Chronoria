/**
 * Middleware to set global variables for EJS templates
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @param {Function} next - The next middleware function
 */
const setLocals = (req, res, next) => {
	// Define global variables for EJS templates
	res.locals.siteTitle = "Chronoria";
	res.locals.currentUser = req.session?.user || null; // Dynamic user data
	res.locals.env = process.env.NODE_ENV || "development"; // Useful for environment checks

	// Add more global variables as needed
	next();
};

export default setLocals;

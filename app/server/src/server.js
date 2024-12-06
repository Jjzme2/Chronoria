import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import engine from "ejs-mate";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import globalVars from "./middleware/globalVariables.js";
import {
	requestLogger,
	// logEvent,
	// logUserAction,
	// logCriticalError,
} from "./middleware/requestLogger.js";

import mainRoutes from "./routes/index.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve Static Assets
app.use("/assets", express.static(path.join(__dirname, "assets/")));


// Configure EJS-Mate
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(globalVars);
app.use(requestLogger);

// app.use(passport.initialize());
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.JWT_SECRET,
//     },
//     (jwtPayload, done) => {
//       return done(null, jwtPayload);
//     }
//   )
// );

app.use("/", mainRoutes);

// ! DELETE: Examples
// app.get('/api', (req, res) => {
//   res.json({ message: 'Hello from server!' });
// });

// app.get('/api/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.json({ message: 'Protected route' });
// });

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

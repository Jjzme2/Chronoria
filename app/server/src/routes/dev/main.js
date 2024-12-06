import { Router } from "express";

const router = Router();

// router.get("/example", (req, res) => {
// 	res.send("This is a route in the dev category.");
// });

router.get("/login", (req, res) => {
  res.render("index", { title: "Dev Example" });
});

export default router;

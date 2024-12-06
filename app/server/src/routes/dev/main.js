import { Router } from "express";

const router = Router();

const checkLoggedIn = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.redirect("/devcenter/login");
  }
};

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/", checkLoggedIn, (req, res) => {
  res.render("index", { title: "Dev Center" });
});

export default router;

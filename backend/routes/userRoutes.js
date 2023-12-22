import express from "express";
import listEndpoints from "express-list-endpoints";

const router = express.Router();

const { requiresAuth } = require("express-openid-connect");

// To display the user's profile, your application should provide a protected route.

// Add the requiresAuth middleware for routes that require authentication. Any route using this middleware will check for a valid user session and, if one does not exist, it will redirect the user to log in.
router.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

router.get("/", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
router.get("/endpoints", (req, res) => {
  const endpoints = listEndpoints(router);
  res.json({ endpoints });
});

export default router;

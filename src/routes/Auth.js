jwt.verify(token, "tcmtm", (err, user) => {
    if (err) {
        return res.status(403).json({ message: "Authentication token required" });
    }
    req.user = user;
    next();
});
module.exports = authenticateToken;
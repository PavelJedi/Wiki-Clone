require("dotenv").config();

module.exports = (req, res, next) => {
  const origin = req.headers.origin;

  if (process.env.ALLOWED_ORIGINS.indexOf(origin) !== -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, baggage, sentry-trace"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
    return res.status(200).json({});
  }

  return next();
};

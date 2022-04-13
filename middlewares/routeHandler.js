const routeHandler = (req, res) => {
  res.status(404).json({
    success: false,
    message: "The route you're looking for couldn't be found",
  });
};

module.exports = routeHandler;

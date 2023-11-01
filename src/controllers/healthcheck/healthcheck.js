const healthcheck = async (req, res) => {
  res.status(200).send(`<p>Ok</p>`);
};

module.exports = healthcheck;

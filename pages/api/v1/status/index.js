function status(req, res) {
  res
    .status(200)
    .json({ message: "Endpoint de Status sendo acessado com sucessoô" });
}

export default status;

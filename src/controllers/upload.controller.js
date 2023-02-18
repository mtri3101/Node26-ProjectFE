const { AppError } = require("../helpers/error");
const { response } = require("../helpers/response");

const upload = () => {
  return (req, res, next) => {
    const file = req.file;
    if (!file) {
      next(new AppError(400, "Please update a file"));
    }
    const tempUrl = `https://minhtri-node26-projectfe.up.railway.app/${file.path}`;
    const newUrl = tempUrl.replace("static\\", "");
    res.status(200).json(response(newUrl));
  };
};

module.exports = {
  upload,
};

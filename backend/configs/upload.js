import fs from "fs";

const createUploadFolder = () => {
  if (!fs.existsSync("./uploads")) {
    // fs.mkdirSync("./uploads"); //development
    fs.mkdirSync("./tmp/uploads");
  }
  if (fs.existsSync("./uploads")) {
    if (!fs.existsSync("./uploads/profile")) {
      // fs.mkdirSync("./uploads/profile"); //development
      fs.mkdirSync("./tmp/uploads/profile");

      fs.copyFile(
        "../frontend/public/images/default-profile.png",
        "./uploads/profile/default.png",
        (err) => {
          if (err) throw err;
        }
      );
    }
    if (!fs.existsSync("./uploads/product")) {
      // fs.mkdirSync("./uploads/product"); //development
      fs.mkdirSync("./tmp/uploads/product");
    }
  }
};

export default createUploadFolder;

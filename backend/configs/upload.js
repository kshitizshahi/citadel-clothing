import fs from "fs";

const createUploadFolder = () => {
  if (!fs.existsSync("./uploads")) {
    fs.mkdirSync("./uploads");
    fs.copyFile(
      "../frontend/public/images/default-profile.png",
      "./uploads/default.png",
      (err) => {
        if (err) throw err;
      }
    );
  }
};
export default createUploadFolder;

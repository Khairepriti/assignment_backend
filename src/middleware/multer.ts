import multer from "multer";
import path from "path";
import fs from 'fs';

const publicFolderPath = path.join(__dirname, '../../public/');
const uploadsFolderPath = path.join(publicFolderPath, 'uploads/');

// Create the public and uploads folders if they don't exist
if (!fs.existsSync(publicFolderPath)) {
    fs.mkdirSync(publicFolderPath, { recursive: true });
  }
  if (!fs.existsSync(uploadsFolderPath)) {
    fs.mkdirSync(uploadsFolderPath, { recursive: true });
  }
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsFolderPath); // Set the directory where images will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter function to allow only images
const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  console.log("file===",file);
  
  const allowedTypes = /jpeg|jpg|png|gif|webp/; // Allowed image formats
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

export default upload;

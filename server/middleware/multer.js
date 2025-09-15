import multer from "multer";

// store file in memory (buffer) for direct upload
const storage = multer.memoryStorage();
const upload = multer({ storage });

export default upload;

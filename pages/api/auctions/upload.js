import formidable from "formidable";
import fs from "fs";
import path from "path";

// Wyłącz domyślny parser Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = formidable({ multiples: false, uploadDir: "./public/uploads", keepExtensions: true });

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ error: "Upload failed" });
    }

    const file = files.file;
    const fileName = path.basename(file[0].filepath);

    return res.status(200).json({ imageUrl: `/uploads/${fileName}` });
  });
}

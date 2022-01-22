import express from 'express';
import TbxnetSecretService from '../../services/TbxnetSecretService.js';
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const filesFound = [];
    const listOfFiles = await TbxnetSecretService.getListOfFiles();
    if (listOfFiles.length > 0) {
      for (const fileName of listOfFiles) {
        const linesOfFile = await TbxnetSecretService.getFileContent(fileName);
        if (linesOfFile && linesOfFile.length > 0) {
          filesFound.push({
            file: fileName,
            lines: linesOfFile,
          });
        }
      }
    }

    res.status(200).send({
      ok: true,
      files: filesFound,
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      msg: error.message,
    });
  }
});

export default router;

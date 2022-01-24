import express from 'express';
import TbxnetSecretService from '../../services/TbxnetSecretService.js';
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const listOfFiles = await TbxnetSecretService.getListOfFiles();
    if (listOfFiles.length > 0) {
      const filesFound = [];
      for (const fileName of listOfFiles) {
        const linesOfFile = await TbxnetSecretService.getFileContent(fileName);
        if (linesOfFile && linesOfFile.length > 0) {
          filesFound.push({
            file: fileName,
            lines: linesOfFile,
          });
        }
      }
      res.status(200).send({
        ok: true,
        files: filesFound,
      });
      return;
    }

    res.status(404).send({
      ok: false,
      msg: 'Files could not be found',
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      msg: error.message,
    });
  }
});

router.get('/list', async (req, res) => {
  try {
    const listOfFiles = await TbxnetSecretService.getListOfFiles();
    if (listOfFiles.length > 0) {
      res.status(200).send({
        ok: true,
        files: listOfFiles,
      });
      return;
    }

    res.status(404).send({
      ok: false,
      msg: 'Files could not be found',
    });
  } catch (error) {
    res.status(500).send({
      ok: false,
      msg: error.message,
    });
  }
});

export default router;

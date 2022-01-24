import express from 'express';
import TbxnetSecretService from '../../services/TbxnetSecretService.js';
const router = express.Router();

router.get('/data', async (req, res) => {
  const { fileName } = req.query;
  try {
    const listOfFiles = await TbxnetSecretService.getListOfFiles();
    if (listOfFiles.length > 0) {
      if (fileName && fileName.length) {
        if (!listOfFiles.includes(fileName)) {
          res.status(404).send({
            ok: false,
            msg: 'File could not be found',
          });
          return;
        }

        const linesOfFile = await TbxnetSecretService.getFileContent(fileName);
        if (linesOfFile && linesOfFile.length > 0) {
          res.status(200).send({
            ok: true,
            files: {
              file: fileName,
              lines: linesOfFile,
            },
          });
          return;
        }
        res.status(404).send({
          ok: false,
          msg: 'Lines of files could not be found or its content is invalid',
        });
        return;
      }

      const filesFound = [];
      for (const fileNameFromList of listOfFiles) {
        const linesOfFile = await TbxnetSecretService.getFileContent(
          fileNameFromList
        );
        if (linesOfFile && linesOfFile.length > 0) {
          filesFound.push({
            file: fileNameFromList,
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

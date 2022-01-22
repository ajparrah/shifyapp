import express from 'express';
import TbxnetSecretService from '../../services/TbxnetSecretService.js';
const router = express.Router();

router.get('/data', async (req, res) => {
  try {
    const listOfFiles = await TbxnetSecretService.getListOfFiles();

    res.status(200).send({
      ok: true,
      files: listOfFiles,
    });

    // TODO: I have to return something like this after validating and format
    // {
    //   "file": "file1.csv",
    //   "lines": [
    //   {
    //   "text" :"RgTya",
    //   "number": 64075909,
    //   "hex": "70ad29aacf0b690b0467fe2b2767f765"
    //   },
  } catch (error) {
    res.status(500).send({
      ok: false,
      msg: error.message,
    });
  }
});

export default router;

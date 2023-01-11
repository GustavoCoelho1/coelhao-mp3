const { Router } = require("express");
const DownloadMP3Controller = require("./controller/download-mp3-controller");

const router = Router();

const downloadMP3 = new DownloadMP3Controller();

router.post("/download/mp3", downloadMP3.handle);

module.exports = router;


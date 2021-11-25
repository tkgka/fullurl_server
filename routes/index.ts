import express from "express";
import fullurl from "../lib/get_fullurl"
import htmlToImage from "../lib/htmlToImage"
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    const url = req.query.url
    res.send(await fullurl(url))
});

router.get('/img', async (req, res, next) => {
    const url = req.query.url
    const imageBuffer = await htmlToImage(url);
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
});
module.exports = router;
import express from "express";
import fullurl from "../lib/get_fullurl"
import htmlToImage from "../lib/htmlToImage"
import reg_pattern from "../lib/reg_pattern";
var router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
    const url = String(req.query.url)
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.send(await fullurl(String(url)))
});

router.get('/img', async (req, res, next) => {
    var url = String(req.query.url)
    url.match(reg_pattern.pattern) ? url = url : url = `https://${url}`
    const imageBuffer = await htmlToImage(url);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.set("Content-Type", "image/png");
    res.send(imageBuffer);
});
module.exports = router;
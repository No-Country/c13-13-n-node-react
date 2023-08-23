const { Router } = require("express");
const { saveMessage } = require("../controllers/Message");
const router = Router();


// crear nuevo mensaje
router.post("/save", async (req, res) => {
  try {
    const { content, senderId, roomId } = req.body;
    let result = await saveMessage(content, senderId, roomId)

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



module.exports = router;
const { Router } = require("express");
const { saveMessage, getAllMessages, deleteMessage } = require("../controllers/Message");
const router = Router();

// crear nuevo mensaje
router.post("/save", async (req, res) => {
  try {
    const { content, senderId, roomId } = req.body;
    let result = await saveMessage(content, senderId, roomId);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    let result = await getAllMessages(roomId);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.put("/edit", async (req, res) => {
  try {
    const { messageId, content } = req.body;
    let result = await editMessage(messageId, content);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.put("/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    let result = await deleteMessage(messageId);

    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
editMessage

module.exports = router;

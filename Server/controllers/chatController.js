import { run, runInteractiveChat } from '../utils/chatHelper.js';
import { uploadDocuments } from '../utils/uploadHelper.js';

const rateMyResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: "No file uploaded" });
    }

    const fileBuffer = req.file.buffer;
    const mimeType = req.file.mimetype;

    const result = await run(fileBuffer, mimeType);
    res.status(200).json({
      message: "Resume rated successfully",
      rating: result,
    });
  } catch (error) {
    console.error('Error during chat session:', error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const interactiveChat = async (req, res) => {
  try {
    const messages = req.body.messages;
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: true, message: "No messages provided" });
    }

    const lastMessage = messages[messages.length - 1]?.text;
    if (!lastMessage || typeof lastMessage !== 'string') {
      return res.status(400).json({ error: true, message: "Invalid message format" });
    }

    const result = await runInteractiveChat(messages);
    res.status(200).json({
      message: "Chat response generated successfully",
      response: result,
    });
  } catch (error) {
    console.error('Error during chat session:', error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export { rateMyResume, interactiveChat };
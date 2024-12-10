import React, { useState } from "react";
import { Box, Typography, TextField, IconButton, Grid } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./chatBot.css";
import Button from "../../Components/Button/Button";
import chatbot from "../../image/chatbot.png";

const ChatBot = () => {
  const [messages, setMessages] = useState<
    { type: "user" | "bot"; text: string }[]
  >([]);
  const [input, setInput] = useState("");
  const [showFAQs, setShowFAQs] = useState(true);

  const sampleFAQs = [
    {
      question: "What are the most common interview questions?",
      answer:
        "Common questions include 'Tell me about yourself,' 'What are your strengths and weaknesses?' and 'Why do you want this job?'",
    },
    {
      question: "How do I prepare for technical interviews?",
      answer:
        "Practice coding problems, study data structures and algorithms, and review system design concepts for technical interviews.",
    },
    {
      question: "What should I wear to an interview?",
      answer:
        "Dress professionally or according to the company culture. When in doubt, business formal is a safe choice.",
    },
    {
      question: "How can I stand out in an interview?",
      answer:
        "Showcase your achievements with specific examples, demonstrate enthusiasm, and ask thoughtful questions about the role and company.",
    },
  ];

  const handleFAQClick = (faq: { question: string; answer: string }) => {
    setMessages([
      ...messages,
      { type: "user", text: faq.question },
      { type: "bot", text: faq.answer },
    ]);
    setShowFAQs(false);
  };

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      setMessages([
        ...messages,
        { type: "user", text: input },
        { type: "bot", text: "Thank you! I'll respond shortly." },
      ]);
      setInput("");
      setShowFAQs(false);
    }
  };

  return (
    <Box
      className="chatbot-container"
      sx={{
        maxWidth: 1200,
        margin: "auto",
        padding: 2,
        backgroundColor: "#f9f9f9",
        marginTop: 3,
        border: "1px solid #ddd",
        borderRadius: 2,
      }}
    >
      <Box
        className="chat-section"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          padding: 2,
          backgroundColor: "#f9f9f9",
          height: 720,
          overflowY: "auto",
        }}
      >
        {showFAQs ? (
          <>
            <Box sx={{ textAlign: "center", marginBottom: 4, marginTop: 15 }}>
              <img
                src={chatbot}
                alt="Logo"
                style={{ width: 100, height: 100, marginBottom: 8 }}
              />
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Welcome to ChatBot!
              </Typography>
              <Typography variant="body2">
              Practice mock interviews with the bot to build confidence and improve your skills.
              </Typography>
            </Box>
            <Grid container spacing={2}>
              {sampleFAQs.map((faq, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <Button
                    variant="outline"
                    fullWidth
                    sx={{
                      justifyContent: "flex-start",
                    }}
                    onClick={() => handleFAQClick(faq)}
                  >
                    {faq.question}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </>
        ) : (
          messages.map((message, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent:
                  message.type === "user" ? "flex-end" : "flex-start",
                marginBottom: 1,
              }}
            >
              <Typography
                sx={{
                  backgroundColor:
                    message.type === "user" ? "#d1e7ff" : "#e9ecef",
                  padding: 1,
                  borderRadius: 2,
                  maxWidth: "75%",
                }}
              >
                {message.text}
              </Typography>
            </Box>
          ))
        )}
      </Box>

      <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
        <TextField
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          size="small"
        />
        <IconButton sx={{ color: "#634897" }} onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatBot;

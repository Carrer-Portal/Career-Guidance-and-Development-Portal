import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = "AIzaSyBnzJjsXNn0mPPIIN9AUStDSLL2x7KKMnA";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({

  //gemini-1.5-flash
  //gemini-1.5-pro
  //gemini-1.5-flash-8b
  model: "gemini-1.5-flash",
});

const fileManager = new GoogleAIFileManager(apiKey);

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 90000,
  responseMimeType: "text/plain",
};

const run = async (fileBuffer, mimeType) => {
  try {
    const uploadResponse = await fileManager.uploadFile(Buffer.from(fileBuffer), {
      mimeType: mimeType,
      displayName: "Resume PDF",
    });

    const result = await model.generateContent([
      {
        fileData: {
          mimeType: uploadResponse.file.mimeType,
          fileUri: uploadResponse.file.uri,
        },
      },
      {
        text: "Prompt:\nYou are an expert in career guidance and resume evaluation." +
        " Your task is to analyze the provided resume and give feedback strictly within the scope of career guidance and development." +
        " Do not include any unrelated suggestions.\n\n" +
        "Provide the response in JSON format, containing:\n\ngrade: A number between 0 and 100 representing the overall quality of the resume in percentage format.\nimprovement: An array of exactly 5 improvement points, where each point is an object with the following structure:\npoint_number: The sequential number of the improvement (e.g., 1, 2, 3).\nsuggestion: A short, actionable improvement suggestion related to career development and resume optimization",
      },
    ]);

    return result;
  } catch (error) {
    console.error('Error during chat session:', error);
    throw error;
  }
};

const runInteractiveChat = async (messages) => {
  try {
    const result = await model.generateContent([
      ...messages,
      {
        text: "Prompt:\nYou are an expert in career guidance and resume evaluation. If the message is unrelated to career development and career topics, reject it with a proper message. Please provide a concise response with a maximum length of 200 words. ",
      },
    ]);
    return result;
  } catch (error) {
    console.error('Error during interactive chat session:', error);
    throw error;
  }
};

export { run, runInteractiveChat };
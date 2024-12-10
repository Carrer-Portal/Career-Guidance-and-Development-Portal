// import OpenAI from 'openai';

// const client = new OpenAI({
//   apiKey: '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', // This is the default and can be omitted
// });

// const main = async (prompt) => {
//   const params = {
//     messages: [
//         { 
//             role: 'user', 
//             content: prompt 
//         }
//     ],
//     model: 'gpt-3.5-turbo',
//   };
//   const chatCompletion = await client.chat.completions.create(params);
//   return chatCompletion;
// }

// export  {main};

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";

const apiKey = "AIzaSyCFpdsW0alYMRDV6lEAQ_PtsbZvaJQtQYU";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro-002",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const run = async (input) => {
  const chatSession = model.startChat({
    generationConfig,
    history: [
      {
        role: "user",
        parts: [
          {
            text: "Prompt:\nYou are an expert in career guidance and resume evaluation. Your task is to analyze the provided resume and give feedback strictly within the scope of career guidance and development. Do not include any unrelated suggestions.\n\nProvide the response in JSON format, containing:\n\ngrade: A number between 0 and 100 representing the overall quality of the resume in percentage format.\nimprovement: An array of exactly 5 improvement points, where each point is an object with the following structure:\npoint_number: The sequential number of the improvement (e.g., 1, 2, 3).\nsuggestion: A short, actionable improvement suggestion related to career development and resume optimization\n",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "```json\n{\n  \"grade\": 70,\n  \"improvement\": [\n    {\n      \"point_number\": 1,\n      \"suggestion\": \"Quantify accomplishments whenever possible. Instead of saying 'Managed a team,' say 'Managed a team of 5, resulting in a 15% increase in project delivery efficiency.'\"\n    },\n    {\n      \"point_number\": 2,\n      \"suggestion\": \"Tailor the resume to each specific job application. Highlight the skills and experiences most relevant to the target role.\"\n    },\n    {\n      \"point_number\": 3,\n      \"suggestion\": \"Develop a stronger summary/objective statement.  Instead of a general objective, craft a compelling narrative showcasing your key skills and career goals aligned with the target role.\"\n    },\n    {\n      \"point_number\": 4,\n      \"suggestion\": \"Ensure consistent formatting throughout the resume.  Use a professional font, clear headings, and appropriate spacing for improved readability.\"\n    },\n    {\n      \"point_number\": 5,\n      \"suggestion\": \"Strengthen the 'Skills' section by including both hard and soft skills relevant to your target industry. Consider grouping skills into categories for clarity (e.g., Technical Skills, Communication Skills).\"\n    }\n  ]\n}\n```",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "Prompt:\nYou are an expert in career guidance and resume evaluation. Your task is to analyze the provided resume and give feedback strictly within the scope of career guidance and development. Do not include any unrelated suggestions.\n\nProvide the response in JSON format, containing:\n\ngrade: A number between 0 and 100 representing the overall quality of the resume in percentage format.\nimprovement: An array of exactly 5 improvement points, where each point is an object with the following structure:\npoint_number: The sequential number of the improvement (e.g., 1, 2, 3).\nsuggestion: A short, actionable improvement suggestion related to career development and resume optimization",
          },
          {
            text: "Resume is uploaded as a file in pdf format \nPrompt:\nYou are an expert in career guidance and resume evaluation. Your task is to analyze the provided resume and give feedback strictly within the scope of career guidance and development. Do not include any unrelated suggestions.\n\nProvide the response in JSON format, containing:\n\ngrade: A number between 0 and 100 representing the overall quality of the resume in percentage format.\nimprovement: An array of exactly 5 improvement points, where each point is an object with the following structure:\npoint_number: The sequential number of the improvement (e.g., 1, 2, 3).\nsuggestion: A short, actionable improvement suggestion related to career development and resume optimization",
          },
        ],
      },
    ],
  });

//   try {
//     const result = await chatSession.sendMessage(input);
//     console.log(result.response.text());
//     return result.response.text();
//   } catch (error) {
//     console.error('Error during chat session:', error);
//     throw error;
//   }

    const uploadResponse = await fileManager.uploadFile(res.body.resume, {
    mimeType: "application/pdf",
    displayName: "Gemini 1.5 PDF",
    });

  try {
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResponse.file.mimeType,
        fileUri: uploadResponse.file.uri,
      },
    },
    {
      text: "Prompt:\nYou are an expert in career guidance and resume evaluation."+
      " Your task is to analyze the provided resume and give feedback strictly within the scope of career guidance and development."+
      "Do not include any unrelated suggestions.\n\n"+
      "Provide the response in JSON format, containing:\n\ngrade: A number between 0 and 100 representing the overall quality of the resume in percentage format.\nimprovement: An array of exactly 5 improvement points, where each point is an object with the following structure:\npoint_number: The sequential number of the improvement (e.g., 1, 2, 3).\nsuggestion: A short, actionable improvement suggestion related to career development and resume optimization",
        },
    ]);
    }
  catch (error) {
    console.error('Error during chat session:', error);
    throw error;
  }
  

};

export { run };
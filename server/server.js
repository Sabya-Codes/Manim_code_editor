require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || "AIzaSyD0ROtYfebfYB1Klu9IuwFINzWkNQzNKok");

// Generate code endpoint
app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Generating content for prompt:", prompt);

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(`Generate Manim code for: ${prompt}. Only return the Python code, no explanations.`);
    const response = await result.response;
    const text = response.text();

    console.log("Content generated successfully");
    res.json({ code: text });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Failed to generate content" });
  }
});

// Render video endpoint
app.post("/render", async (req, res) => {
  const { code } = req.body;
  
  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  console.log("Rendering video...");

  // Create temp directory
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
  
  // Write code to file
  const tempFilePath = path.join(tempDir, 'current.py');
  fs.writeFileSync(tempFilePath, code);

  // Extract class name
  const classMatch = code.match(/class\s+(\w+)\s*\(/);
  if (!classMatch) {
    return res.status(400).json({ error: "No valid class found in the code" });
  }
  const className = classMatch[1];

  // Run Manim
  const pythonPath = path.join(__dirname, '..', 'venv', 'Scripts', 'python.exe');
  const mediaDir = path.join(__dirname, '..', 'media');
  const command = `"${pythonPath}" -m manim "${tempFilePath}" ${className} --media_dir "${mediaDir}"`;

  console.log("Executing:", command);

  exec(command, { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    // Clean up temp file
    try { fs.unlinkSync(tempFilePath); } catch (e) {}

    if (error) {
      console.error("Manim error:", error);
      return res.status(500).json({ error: "Failed to render video" });
    }

    console.log("Manim completed successfully");

    // Find and rename video
    setTimeout(() => {
      const videoDir = path.join(__dirname, '..', 'media', 'videos', 'current', '1080p60');
      
      if (fs.existsSync(videoDir)) {
        const files = fs.readdirSync(videoDir);
        const videoFile = files.find(file => file.endsWith('.mp4'));
        
        if (videoFile) {
          const oldPath = path.join(videoDir, videoFile);
          const newPath = path.join(videoDir, 'video.mp4');
          
          try {
            if (fs.existsSync(newPath)) fs.unlinkSync(newPath);
            fs.renameSync(oldPath, newPath);
            console.log("Video ready at:", newPath);
            return res.json({ videoUrl: "/video/current/1080p60/video.mp4" });
          } catch (e) {
            console.error("Rename error:", e);
          }
        }
      }
      
      console.log("Video not found in:", videoDir);
      res.status(500).json({ error: "Video file not found" });
    }, 2000);
  });
});

// Serve video files
app.use('/video', express.static(path.join(__dirname, '..', 'media', 'videos')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

# Manim Code Editor

A web-based code editor for generating and rendering Manim animations using AI assistance.

## Features

- 🤖 **AI Code Generation** - Generate Manim code using natural language prompts
- 🎬 **Video Rendering** - Render Manim animations directly in the browser
- 💻 **Live Code Editor** - Edit and customize generated code
- 🎯 **Real-time Preview** - Watch your animations come to life instantly

## Prerequisites

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **FFmpeg** (for video rendering)
- **LaTeX** (optional, for mathematical expressions)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Manim_code_editor
```

### 2. Python Backend Setup
```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install Python dependencies
pip install -r requirements.txt
```

### 3. Node.js Frontend Setup
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
cd ..
```

### 4. Environment Configuration
Create a `.env` file in the `server` directory:
```env
GOOGLE_API_KEY=your_google_ai_api_key_here
PORT=5000
```

### 5. FFmpeg Installation
- **Windows**: Install via winget or download from [ffmpeg.org](https://ffmpeg.org/)
- **macOS**: `brew install ffmpeg`
- **Linux**: `sudo apt install ffmpeg` (Ubuntu/Debian)

## Running the Application

### Start the Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:5000`

### Start the Frontend Client
```bash
cd client
npm run dev
```
Client will run on `http://localhost:5173`

## Usage

1. **Enter a Prompt**: Describe the animation you want (e.g., "bouncing ball")
2. **Generate Code**: Click "Generate" to create Manim code using AI
3. **Edit Code**: Modify the generated code if needed
4. **Render Video**: Click "Render Video" to create the animation
5. **Watch Result**: View your rendered video in the browser

## Project Structure

```
Manim_code_editor/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js          # Main server file
│   ├── temp/              # Temporary Python files
│   └── package.json
├── media/                 # Generated videos
│   └── videos/
│       └── current/       # Current video location
├── venv/                  # Python virtual environment
├── requirements.txt       # Python dependencies
└── .gitignore
```

## API Endpoints

- `POST /generate` - Generate Manim code from prompt
- `POST /render` - Render video from Manim code
- `GET /video/*` - Serve rendered video files

## Technologies Used

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **AI**: Google Generative AI (Gemini)
- **Animation**: Manim Community Edition
- **Video Processing**: FFmpeg

## Troubleshooting

### Common Issues

1. **FFmpeg not found**: Ensure FFmpeg is installed and in your PATH
2. **LaTeX errors**: Install LaTeX for mathematical expressions
3. **Port conflicts**: Change ports in configuration if needed
4. **API key issues**: Verify your Google AI API key is valid

### Video Generation

- Videos are saved to `media/videos/current/1080p60/video.mp4`
- Each new render replaces the previous video
- Check server logs for detailed error messages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

import { useState } from "react";
import Input_field from "./code_input_field";

function Code_Generator() {
  const [prompt, setPrompt] = useState("Make a bunch of cubes flying into a big cube");
  const [clicked, setClicked] = useState(false);
  const[code , setCode] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isRendering, setIsRendering] = useState(false);
  const [renderError, setRenderError] = useState("");

  const prompt_generator = () => {
    setClicked(true);
    console.log(prompt);
    setTimeout(() => setClicked(false),300);
    fetch("http://localhost:5000/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Server response:", data);

        const rawCode = data.code;
        console.log("Raw code:", rawCode);

        if (!rawCode) {
          console.error("No code received from server");
          return;
        }

        const cleanedCode = rawCode.replace(/```(?:python)?\n?/gi, "").replace(/```/g, "").trim();
        console.log("Cleaned code:", cleanedCode);

        setCode(cleanedCode);
      })
      .catch((error) => {
        console.error("Error generating code:", error);
      });
  };

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log("Code entered in text area:", newCode);
  };

  const renderVideo = async () => {
    if (!code.trim()) {
      setRenderError("No code to render. Please generate or enter some code first.");
      return;
    }

    setIsRendering(true);
    setRenderError("");
    setVideoUrl("");

    try {
      const response = await fetch("http://localhost:5000/render", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      if (data.videoUrl) {
        // Always use the same hardcoded video URL
        // Reset video URL first to force re-render, then set the new URL
        setVideoUrl("");
        setTimeout(() => {
          setVideoUrl(`http://localhost:5000/video/current/1080p60/video.mp4`);
        }, 100);
      } else if (data.error) {
        setRenderError(data.error);
      }
    } catch (error) {
      console.error("Render error:", error);
      setRenderError("Failed to render video. Make sure the server is running.");
    } finally {
      setIsRendering(false);
    }
  };

  return (
    <div className="h-full bg-sky-500 text-3xl text-black flex flex-col">
      <div className="p-4">Code Generator load</div>

      {/* Input Row - fixed height */}
      <div className="flex-none px-4">
        <div className="flex gap-2">
          <p className="flex-[3] border-2 p-2">
            <input
              type="text"
              placeholder="Demo Prompt :- Make a bunch of cubes flying into a big cube"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full"
            />
          </p>
          <button
            className={`flex-1 border-2 cursor-pointer p-2 transition duration-300 ${
              clicked
                ? "bg-yellow-300 text-black ring-4 ring-yellow-400 shadow-lg"
                : "bg-white hover:bg-blue-300"
            }`}
            onClick={prompt_generator}
          >
            Generate
          </button>
        </div>
      </div>

      {/* Main Content - fills remaining height */}
      <div className="flex-1 flex px-4 py-2 gap-2 overflow-hidden">
        <div className="flex-1 border-2 p-2 overflow-auto">
          <Input_field code={code} onCodeChange={handleCodeChange}/>
        </div>
        <div className="flex-1 border-2 p-2 overflow-auto flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl">Video Generation</h3>
            <button
              onClick={renderVideo}
              disabled={isRendering || !code.trim()}
              className={`px-4 py-2 text-sm rounded transition duration-300 ${
                isRendering || !code.trim()
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isRendering ? "Rendering..." : "Render Video"}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center">
            {isRendering && (
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-900 mx-auto mb-4"></div>
                <p className="text-lg">Rendering video...</p>
              </div>
            )}

            {renderError && (
              <div className="text-center text-red-600">
                <p className="text-lg mb-2">❌ Error</p>
                <p className="text-sm">{renderError}</p>
              </div>
            )}

            {videoUrl && !isRendering && (
              <div className="w-full h-full">
                <video
                  controls
                  className="w-full h-full object-contain"
                  src={videoUrl}
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {!videoUrl && !isRendering && !renderError && (
              <div className="text-center text-gray-500">
                <p className="text-lg mb-2">📹 No video yet</p>
                <p className="text-sm">Generate or enter code, then click "Render Video"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Code_Generator;

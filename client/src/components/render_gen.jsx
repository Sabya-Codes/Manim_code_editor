import { useState } from "react";
import Input_field from "./code_input_field";

function Render_Code() {
  const [code, setCode] = useState("");
  const handleCodeChange = (newCode) => {
    setCode(newCode);
    console.log("Code entered in text area:", newCode);
  };

  return (
    <div className="h-full bg-sky-500 text-3xl text-black flex flex-col">
      <div className="p-4">Render Code Page Load</div>


      <div className="flex-1 flex px-4 py-2 gap-2 overflow-hidden">
        <div className="flex-1 border-2 p-2 overflow-auto">
          <Input_field code={code} onCodeChange={handleCodeChange} />
        </div>
        <div className="flex-1 border-2 p-2 overflow-auto">
          Video Generation
        </div>
      </div>

      
    </div>
  );
}

export default Render_Code;

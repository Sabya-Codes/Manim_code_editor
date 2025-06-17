import { useState } from "react";
import Code_Generator from "./components/code_gen";
import Render_Code from "./components/render_gen";

function App(){

  const[code_Generator , set_Code_Generator] = useState(false);
  const[render_engine , set_render_engine] = useState(false);

  const code_Generator_button = () =>{
    set_Code_Generator(true);
    set_render_engine(false);
  }
  const render_engine_button = () => {
    set_Code_Generator(false);
    set_render_engine(true);
  }
  return (
    <div className=" h-screen bg-green-600 text-white p-8 text-center text-2xl flex flex-col">

      <div className= " flex-1 bg-red-600 text-center text-3xl text-black">
        <h1 className="">Generative Manim</h1>
        <p>Plane text for video resolution</p>
        <p>Generate Mathematical animations videos from text </p>

        <div className="flex gap-20 justify-center">
          <button className="border-4 px-4 py-2 rounded cursor-pointer" onClick={code_Generator_button}>Generate video</button>
          <button  className="border-4 px-4 py-2 rounded cursor-pointer" onClick={render_engine_button}>Render Engine</button>
        </div>
      </div>
        
        
        <div className="flex-[3] overflow-auto">
          {
          code_Generator && (
            <div className="h-full">
              <Code_Generator/>
            </div>
          )
        }
        {
          render_engine && (
            <div className="h-full">
              <Render_Code/>
            </div>
          )
        }
        </div>
        
    </div>
  );
}
export default App;

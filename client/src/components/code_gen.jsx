function Code_Generator() {
  return (
    <div className="h-full bg-sky-500 text-3xl text-black flex flex-col">
      <div className="p-4">Code Generator load</div>

      {/* Input Row - fixed height */}
      <div className="flex-none px-4">
        <div className="flex gap-2">
          <p className="flex-[3] border-2 p-2">Input Field to Generate Code</p>
          <button className="flex-1 border-2 cursor-pointer p-2">Generate</button>
        </div>
      </div>

      {/* Main Content - fills remaining height */}
      <div className="flex-1 flex px-4 py-2 gap-2 overflow-hidden">
        <div className="flex-1 border-2 p-2 overflow-auto">
          Code Writing Input Field
        </div>
        <div className="flex-1 border-2 p-2 overflow-auto">
          Video Generation
        </div>
      </div>
    </div>
  );
}

export default Code_Generator;

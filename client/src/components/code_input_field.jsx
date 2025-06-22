function Input_field({ code, onCodeChange }) {

    // Split code into lines for line numbers
    const lines = code.split("\n");

    return (
        <div className="flex w-full text-xl">
            {/* Line numbers column */}
            <div
                className="text-right pr-2 select-none text-amber-50 bg-black rounded-l border-l-2 border-t-2 border-b-2 border-gray-300"
                style={{ minWidth: "2em", paddingTop: "0.5rem" }}
            >
                {lines.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                ))}
            </div>
            {/* Textarea */}
            <textarea
                rows="10"
                cols="50"
                name="comment"
                id="usrform"
                placeholder="Enter Code"
                className="w-full p-2 border-2 border-gray-300 rounded-r font-mono"
                style={{ resize: "vertical" }}
                onChange={(e) => onCodeChange(e.target.value)}
                value={code}
                spellCheck={false}
            />
        </div>
    );
}

export default Input_field;
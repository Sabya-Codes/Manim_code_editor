# 🧠 Manim Code Editor — AI-Powered Animation Coding Interface

> Real-time Manim code editor powered by AI with code suggestions, prompt-to-code, and live preview rendering. Built using **React**, **Tailwind CSS**, **Express**, and **DeepSeek LLM**.

---

## ✨ Features

- 🎬 **Write and preview Manim animations in real-time**
- 🤖 **AI-powered code suggestions** using DeepSeek LLM
- 💬 **Prompt-to-code generation** from natural language
- 🌈 Beautiful UI using **Tailwind CSS**
- 🧠 Extendable architecture for custom render engines
- 🚀 Lightweight & fast — powered by **Vite** + **Express**

---

## 🖥️ Demo Screenshot

![Editor Preview](https://your-screenshot-link-here.com)  
<sub><i>Live rendering + suggestions in action</i></sub>

---

## 🛠️ Tech Stack

| Frontend       | Backend     | AI            | Build Tools       |
|----------------|-------------|---------------|-------------------|
| React (Vite)   | Express.js  | DeepSeek LLM  | Tailwind CSS      |
| Tailwind CSS   | Node.js     | OpenAI (opt)  | ESLint, Prettier  |

---

## 📦 Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/manim-code-editor.git
cd manim-code-editor

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

---

## 🚀 Run Locally

In two separate terminal tabs:

**Client:**

```bash
cd client
npm run dev
```

**Server:**

```bash
cd server
npm start
```

Frontend: http://localhost:5173  
Backend: http://localhost:3000

---

## 📚 Folder Structure

```
manim-code-editor/
├── client/           # React + Tailwind frontend
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── server/           # Express backend
│   ├── routes/
│   └── llm.js
├── README.md
└── package.json
```

---

## 🧠 AI Integration

We use [DeepSeek LLM](https://github.com/deepseek-ai/DeepSeek-Coder) to:

- Autocomplete Manim code
- Transform text prompts into working Python animation scripts

> Fine-tuning on a Manim-specific dataset is recommended for better results.

---

## 📥 Future Features

- [ ] Download rendered animations as `.mp4`
- [ ] GPT-based bug fixing and code refactor
- [ ] Authentication & saving projects to cloud
- [ ] Collaboration mode (multi-user)
- [ ] Switchable render engines (WebAssembly, cloud, etc.)

---

## 🤝 Contributing

PRs are welcome!  
Please fork the repo and submit a pull request.  
For major changes, open an issue first to discuss.

---

## 📄 License

MIT License © [Your Name](https://github.com/yourusername)

---

## 🌐 Credits

- [Manim](https://www.manim.community/) — The animation engine
- [Tailwind CSS](https://tailwindcss.com/)
- [DeepSeek](https://github.com/deepseek-ai/DeepSeek-Coder)
- [OpenAI](https://openai.com/)
- [Vite](https://vitejs.dev/)

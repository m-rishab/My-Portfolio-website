# My-Portfolio-website
My Portfolio Webiste

## Local AI Chatbot

The portfolio chatbot can use a local open-source model through Ollama. The default model is `llama3.2:latest`, which is lightweight and reliable for short portfolio conversations. If it is unavailable, the site falls back to the local rule-based answers.

Setup:

```bash
ollama pull llama3.2
npm run ollama:serve
npm run chat:server
npm run dev
```

Open the site from the Vite URL and chat normally.

NVIDIA note: on a Linux/Windows machine with NVIDIA drivers and CUDA-capable Ollama, Ollama will use the GPU automatically. You can confirm with:

```bash
nvidia-smi
```

Optional model/env overrides:

```bash
CHAT_MODEL=qwen3:4b npm run chat:server
VITE_CHAT_API_URL=http://127.0.0.1:8787/api/chat npm run dev
```

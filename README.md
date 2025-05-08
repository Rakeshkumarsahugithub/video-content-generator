<h1 align="center">
  🎥 AI Video Content Platform 
  <br/>
  <img src="https://img.shields.io/badge/React-18.2-%2361DAFB?logo=react" />
  <img src="https://img.shields.io/badge/Context_API-Yes-success" />
  <img src="https://img.shields.io/badge/Lazy_Loading-Implemented-blueviolet" />
</h1>
This platform is a comprehensive tool for creating, managing, and publishing short-form video content across multiple social platforms (YouTube Shorts and Instagram Reels). It combines AI-powered content generation with streamlined publishing workflows to help creators efficiently produce high-quality video content.


## 🌟 **Key Features**
| Feature | Implementation Theory | Technical Details |
|---------|-----------------------|-------------------|
| **AI Content Generation** | Leveraged language models for creative ideation while maintaining structured output | DeepSeek API with response caching and retry logic |
| **Cross-Platform Publishing** | Abstracted platform-specific APIs behind unified interface | YouTube/Instagram API wrappers with mock implementations |
| **State Management** | Chose Context API over Redux for better DX with moderate complexity | Used React Context API with useReducer for managing state, providing a simpler and more efficient solution compared to Redux for this project. |
| **Performance** | Optimized perceived performance through strategic loading | React.memo (15+ components), Lazy Loading (3 routes) |

## 🛠 **Tech Stack**
<div align="center">
  
| Layer          | Technology                          | Purpose                          |
|----------------|-------------------------------------|----------------------------------|
| **Core**       | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Component-based architecture     |
| **State**      | ![Context API](https://img.shields.io/badge/Context_API-2.0-important) | Global state management          |
| **Styling**    | ![MUI](https://img.shields.io/badge/Material_UI-007FFF?style=for-the-badge&logo=mui&logoColor=white) | Consistent design system         |
| **AI**         | ![DeepSeek](https://img.shields.io/badge/DeepSeek-LLM-blueviolet) | Content generation backbone      |
| **Build**      | ![Vite](https://img.shields.io/badge/Vite-B7B7B8?style=for-the-badge&logo=vite&logoColor=646CFF) | Fast development tooling         |

</div>

<p align="center">
  Made with ❤️ by <strong>Rakesh Kumar Sahu</strong>
</p>

<p align="center">
  <a href="https://github.com/Rakeshkumarsahugithub" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-000000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a> 
  <a href="https://www.linkedin.com/in/rakesh-kumar-sahu-5b75a6271/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

## 🚀 **Getting Started**

API keys for:
- DeepSeek (AI)
- YouTube Data API v3
- Instagram Graph API

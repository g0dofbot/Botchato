# 🚀 Botchato

> **A retro-inspired secure chat application with AI integration**

*Botchato blends nostalgia, security, and AI—built for the future, inspired by the past!*

## ✨ Project Story

I've always loved the look and feel of retro terminals and classic chat apps. With privacy becoming more important than ever, I wanted to build something that combined a nostalgic interface with modern security—end-to-end encryption and AI-powered features. The idea was to create a chat app that feels like hacking in a sci-fi movie, but is actually secure and practical for real conversations.

## 🎯 Features

- **🔒 End-to-End Encryption** - OpenPGP encryption for secure messaging
- **🤖 AI Integration** - Powered by Google Gemini for intelligent conversations
- **🖥️ Retro Terminal UI** - Pixel-perfect nostalgic design with modern usability
- **🔐 Secure Authentication** - JWT-based auth with bcrypt password hashing
- **⚡ Real-time Chat** - Seamless messaging experience
- **📱 Responsive Design** - Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- **Next.js** - React framework with SSR
- **React** - Component-based UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Components** - Retro terminal-inspired design

### Backend
- **Node.js** - Runtime environment
- **Express** - Web application framework
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing
- **OpenPGP** - End-to-end encryption

### AI & Integration
- **Genkit** - AI development framework
- **Google Gemini API** - Conversational AI

### Deployment
- **Vercel** - Frontend hosting
- **Render/Heroku** - Backend hosting
- **Custom Domain** - [godofbot.site](https://godofbot.site)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/botchato.git
   cd botchato
   ```

2. **Install dependencies**
   ```bash
   # Frontend
   npm install
   
   # Backend (if separate)
   cd backend
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_GEMINI_API_KEY=your_api_key_here
   JWT_SECRET=your_jwt_secret
   DATABASE_URL=your_database_url
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔐 Security & Encryption

Botchato implements robust end-to-end encryption using OpenPGP. The encryption process follows standard public-key cryptography:

```
C = E_K_pub(M)
```

Where:
- `C` = Encrypted message
- `E_K_pub` = Encryption with public key
- `M` = Original message

Only the private key `K_priv` can decrypt `C` to recover the original message `M`, ensuring that only the intended recipient can read the message, even if intercepted.

## 🎨 Design Philosophy

- **Retro Aesthetic** - Inspired by classic terminals and sci-fi interfaces
- **Modern Usability** - Accessible, responsive, and user-friendly
- **Security First** - Privacy and encryption built into the core
- **AI Enhanced** - Intelligent features without compromising security

## 🧠 What I Learned

### Technical Skills
- **Next.js & React** - Building scalable web applications with SSR and API routes
- **Node.js & Express** - Secure backend development and authentication
- **End-to-End Encryption** - OpenPGP implementation and key management
- **AI Integration** - Working with Genkit and Google Gemini APIs
- **Deployment** - Vercel deployment, DNS configuration, and environment management

### Challenges Overcome
- **Encryption Implementation** - Seamlessly integrating E2E encryption with the chat UI
- **API Integration** - Handling errors, rate limits, and graceful failures
- **DNS & Deployment** - Managing domain verification and DNS propagation
- **UI/UX Balance** - Creating a retro aesthetic that's still modern and accessible

## 🌟 Screenshots

*Add screenshots of your application here*

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live Demo**: [godofbot.site](https://godofbot.site)
- **Documentation**: [Coming Soon]
- **Issues**: [GitHub Issues](https://github.com/yourusername/botchato/issues)

## 🙏 Acknowledgments

- Inspired by classic terminal interfaces and retro computing
- Thanks to the open-source community for amazing tools and libraries
- Special appreciation for the cryptography community for security best practices

---

*Built with 🤖 by Godofbot*

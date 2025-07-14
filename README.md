🚀 Project Story: Botchato
Inspiration
I’ve always loved the look and feel of retro terminals and classic chat apps. With privacy becoming more important than ever, I wanted to build something that combined a nostalgic interface with modern security—end-to-end encryption and AI-powered features. The idea was to create a chat app that feels like hacking in a sci-fi movie, but is actually secure and practical for real conversations.

What I Learned
Next.js & React: I deepened my understanding of building scalable, modern web apps with Next.js, including server-side rendering and API routes.
Node.js & Express: I learned how to set up a secure backend, handle authentication with JWT, and manage user data safely.
End-to-End Encryption: Implementing OpenPGP encryption taught me about public/private key cryptography and secure message exchange.
Vercel Deployment: I learned how to deploy full-stack apps to Vercel, configure custom domains, and manage environment variables for production.
AI Integration: Integrating Genkit and Google Gemini APIs showed me how to add conversational AI to a real-world app.
How I Built It
Frontend: Built with Next.js, React, and Tailwind CSS for a pixel-perfect retro look. Used custom components and icons for the terminal vibe.
Backend: Node.js with Express, JWT for authentication, bcrypt for password hashing, and OpenPGP for encryption.
AI: Integrated Genkit flows and Google Gemini for AI chat features.
Deployment: Used Vercel for the frontend and can use Render/Heroku for the backend. Connected my custom domain (godofbot.site) via DNS.
.env & Secrets: Managed API keys and secrets securely using environment variables.
Challenges
Encryption: Making end-to-end encryption work smoothly with the chat UI and ensuring keys were managed securely.
API Integration: Handling errors and rate limits from the AI API, and making sure the app failed gracefully.
Deployment: DNS propagation and domain verification took longer than expected, but I learned a lot about DNS records and Vercel’s workflow.
Retro UI: Balancing the retro look with modern usability—making sure it’s fun but also accessible and responsive.
Math & Security
I explored the basics of public-key cryptography, where: $$ C = E_{K_{pub}}(M) $$ and only the private key $K_{priv}$ can decrypt $C$ to recover the message $M$. This ensures that only the intended recipient can read the message, even if it’s intercepted.

Botchato is a blend of nostalgia, security, and AI—built for the future, inspired by the past!

# 🧘‍♀️ MindEase

> **Your space for calm, positivity, and self-growth**

MindEase is a comprehensive mental wellness web application designed specifically for students to help them relax, recharge, and find balance in their daily lives. Through calming ambient music, inspirational content, mindful breathing exercises, journaling, and interactive wellness games, MindEase provides a peaceful digital sanctuary for mental health support.

---

## ✨ Features

### 🎧 **Vibe Out - Ambient Music**
Immerse yourself in carefully curated ambient tracks:
- **Nostalgic Memories** - Relaxing ambient music for peaceful reflection
- **Solitude** - Dark ambient soundscapes for deep focus
- **Inspiring Cinematic** - Uplifting cinematic ambient music

### 🎬 **Short Films**
Watch inspiring and feel-good short videos designed to provide mindful breaks and positive perspectives during your day.

### 📖 **Articles & Quotes**
Read and reflect on curated mental wellness quotes and articles from renowned authors including:
- Jon Kabat-Zinn
- Rupi Kaur
- Atticus
- Nayyirah Waheed

Featuring expandable content with "Read More" functionality for deeper exploration.

### 🧘 **Meditation & Breathing**
- **5-Minute Calm Timer** - Quick mindfulness sessions
- **Voice-Guided Meditation** - Audio-assisted breathing exercises
- Visual breathing guides for stress relief

### 📝 **Personal Journal**
A comprehensive journaling system featuring:
- Mood tracking with emoji indicators (😊 Happy, 😐 Neutral, 😢 Sad, 😡 Angry, 😴 Tired)
- Search functionality to find past entries
- Autosave feature to prevent data loss
- Local storage persistence
- Clear all entries option

### 📊 **Mood Analytics**
Visualize your emotional journey over time with:
- Interactive mood charts using Chart.js
- Mood stability insights
- Data-driven wellness recommendations

### 💬 **Clara - AI Chatbot**
Connect with Clara, an AI-powered mental wellness companion integrated via local Flask server for personalized support and conversation.

### 📋 **Wellness Survey**
Complete wellness assessments to track your mental health progress and receive personalized recommendations.

### 🎮 **Stress-Relief Games**
Interactive calming games to reduce stress:
- **Breathing Circle** - Guided breathing with soothing animated visuals
- **Bubble Pop** - Satisfying bubble-popping experience
- **Memory Match** - Gentle cognitive exercises
- **Doodle Pad** - Creative expression tool

### 🌙 **Dark Mode**
Toggle between light and dark themes for comfortable viewing at any time of day.

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with custom properties and animations
  - Glassmorphism effects
  - Smooth transitions and micro-animations
  - Responsive grid layouts
- **JavaScript (ES6+)** - Interactive functionality
  - Local Storage API for data persistence
  - Web Speech API for voice-guided meditation
  - Chart.js for data visualization

### Backend
- **Flask** - Python web framework for Clara chatbot integration
- **Ollama** - Local LLM integration for AI conversations

### Design
- **Google Fonts** - Poppins font family
- **Responsive Design** - Mobile-first approach optimized for all devices
- **Progressive Web App (PWA)** - Manifest file and service worker support

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- For Clara chatbot:
  - Python 3.8+
  - Flask
  - Ollama

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/mindease.git
   cd mindease
   ```

2. **Open the application**
   
   Simply open `index.html` in your web browser:
   ```bash
   # On Windows
   start index.html
   
   # On macOS
   open index.html
   
   # On Linux
   xdg-open index.html
   ```

3. **Optional: Set up Clara Chatbot**
   
   If you want to use the AI chatbot feature:
   ```bash
   # Install Flask
   pip install flask
   
   # Install and run Ollama
   # Visit https://ollama.ai for installation instructions
   
   # Start the Flask server (default port 5000)
   python app.py
   ```

---

## 📱 Usage

### Navigation
Use the intuitive navigation bar to switch between different sections:
- **Home** - Welcome screen with quick actions
- **Vibe Out** - Music player
- **Short Films** - Video content
- **Articles** - Reading material
- **Meditation** - Breathing exercises
- **Journal** - Personal entries
- **Analytics** - Mood insights
- **Clara** - AI chatbot
- **Survey** - Wellness assessment
- **Games** - Stress-relief activities

### Journaling
1. Select your current mood from the dropdown
2. Write your thoughts in the text area
3. Click "Save Entry" or rely on autosave
4. Search past entries using the search bar
5. View mood trends in the Analytics section

### Meditation
1. Click "Start 5 Min Timer" to begin
2. Follow the breathing prompts
3. Use "Voice Guided" for audio assistance
4. Click "Stop" to end the session early

### Games
1. Navigate to the Games section
2. Choose a game that appeals to you
3. Click "Open" to start playing
4. Close the game window when you're ready to continue

---

## 📁 Project Structure

```
mindease/
├── index.html              # Main application page
├── about.html              # About page
├── survey.html             # Wellness survey
├── game.html              # Games page
├── styles.css             # Main stylesheet
├── about.css              # About page styles
├── survey.css             # Survey styles
├── games.css              # Games styles
├── script.js              # Main JavaScript
├── game.js                # Games JavaScript
├── survey.js              # Survey JavaScript
├── sw.js                  # Service worker for PWA
├── manifest.json          # PWA manifest
├── logo-1.png             # Application logo
├── about-us.mp4           # About page video
├── m1.mp3                 # Nostalgic Memories track
├── m2.mp3                 # Solitude track
├── m3.mp3                 # Inspiring Cinematic track
├── 1.mp4, 3.mp4, 4.mp4, 5.mp4  # Short films
└── README.md              # This file
```

---

## 🎨 Design Philosophy

MindEase embraces modern web design principles:

- **Premium Aesthetics** - Vibrant gradients, glassmorphism, and smooth animations
- **Dark Mode First** - Optimized for comfortable extended viewing
- **Micro-interactions** - Subtle animations enhance user engagement
- **Accessibility** - ARIA labels, semantic HTML, and keyboard navigation
- **Performance** - Lazy loading, preload controls, and optimized assets
- **Responsive** - Seamless experience across desktop, tablet, and mobile

---

## 🌟 Key Highlights

- ✅ **Student-Focused** - Built specifically for academic stress relief
- ✅ **Privacy-First** - All journal data stored locally on your device
- ✅ **Offline-Capable** - PWA support for offline access
- ✅ **No Registration** - Use immediately without creating an account
- ✅ **Free & Open Source** - Community-driven mental wellness support

---

## 🤝 Contributing

We welcome contributions to make MindEase even better! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Contribution
- Additional meditation exercises
- More calming games
- Enhanced analytics features
- Multilingual support
- Accessibility improvements
- Bug fixes and performance optimizations

---

## 🐛 Known Issues

- Clara chatbot requires local Flask server running on port 5000
- Voice-guided meditation may not work on all browsers (requires Web Speech API support)
- Some features require modern browser APIs

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**MindEase** is developed with love and care for mental wellness.

### Contact
- **Email**: [ruakroon@gmail.com](mailto:ruakroon@gmail.com)
- **Phone**: +91 9781159914
- **Institution**: BCM School Basant City

---

## 🙏 Acknowledgments

- Inspired by quotes from Jon Kabat-Zinn, Rupi Kaur, Atticus, and Nayyirah Waheed
- Special thanks to all contributors and supporters of mental health awareness
- Built for students who deserve a peaceful space to recharge

---

## 🔮 Future Roadmap

- [ ] Mobile app versions (iOS & Android)
- [ ] Integration with wearable devices for real-time stress monitoring
- [ ] Community features for shared wellness journeys
- [ ] Professional therapist directory
- [ ] Advanced AI-powered mood prediction
- [ ] Customizable ambient music playlists
- [ ] Group meditation sessions
- [ ] Wellness challenges and achievements

---

<div align="center">

**Made with ❤️ for mental wellness | 2025 MindEase**

*"Small daily practices to bring calm and clarity."*

[⬆ Back to Top](#-mindease)

</div>

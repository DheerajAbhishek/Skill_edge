# 🚀 QUICK START GUIDE

## ⚠️ STEP 1: Add Your Groq API Key

**IMPORTANT:** Before running the app, you must add your Groq API key!

1. Open this file: `src/utils/groqAPI.js`

2. Find this line (line 2):
   ```javascript
   const GROQ_API_KEY = 'YOUR_GROQ_API_KEY_HERE';
   ```

3. Replace `'YOUR_GROQ_API_KEY_HERE'` with your actual API key:
   ```javascript
   const GROQ_API_KEY = 'gsk_your_actual_key_here';
   ```

4. Save the file

**Get a FREE API key:** https://console.groq.com

---

## 📦 STEP 2: Install Dependencies

Open your terminal in the `react-frontend` folder and run:

```bash
npm install
```

This will install:
- React 18
- PDF.js (for PDF parsing)
- Recharts (for charts)
- Lucide React (for icons)
- Vite (dev server)

---

## ▶️ STEP 3: Run the App

```bash
npm run dev
```

The app will open at: **http://localhost:3000**

---

## 🎯 How to Use

1. **Upload Resume:** Click or drag-drop a PDF resume
2. **Wait:** Analysis takes 5-10 seconds
3. **View Results:**
   - Resume score (0-100)
   - Skills detected
   - Experience level (Fresher/Intermediate/Experienced)
   - Skills you should learn
   - AI-generated interview questions
4. **Try Another:** Click "Analyze Another Resume"

---

## 📂 What Was Built

```
react-frontend/
├── src/
│   ├── components/          # React UI components
│   │   ├── Header           # Top navigation
│   │   ├── UploadSection    # PDF upload area
│   │   ├── ResultsDisplay   # Main results page
│   │   ├── ScoreCircle      # Circular score chart
│   │   ├── SkillsAnalysis   # Skills breakdown
│   │   └── InterviewQuestions # AI questions
│   ├── utils/               # Core logic
│   │   ├── pdfParser        # Extracts from PDF
│   │   ├── skillDetector    # Finds skills
│   │   ├── resumeScorer     # Calculates score
│   │   └── groqAPI          # ⚠️ API KEY HERE
│   └── App.jsx              # Main component
```

---

## ✅ Features Included

✓ PDF resume parsing (client-side)  
✓ 100+ skills detection (Python, React, AWS, etc.)  
✓ Automatic field prediction (Web Dev, Data Science, etc.)  
✓ Experience level detection  
✓ 100-point resume scoring  
✓ Skills gap analysis  
✓ AI-powered personalized interview questions (Groq)  
✓ Beautiful Apple-inspired dark UI  
✓ Fully responsive design  

---

## 🚨 SECURITY NOTE

**This is TEAM REVIEW version with hardcoded API key!**

For production:
1. Move API key to `.env` file
2. Use environment variables
3. Or create a backend API proxy

**DO NOT commit with real API key to public repos!**

---

## 🐛 Troubleshooting

### PDF not parsing
- Make sure it's a text-based PDF (not scanned image)
- Try a different PDF

### API errors
- Check your Groq API key is correct
- Check you have API credits remaining
- Check browser console for errors

### Build errors
- Delete `node_modules` and run `npm install` again
- Make sure you're using Node.js 16+

---

## 📝 Build for Production

```bash
npm run build
```

Creates optimized files in `dist/` folder.

Deploy to:
- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Drag-drop `dist/` folder
- **Any static host**: Upload `dist/` folder

---

## 🎨 What's Different from Streamlit?

**Streamlit (Old):**
- Python backend required
- Server needed to run
- Limited UI customization

**React (New):**
- ✅ 100% runs in browser (no server needed!)
- ✅ Modern, fast, Apple-inspired UI
- ✅ Easy to deploy anywhere
- ✅ Better performance
- ✅ More interactive

---

## 💡 Tips

- Use Chrome/Edge for best PDF parsing
- Resume should be under 10 pages
- Works best with tech resumes
- AI questions take 3-5 seconds to generate

---

**Need help?** Check the full README.md or contact the team.

**Enjoy your new React resume analyzer! 🎉**

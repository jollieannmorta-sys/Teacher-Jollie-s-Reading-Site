# Teacher Jollie's Reading Fundamentals

A free reading-practice website for pupils, from phonics to comprehension. Every activity has a **Listen** button (the pupil hears the word or sentence) and a **🎤 Say it / Read it** check-up (the browser listens and shows which words were read correctly).

## Levels
1. Letter sounds and short vowels
2. Blends and digraphs
3. Long vowels and vowel teams
4. Syllables
5. Sight words and fluency
6. Vocabulary and word parts
7. Comprehension (passages with questions and read-aloud)
8. Grade 6 Challenge: long words, word roots, figurative language, longer passages

Each level has several activities (words, sentences, quizzes, passages): 49 in all.

## Owner name
The site shows **Teacher Jollie** in the top bar, the home ribbon, the owl's greeting, the results screen, the footer and the printable sheets. To change the name, edit `SITE` at the bottom of `data.js`.

## Kid-friendly look
Each level has its own color, an owl mascot gives encouragement, word cards show a picture, and pupils get sounds, confetti and animated stars. The 🔊 button in the top bar turns sounds off. To add a picture for a new word, add it to `PICS` at the bottom of `data.js`. Level colors are in `LEVEL_COLORS`.

## Printable sheets
On the home screen:
- **My score sheet** lists every activity with the stars earned on that device, plus a box for the teacher's pronunciation rating.
- **Class record sheet** is a blank grid (name, L1–L8, pronunciation rating, remarks) for you to fill in by hand. Set the number of pupils, then press Print.

## Put it online with GitHub Pages
1. Create a new repository on GitHub (e.g. `reading-fundamentals`).
2. Upload these files: `index.html`, `styles.css`, `data.js`, `app.js`, `README.md`.
3. Open **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then Save.
4. After a minute, your site is live at `https://<your-username>.github.io/<repository-name>/`.

## Add or change content
Open `data.js`. Add words to a `words` activity, sentences to a `sentences` activity, or questions to a `quiz`. No other file needs to change.

## About the mic check
- Works best on **Chrome or Edge** (Android and desktop). Needs internet and microphone permission. GitHub Pages uses HTTPS, which the mic requires.
- Browsers without speech recognition (e.g. Firefox) still get Listen plus self-check buttons.
- The mic check tells you whether the browser recognised the word. It is a helpful guide, not a final judge of pronunciation, accents or very young voices. Teacher listening is still the best check.
- Stars are saved only in that pupil's browser on that device.

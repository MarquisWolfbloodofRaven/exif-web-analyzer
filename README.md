# 📸 EXIF Metadata Analyzer

Welcome to the **EXIF Metadata Analyzer**, a sleek and responsive web app built with **Tailwind CSS** and **JavaScript** that allows you to drag and drop image files and instantly view their EXIF metadata!

> Perfect for photographers, investigators, or just curious minds 🕵️‍♀️🖼️

---

## 🚀 Features

✨ **Drag and Drop Interface**  
🌓 **Light/Dark Mode** (automatic based on system preferences)  
🕵️ **EXIF Tag Viewer** – See all available metadata  
📅 **Date Consistency Checker** – Detect possible image modifications  
🛠️ **Software Info** – Know what app edited the image  
🖼️ **Image Preview** – View your uploaded photo  
📱 **Responsive Design** – Works great on mobile and desktop  
⚡ **No Back-end Required** – 100% client-side!

---

## 📁 Supported Formats

- `.JPG`, `.JPEG`
- `.PNG`
- `.TIFF`
- `.HEIC` (depends on browser support)

---

## 🧪 Live Demo

> You can test it instantly by [**opening the HTML file in your browser**](#).

---

## 📦 Getting Started

### 1. 📥 Clone the Repo

```bash
git clone https://github.com/yourusername/exif-analyzer.git
cd exif-analyzer
```
2. 🚀 Launch Locally
Just open the index.html file in your browser – no server needed!

🖼️ How it Works
Drop or select an image.

The EXIF data is extracted using exif-js.

Key metadata like original date, modification date, and software used is displayed.

All tags are listed in a table for full transparency.

If dates are inconsistent (e.g. modification after original), you'll see a warning ⚠️

🧠 Tech Stack
HTML5 + Tailwind CSS

Vanilla JavaScript

exif-js for parsing EXIF

🕶️ Dark Mode
Automatically switches based on your system!
You can also override with a CSS class if embedding in another site.

🐞 Known Limitations
Some browsers might not extract EXIF from .HEIC or .TIFF properly.

Web EXIF reading is limited by browser APIs – for deeper analysis, consider using exiftool.

🤝 Contributing
Pull requests are welcome! Feel free to fork and improve.
If you find any bugs or want new features, open an issue!

📜 License
MIT © Your Name

🙌 Acknowledgements
Tailwind CSS

Exif.js

Icons by Heroicons

Made with ❤️ to help you uncover the hidden data behind your images.

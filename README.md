# Interactive 3D Portfolio

An interactive 3D portfolio built using **Three.js** and **Blender**, showcasing my projects, skills, education, and personal information in a unique 3D environment.

---

## Demo

🔗 [Live Demo](https://rfannn.github.io/portfolio/)

---

## Features

* **Interactive 3D Room:** Explore a digital room in 3D using mouse or touch controls.
* **Blender-Created Models:** All objects in the scene (computer, chair, decor, etc.) were modeled in **Blender** and exported to GLTF/GLB.
* **Clickable Objects:** Click objects like the computer, chair, or items to trigger animations or open links.
* **Portfolio Popup:** Click Portfolio to open a detailed popup showcasing:

  * About Me
  * Skills
  * Work Experience
  * Education
  * Projects
  * Contact Information
* **Responsive Design:** Works across desktops, tablets, and mobile devices.
* **Smooth Animations:** Objects can jump, spin, and glow when interacted with using GSAP animations.

---

## Tech Stack

* [Three.js](https://threejs.org/) – 3D rendering and scene management
* [GLTFLoader](https://threejs.org/docs/#examples/en/loaders/GLTFLoader) – Loading Blender models exported as GLTF/GLB
* [Blender](https://www.blender.org/) – Modeling all 3D objects in the scene
* [GSAP](https://greensock.com/gsap/) – Animations for interactive objects
* HTML / CSS / JavaScript (ES Modules)

---

## Installation

Clone the repository:

```bash
git clone https://github.com/rfannn/portfolio.git
cd portfolio
```

Open `index.html` in a modern browser (Chrome, Edge, or Firefox). No backend required.

---

## Usage

* Use **mouse or touch** to orbit around the 3D room.
* Click **portfolio** to open the portfolio popup.
* Click other interactive objects to see animations or open external links (GitHub).

---

## Project Structure

```
portfolio/
│
├─ public/
│   ├─ portfolio_room.glb     # 3D model of the room
│   ├─ Thumbnail_Notely.png   # Project thumbnails
│   └─ ...
├─ style.css                  # Styles for the portfolio and popups
├─ main.js                    # Main Three.js and interaction script
└─ index.html                 # Portfolio landing page
```

---

## Contact

* **Telegram:** [@GNS\_Rfan](https://t.me/gns_rfan)
* **GitHub:** [Rfannn](https://github.com/rfannn)
* **LinkedIn:** [Erfan Nasehi Tabar](https://www.linkedin.com/in/erfan-nasehi-tabar-b35ab1325/)

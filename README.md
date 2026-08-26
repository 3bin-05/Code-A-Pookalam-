# Code A Pookalam

A procedurally generated **Pookalam** (traditional Keralan floral floor design) rendered entirely in code using HTML5 Canvas and a custom Turtle Graphics engine. The design features a detailed **Theyyam** ritual figure at its center — a tribute to the vibrant art forms of North Kerala.

> **Competition:** Code A Pookalam — organized by **TinkerHub SBCE**

---

## Demo

Open `index.html` in any modern browser. No build steps, no dependencies — just open and view.

Move your mouse over the design to see the Theyyam's eyes follow your cursor.

---

## Features

- **Procedural Pookalam** — A multi-layered floral design drawn entirely with code, no images or assets
- **Theyyam Figure** — A detailed Theyyam ritual mask and costume with crown, face, earrings, and body decorations
- **Interactive Eye Tracking** — The Theyyam's pupils follow the user's mouse cursor in real time
- **Animated Preloader** — A flower spinner with whimsical loading messages ("Gathering flowers...", "Invoking Theyyam spirits...")
- **Spin-Lock Animation** — A spring-eased green ring rotation that locks into place after loading
- **Responsive Layout** — Canvas scales to 90vmin, adapting to any viewport size
- **Zero Dependencies** — Pure vanilla JavaScript, HTML, and CSS with no frameworks or libraries

---

## How It Works

The Pookalam is drawn using a custom **Turtle Graphics** engine (`turtle.js`) that maps Python-style turtle commands to the HTML5 Canvas 2D API. The main drawing logic (`pookalam.js`) uses over 1,400 lines of hand-crafted coordinate geometry to render:

1. Outermost scallop ring with white petal fans
2. Triangle ring with interlocking colored triangles
3. Inner green border with cream circle and radial spokes
4. The Theyyam body with concentric arches, decorations, and chest plates
5. The Theyyam face with crown, eyes, earrings, and forehead ornaments

The static design is pre-rendered to an offscreen canvas for performance. Only the pupils are redrawn on each mouse movement.

---

## Project Structure

```
├── index.html      # Entry point — HTML shell with preloader and canvas setup
├── pookalam.js     # Main drawing logic — the full Pookalam design
├── turtle.js       # Custom Turtle Graphics engine (CanvasTurtle class)
└── style.css       # Styling — preloader, canvas layout, animations
```

---

## Technologies

| Technology        | Usage                                      |
| ----------------- | ------------------------------------------ |
| HTML5 Canvas      | Two canvas elements for rendering           |
| Vanilla JavaScript | All logic — no frameworks or libraries     |
| Canvas 2D API     | Direct usage for complex petal/fan shapes   |
| CSS3              | Transitions, animations, and responsive layout |

---

## Author

**Ebin Reji**

- Portfolio: [ebinreji.online](https://ebinreji.online)
- LinkedIn: [linkedin.com/in/ebin-reji](https://www.linkedin.com/in/ebin-reji/)

Portfolio Project — Built for the **Code A Pookalam** competition by **TinkerHub SBCE**.

---

## License

This project was created for the Code A Pookalam competition. Feel free to explore and learn from the code.

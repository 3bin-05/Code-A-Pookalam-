# Code A Pookalam

A procedurally generated **Pookalam** (traditional Keralan floral floor design) rendered entirely in code using HTML5 Canvas and a custom Turtle Graphics engine. The design features a detailed **Theyyam** ritual figure at its center — a tribute to the vibrant art forms of North Kerala.

> **Competition:** Code A Pookalam — organized by **TinkerHub SBCE**

🔗 **Repository:** [github.com/3bin-05/Code-A-Pookalam-](https://github.com/3bin-05/Code-A-Pookalam-)  
🌐 **Live Demo:** [ebin-pookalam.vercel.app](https://ebin-pookalam.vercel.app)

---

## Demo & Interactions

- **Interactive Eye Tracking:** Move your mouse cursor across the screen; the Theyyam's eyes will follow your cursor in real time.
- **Animated Preloader:** A custom CSS flower spinner dialogue sequence that guides you through the "gathering" and "blessing" of the courtyard before rendering.
- **Spin-Lock Animation:** An eases-in green ring rotation that locks into place after the preloader slides away.

---

## Technical Stack & Architecture

The application is built using a clean **HTML5, CSS3, and JavaScript (ES6)** stack, boasting **zero external dependencies or framework overhead**.

| Component / Tech | Usage & Implementation |
| :--- | :--- |
| **HTML5 Canvas** | Direct rendering of static Pookalam and overlay animations via 2D Context. |
| **Vanilla JavaScript** | Drives the custom math parser, interactive eye movement, and load sequencers. |
| **CSS3 Custom Variables & Grid** | Handles theme alignments, responsive ratios, and keyframe preloader animations. |

---

## Implementation Methods & Algorithmic Design

### 1. Custom JavaScript Turtle Graphics Engine (`turtle.js`)
To match the procedural drawing capabilities of Python's standard `turtle` library, a custom JS class `CanvasTurtle` was engineered. It translates standard turtle commands into native HTML5 Canvas 2D paths:
- Coordinates are mapped from turtle-space (origin `0,0` at the center, Y-axis going up) to HTML5 Canvas coordinates (origin at top-left, Y-axis going down).
- Supports commands like `forward()`, `backward()`, `left()`, `right()`, `circle()`, `begin_fill()`, `end_fill()`, and `pensize()`.

### 2. Symmetrical Geometry & Layering (`pookalam.js`)
The Pookalam layers are generated mathematically using concentric calculations:
- **Outermost Scallop Petals:** Dynamic distribution of circle divisions to draw curved fans using custom arc calculations.
- **Interlocking Triangle Band:** Programmatic placement of overlapping triangles around a central circle, alternating orientations (`draw_triangle_ring`).
- **Radial Spokes:** Dynamic coloring of geometric slices to divide the Theyyam base courtyard backdrop.

### 3. Theyyam Ritual Art Mask Construction
The Theyyam mask is constructed using structured coordinate arrays:
- **Kireedam (Crown):** Built using concentric green arcs, colored pentagons, and dashed white dot borders.
- **Facial Features:** Symmetrical placement of Theyyam eyes (`draw_eye`) using overlapping quadratic Bezier curve logic, and nose/mouth proportions matching traditional theyyam iconography.

### 4. Interactive Double-Canvas Redrawing
To keep performance highly optimized:
- The complex 1,400+ line static Pookalam graphics are drawn **once** onto an offscreen canvas and cached.
- A secondary foreground canvas (`#animCanvas`) is layered on top. When the user moves their mouse, only the small pupil coordinates are calculated and redrawn, avoiding high-latency repaints of the background design.

---

## Project Structure

```
├── index.html      # HTML entry point, Preloader overlay, & transition timers
├── pookalam.js     # Symmetrical drawing logic for Pookalam & Theyyam mask
├── turtle.js       # Custom CanvasTurtle graphics engine
└── style.css       # Core design tokens, layout styles, and animations
```

---

## Author

**Ebin Reji**

- **Portfolio:** [ebinreji.online](https://ebinreji.online)
- **LinkedIn:** [linkedin.com/in/ebin-reji](https://www.linkedin.com/in/ebin-reji/)
- **GitHub:** [github.com/3bin-05](https://github.com/3bin-05)

---

## License

This project was built for the **Code A Pookalam** competition. Feel free to explore, clone, and build upon it!

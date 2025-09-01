// Cursor component
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", (e) => {
    const posX = e.clientX;
    const posY = e.clientY;

    // Dot follows immediately
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    // Outline follows with a delay
    cursorOutline.animate(
        {
            left: `${posX}px`,
            top: `${posY}px`
        },
        { duration: 300, fill: "forwards" }
    );
});

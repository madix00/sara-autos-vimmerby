✅ 1. Fade + Slide (your current one)

Smooth and clean.

initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}

✅ 2. Scale Up (Zoom In)

Makes buttons feel more dynamic.

initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}

✅ 3. Spring Bounce

More playful and attention-grabbing.

initial={{ opacity: 0, y: 40 }}
animate={{ opacity: 1, y: 0 }}
transition={{
  delay: 0.3,
  type: "spring",
  stiffness: 120,
  damping: 12,
}}

✅ 4. Blur-in (very modern)

Looks sleek on hero sections.

initial={{ opacity: 0, filter: "blur(6px)" }}
animate={{ opacity: 1, filter: "blur(0px)" }}

✅ 5. Rotate-in (subtle)

Avoid big rotations for buttons — small angle feels classy.

initial={{ opacity: 0, rotate: -8 }}
animate={{ opacity: 1, rotate: 0 }}

✅ 6. Staggered appearance (controller)

If you want both buttons to appear in sequence:

const container = {
hidden: { opacity: 0 },
show: {
opacity: 1,
transition: {
staggerChildren: 0.2,
},
},
};

const item = {
hidden: { opacity: 0, y: 30 },
show: { opacity: 1, y: 0 },
};

✅ 7. Slide-in from the sides

Left:
initial={{ opacity: 0, x: -40 }}
animate={{ opacity: 1, x: 0 }}
Right:
initial={{ opacity: 0, x: 40 }}
animate={{ opacity: 1, x: 0 }}

✅ 8. Pop-in with overshoot

Very eye-catching but not too childish.
initial={{ opacity: 0, scale: 0.5 }}
animate={{
  opacity: 1,
  scale: 1,
  transition: {
    type: "spring",
    stiffness: 260,
    damping: 20,
  },
}}

✅ 9. Slight Tilt + Fade

Modern "UI card" effect.
initial={{ opacity: 0, rotateX: 20 }}
animate={{ opacity: 1, rotateX: 0 }}
transition={{ duration: 0.6 }}

For a professional car-selling website:
✅ Blur + Slide combo looks the most premium: Elastic Drop (bouncy)

Fun but can be subtle:
initial={{ opacity: 0, y: -60 }}
animate={{
  opacity: 1,
  y: 0,
  transition: { type: "spring", stiffness: 100, damping: 8 },
}}

✅ 11
For a professional car-selling website:
Blur + Slide combo looks the most premium:

initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
transition={{ duration: 0.8, ease: "easeOut" }}

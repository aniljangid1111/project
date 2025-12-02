import { animate } from "framer-motion";
import { useEffect, useRef } from "react"



export default function ParticlesBackground() {

    const canvaRef = useRef(null)

    useEffect(() => {
        const canva = canvaRef.current;
        const ctx = canva.getContext('2d');

        let particals = []
        const particalCounts = 50
        const colors = ['rgba(255,255,255,0.7)'];


        class particale {
            constructor() {
                this.x = Math.random()*canva.width;
                this.y = Math.random()*canva.height;
                this.radius = Math.random() * 2 + 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.shadowBlur = 10
                ctx.shadowColor = this.color
                ctx.fillStyle = this.color;
                ctx.fill();
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x < 0) this.x = canva.width;
                if (this.x > canva.width) this.x = 0;
                if (this.y < 0) this.y = canva.height;
                if (this.y > canva.height) this.y = 0;

                this.draw()
            }
        }

        function createParticals() {
            particals = [];
            for (let i = 0; i < particalCounts; i++) {
                particals.push(new particale());
            }
        }
        function handleSize() {
            canva.width = window.innerWidth;
            canva.height = window.innerHeight;
            createParticals();
        }
        handleSize();
        window.addEventListener('resize', handleSize);

        let animationId;

        function animation() {
            ctx.clearRect(0, 0, canva.width, canva.height)
            particals.forEach((p) => p.update());
            animationId = requestAnimationFrame(animation)
        }
        animation()

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', handleSize);

        }
    }, [])

    return (
        <canvas
            ref={canvaRef}
            className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        >
        </canvas>


    )
}
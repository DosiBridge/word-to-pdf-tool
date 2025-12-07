'use client';

import React, { useEffect, useRef } from 'react';

interface StarfieldProps {
    speed?: number;
    starCount?: number;
    starColor?: string;
}

const Starfield: React.FC<StarfieldProps> = ({
    speed = 0.05,
    starCount = 400,
    starColor = '255, 255, 255',
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;

        const setCanvasSize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        setCanvasSize();
        window.addEventListener('resize', setCanvasSize);

        // Star class
        class Star {
            x: number;
            y: number;
            z: number;
            pz: number;

            constructor() {
                this.x = Math.random() * width - width / 2;
                this.y = Math.random() * height - height / 2;
                this.z = Math.random() * width; // Initial depth
                this.pz = this.z;
            }

            update() {
                this.z = this.z - speed * 50; // Move closer
                if (this.z < 1) {
                    this.z = width;
                    this.x = Math.random() * width - width / 2;
                    this.y = Math.random() * height - height / 2;
                    this.pz = this.z;
                }
            }

            show() {
                if (!ctx) return;

                // 3D to 2D projection
                const sx = (this.x / this.z) * width + width / 2;
                const sy = (this.y / this.z) * height + height / 2;

                // Previous position for trail effect (optional, but good for speed)
                // const px = (this.x / this.pz) * width + width / 2;
                // const py = (this.y / this.pz) * height + height / 2;

                const r = (1 - this.z / width) * 2; // Size based on depth

                // Draw star
                ctx.beginPath();
                ctx.fillStyle = `rgba(${starColor}, ${1 - this.z / width})`;
                ctx.arc(sx, sy, r, 0, Math.PI * 2);
                ctx.fill();

                this.pz = this.z;
            }
        }

        const stars: Star[] = [];
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }

        let animationId: number;

        const animate = () => {
            ctx.fillStyle = 'rgba(5, 5, 5, 0.3)'; // Trail effect
            ctx.fillRect(0, 0, width, height);

            // Clear completely if no trails desired
            // ctx.clearRect(0, 0, width, height);

            stars.forEach((star) => {
                star.update();
                star.show();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', setCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, [speed, starCount, starColor]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.6 }} // Subtle overlay
        />
    );
};

export default Starfield;

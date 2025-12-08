import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
    className?: string;
    children: React.ReactNode;
    hoverEffect?: boolean;
}

const Card = ({ className, children, hoverEffect = true }: CardProps) => {
    return (
        <div
            className={twMerge(
                "bg-[#0f0f0f] border border-white/5 rounded-2xl p-6 transition-all duration-300",
                hoverEffect && "hover:border-blue-500/50 hover:bg-[#141414] hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-1 group",
                className
            )}
        >
            {children}
        </div>
    );
};

export default Card;

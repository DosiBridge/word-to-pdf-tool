import React from 'react';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    className?: string;
    children: React.ReactNode;
}

const Button = ({
    variant = 'primary',
    size = 'md',
    href,
    className,
    children,
    ...props
}: ButtonProps) => {
    const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
        primary: "bg-white text-black hover:bg-blue-50 hover:scale-105 hover:shadow-lg hover:shadow-white/20",
        secondary: "bg-white/10 text-white hover:bg-white/20 backdrop-blur-md border border-white/10",
        outline: "border-2 border-white/20 text-white hover:border-white hover:bg-white/5",
        ghost: "text-zinc-400 hover:text-white hover:bg-white/5"
    };

    const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg"
    };

    const classes = twMerge(baseStyles, variants[variant], sizes[size], className);

    if (href) {
        return (
            <Link href={href} className={classes}>
                {children}
            </Link>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;

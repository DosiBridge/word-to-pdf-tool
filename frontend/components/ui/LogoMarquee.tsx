'use client';

import React from 'react';

const logos = [
    { name: 'Company 1', color: 'bg-blue-500' },
    { name: 'Company 2', color: 'bg-purple-500' },
    { name: 'Company 3', color: 'bg-green-500' },
    { name: 'Company 4', color: 'bg-red-500' },
    { name: 'Company 5', color: 'bg-yellow-500' },
    { name: 'Company 6', color: 'bg-pink-500' },
];

export default function LogoMarquee() {
    return (
        <div className="w-full overflow-hidden py-12 border-y border-white/5 bg-white/[0.02] relative">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />

            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center mx-4">
                        {logos.map((logo, index) => (
                            <div key={index} className="mx-12 flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className={`w-8 h-8 rounded-lg ${logo.color} opacity-75`} />
                                <span className="text-xl font-bold text-zinc-400">{logo.name}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

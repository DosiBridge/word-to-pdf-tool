'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import 'aos/dist/aos.css';
import AOS from 'aos';

export default function AOSInit() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
    }, []);

    return null;
}

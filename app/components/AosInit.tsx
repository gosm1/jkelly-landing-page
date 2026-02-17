'use client';

import { useEffect } from 'react';
import aos from 'aos';
import 'aos/dist/aos.css';

export default function AosInit() {
    useEffect(() => {
        aos.init({
            once: true,
            offset: 100,
            duration: 800,
            easing: 'ease-out-cubic',
        });
    }, []);

    return null;
}

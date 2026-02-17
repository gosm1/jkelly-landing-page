'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Equal, X } from 'lucide-react'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import JkLogo from '@/assets/images/JkLogo.webp'

const menuItems = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Testimonials', href: '#testimonials' },
]

export const Header = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const pathname = usePathname()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Hide navbar on admin routes
    if (pathname.startsWith('/admin')) return null

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed left-0 w-full z-20 px-2">
                <div className={cn(
                    'mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12',
                    isScrolled && 'bg-white/5 max-w-4xl rounded-2xl backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] lg:px-5'
                )}>
                    <div className="relative flex items-center justify-between py-3">
                        {/* Left — Logo */}
                        <Link
                            href="/"
                            aria-label="home"
                            className="flex shrink-0 items-center">
                            <Image src={JkLogo} alt="Logo" width={120} height={40} className="h-8 w-auto" />
                        </Link>

                        {/* Center — Desktop nav links (absolutely centered) */}
                        <div className="absolute inset-0 m-auto hidden size-fit lg:flex items-center">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            className="text-gray-400 hover:text-white block duration-150 transition-colors">
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Right — CTA button (desktop) + Hamburger (mobile) */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="#contact"
                                className="hidden lg:inline-flex items-center gap-2 bg-[#027DD5] hover:bg-[#027DD5]/80 text-white text-sm font-medium px-5 py-2 rounded-full transition-all duration-200 shadow-[0_0_16px_rgba(2,125,213,0.3)]">
                                Start Your Website
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 block cursor-pointer p-2.5 lg:hidden">
                                <Equal className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu dropdown */}
                    <div className="bg-[#0e0e11]/95 backdrop-blur-xl in-data-[state=active]:block mb-6 hidden w-full rounded-3xl p-6 shadow-2xl shadow-black/40 lg:hidden">
                        <ul className="space-y-6 text-base">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setMenuState(false)}
                                        className="text-gray-400 hover:text-white block duration-150 transition-colors">
                                        <span>{item.name}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-6">
                            <Link
                                href="#contact"
                                onClick={() => setMenuState(false)}
                                className="block w-full text-center bg-[#027DD5] hover:bg-[#027DD5]/80 text-white text-sm font-medium px-5 py-3 rounded-full transition-all duration-200 shadow-[0_0_16px_rgba(2,125,213,0.3)]">
                                Start Your Website
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

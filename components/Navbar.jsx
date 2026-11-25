
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from "../public/logo.jpeg";
const links = [
    ['About', '/about'],
    ['Academics', '/academics'],
    ['Admissions', '/admissions'],
    ['Departments', '/departments'],
    ['Research', '/research'],
    ['Campus Life', '/campus-life'],
    ['News & Events', '/news']
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch('/api/auth/me')
            .then(r => r.json())
            .then(d => setUser(d.user))
            .catch(() => {});
    }, []);

    async function logout() {
        await fetch('/api/auth/user-logout', {
            method: 'POST'
        });

        setUser(null);
        location.href = '/';
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white backdrop-blur-xl">

            <div className="bg-navy-950 text-white">
                <div className="container-shell flex justify-between py-2 text-[11px] text-white/70">
                    <span>Welcome to the University of Swat</span>

                    <div className="hidden gap-5 sm:flex">
                        <Link href="/admissions">Admissions</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>
            </div>

            <nav className="container-shell flex min-h-[76px] items-center justify-between gap-4">

                {/* University Logo and Name */}
                <Link href="/" className="flex shrink-0 items-center gap-3">

                    <span className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl">
                        <Image
                            src={logo}
                            alt="University of Swat Logo"
                            width={50}
                            height={50}
                            className="h-13 w-13 object-contain"
                            priority
                        />
                    </span>

                    <span>
                        <b className="block font-serif text-lg text-navy-900">
                            University of Swat
                        </b>
                        <small className="text-[9px] font-bold uppercase tracking-[.18em] text-slate-500">
                            Khyber Pakhtunkhwa · Pakistan
                        </small>
                    </span>

                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-5 xl:flex">
                    {links.map(([t, h]) => (
                        <Link
                            key={h}
                            href={h}
                            className="text-[12px] font-semibold text-slate-700 hover:text-gold-600"
                        >
                            {t}
                        </Link>
                    ))}
                </div>

                {/* Desktop Authentication */}
                <div className="hidden items-center gap-2 lg:flex">
                    {user ? (
                        <>
                            <span className="max-w-24 truncate text-xs text-slate-500">
                                Hi, {user.name.split(' ')[0]}
                            </span>

                            <button
                                onClick={logout}
                                className="rounded-full border border-navy-900 px-4 py-3 text-[10px] font-bold uppercase text-navy-900"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/login"
                                className="rounded-full border border-navy-900 px-4 py-3 text-[10px] font-bold uppercase text-navy-900"
                            >
                                Login
                            </Link>

                            <Link
                                href="/signup"
                                className="rounded-full bg-gold-500 px-4 py-3 text-[10px] font-bold uppercase text-white"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <button
                    aria-label="Toggle navigation"
                    onClick={() => setOpen(!open)}
                    className="p-2 text-navy-900 xl:hidden"
                >
                    {open ? <X /> : <Menu />}
                </button>

            </nav>

            {/* Mobile Navigation */}
            {open && (
                <div className="border-t bg-white px-5 py-4 shadow-lg xl:hidden">

                    {links.map(([t, h]) => (
                        <Link
                            key={h}
                            onClick={() => setOpen(false)}
                            href={h}
                            className="block py-3 text-sm font-semibold"
                        >
                            {t}
                        </Link>
                    ))}

                    <div className="flex gap-3 py-3">
                        {user ? (
                            <button
                                onClick={logout}
                                className="text-sm font-bold"
                            >
                                Logout
                            </button>
                        ) : (
                            <>
                                <Link href="/login">Login</Link>
                                <Link href="/signup">Sign up</Link>
                            </>
                        )}

                        <Link href="/admin">Admin</Link>
                    </div>

                </div>
            )}

        </header>
    );
}

import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen w-full bg-cream">
            {/* Left Side: Brand Panel */}
            <div className="relative hidden w-0 flex-1 lg:block">
                <img
                    className="absolute inset-0 h-full w-full object-cover"
                    src="/images/auth-vibe.png"
                    alt="Lolo Luxury Bags"
                />
                <div className="absolute inset-0 bg-burgundy/20 mix-blend-multiply" />
                <div className="absolute inset-0 flex flex-col justify-between p-12 text-white">
                    <Link href="/" className="inline-flex items-center space-x-2">
                        <span className="font-serif text-3xl font-bold Tracking-tight">LOLO</span>
                    </Link>
                    
                    <div className="max-w-md space-y-4">
                        <blockquote className="space-y-2">
                            <p className="font-serif text-3xl leading-snug italic">
                                "Carry elegance with you, wherever you go."
                            </p>
                            <footer className="text-sm font-medium tracking-wide uppercase opacity-80">— Lolo Brand Est. 2024</footer>
                        </blockquote>
                    </div>
                </div>
            </div>

            {/* Right Side: Auth Forms */}
            <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:flex-none lg:px-20 xl:px-24 bg-white shadow-2xl z-10">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                    <div className="mb-8 lg:hidden">
                         <Link href="/" className="inline-flex items-center space-x-2 text-burgundy">
                            <span className="font-serif text-3xl font-bold tracking-tight">LOLO</span>
                        </Link>
                    </div>
                    
                    <main className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}

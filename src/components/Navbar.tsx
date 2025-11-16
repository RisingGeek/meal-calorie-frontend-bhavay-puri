'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { LogOut, Moon, Sun, Menu, LayoutDashboard, Search, Calendar, Clock, LogOutIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { token, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/calories', label: 'Calorie Tracker', icon: Search },
    { href: '/meal-plans', label: 'Meal Plans', icon: Calendar },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={token ? '/dashboard' : '/'} className="flex items-center gap-2 font-bold text-lg">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg">
            <Image src="/cal-scope.webp" width={80} height={80} alt="CalScope" priority />
          </div>
          <span className="text-xl">CalScope</span>
        </Link>

        {/* Desktop Navigation */}
        {token && (
          <div className="hidden md:flex md:items-center md:gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.href}
                  asChild
                  variant={isActive ? 'secondary' : 'ghost'}
                  className={cn(
                    'gap-2',
                    isActive && 'bg-secondary'
                  )}
                >
                  <Link href={link.href}>
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="cursor-pointer"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>

          {/* Desktop Logout */}
          {token && (
            <Button
              variant="ghost"
              onClick={handleLogout}
              aria-label="Logout"
              className="hidden md:flex cursor-pointer ml-4"
            >
              <LogOutIcon />
              Logout
            </Button>
          )}

          {token && (
            <>
              {/* Mobile Menu */}
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetTitle></SheetTitle>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col gap-4 mt-8">

                    {/* Mobile Nav Links */}
                    <div className="flex flex-col gap-1">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                          <Button
                            key={link.href}
                            asChild
                            variant={isActive ? 'secondary' : 'ghost'}
                            className="justify-start gap-2"
                            onClick={() => setMobileOpen(false)}
                          >
                            <Link href={link.href}>
                              <Icon className="h-4 w-4" />
                              {link.label}
                            </Link>
                          </Button>
                        );
                      })}
                    </div>

                    {/* Mobile Logout */}
                    <Button
                      variant="destructive"
                      className="mt-4 gap-2"
                      onClick={() => {
                        handleLogout();
                        setMobileOpen(false);
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
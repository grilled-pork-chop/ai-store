import React from "react";
import { Link } from "@tanstack/react-router";
import { useTheme } from "@/hooks";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SunMedium, MoonStar, CirclePlus, Brain, Menu } from "lucide-react";

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 py-2 sm:px-4">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <Brain size={22} />
          <span className="inline">AI Hub</span>
        </Link>

        {/* Desktop actions */}
        <nav className="hidden sm:flex items-center gap-3">
          <Link to="/add-project">
            <Button size="sm" className="flex items-center gap-1">
              <CirclePlus size={16} />
              Add Project
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <MoonStar size={18} /> : <SunMedium size={18} />}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button aria-label="Open profile menu">
                <Avatar>
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild><a href="#">Profile</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="#">Settings</a></DropdownMenuItem>
              <DropdownMenuItem asChild><a href="#">Sign out</a></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>

        {/* Mobile menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="sm:hidden">
              <Menu size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link to="/add-project">Add Project</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={toggleTheme}>
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild><a href="#">Profile</a></DropdownMenuItem>
            <DropdownMenuItem asChild><a href="#">Settings</a></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;

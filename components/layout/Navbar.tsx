"use client";

import Link from "next/link";
import Image from "next/image";
import { navLinks, navLinksExternal } from "@/lib/data";
import { useEffect, useState } from "react";
import NavMenu from "./NavMenu";
import MenuToggle from "../MenuToggle";
import { Menu } from "lucide-react";

export const Navbar = ({ external }: { external?: boolean }) => {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 w-full z-50 h-20 transition-all duration-300
        ${scrolled ? "backdrop-blur-md bg-background/10" : ""}
      `}
    >
      <nav className="h-full w-full flex items-center justify-between px-6 md:px-12">
        <Link className="relative h-16 w-56" href={"/"}>
          <Image
            src={"/ultramadness-logo.png"}
            alt="Ultramadness Logo"
            fill
            objectFit="contain"
          />
        </Link>

        <div className="flex items-center justify-center gap-8">
          <div className="items-center gap-8 hidden lg:flex">
            {external
              ? navLinksExternal.map((link) => (
                  <Link className="text-lg" href={link.id} key={link.id}>
                    {link.title}
                  </Link>
                ))
              : navLinks.map((link) => (
                  <Link className="text-lg" href={link.id} key={link.id}>
                    {link.title}
                  </Link>
                ))}
          </div>

          <Link
            className="hidden lg:flex relative overflow-hidden group px-5 py-1.5 bg-primary font-medium text-lg text-background rounded-xs"
            href={external ? "/#contacto" : "#contacto"}
          >
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            Registrate
          </Link>

          <div className="flex flex-col items-center justify-center lg:hidden">
            <MenuToggle button={toggleMenu} icon={<Menu size={28} />} />
          </div>
        </div>
      </nav>

      <NavMenu
        external={external}
        openMenu={openMenu}
        toggleMenu={toggleMenu}
      />
    </header>
  );
};

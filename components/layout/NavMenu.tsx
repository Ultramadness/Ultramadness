"use client";

import Link from "next/link";
import MenuToggle from "../MenuToggle";
import LinksAnimation from "../LinksAnimation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { navLinksExternal } from "@/lib/data";

const NavMenu = ({
  openMenu,
  toggleMenu,
  external,
}: {
  external?: boolean;
  openMenu: boolean;
  toggleMenu: () => void;
}) => {
  const [showContainer, setShowContainer] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    if (openMenu) {
      setShowContainer(true);
      setTimeout(() => {
        setShowLinks(true);
      }, 300);
    } else {
      setShowLinks(false);
      setTimeout(() => {
        setShowContainer(false);
      }, 1000);
    }
  }, [openMenu]);

  const handleClose = () => {
    setShowLinks(false);
    setTimeout(() => {
      toggleMenu();
    }, 200);
  };

  return (
    <div
      className={`fixed z-50 ${
        showContainer ? "top-0" : "top-[-1000px]"
      } left-0 h-screen w-full bg-neutral-950 transition-all duration-900 ease-[cubic-bezier(0.76, 0, 0.24, 1)]`}
    >
      <nav className="w-full shadow-md">
        <div className="px-6 md:px-12 flex justify-between items-center h-20">
          <Link className="relative h-16 w-56" href={"/"}>
            <Image
              src={"/ultramadness-logo.png"}
              alt="Ultramadness Logo"
              fill
              className="object-contain"
            />
          </Link>

          <MenuToggle button={handleClose} icon={<X />} />
        </div>
      </nav>
      <ul className="max-w-[1540px] mx-auto px-6 md:px-12 py-8 flex flex-col gap-7">
        {external
          ? navLinksExternal.map((item, index) => (
              <LinksAnimation
                link={item.id}
                key={index}
                open={showLinks}
                text={item.title}
                delay={index * 150}
                onClick={handleClose}
              />
            ))
          : navLinksExternal.map((item, index) => (
              <LinksAnimation
                link={item.id}
                key={index}
                open={showLinks}
                text={item.title}
                delay={index * 150}
                onClick={handleClose}
              />
            ))}
      </ul>
    </div>
  );
};

export default NavMenu;

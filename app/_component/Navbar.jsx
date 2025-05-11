"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const NavData = [
    { label: "Archive", href: "/archive" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="fixed top-5 right-10 left-10 flex justify-between items-center uppercase text-[0.6rem] md:text-sm z-10 font-semibold ">
      <div>
        <Link href={"/"}>DirectTheDirector</Link>
      </div>

      <div>
        <ul className="flex gap-4 ">
          {NavData.map((item, i) => (
            <NavItems label={item.label} href={item.href} key={i} />
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

function NavItems({ label, href }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="relative">
      <Link href={href}>
        {label}
        {isActive ? "!" : ""}
      </Link>
    </li>
  );
}

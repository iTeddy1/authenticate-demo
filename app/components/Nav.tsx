"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "../styles/layout.module.css";

export const Nav = () => {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <Link
        className={`${styles.link} ${pathname === "/" ? styles.active : ""}`}
        href="/"
      >
        Home
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/signin" ? styles.active : ""
        }`}
        href="/signin"
      >
        Sign in
      </Link>
      <Link
        className={`${styles.link} ${
          pathname === "/details" ? styles.active : ""
        }`}
        href="/details"
      >
        Details
      </Link>
    </nav>
  );
};

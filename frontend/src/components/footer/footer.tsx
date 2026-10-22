"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa";

import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Mail,
  MapPin,
  UtensilsCrossed,
} from "lucide-react";

import styles from "./Footer.module.css";

const exploreLinks = [
  { label: "Home", href: "/", id: 1 },
  { label: "Explore Food", href: "/", id: 2 },
  { label: "About Us", href: "/about", id: 3 },
];

const accountLinks = [
  { label: "Create Account", href: "/user-register" },
  { label: "Sign In", href: "/user-login" },
  { label: "Become a Partner", href: "/partner-register" },
  { label: "Partner Login", href: "/partner-login" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    Icon: FaInstagram,
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    Icon: FaFacebookF,
  },
  {
    label: "GitHub",
    href: "https://github.com",
    Icon: FaGithub,
  },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />

      <div className={styles.container}>
        {/* TOP CTA */}
        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaContent}>
            <span className={styles.eyebrow}>
              <span className={styles.liveDot} />
              THE FOODVERSE EXPERIENCE
            </span>

            <h2>
              Good food brings
              <br />
              <span>people together.</span>
            </h2>

            <p>
              Discover something delicious, explore new places, and make every
              bite memorable.
            </p>
          </div>

          <Link href="/explore" className={styles.ctaButton}>
            Explore Food
            <span>
              <ArrowUpRight size={19} />
            </span>
          </Link>

          <div className={styles.ctaDecoration}>
            <UtensilsCrossed size={150} strokeWidth={0.5} />
          </div>
        </motion.div>

        {/* MAIN FOOTER */}
        <div className={styles.main}>
          {/* BRAND */}
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logo}>
              <span className={styles.logoIcon}>
                <UtensilsCrossed size={21} strokeWidth={2.2} />
              </span>

              <span>
                food
                <span className={styles.logoAccent}>verse</span>
                <span className={styles.logoDot}>.</span>
              </span>
            </Link>

            <p className={styles.brandDescription}>
              A place where food lovers discover incredible flavours, hidden
              gems, and their next favourite food experience.
            </p>

            {/* SOCIAL LINKS */}
            <div className={styles.socials}>
              {socialLinks.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={styles.socialLink}
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* EXPLORE LINKS */}
          <div className={styles.linkColumn}>
            <h3>Explore</h3>

            <nav aria-label="Explore links">
              {exploreLinks.map((link) => (
                <Link key={link.id} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ACCOUNT LINKS */}
          <div className={styles.linkColumn}>
            <h3>Get Started</h3>

            <nav aria-label="Account links">
              {accountLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* CONTACT */}
          <div className={styles.contactColumn}>
            <h3>Connect</h3>

            <p>
              Have a question or want to partner with us? We'd love to hear from
              you.
            </p>

            <Link href="/contact" className={styles.contactLink}>
              <Mail size={17} />
              Contact Us
              <ArrowRight size={15} />
            </Link>

            <div className={styles.location}>
              <MapPin size={15} />

              <span>Made with passion for food lovers.</span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className={styles.bottom}>
          <p>© 2026 Foodverse. All rights reserved.</p>

          <p className={styles.madeWith}>
            Made with <Heart size={13} fill="currentColor" /> for food lovers
          </p>

          <div className={styles.legal}>
            <Link href="/privacy">Privacy Policy</Link>

            <span />

            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>

        {/* WATERMARK */}
        <div className={styles.watermark} aria-hidden="true">
          FOODVERSE
        </div>
      </div>
    </footer>
  );
}

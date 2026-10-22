"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

import styles from "./Login.module.css";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "easeOut" as const },
  },
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // UI only. Login logic baad mein khud likhna.
  };

  return (
    <main className={styles.page}>
      <div className={styles.backgroundGlow} />
      <div className={styles.gridPattern} />

      <motion.div
        className={styles.layout}
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        {/* LEFT: BRANDING */}

        <motion.section className={styles.hero} variants={itemVariants}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <UtensilsCrossed size={22} strokeWidth={2.2} />
            </span>

            <span>
              food<span className={styles.logoAccent}>verse</span>
              <span className={styles.logoDot}>.</span>
            </span>
          </Link>

          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.liveDot} />
              YOUR NEXT FOOD OBSESSION
            </div>

            <h1 className={styles.heroTitle}>
              Good food.
              <br />
              <span className={styles.titleAccent}>Great stories.</span>
              <br />
              One place.
            </h1>

            <p className={styles.heroDescription}>
              Your favourite flavours are waiting. Sign in, discover local
              favourites, and find your next unforgettable bite.
            </p>

            <motion.div
              className={styles.featureCard}
              whileHover={{
                y: -5,
                borderColor: "rgba(117,240,192,0.3)",
              }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.featureTop}>
                <div className={styles.featureIcon}>
                  <Sparkles size={19} />
                </div>

                <span className={styles.featureLabel}>
                  THE FOODVERSE EXPERIENCE
                </span>

                <ArrowDownRight size={19} className={styles.featureArrow} />
              </div>

              <div className={styles.featureTitle}>
                Your cravings,
                <br />
                your discoveries.
              </div>

              <div className={styles.featureBottom}>
                <div className={styles.avatarStack}>
                  <span>F</span>
                  <span>V</span>
                  <span>+</span>
                </div>

                <p>Good food brings us together.</p>
              </div>
            </motion.div>

            <div className={styles.heroFooter}>
              <span>02 / WELCOME BACK</span>
              <span className={styles.footerLine} />
              <span>MADE FOR FOOD LOVERS</span>
            </div>
          </div>
        </motion.section>

        {/* RIGHT: LOGIN FORM */}

        <motion.section className={styles.formSection} variants={itemVariants}>
          <div className={styles.formHeader}>
            <span className={styles.formStep}>WELCOME BACK</span>

            <span className={styles.secureLabel}>
              <LockKeyhole size={13} />
              SECURE SIGN IN
            </span>
          </div>

          <div className={styles.formHeading}>
            <h2>
              Good to see you<span>.</span>
            </h2>

            <p>
              Sign in to your account and get back to discovering great food.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="email">Email / Username </label>

              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />

                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="manomughalll / you@example.com"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
              </div>

              <div className={styles.inputWrapper}>
                <LockKeyhole size={18} className={styles.inputIcon} />

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>
              <span>Sign in to your account</span>

              <span className={styles.buttonArrow}>
                <ArrowRight size={19} />
              </span>
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <p>YOUR JOURNEY CONTINUES</p>
            <span />
          </div>

          <p className={styles.loginText}>
            New to Foodverse?{" "}
            <Link href="/user-register" className={styles.loginLink}>
              Create account <ArrowRight size={14} />
            </Link>
          </p>

          <p className={styles.terms}>
            By signing in, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </motion.section>
      </motion.div>

      <footer className={styles.pageFooter}>
        <span>© 2026 FOODVERSE</span>
        <span>GOOD TASTE STARTS HERE.</span>
      </footer>
    </main>
  );
}

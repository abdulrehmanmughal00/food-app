
"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Store,
  UtensilsCrossed,
  UserRound,
} from "lucide-react";
import styles from "./PartnerLogin.module.css";

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
    transition: {
      duration: 0.65,
      ease: "easeOut" as const,
    },
  },
};

export default function PartnerLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const data = {
      identifier: String(formData.get("identifier") || "").trim(),
      password: String(formData.get("password") || ""),
      rememberMe,
    };

    // Backend API integration yahan karna.
    // Password ko console mein log mat karna.
    console.log("Partner login identifier:", data.identifier);
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
        {/* LEFT HERO */}
        <motion.section
          className={styles.hero}
          variants={itemVariants}
        >
          <Link href="/" className={styles.logo}>
            <span className={styles.logoIcon}>
              <UtensilsCrossed size={22} strokeWidth={2.2} />
            </span>
            <span>
              food
              <span className={styles.logoAccent}>verse</span>
              <span className={styles.logoDot}>.</span>
            </span>
          </Link>

          <div className={styles.heroContent}>
            <div className={styles.eyebrow}>
              <span className={styles.liveDot} />
              YOUR PARTNER SPACE
            </div>

            <h1 className={styles.heroTitle}>
              Welcome back.
              <br />
              <span className={styles.titleAccent}>
                Let's grow
              </span>
              <br />
              together.
            </h1>

            <p className={styles.heroDescription}>
              Your business journey continues here.
              Sign in to your Foodverse partner account
              and get back to what you do best.
            </p>

            <motion.div
              className={styles.featureCard}
              whileHover={{
                y: -5,
                borderColor: "rgba(117, 240, 192, 0.35)",
              }}
              transition={{ duration: 0.25 }}
            >
              <div className={styles.featureTop}>
                <div className={styles.featureIcon}>
                  <Sparkles size={19} />
                </div>

                <span className={styles.featureLabel}>
                  YOUR PARTNER JOURNEY
                </span>

                <ArrowDownRight
                  size={19}
                  className={styles.featureArrow}
                />
              </div>

              <div className={styles.featureTitle}>
                Your passion.
                <br />
                Our platform.
              </div>

              <div className={styles.featureBottom}>
                <div className={styles.featureAvatar}>
                  <Store size={18} />
                </div>

                <p>
                  Everything your business needs,
                  in one place.
                </p>
              </div>
            </motion.div>

            <div className={styles.heroFooter}>
              <span>02 / SIGN IN</span>
              <span className={styles.footerLine} />
              <span>FOODVERSE PARTNERS</span>
            </div>
          </div>
        </motion.section>

        {/* RIGHT LOGIN FORM */}
        <motion.section
          className={styles.formSection}
          variants={itemVariants}
        >
          <div className={styles.formHeader}>
            <span className={styles.formStep}>
              PARTNER ACCESS
            </span>

            <span className={styles.secureLabel}>
              <ShieldCheck size={14} />
              SECURE LOGIN
            </span>
          </div>

          <div className={styles.formHeading}>
            <h2>
              Partner sign in<span>.</span>
            </h2>
            <p>
              Enter your credentials to access
              your business account.
            </p>
          </div>

          <form
            className={styles.form}
            onSubmit={handleSubmit}
          >
            {/* EMAIL OR CONTACT */}
            <div className={styles.field}>
              <label htmlFor="identifier">
                Email or contact number
              </label>

              <div className={styles.inputWrapper}>
                <UserRound
                  size={18}
                  className={styles.inputIcon}
                />

                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="business@example.com / +92 300 1234567"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="password">
                  Password
                </label>

                <Link
                  href="/partner-forgot-password"
                  className={styles.forgotLink}
                >
                  Forgot password?
                </Link>
              </div>

              <div className={styles.inputWrapper}>
                <LockKeyhole
                  size={18}
                  className={styles.inputIcon}
                />

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
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  aria-pressed={showPassword}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className={styles.rememberRow}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) =>
                  setRememberMe(e.target.checked)
                }
              />
              <span>Remember me</span>
            </label>

            <button
              type="submit"
              className={styles.submitButton}
            >
              <span>Sign in to your account</span>

              <span className={styles.buttonArrow}>
                <ArrowRight size={19} />
              </span>
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <p>YOUR BUSINESS, YOUR SPACE</p>
            <span />
          </div>

          <p className={styles.registerText}>
            New to Foodverse?{" "}
            <Link
              href="/partner-register"
              className={styles.registerLink}
            >
              Become a partner
              <ArrowRight size={14} />
            </Link>
          </p>

          <p className={styles.terms}>
            By signing in, you agree to our{" "}
            <Link href="/terms">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy">
              Privacy Policy
            </Link>
            .
          </p>
        </motion.section>
      </motion.div>

      <footer className={styles.pageFooter}>
        <span>© 2026 FOODVERSE</span>
        <span>GROW YOUR BUSINESS WITH US.</span>
      </footer>
    </main>
  );
}

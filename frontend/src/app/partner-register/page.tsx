
"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Store,
  UtensilsCrossed,
} from "lucide-react";
import styles from "./PartnerRegister.module.css";

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

export default function PartnerRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);



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
        {/* LEFT HERO SECTION */}
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
              FOODVERSE FOR BUSINESS
            </div>

            <h1 className={styles.heroTitle}>
              Your business.
              <br />
              <span className={styles.titleAccent}>
                More visibility.
              </span>
              <br />
              More growth.
            </h1>

            <p className={styles.heroDescription}>
              Bring your food business into the spotlight.
              Join Foodverse and connect with people who
              are looking for their next favourite bite.
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
                  THE PARTNER EXPERIENCE
                </span>

                <ArrowDownRight
                  size={19}
                  className={styles.featureArrow}
                />
              </div>

              <div className={styles.featureTitle}>
                Great food deserves
                <br />
                to be discovered.
              </div>

              <div className={styles.featureBottom}>
                <div className={styles.avatarStack}>
                  <span>
                    <Store size={15} />
                  </span>
                  <span>
                    <Building2 size={15} />
                  </span>
                  <span>+</span>
                </div>

                <p>
                  Built for passionate food businesses.
                </p>
              </div>
            </motion.div>

            <div className={styles.heroFooter}>
              <span>01 / PARTNER</span>
              <span className={styles.footerLine} />
              <span>GROW WITH FOODVERSE</span>
            </div>
          </div>
        </motion.section>

        {/* RIGHT REGISTER FORM */}
        <motion.section
          className={styles.formSection}
          variants={itemVariants}
        >
          <div className={styles.formHeader}>
            <span className={styles.formStep}>
              BECOME A PARTNER
            </span>

            <span className={styles.secureLabel}>
              <ShieldCheck size={14} />
              SECURE SIGN UP
            </span>
          </div>

          <div className={styles.formHeading}>
            <h2>
              Partner with us<span>.</span>
            </h2>

            <p>
              Tell us about your business and start your
              journey with Foodverse.
            </p>
          </div>

          <form
            className={styles.form}
          >
            {/* BUSINESS NAME */}
            <div className={styles.field}>
              <label htmlFor="businessName">
                Business name
              </label>

              <div className={styles.inputWrapper}>
                <Store
                  size={18}
                  className={styles.inputIcon}
                />

                <input
                  id="businessName"
                  name="businessName"
                  type="text"
                  placeholder="Enter your business name"
                  autoComplete="organization"
                  required
                />
              </div>
            </div>

            {/* EMAIL */}
            <div className={styles.field}>
              <label htmlFor="email">
                Business email
              </label>

              <div className={styles.inputWrapper}>
                <Mail
                  size={18}
                  className={styles.inputIcon}
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="business@example.com"
                  autoComplete="email"
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

                <span>Keep it secure</span>
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
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  minLength={7}
                  required
                />

                <button
                  type="button"
                  className={styles.passwordToggle}
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.passwordHint}>
              <Check size={14} />
              <span>
                Use at least 7 characters.
              </span>
            </div>

            {/* CONTACT */}
            <div className={styles.field}>
              <label htmlFor="contact">
                Contact number
              </label>

              <div className={styles.inputWrapper}>
                <Phone
                  size={18}
                  className={styles.inputIcon}
                />

                <input
                  id="contact"
                  name="contact"
                  type="tel"
                  placeholder="+92 300 1234567"
                  autoComplete="tel"
                  required
                />
              </div>
            </div>

            {/* ADDRESS */}
            <div className={styles.field}>
              <label htmlFor="address">
                Business address
              </label>

              <div className={`${styles.inputWrapper} ${styles.textareaWrapper}`}>
                <MapPin
                  size={18}
                  className={styles.inputIcon}
                />

                <textarea
                  id="address"
                  name="address"
                  placeholder="Enter your complete business address"
                  autoComplete="street-address"
                  rows={3}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
            >
              <span>Create partner account</span>

              <span className={styles.buttonArrow}>
                <ArrowRight size={19} />
              </span>
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <p>YOUR BUSINESS JOURNEY STARTS HERE</p>
            <span />
          </div>

          <p className={styles.loginText}>
            Already a partner?{" "}
            <Link
              href="/login"
              className={styles.loginLink}
            >
              Sign in
              <ArrowRight size={14} />
            </Link>
          </p>

          <p className={styles.terms}>
            By creating an account, you agree to our{" "}
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
        <span>GREAT BUSINESSES START HERE.</span>
      </footer>
    </main>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  LockKeyhole,
  Mail,
  Sparkles,
  UserRound,
  UtensilsCrossed,
  LoaderCircle,
} from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import styles from "./Register.module.css";
import { useState } from "react";

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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    if (!username.trim() || !email.trim() || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/user/register",
        {
          email: email.trim(),
          username: username.trim(),
          password,
        },
        {
          withCredentials: true,
        },
      );

      toast.success(response.data?.message || "Account created successfully!");

      setEmail("");
      setUsername("");
      setPassword("");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        if (typeof message === "string" && message.trim()) {
          toast.error(message);
        } else if (!error.response) {
          toast.error("Unable to connect to server. Please try again.");
        } else {
          toast.error("Registration failed. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
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
              food
              <span className={styles.logoAccent}>verse</span>
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
              Discover incredible food, explore local favourites, and find your
              next unforgettable bite.
            </p>

            <motion.div
              className={styles.featureCard}
              whileHover={{
                y: -5,
                borderColor: "rgba(199,243,107,0.3)",
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

                <p>Made for people who love good food.</p>
              </div>
            </motion.div>

            <div className={styles.heroFooter}>
              <span>01 / DISCOVER</span>
              <span className={styles.footerLine} />
              <span>MADE FOR FOOD LOVERS</span>
            </div>
          </div>
        </motion.section>

        {/* RIGHT: REGISTER FORM */}

        <motion.section className={styles.formSection} variants={itemVariants}>
          <div className={styles.formHeader}>
            <span className={styles.formStep}>GET STARTED</span>

            <span className={styles.secureLabel}>
              <LockKeyhole size={13} />
              SECURE SIGN UP
            </span>
          </div>

          <div className={styles.formHeading}>
            <h2>
              Create your account<span>.</span>
            </h2>

            <p>Join the community. Your next favourite meal is waiting.</p>
          </div>

          <form className={styles.form} onSubmit={submitHandler}>
            {/* USERNAME */}

            <div className={styles.field}>
              <label htmlFor="username">Username</label>

              <div className={styles.inputWrapper}>
                <UserRound size={18} className={styles.inputIcon} />

                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* EMAIL */}

            <div className={styles.field}>
              <label htmlFor="email">Email address</label>

              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />

                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div className={styles.field}>
              <div className={styles.labelRow}>
                <label htmlFor="password">Password</label>
                <span>Keep it secure</span>
              </div>

              <div className={styles.inputWrapper}>
                <LockKeyhole size={18} className={styles.inputIcon} />

                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.passwordHint}>
              <Check size={14} />
              <span>Use at least 8 characters.</span>
            </div>

            {/* SUBMIT BUTTON */}

            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              <span>{loading ? "Creating account..." : "Create account"}</span>

              <span className={styles.buttonArrow}>
                {loading ? (
                  <LoaderCircle size={19} className={styles.loadingIcon} />
                ) : (
                  <ArrowRight size={19} />
                )}
              </span>
            </button>
          </form>

          <div className={styles.divider}>
            <span />
            <p>YOUR JOURNEY STARTS HERE</p>
            <span />
          </div>

          <p className={styles.loginText}>
            Already have an account?{" "}
            <Link href="/user-login" className={styles.loginLink}>
              Sign in <ArrowRight size={14} />
            </Link>
          </p>

          <p className={styles.terms}>
            By creating an account, you agree to our{" "}
            <Link href="/terms">Terms of Service</Link> and{" "}
            <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </motion.section>
      </motion.div>
    </main>
  );
}

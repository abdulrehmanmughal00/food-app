"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ArrowUpRight,
  Compass,
  Home as HomeIcon,
  Play,
  Plus,
  Search,
  UtensilsCrossed,
  UserRound,
  Volume2,
  VolumeX,
} from "lucide-react";

import styles from "./Home.module.css";

interface FoodReel {
  _id: string;
  title: string;
  video: string;
  description: string;
}

const API_URL = "http://localhost:4000/api/food/";

const navigation = [
  { label: "Home", href: "/", Icon: HomeIcon },
  { label: "Explore", href: "/explore", Icon: Compass },
  { label: "Search", href: "/search", Icon: Search },
  { label: "Profile", href: "/profile", Icon: UserRound },
];

export default function Home() {
  const [reels, setReels] = useState<FoodReel[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // FETCH FOOD REELS FROM BACKEND
  useEffect(() => {
    const controller = new AbortController();

    const fetchReels = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(API_URL, {
          signal: controller.signal,
          withCredentials: true,
        });

        const foods: FoodReel[] = response.data.foodItem;

        setReels(foods);
        setActiveIndex(0);
      } catch (err) {
        if (axios.isCancel(err)) return;

        console.error("Error fetching food reels:", err);
        setError("Unable to load food reels. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchReels();

    return () => controller.abort();
  }, []);

  // DETECT ACTIVE REEL
  useEffect(() => {
    const container = scrollContainerRef.current;

    if (!container || reels.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const index = Number(visible[0].target.getAttribute("data-index"));

          setActiveIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.5, 0.75, 0.9],
      },
    );

    const sections = container.querySelectorAll("[data-index]");

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [reels]);

  // ONLY ACTIVE VIDEO PLAYS
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex && isPlaying) {
        video.play().catch(() => {
          // Browser autoplay restriction.
        });
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isPlaying, reels]);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <main className={styles.page}>
      {/* DESKTOP SIDEBAR */}
      <aside className={styles.sidebar}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>
            <UtensilsCrossed size={22} />
          </span>

          <span>
            food<span>verse</span>
            <b>.</b>
          </span>
        </Link>

        <nav className={styles.sideNav}>
          {navigation.map(({ label, href, Icon }, index) => (
            <Link
              key={label}
              href={href}
              className={`${styles.navItem} ${
                index === 0 ? styles.activeNav : ""
              }`}
            >
              <Icon size={21} strokeWidth={1.9} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>

        <div className={styles.sidebarBottom}>
          <Link href="/partner-register" className={styles.partnerCard}>
            <span className={styles.partnerIcon}>
              <Plus size={18} />
            </span>

            <span>
              <strong>Own a food business?</strong>
              <small>Join Foodverse Partners</small>
            </span>

            <ArrowUpRight size={17} />
          </Link>

          <div className={styles.sidebarFooter}>© 2026 FOODVERSE</div>
        </div>
      </aside>

      {/* MAIN FEED */}
      <section className={styles.feedArea}>
        {/* MOBILE HEADER */}
        <header className={styles.mobileHeader}>
          <Link href="/" className={styles.mobileLogo}>
            <UtensilsCrossed size={21} />
            <span>
              food<b>verse.</b>
            </span>
          </Link>

          <Link href="/search" aria-label="Search">
            <Search size={22} />
          </Link>
        </header>

        {/* DESKTOP HEADING */}
        <div className={styles.feedTop}>
          <div>
            <span className={styles.feedEyebrow}>
              DISCOVER YOUR NEXT CRAVING
            </span>

            <h1>
              For You<span>.</span>
            </h1>
          </div>

          <span className={styles.feedStatus}>
            <span />
            FOOD REELS
          </span>
        </div>

        {/* REELS CONTAINER */}
        <div className={styles.reelsContainer} ref={scrollContainerRef}>
          {loading ? (
            <div
              style={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: "#75f0c0",
                textAlign: "center",
                padding: "20px",
              }}
            >
              Loading food reels...
            </div>
          ) : error ? (
            <div
              style={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: "#f5f5f5",
                textAlign: "center",
                padding: "20px",
              }}
            >
              {error}
            </div>
          ) : reels.length === 0 ? (
            <div
              style={{
                height: "100%",
                display: "grid",
                placeItems: "center",
                color: "#92969f",
                textAlign: "center",
                padding: "20px",
              }}
            >
              No food reels available yet.
            </div>
          ) : (
            reels.map((reel, index) => (
              <article
                key={reel._id}
                data-index={index}
                className={styles.reelSection}
              >
                <div className={styles.reel}>
                  {/* VIDEO */}
                  <video
                    ref={(element) => {
                      videoRefs.current[index] = element;
                    }}
                    src={reel.video}
                    className={styles.video}
                    loop
                    muted={isMuted}
                    playsInline
                    preload={
                      Math.abs(index - activeIndex) <= 1 ? "auto" : "none"
                    }
                    onClick={togglePlay}
                  />

                  <div className={styles.videoGradient} />

                  {/* TOP OVERLAY */}
                  <div className={styles.videoTop}>
                    <span className={styles.reelBadge}>
                      <span />
                      FOODVERSE REELS
                    </span>

                    <button
                      type="button"
                      className={styles.muteButton}
                      onClick={() => setIsMuted((prev) => !prev)}
                      aria-label={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                    </button>
                  </div>

                  {/* PLAY OVERLAY */}
                  {!isPlaying && index === activeIndex && (
                    <button
                      type="button"
                      className={styles.playOverlay}
                      onClick={togglePlay}
                      aria-label="Play video"
                    >
                      <Play size={33} fill="currentColor" />
                    </button>
                  )}

                  {/* FOOD INFORMATION */}
                  <div className={styles.videoInfo}>
                    <h2>{reel.title}</h2>

                    <p className={styles.description}>{reel.description}</p>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        {/* MOBILE BOTTOM NAV */}
        <nav className={styles.mobileNav}>
          {navigation.map(({ label, href, Icon }, index) => (
            <Link
              key={label}
              href={href}
              className={`${styles.mobileNavItem} ${
                index === 0 ? styles.mobileNavActive : ""
              }`}
            >
              <Icon size={23} strokeWidth={1.9} />
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </section>
    </main>
  );
}

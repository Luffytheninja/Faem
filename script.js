const yearNode = document.getElementById("year");
if (yearNode) yearNode.textContent = String(new Date().getFullYear());

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const preloader = document.getElementById("preloader");
const preloaderVideo = document.getElementById("preloader-video");
const enterButton = document.getElementById("enter-site");
const mainContent = document.getElementById("main-content");
const introAudio = document.getElementById("intro-audio");

let preloaderDismissed = false;

const showSite = () => {
  if (preloaderDismissed || !preloader || !mainContent) return;
  preloaderDismissed = true;
  preloader.classList.add("is-hidden");
  mainContent.classList.remove("is-hidden");
  mainContent.setAttribute("aria-busy", "false");
};

const hasSource = (mediaNode) =>
  mediaNode instanceof HTMLMediaElement &&
  Array.from(mediaNode.querySelectorAll("source")).some((source) => source.getAttribute("src")?.trim());

if (preloader && mainContent) {
  const minDelay = new Promise((resolve) => setTimeout(resolve, 900));
  const pageReady = new Promise((resolve) => {
    if (document.readyState === "complete") {
      resolve();
    } else {
      window.addEventListener("load", resolve, { once: true });
    }
  });

  Promise.all([minDelay, pageReady]).then(showSite);

  if (enterButton) {
    enterButton.addEventListener("click", async () => {
      showSite();
      if (introAudio instanceof HTMLAudioElement) {
        introAudio.muted = false;
        try {
          await introAudio.play();
        } catch {
          // no-op if autoplay blocked
        }
        syncNowPlaying();
      }
    });
  }

  if (preloaderVideo instanceof HTMLVideoElement && hasSource(preloaderVideo) && !prefersReducedMotion) {
    preloaderVideo.play().catch(() => {
      // ignore playback denial
    });
    preloaderVideo.addEventListener("ended", showSite, { once: true });
  }
}

const nowPlayingButton = document.getElementById("now-playing");

const syncNowPlaying = () => {
  if (!(introAudio instanceof HTMLAudioElement) || !(nowPlayingButton instanceof HTMLButtonElement)) return;
  const audible = !introAudio.paused && !introAudio.muted;
  const hasAudioAsset = hasSource(introAudio);

  if (!hasAudioAsset) {
    nowPlayingButton.querySelector(".np-text").textContent = "Now Playing: Intro (Awaiting Asset)";
    nowPlayingButton.setAttribute("aria-pressed", "false");
    nowPlayingButton.classList.remove("is-audible");
    return;
  }

  nowPlayingButton.querySelector(".np-text").textContent = audible
    ? "Now Playing: Intro (Sound On)"
    : "Now Playing: Intro (Muted)";

  nowPlayingButton.setAttribute("aria-pressed", String(audible));
  nowPlayingButton.classList.toggle("is-audible", audible);
};

if (introAudio instanceof HTMLAudioElement && nowPlayingButton instanceof HTMLButtonElement) {
  syncNowPlaying();

  nowPlayingButton.addEventListener("click", async () => {
    if (introAudio.paused) {
      try {
        await introAudio.play();
      } catch {
        // no-op
      }
      introAudio.muted = false;
    } else {
      introAudio.muted = !introAudio.muted;
    }
    syncNowPlaying();
  });

  introAudio.addEventListener("pause", syncNowPlaying);
  introAudio.addEventListener("play", syncNowPlaying);
  introAudio.addEventListener("volumechange", syncNowPlaying);
}

if (!prefersReducedMotion && window.gsap) {
  const revealNodes = document.querySelectorAll(".reveal");
  if (window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
  }

  revealNodes.forEach((node) => {
    window.gsap.fromTo(
      node,
      { y: 28, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: window.ScrollTrigger
          ? {
              trigger: node,
              start: "top 84%",
              toggleActions: "play none none none",
            }
          : undefined,
      }
    );
  });
}

const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const wireNewsletterForm = (formId, statusId, withName = false) => {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!(form instanceof HTMLFormElement) || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const emailField = form.querySelector('input[type="email"]');
    const nameField = form.querySelector('input[name="name"]');

    const emailOk = emailField instanceof HTMLInputElement && validateEmail(emailField.value);
    const nameOk = !withName || (nameField instanceof HTMLInputElement && nameField.value.trim().length > 1);

    if (!emailOk || !nameOk) {
      status.textContent = "Please enter valid details before subscribing.";
      return;
    }

    status.textContent = "Subscribed. You'll receive FAEM updates soon.";
    form.reset();
  });
};

wireNewsletterForm("newsletter-form-main", "newsletter-main-status", true);
wireNewsletterForm("newsletter-form-footer", "newsletter-footer-status");

const contactForm = document.getElementById("contact-form");
const contactStatus = document.getElementById("contact-status");
if (contactForm instanceof HTMLFormElement && contactStatus) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (name.length < 2 || !validateEmail(email) || message.length < 10) {
      contactStatus.textContent = "Please complete all fields with valid information.";
      return;
    }

    contactStatus.textContent = "Thanks. Your inquiry is ready to send to FAEM booking.";
    contactForm.reset();
  });
}

if (!prefersReducedMotion && window.THREE) {
  const canvas = document.getElementById("footer-canvas");
  if (canvas instanceof HTMLCanvasElement) {
    const renderer = new window.THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    const scene = new window.THREE.Scene();
    const camera = new window.THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 3;

    const geometry = new window.THREE.IcosahedronGeometry(1.02, 1);
    const material = new window.THREE.MeshStandardMaterial({
      color: 0x7c5cff,
      emissive: 0x10d8ca,
      emissiveIntensity: 0.25,
      metalness: 0.35,
      roughness: 0.38,
      wireframe: false,
    });

    const mesh = new window.THREE.Mesh(geometry, material);
    scene.add(mesh);

    const lightA = new window.THREE.PointLight(0xffffff, 1.2);
    lightA.position.set(2, 2, 3);
    scene.add(lightA);
    const lightB = new window.THREE.AmbientLight(0x7777ff, 0.6);
    scene.add(lightB);

    const resize = () => {
      const width = canvas.clientWidth || 320;
      const height = canvas.clientHeight || 220;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      mesh.rotation.x += 0.005;
      mesh.rotation.y += 0.008;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();
  }
}

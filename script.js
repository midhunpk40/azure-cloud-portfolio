document.addEventListener("DOMContentLoaded", () => {
  // --- Initialize Dynamic Typography (Typing Effect) ---
  initTypewriter();

  // --- Initialize Network Background Canvas ---
  initNetworkCanvas();

  // --- Initialize Scroll Reveals & Active Nav Tracking ---
  initScrollObservers();

  // --- Initialize Mobile Navigation Menu ---
  initMobileMenu();

  // --- Initialize Project Modals ---
  initProjectModals();

  // --- Initialize Skills Progress Trigger ---
  initSkillsTrigger();

  // --- Initialize Contact Form Handler ---
  initContactForm();
});

/* ==========================================
   Typewriter Effect
   ========================================== */
function initTypewriter() {
  const typedSpan = document.querySelector(".typed-text");
  if (!typedSpan) return;

  const words = ["Cloud Intern", "DevOps Enthusiast", "AWS & Azure Builder", "Linux SysAdmin"];
  const typingSpeed = 100;
  const erasingSpeed = 60;
  const newWordDelay = 2000; // Delay between words
  let wordIndex = 0;
  let charIndex = 0;
  let isErasing = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isErasing) {
      typedSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isErasing = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
      } else {
        setTimeout(type, erasingSpeed);
      }
    } else {
      typedSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentWord.length) {
        isErasing = true;
        setTimeout(type, newWordDelay);
      } else {
        setTimeout(type, typingSpeed);
      }
    }
  }

  // Start typewriter
  setTimeout(type, 1000);
}

/* ==========================================
   Network Packet Canvas Animation
   ========================================== */
function initNetworkCanvas() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.offsetWidth);
  let height = (canvas.height = canvas.parentElement.offsetHeight);

  const particles = [];
  // Reduce density for mobile screens
  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const connectionDistance = 110;

  // Particle Class
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1.5;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      // Bounce off walls
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fill();
    }
  }

  // Populate particles array
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Animation Loop
  function animate() {
    // Only animate if the hero is in view to conserve resources
    const rect = canvas.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      ctx.clearRect(0, 0, width, height);

      // Draw connections first (layering)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            // Linear opacity mapping
            const alpha = (1 - dist / connectionDistance) * 0.12;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw and update particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
    }

    requestAnimationFrame(animate);
  }

  // Handle Resize
  window.addEventListener("resize", () => {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  });

  animate();
}

/* ==========================================
   Scroll Observers (Reveal & Nav Tracking)
   ========================================== */
function initScrollObservers() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");
  const header = document.querySelector("header");

  // Style Header on Scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Reveal Animations on scroll
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Trigger once
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active Link Tracker based on section viewport position
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentId}`) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { threshold: 0.4 } // Trigger when section occupies 40% of viewport
  );

  sections.forEach((sec) => navObserver.observe(sec));
}

/* ==========================================
   Mobile Nav Menu
   ========================================== */
function initMobileMenu() {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinksList = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  if (!mobileBtn || !navLinksList) return;

  function toggleMenu() {
    navLinksList.classList.toggle("active");
    // Change icon between burger and X
    const icon = mobileBtn.querySelector("i");
    if (icon) {
      if (navLinksList.classList.contains("active")) {
        icon.className = "lucide-x";
        lucide.createIcons(); // refresh icons
      } else {
        icon.className = "lucide-menu";
        lucide.createIcons();
      }
    }
  }

  mobileBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking link
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinksList.classList.contains("active")) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================
   Project Details & PDF Showcase Modals
   ========================================== */
function initProjectModals() {
  const projectCards = document.querySelectorAll(".project-card");
  const modalOverlay = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalPdfBtn = document.getElementById("modal-view-pdf-btn");

  // PDF & Documentation Showcase Modal Elements
  const pdfModalOverlay = document.getElementById("pdf-modal");
  const pdfModalClose = document.getElementById("pdf-modal-close");
  const pdfModalTitle = document.getElementById("pdf-modal-title");
  const pdfModalCategory = document.getElementById("pdf-modal-category");
  const pdfFrame = document.getElementById("pdf-frame");

  // Showcase Content Elements
  const docOverviewText = document.getElementById("doc-overview-text");
  const docEnvGrid = document.getElementById("doc-env-grid");
  const docStepsList = document.getElementById("doc-steps-list");
  const docResultsTbody = document.getElementById("doc-results-tbody");

  let currentActiveProjectId = null;

  if (!modalOverlay || !modalClose) return;

  // Event Delegation for Project Cards & PDF View buttons
  projectCards.forEach((card) => {
    const projectId = card.getAttribute("data-id");

    // Click PDF View Button directly on card
    const pdfViewBtn = card.querySelector(".btn-pdf-view");
    if (pdfViewBtn) {
      pdfViewBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        openPdfModal(projectId);
      });
    }

    // Click Details button or Card body
    card.addEventListener("click", (e) => {
      if (e.target.closest(".btn-pdf-view")) return;

      const projectData = PROJECTS_DATA.find((p) => p.id === projectId);
      if (projectData) {
        currentActiveProjectId = projectId;
        populateModal(projectData);
        modalOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      }
    });
  });

  // PDF button inside Project Details modal
  if (modalPdfBtn) {
    modalPdfBtn.addEventListener("click", () => {
      if (currentActiveProjectId) {
        closeModal();
        openPdfModal(currentActiveProjectId);
      }
    });
  }

  // Open Documentation Showcase / PDF Modal
  function openPdfModal(projectId) {
    const projectData = PROJECTS_DATA.find((p) => p.id === projectId);
    if (!projectData) return;

    currentActiveProjectId = projectId;
    pdfModalTitle.textContent = `${projectData.title} — Technical Report`;
    if (pdfModalCategory) {
      pdfModalCategory.textContent = `${projectData.category} Case Study`;
    }

    // Set PDF Frame source with fallback check
    const pdfWrapper = document.getElementById("pdf-frame-wrapper");
    if (pdfFrame && projectData.pdfUrl) {
      fetch(projectData.pdfUrl, { method: "HEAD" })
        .then((res) => {
          if (res.ok) {
            pdfFrame.style.display = "block";
            pdfFrame.src = projectData.pdfUrl;
            const notice = pdfWrapper ? pdfWrapper.querySelector(".pdf-pending-notice") : null;
            if (notice) notice.remove();
          } else {
            showPdfPendingNotice();
          }
        })
        .catch(() => showPdfPendingNotice());
    } else {
      showPdfPendingNotice();
    }

    function showPdfPendingNotice() {
      if (!pdfWrapper) return;
      pdfFrame.style.display = "none";
      let notice = pdfWrapper.querySelector(".pdf-pending-notice");
      if (!notice) {
        notice = document.createElement("div");
        notice.className = "pdf-pending-notice";
        notice.style.cssText = "padding: 2.5rem; text-align: center; color: var(--text-secondary); font-family: var(--font-display); background: #0d0e14; border-radius: 12px; border: 1px dashed rgba(255,255,255,0.15);";
        pdfWrapper.appendChild(notice);
      }
      notice.innerHTML = `
        <div style="font-size: 2rem; color: var(--color-cyan); margin-bottom: 0.5rem;"><i data-lucide="file-text" style="width: 36px; height: 36px;"></i></div>
        <h4 style="color: var(--text-primary); font-size: 1.1rem; font-weight: 700; margin-bottom: 0.35rem;">PDF Document Pending Upload</h4>
        <p style="font-size: 0.9rem; max-width: 500px; margin: 0 auto;">The PDF report file is queued for deployment. You can review the complete executive overview, environment specs, deployment steps, and test results matrix below!</p>
      `;
      lucide.createIcons();
    }

    // Populate Structured Showcase Documentation
    if (projectData.documentation) {
      const doc = projectData.documentation;

      // 1. Overview
      if (docOverviewText) {
        docOverviewText.textContent = doc.overview || projectData.fullDescription;
      }

      // 2. Environment Grid
      if (docEnvGrid) {
        docEnvGrid.innerHTML = "";
        if (doc.environment && Array.isArray(doc.environment)) {
          doc.environment.forEach((item) => {
            const card = document.createElement("div");
            card.className = "doc-env-card";
            card.innerHTML = `
              <div class="doc-env-label">${item.label}</div>
              <div class="doc-env-value">${item.value}</div>
            `;
            docEnvGrid.appendChild(card);
          });
        }
      }

      // 3. Implementation Steps
      if (docStepsList) {
        docStepsList.innerHTML = "";
        if (doc.steps && Array.isArray(doc.steps)) {
          doc.steps.forEach((step) => {
            const li = document.createElement("li");
            li.textContent = step;
            docStepsList.appendChild(li);
          });
        }
      }

      // 4. Test Results Table
      if (docResultsTbody) {
        docResultsTbody.innerHTML = "";
        if (doc.results && Array.isArray(doc.results)) {
          doc.results.forEach((res) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td style="font-weight: 600; color: var(--text-primary);">${res.test}</td>
              <td>${res.outcome}</td>
              <td><span class="doc-pass-badge"><i data-lucide="check-circle" style="width: 12px; height: 12px;"></i> ${res.status}</span></td>
            `;
            docResultsTbody.appendChild(tr);
          });
        }
      }
    }

    pdfModalOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
  }

  // Close Modals
  modalClose.addEventListener("click", closeModal);
  if (pdfModalClose) pdfModalClose.addEventListener("click", closePdfModal);

  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  if (pdfModalOverlay) {
    pdfModalOverlay.addEventListener("click", (e) => {
      if (e.target === pdfModalOverlay) closePdfModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (modalOverlay.classList.contains("active")) closeModal();
      if (pdfModalOverlay && pdfModalOverlay.classList.contains("active")) closePdfModal();
    }
  });

  function closeModal() {
    modalOverlay.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  function closePdfModal() {
    pdfModalOverlay.classList.remove("active");
    if (pdfFrame) {
      pdfFrame.src = ""; // reset iframe
      pdfFrame.style.display = "block";
    }
    const pdfWrapper = document.getElementById("pdf-frame-wrapper");
    if (pdfWrapper) {
      const notice = pdfWrapper.querySelector(".pdf-pending-notice");
      if (notice) notice.remove();
    }
    document.body.style.overflow = "auto";
  }

  function populateModal(data) {
    const headerTag = modalOverlay.querySelector(".modal-header-tag");
    const title = modalOverlay.querySelector(".modal-title");
    const subtitle = modalOverlay.querySelector(".modal-subtitle");
    const fullDesc = modalOverlay.querySelector(".modal-full-desc");
    const highlightsList = modalOverlay.querySelector(".modal-highlights-list");
    const techTagsContainer = modalOverlay.querySelector(".modal-tech-tags");

    headerTag.textContent = data.category;
    title.textContent = data.title;
    subtitle.textContent = data.subtitle;
    fullDesc.textContent = data.fullDescription;

    highlightsList.innerHTML = "";
    data.highlights.forEach((hl) => {
      const li = document.createElement("li");
      li.textContent = hl;
      highlightsList.appendChild(li);
    });

    techTagsContainer.innerHTML = "";
    data.techStack.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className = "modal-tag";
      tag.textContent = tech;
      techTagsContainer.appendChild(tag);
    });

    lucide.createIcons();
  }
}

/* ==========================================
   Skills Badge Showcase Staggered Entrance
   ========================================== */
function initSkillsTrigger() {
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const badges = document.querySelectorAll(".skill-badge");

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          badges.forEach((badge, idx) => {
            badge.style.opacity = "0";
            badge.style.transform = "translateY(10px)";
            badge.style.transition = "opacity 0.4s ease, transform 0.4s ease";
            setTimeout(() => {
              badge.style.opacity = "1";
              badge.style.transform = "translateY(0)";
            }, idx * 50);
          });
          skillsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillsObserver.observe(skillsSection);
}

/* ==========================================
   Contact Form Validation & API Submit
   ========================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successFeedback = document.getElementById("feedback-success");
  const errorFeedback = document.getElementById("feedback-error");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear previous feedback
    successFeedback.style.display = "none";
    errorFeedback.style.display = "none";

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    // Simple fields validation
    if (!name || !email || !subject || !message) {
      showError("Please fill out all fields.");
      return;
    }

    if (!isValidEmail(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    const base = (window.APP_CONFIG || {}).API_BASE;
    if (!base) {
      showError("API endpoint is not configured.");
      return;
    }

    // Toggle button loading state
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="lucide-loader-2 animate-spin"></i> Sending...';
    lucide.createIcons(); // refresh loader spin icon

    fetch(base + "/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          throw new Error(data.error || "Failed to send message.");
        }

        // Show success feedback and clear form
        successFeedback.style.display = "block";
        successFeedback.textContent = `Thank you, ${name}! Your message has been sent successfully. Midhun will respond shortly.`;
        form.reset();
      })
      .catch((err) => {
        showError(err.message || "Something went wrong while sending your message.");
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnHTML;
        lucide.createIcons();
      });
  });

  function showError(msg) {
    errorFeedback.style.display = "block";
    errorFeedback.textContent = msg;
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
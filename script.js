/**
 * Midhun P K — World-Class Cloud & DevOps Portfolio Engine
 * High-performance interactive UI, modals, network canvas, blog reader & API bindings
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Dynamic Typography (Typewriter)
  initTypewriter();

  // 2. Initialize Interactive Network Canvas
  initNetworkCanvas();

  // 3. Initialize Scroll Observers & Active Nav Tracking
  initScrollObservers();

  // 4. Initialize Mobile Navigation Menu
  initMobileMenu();

  // 5. Initialize Project Showcase & PDF Documentation Modals
  initProjectModals();

  // 6. Initialize Project Filter Tabs
  initProjectFilters();

  // 7. Initialize Blog System (Filtering, Search & Reader Modal)
  initBlogEngine();

  // 8. Initialize Skills Interactive Matrix & Filter Tabs
  initSkillsFilters();

  // 9. Initialize Contact Form (Azure Functions + Mock Fallback)
  initContactForm();

  // 10. Sync Visitor Counter Elements
  initVisitorCounterSync();

  // 11. Initialize Resume PDF Download (Azure Blob Storage via /api/resume)
  initResumeDownload();

  // 12. Global Page Initialization (Icons, Footer Year & Print)
  initGlobalPage();
});

/* ==========================================================================
   1. TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const typedSpan = document.querySelector(".typed-text");
  if (!typedSpan) return;

  const words = [
    "Cloud Infrastructure Engineer",
    "DevOps & CI/CD Specialist",
    "AWS & Azure Multi-Cloud Builder",
    "Linux Systems Administrator"
  ];
  const typingSpeed = 90;
  const erasingSpeed = 50;
  const newWordDelay = 2200;
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

  setTimeout(type, 800);
}

/* ==========================================================================
   2. INTERACTIVE NETWORK CANVAS ANIMATION
   ========================================================================== */
function initNetworkCanvas() {
  const canvas = document.getElementById("network-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const particles = [];
  const particleCount = window.innerWidth < 768 ? 25 : 55;
  const connectionDistance = 120;

  // Track mouse for subtle particle repulsion
  let mouse = { x: null, y: null, radius: 100 };
  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  window.addEventListener("mouseout", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2 + 1.2;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      // GTA Vice City 1980s Miami sunset palette
      const colors = [
        "rgba(255, 92, 138, ",   // Coral pink
        "rgba(69, 229, 245, ",   // Electric cyan
        "rgba(255, 180, 94, ",   // Miami sunset amber
        "rgba(184, 162, 255, "   // Soft neon lavender
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse repulsion
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          this.x -= (dx / dist) * force * 2;
          this.y -= (dy / dist) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ")";
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < connectionDistance) {
          const alpha = (1 - dist / connectionDistance) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(69, 229, 245, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. SCROLL OBSERVERS & NAVIGATION
   ========================================================================== */
function initScrollObservers() {
  const header = document.querySelector("header");
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  // Sticky header class toggle
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
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
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // Active section indicator
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
    { threshold: 0.35 }
  );

  sections.forEach((sec) => navObserver.observe(sec));
}

/* ==========================================================================
   4. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const mobileBtn = document.querySelector(".mobile-menu-btn");
  const navLinksList = document.querySelector(".nav-links");
  const backdrop = document.querySelector(".nav-backdrop");
  const navItems = document.querySelectorAll(".nav-links a");

  if (!mobileBtn || !navLinksList) return;

  function openMenu() {
    navLinksList.classList.add("active");
    if (backdrop) backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
    const icon = mobileBtn.querySelector("i");
    if (icon) {
      icon.className = "lucide-x";
      if (window.lucide && lucide.createIcons) lucide.createIcons();
    }
  }

  function closeMenu() {
    navLinksList.classList.remove("active");
    if (backdrop) backdrop.classList.remove("active");
    document.body.style.overflow = "";
    const icon = mobileBtn.querySelector("i");
    if (icon) {
      icon.className = "lucide-menu";
      if (window.lucide && lucide.createIcons) lucide.createIcons();
    }
  }

  function toggleMenu() {
    if (navLinksList.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  mobileBtn.addEventListener("click", toggleMenu);

  if (backdrop) {
    backdrop.addEventListener("click", closeMenu);
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      if (navLinksList.classList.contains("active")) {
        closeMenu();
      }
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinksList.classList.contains("active")) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024 && navLinksList.classList.contains("active")) {
      closeMenu();
    }
  });
}

/* ==========================================================================
   5. PROJECT DETAILS & PDF SHOWCASE MODALS
   ========================================================================== */
function initProjectModals() {
  const projectCards = document.querySelectorAll(".project-card, .featured-project-card");
  const modalOverlay = document.getElementById("project-modal");
  const modalClose = document.getElementById("modal-close");
  const modalPdfBtn = document.getElementById("modal-view-pdf-btn");

  const pdfModalOverlay = document.getElementById("pdf-modal");
  const pdfModalClose = document.getElementById("pdf-modal-close");
  const pdfModalTitle = document.getElementById("pdf-modal-title");
  const pdfModalCategory = document.getElementById("pdf-modal-category");
  const pdfFrame = document.getElementById("pdf-frame");

  const docOverviewText = document.getElementById("doc-overview-text");
  const docEnvGrid = document.getElementById("doc-env-grid");
  const docStepsList = document.getElementById("doc-steps-list");
  const docResultsTbody = document.getElementById("doc-results-tbody");

  let currentActiveProjectId = null;

  if (!modalOverlay || !modalClose) return;

  // Event listener delegation for project card clicks
  document.addEventListener("click", (e) => {
    const pdfViewBtn = e.target.closest(".btn-pdf-view");
    if (pdfViewBtn) {
      e.stopPropagation();
      const pId = pdfViewBtn.getAttribute("data-id");
      if (pId) openPdfModal(pId);
      return;
    }

    const card = e.target.closest(".project-card, .featured-project-card");
    if (card) {
      // Avoid triggering when clicking directly on external links
      if (e.target.closest("a") || e.target.closest("button")) return;
      const pId = card.getAttribute("data-id");
      if (pId && window.PROJECTS_DATA) {
        const projectData = PROJECTS_DATA.find((p) => p.id === pId);
        if (projectData) {
          currentActiveProjectId = pId;
          populateModal(projectData);
          modalOverlay.classList.add("active");
          document.body.style.overflow = "hidden";
        }
      }
    }
  });

  if (modalPdfBtn) {
    modalPdfBtn.addEventListener("click", () => {
      if (currentActiveProjectId) {
        closeModal();
        openPdfModal(currentActiveProjectId);
      }
    });
  }

  function openPdfModal(projectId) {
    if (!window.PROJECTS_DATA) return;
    const projectData = PROJECTS_DATA.find((p) => p.id === projectId);
    if (!projectData) return;

    currentActiveProjectId = projectId;
    if (pdfModalTitle) pdfModalTitle.textContent = `${projectData.title} — Technical Report`;
    if (pdfModalCategory) pdfModalCategory.textContent = `${projectData.category} Case Study`;

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
        notice.style.cssText =
          "padding: 2.5rem; text-align: center; color: var(--text-secondary); font-family: var(--font-display); background: #0c0f1a; border-radius: 12px; border: 1px dashed rgba(255,255,255,0.15);";
        pdfWrapper.appendChild(notice);
      }
      notice.innerHTML = `
        <div style="font-size: 2rem; color: var(--color-cyan); margin-bottom: 0.5rem;"><i data-lucide="file-text" style="width: 36px; height: 36px;"></i></div>
        <h4 style="color: var(--text-primary); font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem;">Live Architecture Verification</h4>
        <p style="font-size: 0.92rem; max-width: 540px; margin: 0 auto; line-height: 1.6;">You can inspect the complete architectural blueprint, environment specifications, deployment steps, and test results matrix below!</p>
      `;
      lucide.createIcons();
    }

    if (projectData.documentation) {
      const doc = projectData.documentation;
      if (docOverviewText) docOverviewText.textContent = doc.overview || projectData.fullDescription;

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

      if (docResultsTbody) {
        docResultsTbody.innerHTML = "";
        if (doc.results && Array.isArray(doc.results)) {
          doc.results.forEach((res) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
              <td style="font-weight: 700; color: var(--text-primary);">${res.test}</td>
              <td>${res.outcome}</td>
              <td><span class="doc-pass-badge"><i data-lucide="check-circle" style="width: 13px; height: 13px;"></i> ${res.status}</span></td>
            `;
            docResultsTbody.appendChild(tr);
          });
        }
      }
    }

    if (pdfModalOverlay) {
      pdfModalOverlay.classList.add("active");
      document.body.style.overflow = "hidden";
      lucide.createIcons();
    }
  }

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
      pdfFrame.src = "";
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

    if (headerTag) headerTag.textContent = data.category;
    if (title) title.textContent = data.title;
    if (subtitle) subtitle.textContent = data.subtitle;
    if (fullDesc) fullDesc.textContent = data.fullDescription;

    if (highlightsList) {
      highlightsList.innerHTML = "";
      data.highlights.forEach((hl) => {
        const li = document.createElement("li");
        li.textContent = hl;
        highlightsList.appendChild(li);
      });
    }

    if (techTagsContainer) {
      techTagsContainer.innerHTML = "";
      data.techStack.forEach((tech) => {
        const tag = document.createElement("span");
        tag.className = "modal-tag";
        tag.textContent = tech;
        techTagsContainer.appendChild(tag);
      });
    }

    const headerActions = modalOverlay.querySelector(".modal-header-actions");
    if (headerActions) {
      let githubBtn = document.getElementById("modal-github-btn");
      if (data.githubUrl) {
        if (!githubBtn) {
          githubBtn = document.createElement("a");
          githubBtn.id = "modal-github-btn";
          githubBtn.className = "btn btn-secondary";
          githubBtn.target = "_blank";
          githubBtn.rel = "noopener noreferrer";
          githubBtn.innerHTML =
            '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg> View Repository';
          headerActions.appendChild(githubBtn);
        }
        githubBtn.href = data.githubUrl;
        githubBtn.style.display = "inline-flex";
      } else if (githubBtn) {
        githubBtn.style.display = "none";
      }
    }

    lucide.createIcons();
  }
}

/* ==========================================================================
   6. PROJECTS FILTER TABS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll(".project-filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const featuredCard = document.querySelector(".featured-project-card");

  if (!filterBtns.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      if (featuredCard) {
        if (filter === "all" || filter === "azure" || filter === "featured") {
          featuredCard.style.display = "block";
        } else {
          featuredCard.style.display = "none";
        }
      }

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all") {
          card.style.display = "flex";
        } else if (filter === "aws" && category.toLowerCase().includes("aws")) {
          card.style.display = "flex";
        } else if (filter === "azure" && category.toLowerCase().includes("azure")) {
          card.style.display = "flex";
        } else if (category.toLowerCase().includes(filter.toLowerCase())) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   7. BLOG SYSTEM: RENDERING, SEARCH, FILTER & READER MODAL
   ========================================================================== */
function initBlogEngine() {
  const blogContainer = document.getElementById("blog-grid-container");
  const searchInput = document.getElementById("blog-search-input");
  const catBtns = document.querySelectorAll(".blog-cat-btn");

  const blogModal = document.getElementById("blog-modal");
  const blogModalClose = document.getElementById("blog-modal-close");
  const blogReaderTitle = document.getElementById("blog-reader-title");
  const blogReaderCategory = document.getElementById("blog-reader-category");
  const blogReaderDate = document.getElementById("blog-reader-date");
  const blogReaderReadTime = document.getElementById("blog-reader-time");
  const blogReaderContent = document.getElementById("blog-reader-content");
  const blogReaderRelated = document.getElementById("blog-reader-related");

  if (!window.BLOG_DATA || !blogContainer) return;

  let activeCategory = "all";
  let searchQuery = "";

  function renderArticles() {
    blogContainer.innerHTML = "";

    const filtered = BLOG_DATA.filter((article) => {
      const matchCat =
        activeCategory === "all" ||
        article.category.toLowerCase().includes(activeCategory.toLowerCase());
      const matchSearch =
        searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
      blogContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
          <i data-lucide="search-x" style="width: 44px; height: 44px; margin-bottom: 0.5rem; color: var(--color-cyan);"></i>
          <p style="font-size: 1.05rem;">No technical articles found matching your criteria.</p>
        </div>
      `;
      lucide.createIcons();
      return;
    }

    filtered.forEach((article) => {
      const card = document.createElement("article");
      card.className = "glass-panel blog-card";
      card.setAttribute("data-id", article.id);
      card.setAttribute("tabindex", "0");
      card.setAttribute("role", "button");
      card.setAttribute("aria-label", `Read article: ${article.title}`);

      card.innerHTML = `
        <div class="blog-meta-top">
          <span class="blog-cat-tag">${article.category}</span>
          <span class="blog-read-time"><i data-lucide="clock" style="width: 13px; height: 13px;"></i> ${article.readTime}</span>
        </div>
        <h3>${article.title}</h3>
        <p>${article.excerpt}</p>
        <div class="blog-footer">
          <span class="blog-date">${article.date}</span>
          <span class="blog-read-btn">Read Article <i data-lucide="arrow-right" style="width: 14px; height: 14px;"></i></span>
        </div>
      `;

      card.addEventListener("click", () => openArticle(article.id));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openArticle(article.id);
        }
      });
      blogContainer.appendChild(card);
    });

    lucide.createIcons();
  }

  let lastFocusedElement = null;

  function closeBlogModal() {
    if (!blogModal) return;
    blogModal.classList.remove("active");
    document.body.style.overflow = "auto";
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
      lastFocusedElement = null;
    }
  }

  function openArticle(articleId) {
    const article = BLOG_DATA.find((a) => a.id === articleId);
    if (!article || !blogModal) return;

    if (!blogModal.classList.contains("active")) {
      lastFocusedElement = document.activeElement;
    }

    if (blogReaderTitle) blogReaderTitle.textContent = article.title;
    if (blogReaderCategory) blogReaderCategory.textContent = article.category;
    if (blogReaderDate) blogReaderDate.textContent = article.date;
    if (blogReaderReadTime) blogReaderReadTime.textContent = article.readTime;
    if (blogReaderContent) blogReaderContent.innerHTML = article.content;

    // Render related articles
    if (blogReaderRelated) {
      blogReaderRelated.innerHTML = "";
      if (article.relatedIds && article.relatedIds.length > 0) {
        const relatedArticles = BLOG_DATA.filter((a) => article.relatedIds.includes(a.id));
        relatedArticles.forEach((rel) => {
          const item = document.createElement("div");
          item.className = "related-article-card";
          item.setAttribute("tabindex", "0");
          item.setAttribute("role", "button");
          item.setAttribute("aria-label", `Read related article: ${rel.title}`);
          item.style.cssText =
            "padding: 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: 12px; cursor: pointer; transition: all 0.2s ease;";
          item.innerHTML = `
            <span style="font-size: 0.75rem; color: var(--color-cyan); font-weight: 700; text-transform: uppercase;">${rel.category}</span>
            <h4 style="font-family: var(--font-display); font-size: 1.05rem; font-weight: 700; margin: 0.35rem 0; color: #ffffff;">${rel.title}</h4>
            <span style="font-size: 0.8rem; color: var(--text-muted);">${rel.readTime}</span>
          `;
          item.addEventListener("click", () => openArticle(rel.id));
          item.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openArticle(rel.id);
            }
          });
          item.addEventListener("mouseenter", () => {
            item.style.borderColor = "var(--color-cyan)";
            item.style.transform = "translateY(-2px)";
          });
          item.addEventListener("mouseleave", () => {
            item.style.borderColor = "var(--border-subtle)";
            item.style.transform = "translateY(0)";
          });
          blogReaderRelated.appendChild(item);
        });
      }
    }

    blogModal.classList.add("active");
    document.body.style.overflow = "hidden";
    lucide.createIcons();
    if (blogModalClose) {
      blogModalClose.focus();
    } else {
      const focusables = getModalFocusableElements();
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        blogModal.setAttribute("tabindex", "-1");
        blogModal.focus();
      }
    }
  }

  function getModalFocusableElements() {
    if (!blogModal) return [];
    const selector =
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    return Array.from(blogModal.querySelectorAll(selector)).filter(
      (el) => el.offsetParent !== null || el.getClientRects().length > 0
    );
  }

  // Filter category pill clicks
  catBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      catBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category");
      renderArticles();
    });
  });

  // Real-time search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderArticles();
    });
  }

  // Close Article Reader Modal
  if (blogModalClose && blogModal) {
    blogModalClose.addEventListener("click", closeBlogModal);

    blogModal.addEventListener("click", (e) => {
      if (e.target === blogModal) {
        closeBlogModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!blogModal.classList.contains("active")) return;

      if (e.key === "Escape") {
        closeBlogModal();
        return;
      }

      if (e.key === "Tab") {
        const focusables = getModalFocusableElements();
        if (focusables.length === 0) {
          e.preventDefault();
          return;
        }

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (!blogModal.contains(document.activeElement)) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        } else if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  renderArticles();
}

/* ==========================================================================
   8. SKILLS INTERACTIVE MATRIX & FILTERS
   ========================================================================== */
function initSkillsFilters() {
  const filterBtns = document.querySelectorAll(".skill-filter-btn");
  const skillCards = document.querySelectorAll(".skill-category-card");

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const category = card.getAttribute("data-category") || "";
        if (filter === "all" || category.toLowerCase() === filter.toLowerCase()) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   9. CONTACT FORM HANDLER (AZURE FUNCTIONS)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById("contact-form");
  const successFeedback = document.getElementById("feedback-success");
  const errorFeedback = document.getElementById("feedback-error");

  if (!form) return;

  let isSubmitting = false;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (successFeedback) successFeedback.style.display = "none";
    if (errorFeedback) errorFeedback.style.display = "none";

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!name || !email || !subject || !message) {
      showError("Please fill out all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("Please enter a valid email address.");
      return;
    }

    const apiBase = ((window.APP_CONFIG || {}).API_BASE || "").replace(/\/+$/, "");
    if (!apiBase) {
      showError("Contact service is not configured. Please email directly at midhunpk40@gmail.com.");
      return;
    }

    const originalBtnHTML = submitBtn.innerHTML;
    isSubmitting = true;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="lucide-loader-2 animate-spin"></i> Sending message...';
    lucide.createIcons();

    try {
      const response = await fetch(`${apiBase}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message })
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data && data.ok === true) {
        showSuccess(`Thank you, ${name}! Your message has been sent directly to Midhun via Azure Communication Services.`);
        form.reset();
      } else if (response.status === 400) {
        showError((data && data.error) || "Please check your input and fill out all required fields.");
      } else {
        showError("Unable to deliver message through the Azure backend right now. Please try again later or email directly at midhunpk40@gmail.com.");
      }
    } catch (err) {
      showError("Network error: unable to reach the contact service. Please check your connection or email directly at midhunpk40@gmail.com.");
    } finally {
      isSubmitting = false;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
      lucide.createIcons();
    }
  });

  function showError(msg) {
    if (errorFeedback) {
      errorFeedback.style.display = "block";
      errorFeedback.textContent = msg;
    }
  }

  function showSuccess(msg) {
    if (successFeedback) {
      successFeedback.style.display = "block";
      successFeedback.textContent = msg;
    }
  }
}

/* ==========================================================================
   10. SYNCHRONIZE VISITOR COUNTERS (COSMOS DB TELEMETRY)
   ========================================================================== */
function initVisitorCounterSync() {
  const desktopCount = document.getElementById("visit-count");
  const mobileCount = document.getElementById("visit-count-mobile");

  function syncCounters() {
    if (desktopCount && mobileCount && desktopCount.textContent) {
      mobileCount.textContent = desktopCount.textContent;
    }
  }

  if (desktopCount) {
    const observer = new MutationObserver(syncCounters);
    observer.observe(desktopCount, { childList: true, characterData: true, subtree: true });
    syncCounters();
  }
}

/* ==========================================================================
   11. RESUME PDF DOWNLOAD (AZURE BLOB STORAGE VIA /api/resume)
   ========================================================================== */
function initResumeDownload() {
  const downloadBtn = document.getElementById("resume-download-btn");
  const errorFeedback = document.getElementById("resume-feedback-error");

  if (!downloadBtn) return;

  let isLoading = false;

  downloadBtn.addEventListener("click", async () => {
    if (isLoading) return;

    if (errorFeedback) {
      errorFeedback.style.display = "none";
      errorFeedback.textContent = "";
    }

    const apiBase = ((window.APP_CONFIG || {}).API_BASE || "").replace(/\/+$/, "");
    if (!apiBase) {
      showError("Resume service is not configured. Please use the interactive CV or try again later.");
      return;
    }

    const originalBtnHTML = downloadBtn.innerHTML;
    isLoading = true;
    downloadBtn.disabled = true;
    downloadBtn.innerHTML = '<i class="lucide-loader-2 animate-spin"></i> Preparing PDF...';
    if (window.lucide && lucide.createIcons) lucide.createIcons();

    try {
      const response = await fetch(`${apiBase}/api/resume`, { method: "GET" });
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        showError("Unable to retrieve the resume PDF right now. Please try again later or view the interactive CV.");
        return;
      }

      if (!data || typeof data.downloadUrl !== "string" || !data.downloadUrl.trim()) {
        showError("Resume download link was not returned by the server. Please try again later.");
        return;
      }

      window.open(data.downloadUrl, "_blank", "noopener,noreferrer");
    } catch (err) {
      showError("Network error: unable to reach the resume service. Please check your connection and try again.");
    } finally {
      isLoading = false;
      downloadBtn.disabled = false;
      downloadBtn.innerHTML = originalBtnHTML;
      if (window.lucide && lucide.createIcons) lucide.createIcons();
    }
  });

  function showError(msg) {
    if (errorFeedback) {
      errorFeedback.style.display = "block";
      errorFeedback.textContent = msg;
    }
  }
}

/* ==========================================================================
   12. GLOBAL PAGE INITIALIZATION (ICONS, FOOTER YEAR & PRINT)
   ========================================================================== */
function initGlobalPage() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  const footerYear = document.getElementById("footer-year");
  if (footerYear) {
    footerYear.textContent = new Date().getFullYear();
  }

  const printBtn = document.querySelector(".btn-print");
  if (printBtn && !printBtn.dataset.printBound) {
    printBtn.dataset.printBound = "1";
    printBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

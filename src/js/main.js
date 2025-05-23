// Mobile Navigation JavaScript
class MobileNavigation {
  constructor() {
    this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
    this.mobileNav = document.getElementById('mobileNav');
    this.body = document.body;
    this.isOpen = false;

    this.init();
  }

  init() {
    if (!this.mobileMenuBtn || !this.mobileNav) {
      return;
    }

    // Add event listeners
    this.mobileMenuBtn.addEventListener('click', (e) => this.toggleMenu(e));

    // Close button in mobile menu
    const mobileNavClose = document.getElementById('mobileNavClose');
    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', () => this.closeMenu());
    }

    // Close menu when clicking on nav links
    const mobileNavLinks = this.mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeMenu();
      }
    });

    // Close menu when clicking outside content area
    this.mobileNav.addEventListener('click', (e) => {
      if (e.target === this.mobileNav) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu(e) {
    e.preventDefault();
    e.stopPropagation();

    if (this.isOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  }

  openMenu() {
    this.isOpen = true;
    this.mobileMenuBtn.classList.add('active');
    this.mobileNav.classList.add('active');
    this.body.classList.add('mobile-menu-open');
    document.documentElement.classList.add('mobile-menu-open');
  }

  closeMenu() {
    this.isOpen = false;
    this.mobileMenuBtn.classList.remove('active');
    this.mobileNav.classList.remove('active');
    this.body.classList.remove('mobile-menu-open');
    document.documentElement.classList.remove('mobile-menu-open');
  }
}

// Reading Progress Bar
class ReadingProgress {
  constructor() {
    this.progressBar = document.getElementById('reading-progress-bar');
    this.init();
  }

  init() {
    if (!this.progressBar || !document.body.classList.contains('post-page')) {
      return;
    }

    window.addEventListener('scroll', () => this.updateProgress());
    window.addEventListener('resize', () => this.updateProgress());
  }

  updateProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    this.progressBar.style.width = Math.min(scrolled, 100) + '%';
  }
}

// Table of Contents
class TableOfContents {
constructor() {
this.tocContainer = document.getElementById('table-of-contents');
this.tocList = document.getElementById('toc-list');
this.tocToggle = document.getElementById('toc-toggle');
this.headings = [];
this.currentActive = null;
this.isMobileOpen = false;
this.isScrolling = false; // Prevent multiple rapid clicks

  this.init();
  }

  init() {
    if (!this.tocContainer || !document.body.classList.contains('post-page')) {
      return;
    }

    this.generateTOC();
    this.setupScrollSpy();
    this.setupMobileToggle();
  }

  generateTOC() {
    // Find all h1 and h2 elements in the main content
    const headings = document.querySelectorAll('.main h1, .main h2');

    if (headings.length === 0) {
      this.tocContainer.style.display = 'none';
      if (this.tocToggle) this.tocToggle.style.display = 'none';
      return;
    }

    headings.forEach((heading, index) => {
      // Add ID if it doesn't exist
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      this.headings.push({
        element: heading,
        id: heading.id,
        text: heading.textContent,
        level: heading.tagName.toLowerCase()
      });

      // Create TOC entry
      const li = document.createElement('li');
      li.classList.add('toc-item', `toc-${heading.tagName.toLowerCase()}`);

      const link = document.createElement('a');
      link.classList.add('toc-link', `toc-${heading.tagName.toLowerCase()}`);
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Prevent multiple rapid clicks
        if (this.isScrolling) return;
        
        this.isScrolling = true;
        this.scrollToHeading(heading);
        
        // Close mobile TOC after navigation
        if (window.innerWidth < 1200) {
          this.closeMobileTOC();
        }
        
        // Reset scrolling flag after animation
        setTimeout(() => {
          this.isScrolling = false;
        }, 800);
      });

      li.appendChild(link);
      this.tocList.appendChild(li);
    });
  }

  setupMobileToggle() {
    if (!this.tocToggle) return;

    this.tocToggle.addEventListener('click', () => {
      this.toggleMobileTOC();
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMobileOpen) {
        this.closeMobileTOC();
      }
    });

    // Close when clicking outside on mobile
    document.addEventListener('click', (e) => {
      if (this.isMobileOpen &&
        !this.tocContainer.contains(e.target) &&
        !this.tocToggle.contains(e.target)) {
        this.closeMobileTOC();
      }
    });
  }

  toggleMobileTOC() {
    if (this.isMobileOpen) {
      this.closeMobileTOC();
    } else {
      this.openMobileTOC();
    }
  }

  openMobileTOC() {
    this.isMobileOpen = true;
    this.tocContainer.classList.add('open');
    this.tocToggle.classList.add('open');
  }

  closeMobileTOC() {
    this.isMobileOpen = false;
    this.tocContainer.classList.remove('open');
    this.tocToggle.classList.remove('open');
  }

  scrollToHeading(heading) {
  // Use a more precise calculation
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
  const progressBarHeight = 4; // Reading progress bar height
  const extraOffset = 20; // Additional breathing room
  const totalOffset = headerHeight + progressBarHeight + extraOffset;
  
  const elementPosition = heading.offsetTop;
  const targetPosition = elementPosition - totalOffset;
  
  window.scrollTo({
  top: Math.max(0, targetPosition),
  behavior: 'smooth'
  });
  
  // Force update active state after scroll completes
  setTimeout(() => {
  this.setActiveHeading(heading.id);
  }, 300);
  }

  setupScrollSpy() {
  if (this.headings.length === 0) return;
  
  // Use scroll-based detection instead of intersection observer for more accuracy
  let ticking = false;
  
  const updateActiveHeading = () => {
  const scrollTop = window.pageYOffset;
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const offset = headerHeight + 50; // Account for header + some breathing room
  
    // Find the heading that's currently visible
    let activeHeading = null;
    
  for (let i = this.headings.length - 1; i >= 0; i--) {
      const heading = this.headings[i];
        const headingTop = heading.element.offsetTop;
        
        if (scrollTop + offset >= headingTop) {
          activeHeading = heading.id;
          break;
        }
      }
      
      // If we're at the very top, activate the first heading
      if (!activeHeading && scrollTop < 100) {
        activeHeading = this.headings[0]?.id;
      }
      
      if (activeHeading) {
        this.setActiveHeading(activeHeading);
      }
      
      ticking = false;
    };
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateActiveHeading);
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', onScroll);
    
    // Initial call
    updateActiveHeading();
  }

  setActiveHeading(id) {
    // Remove active class from current active link
    if (this.currentActive) {
      this.currentActive.classList.remove('active');
    }

    // Add active class to new active link
    const newActive = this.tocList.querySelector(`a[href="#${id}"]`);
    if (newActive) {
      newActive.classList.add('active');
      this.currentActive = newActive;
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MobileNavigation();
  new ReadingProgress();
  new TableOfContents();
});

// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});

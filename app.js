// ================================
// ALCHEMY PARTNERS - JAVASCRIPT
// Client-side interactivity & validation
// ================================

// ===== PORTFOLIO DATA =====
const portfolioProjects = [
    {
        id: 1,
        title: "Engaging Communities in a Just Transition",
        client: "EITI International",
        icon: "🌍",
        tags: ["energy", "gesi", "international"],
        description: "Led inclusive community engagement strategies to strengthen local participation in energy transition dialogue, developing data access frameworks and capacity building initiatives.",
        impact: "Enhanced community understanding and improved extractive sector data access for evidence-based advocacy."
    },
    {
        id: 2,
        title: "UK Ghana Gold Programme - GESI Leadership",
        client: "TAG International Development",
        icon: "⚖️",
        tags: ["gesi", "governance"],
        description: "Strategic GESI leadership for community-based interventions combating organized crime in artisanal mining, using the 3P+1R framework.",
        impact: "Embedded gender equality principles across intervention design and community engagement strategies."
    },
    {
        id: 3,
        title: "Ghana Energy Transition Plan Review",
        client: "SYND-Ghana",
        icon: "⚡",
        tags: ["energy", "gesi"],
        description: "Comprehensive analytical review of Ghana's National Energy Transition Framework, evaluating inclusivity, stakeholder engagement, and socio-economic impacts.",
        impact: "Delivered recommendations enhancing institutional readiness and ensuring alignment with national development objectives."
    },
    {
        id: 4,
        title: "Electric Mobility Transition Research",
        client: "Climate Compatible Growth",
        icon: "🚗",
        tags: ["energy", "gesi"],
        description: "Developed comprehensive gender analysis frameworks integrating World Bank SIAT and DFID GSEA methodologies for Ghana's electric mobility transition.",
        impact: "Evidence-based research advancing equitable transportation policies."
    },
    {
        id: 5,
        title: "ABFA Development Impact Assessment",
        client: "Africa Centre for Energy Policy (ACEP)",
        icon: "📊",
        tags: ["gesi", "governance"],
        description: "Led GESI integration into development project assessments, providing critical insights into differential impacts on marginalized groups.",
        impact: "Influenced policy adjustments addressing gender dynamics and socio-economic disparities."
    },
    {
        id: 6,
        title: "Sustainable Mineral Resource Management",
        client: "AMDC & AfCFTA Secretariat",
        icon: "⛏️",
        tags: ["governance", "international"],
        description: "Contributed to comprehensive assessment of Ghana's mineral resource management alignment with the African Mining Vision.",
        impact: "Advanced recommendations for competitive bidding, geological data acquisition, and green minerals development."
    },
    {
        id: 7,
        title: "Ghana EITI ASM Sector Report",
        client: "Ghana Extractive Industries Transparency Initiative",
        icon: "📑",
        tags: ["governance"],
        description: "Conducted stakeholder mapping and prepared the 2020 EITI Technical Report on the artisanal and small-scale mining sector.",
        impact: "Enhanced transparency and community engagement in Ghana's ASM sector."
    },
    {
        id: 8,
        title: "Women in Mining Governance Enhancement",
        client: "WIM Ghana",
        icon: "👥",
        tags: ["gesi", "governance"],
        description: "Conducted in-depth gender analysis identifying barriers to women's participation in extractive sector governance.",
        impact: "Developed comprehensive action plan bridging gender gaps in Ghana's mining industry."
    }
];

// ===== NAVIGATION =====
class Navigation {
    constructor() {
        this.nav = document.getElementById('navbar');
        this.navToggle = document.getElementById('navToggle');
        this.navMenu = document.getElementById('navMenu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        // Scroll effect
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Mobile toggle
        this.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        
        // Smooth scroll and active state
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e, link));
        });
        
        // Set initial active state
        this.updateActiveLink();
        window.addEventListener('scroll', () => this.updateActiveLink());
    }
    
    handleScroll() {
        if (window.scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }
    
    handleNavClick(e, link) {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            this.navMenu.classList.remove('active');
        }
    }
    
    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// ===== PORTFOLIO =====
class Portfolio {
    constructor() {
        this.grid = document.getElementById('portfolioGrid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projects = portfolioProjects;
        
        this.init();
    }
    
    init() {
        this.renderProjects();
        this.setupFilters();
    }
    
    renderProjects(filter = 'all') {
        this.grid.innerHTML = '';
        
        const filteredProjects = filter === 'all' 
            ? this.projects 
            : this.projects.filter(project => project.tags.includes(filter));
        
        filteredProjects.forEach((project, index) => {
            const card = this.createProjectCard(project);
            this.grid.appendChild(card);
            
            // Stagger animation
            setTimeout(() => {
                card.classList.add('fade-in');
            }, index * 100);
        });
    }
    
    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-tags', project.tags.join(' '));
        
        card.innerHTML = `
            <div class="project-image">
                ${project.icon}
            </div>
            <div class="project-content">
                <div class="project-meta">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <h3>${project.title}</h3>
                <div class="project-client">${project.client}</div>
                <p class="project-description">${project.description}</p>
                <div class="project-impact">
                    <strong>Impact:</strong> ${project.impact}
                </div>
            </div>
        `;
        
        return card;
    }
    
    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filter projects
                const filter = button.getAttribute('data-filter');
                this.renderProjects(filter);
            });
        });
    }
}

// ===== CONTACT FORM =====
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = this.form.querySelector('.btn-submit');
        this.successMessage = document.getElementById('formSuccess');
        
        this.init();
    }
    
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
        });
    }
    
    validateField(field) {
        const errorElement = document.getElementById(`${field.id}Error`);
        let isValid = true;
        let errorMessage = '';
        
        // Check if field is required and empty
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            errorMessage = 'This field is required';
        }
        
        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }
        
        // Display error
        if (errorElement) {
            if (!isValid) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
                field.style.borderColor = '#E07A5F';
            } else {
                errorElement.classList.remove('show');
                field.style.borderColor = '';
            }
        }
        
        return isValid;
    }
    
    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        // Validate form
        if (!this.validateForm()) {
            return;
        }
        
        // Get form data
        const formData = new FormData(this.form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        this.submitBtn.classList.add('loading');
        this.submitBtn.disabled = true;
        
        // Store in localStorage (since we're front-end only)
        this.saveToLocalStorage(data);
        
        // Simulate submission delay
        await this.simulateSubmission();
        
        // Show success
        this.showSuccess();
        
        // Reset form
        this.form.reset();
        this.submitBtn.classList.remove('loading');
        this.submitBtn.disabled = false;
    }
    
    saveToLocalStorage(data) {
        // Get existing submissions
        const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        
        // Add timestamp
        data.timestamp = new Date().toISOString();
        
        // Add new submission
        submissions.push(data);
        
        // Save back to localStorage
        localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
        
        console.log('Form submission saved:', data);
    }
    
    simulateSubmission() {
        return new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    showSuccess() {
        this.successMessage.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            this.successMessage.classList.remove('show');
        }, 5000);
        
        // Scroll to success message
        this.successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== CV DOWNLOAD =====
class CVDownload {
    constructor() {
        this.cvButtons = document.querySelectorAll('.btn-cv');
        this.init();
    }
    
    init() {
        this.cvButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cvType = button.getAttribute('data-cv');
                this.downloadCV(cvType);
            });
        });
    }
    
    downloadCV(type) {
        // Map CV types to actual file names
        const cvFiles = {
            'general': 'Shika_Akpaloo_CV.pdf',
            'technical': 'Shika_Akpaloo_Pyhon_Programmer_CV.docx',
            'gesi': 'Shika_Akpaloo_Extractives_Governance_CV.docx'
        };
        
        const fileName = cvFiles[type];
        
        // In a real implementation, this would trigger a download
        // For demo purposes, we'll show an alert
        console.log(`Downloading CV: ${fileName}`);
        alert(`CV Download: ${fileName}\n\nIn production, this would download the ${type} CV.`);
        
        // Store download action in localStorage
        const downloads = JSON.parse(localStorage.getItem('cvDownloads') || '[]');
        downloads.push({
            type: type,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('cvDownloads', JSON.stringify(downloads));
    }
}

// ===== SCROLL ANIMATIONS =====
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, this.observerOptions);
        
        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.service-card, .service-detail-item, .about-grid, .stat, .contact-item'
        );
        
        elementsToAnimate.forEach(el => observer.observe(el));
    }
}

// ===== SERVICE CARD INTERACTIONS =====
class ServiceCards {
    constructor() {
        this.cards = document.querySelectorAll('.service-card');
        this.init();
    }
    
    init() {
        this.cards.forEach(card => {
            card.addEventListener('click', () => {
                const serviceType = card.getAttribute('data-service');
                this.navigateToService(serviceType);
            });
        });
    }
    
    navigateToService(type) {
        const servicesSection = document.getElementById('services');
        servicesSection.scrollIntoView({ behavior: 'smooth' });
        
        // Highlight relevant service
        const serviceItems = document.querySelectorAll('.service-detail-item');
        serviceItems.forEach(item => {
            item.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        
        // Add highlight effect (simplified - in production you'd match by data attribute)
        setTimeout(() => {
            serviceItems[0]?.style.background = 'rgba(255, 255, 255, 0.1)';
        }, 500);
    }
}

// ===== UTILITY FUNCTIONS =====
const Utils = {
    // Smooth scroll to top
    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    },
    
    // Get all form submissions from localStorage
    getContactSubmissions() {
        return JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
    },
    
    // Get CV download history
    getCVDownloads() {
        return JSON.parse(localStorage.getItem('cvDownloads') || '[]');
    },
    
    // Clear localStorage (for testing)
    clearStorage() {
        localStorage.removeItem('contactSubmissions');
        localStorage.removeItem('cvDownloads');
        console.log('LocalStorage cleared');
    }
};

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    const navigation = new Navigation();
    const portfolio = new Portfolio();
    const contactForm = new ContactForm();
    const cvDownload = new CVDownload();
    const scrollAnimations = new ScrollAnimations();
    const serviceCards = new ServiceCards();
    
    console.log('Alchemy Partners website initialized');
    console.log('Utils available:', Utils);
    
    // Add utils to window for console access
    window.AlchemyUtils = Utils;
});

// ===== PERFORMANCE OPTIMIZATION =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

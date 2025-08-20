// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Fechar menu mobile ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Scroll suave para seções
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // Altura da navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

   
    // Adicionar evento de clique para todos os links de navegação
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            scrollToSection(sectionId);
        });
    });

    // Função global para ser chamada pelo botão
    window.scrollToSection = scrollToSection;

    // Scroll spy - destacar seção ativa no menu
    function updateActiveSection() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Remover classe active de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adicionar classe active ao link correspondente
                const activeLink = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Intersection Observer para animações de fade in
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar todos os elementos com classe fade-in
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // Navbar scroll effect
    function handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 15, 15, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.background = 'rgba(15, 15, 15, 0.9)';
            navbar.style.backdropFilter = 'blur(20px)';
        }
    }

    // Event listeners para scroll
    window.addEventListener('scroll', function() {
        updateActiveSection();
        handleNavbarScroll();
    });

    // Animação de hover nos cards de projetos
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Formulário de contato
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Pegar os dados do formulário
        const formData = new FormData(this);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simular envio (aqui você adicionaria a lógica real de envio)
        showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
        
        // Limpar formulário
        this.reset();
    });

    // Função para mostrar notificações
    function showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#10B981' : '#3B82F6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            transform: translateX(400px);
            transition: all 0.3s ease;
            max-width: 300px;
            font-weight: 500;
        `;
        
        // Adicionar ao DOM
        document.body.appendChild(notification);
        
        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remover após 4 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Animação de typing effect para o título (opcional)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Efeito parallax suave no hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroContent = document.querySelector('.hero-content');
        
        if (hero && heroContent) {
            const rate = scrolled * -0.5;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });

    // Smooth scroll polyfill para navegadores mais antigos
    if (!('scrollBehavior' in document.documentElement.style)) {
        const smoothScrollPolyfill = function(element, to, duration) {
            const start = element.scrollTop;
            const change = to - start;
            const startTime = performance.now();

            function animateScroll(currentTime) {
                const timeElapsed = currentTime - startTime;
                const progress = Math.min(timeElapsed / duration, 1);
                
                element.scrollTop = start + change * easeInOutQuad(progress);
                
                if (progress < 1) {
                    requestAnimationFrame(animateScroll);
                }
            }

            function easeInOutQuad(t) {
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            }

            requestAnimationFrame(animateScroll);
        };

        // Aplicar polyfill se necessário
        window.smoothScrollPolyfill = smoothScrollPolyfill;
    }

    // Inicializar animações
    updateActiveSection();
    handleNavbarScroll();
    
    // Adicionar classe visible aos elementos que já estão na viewport
    setTimeout(() => {
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.classList.add('visible');
            }
        });
    }, 100);
});

// Função para redimensionamento responsivo
window.addEventListener('resize', function() {
    // Fechar menu mobile se aberto ao redimensionar
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
});

// Preloader simples (opcional)
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Adicionar classe fade-in-delay para elementos que devem aparecer com delay
    const delayElements = document.querySelectorAll('.fade-in-delay');
    delayElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('visible');
        }, index * 200);
    });
});
// EmailJS integration
(function() {
    emailjs.init("SEU_USER_ID"); // Pegue no site do EmailJS
  })();

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    emailjs.sendForm('service_970v94s', 'SEU_TEMPLATE_ID', this)
      .then(function() {
        alert('Mensagem enviada com sucesso!');
      }, function(error) {
        alert('Erro ao enviar: ' + JSON.stringify(error));
      });
  });
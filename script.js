document.addEventListener('DOMContentLoaded', function() {
    // Loading screen
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1500);
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    overlay.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Animate stats counting
    const statItems = document.querySelectorAll('.stat-item h3');
    
    function animateStats() {
        statItems.forEach(item => {
            const target = +item.getAttribute('data-count');
            const count = +item.innerText;
            const increment = target / 50;
            
            if (count < target) {
                item.innerText = Math.ceil(count + increment);
                setTimeout(animateStats, 30);
            } else {
                item.innerText = target;
            }
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('stats')) {
                    animateStats();
                }
                
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
   
    
    // Show items of selected category
    window.showItems = function(category) {
        const itemsContainer = document.getElementById('items-container');
        itemsContainer.innerHTML = '';
        itemsContainer.style.display = 'grid';
        
        const categoryProducts = products[category];
        
        categoryProducts.forEach(product => {
            const itemCard = document.createElement('div');
            itemCard.className = 'item-card fade-in';
            itemCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <div class="item-info">
                    <h4>${product.name}</h4>
                    <p>${product.description}</p>
                    <p class="item-price">${product.price}</p>
                </div>
            `;
            itemsContainer.appendChild(itemCard);
        });
        
        // Scroll to items section
        setTimeout(() => {
            itemsContainer.scrollIntoView({ behavior: 'smooth' });
        }, 300);
    };
    
    // Rating system with stars
    const stars = document.querySelectorAll('.stars-input i');
    const ratingValue = document.getElementById('rating-value');
    
    stars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = this.getAttribute('data-rating');
            ratingValue.value = rating;
            
            stars.forEach(s => {
                if (s.getAttribute('data-rating') <= rating) {
                    s.classList.add('active');
                    s.classList.remove('far');
                    s.classList.add('fas');
                } else {
                    s.classList.remove('active');
                    s.classList.remove('fas');
                    s.classList.add('far');
                }
            });
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        this.classList.add('submitting');
        
        setTimeout(() => {
            this.classList.remove('submitting');
            this.reset();
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.</p>
            `;
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 1500);
    });
    
    // Review form handling
    const reviewForm = document.getElementById('review-form');
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (ratingValue.value === '0') {
            alert('Por favor selecciona una calificación con las estrellas.');
            return;
        }
        
        // Simulate form submission
        this.classList.add('submitting');
        
        setTimeout(() => {
            this.classList.remove('submitting');
            this.reset();
            
            // Reset stars
            stars.forEach(star => {
                star.classList.remove('active');
                star.classList.remove('fas');
                star.classList.add('far');
            });
            ratingValue.value = '0';
            
            // Show success message
            const successMsg = document.createElement('div');
            successMsg.className = 'form-success';
            successMsg.innerHTML = `
                <i class="fas fa-check-circle"></i>
                <p>Gracias por tu opinión y calificación.</p>
            `;
            this.parentNode.insertBefore(successMsg, this.nextSibling);
            
            // Remove message after 5 seconds
            setTimeout(() => {
                successMsg.remove();
            }, 5000);
        }, 1500);
    });
    
    // Newsletter form handling
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            this.classList.add('submitting');
            
            setTimeout(() => {
                this.classList.remove('submitting');
                this.reset();
                
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.className = 'form-success';
                successMsg.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>¡Gracias por suscribirte! Pronto recibirás nuestras novedades.</p>
                `;
                this.parentNode.insertBefore(successMsg, this.nextSibling);
                
                // Remove message after 5 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 5000);
            }, 1500);


            
        });
    }
});


// Acordeón de términos
function initTermsAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const content = header.nextElementSibling;
            const icon = header.querySelector('i');
            
            // Cerrar todos los demás items
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = null;
                    otherItem.querySelector('i').classList.remove('fa-chevron-up');
                    otherItem.querySelector('i').classList.add('fa-chevron-down');
                }
            });
            
            // Alternar el item actual
            item.classList.toggle('active');
            
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                content.style.maxHeight = null;
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });
    
    // Abrir el primer item por defecto
    const firstItem = document.querySelector('.accordion-item');
    if (firstItem) {
        firstItem.classList.add('active');
        const firstContent = firstItem.querySelector('.accordion-content');
        firstContent.style.maxHeight = firstContent.scrollHeight + 'px';
        firstItem.querySelector('i').classList.remove('fa-chevron-down');
        firstItem.querySelector('i').classList.add('fa-chevron-up');
    }
}

// Checkbox de aceptación de términos
function initTermsAcceptance() {
    const acceptCheckbox = document.getElementById('accept-checkbox');
    const acceptBtn = document.getElementById('accept-btn');
    
    if (acceptCheckbox && acceptBtn) {
        acceptCheckbox.addEventListener('change', () => {
            acceptBtn.disabled = !acceptCheckbox.checked;
        });
        
        acceptBtn.addEventListener('click', () => {
            alert('Gracias por aceptar nuestros Términos y Condiciones.');
            // Aquí podrías redirigir al usuario o guardar su aceptación en una base de datos
        });
    }
}

// Fecha de actualización
function setCurrentDate() {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date();
    const dateElement = document.getElementById('current-date');
    
    if (dateElement) {
        dateElement.textContent = today.toLocaleDateString('es-ES', options);
    }
}

// Inicializar funciones cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setCurrentDate();
    initTermsAccordion();
    initTermsAcceptance();
});

// Datos de ejemplo para los productos (actualizado)
const products = {
    'ninos': [
        { name: 'Conjunto deportivo niño', description: 'Talla 8, excelente estado, marca Nike', price: '$150', image: 'https://images.unsplash.com/photo-1604917015761-60ad8b2ad271?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Pantalones jeans', description: 'Talla 10, poco uso, color azul', price: '$120', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Chamarra de invierno', description: 'Talla 6, como nueva, abrigada', price: '$200', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'ninas': [
        { name: 'Vestido floreado', description: 'Talla 7, perfecto estado, primavera', price: '$180', image: 'https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Falda escolar', description: 'Talla 8, sin detalles, color azul marino', price: '$100', image: 'https://images.unsplash.com/photo-1599552683575-aada6acfa812?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Sweater de lana', description: 'Talla 6, color rosa, invierno', price: '$130', image: 'https://images.unsplash.com/photo-1604911197221-61a3b826d9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'mujer-fiesta': [
        { name: 'Vestido de noche negro', description: 'Talla M, elegante, marca Zara', price: '$350', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Conjunto de gala', description: 'Talla S, usado una vez, premium', price: '$400', image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Vestido largo rojo', description: 'Talla M, perfecto estado, seda', price: '$380', image: 'https://images.unsplash.com/photo-1551232864-3f123740e9ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'mujer-casual': [
        { name: 'Jeans mom fit', description: 'Talla 28, excelente estado, Levi\'s', price: '$200', image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Blusa de seda', description: 'Talla M, color beige, casual', price: '$150', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Chamarra de mezclilla', description: 'Talla S, poco uso, oversize', price: '$250', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'hombre-fiesta': [
        { name: 'Traje de negocios', description: 'Talla 40, color azul marino, slim fit', price: '$500', image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Smoking negro', description: 'Talla 42, usado dos veces, premium', price: '$600', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Chaleco de vestir', description: 'Talla M, color gris, elegante', price: '$180', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'hombre-casual': [
        { name: 'Jeans slim fit', description: 'Talla 32, color azul, marca Wrangler', price: '$220', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Camisa de cuadros', description: 'Talla L, roja y negra, casual', price: '$150', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Sudadera con capucha', description: 'Talla M, color negro, básica', price: '$180', image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    
    'zapatos': [
        { name: 'Tacones negros', description: 'Talla 6, poco uso, cómodos', price: '$249', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Zapatos formales', description: 'Talla 8, piel genuina', price: '$299', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Sneakers deportivos', description: 'Talla 9, marca Adidas', price: '$279', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'mochilas': [
        { name: 'Mochila escolar', description: 'Color negro, varios compartimentos', price: '$199', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Morral deportivo', description: 'Impermeable, ligero', price: '$229', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Mochila vintage', description: 'Estilo retro, cuero genuino', price: '$259', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'accesorios': [
        { name: 'Cinturón de cuero', description: 'Talla M, color café', price: '$99', image: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Gafas de sol', description: 'Estilo aviador, protección UV', price: '$129', image: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Bolsa de mano', description: 'Pequeña, elegante, color negro', price: '$149', image: 'https://images.unsplash.com/photo-1591348278863-a8fb3887e2aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    'deportiva': [
        { name: 'Leggings deportivos', description: 'Talla M, compresión media', price: '$159', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Top deportivo', description: 'Talla S, soporte alto', price: '$129', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
        { name: 'Shorts de running', description: 'Talla L, tejido transpirable', price: '$139', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' }
    ],
    
};


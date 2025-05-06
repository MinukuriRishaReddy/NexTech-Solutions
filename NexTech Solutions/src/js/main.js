// Scroll Navigation Effect
const navbar = document.querySelector('.navbar');
const backToTop = document.querySelector('.back-to-top');

window.addEventListener('scroll', function() {
  // Navbar background change on scroll
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  // Back to top button visibility
  if (window.scrollY > 500) {
    backToTop.classList.add('active');
  } else {
    backToTop.classList.remove('active');
  }
});

// Form validation
document.addEventListener('DOMContentLoaded', function() {
  // Get all forms with the 'needs-validation' class
  const forms = document.querySelectorAll('.needs-validation');
  
  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      } else {
        event.preventDefault();
        // Show success message
        const formElements = form.elements;
        for (let i = 0; i < formElements.length; i++) {
          formElements[i].disabled = true;
        }
        
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Message Sent!';
        
        setTimeout(() => {
          form.reset();
          for (let i = 0; i < formElements.length; i++) {
            formElements[i].disabled = false;
          }
          submitBtn.innerHTML = originalText;
        }, 3000);
      }
      
      form.classList.add('was-validated');
    }, false);
  });
  
  // Newsletter form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', event => {
      event.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      
      if (emailInput.value.trim() !== '') {
        emailInput.disabled = true;
        submitBtn.disabled = true;
        
        const originalText = submitBtn.innerText;
        submitBtn.innerHTML = '<i class="bi bi-check-circle me-2"></i>Subscribed!';
        
        setTimeout(() => {
          newsletterForm.reset();
          emailInput.disabled = false;
          submitBtn.disabled = false;
          submitBtn.innerText = originalText;
        }, 3000);
      }
    });
  }
});

// Animate stats counter
document.addEventListener('DOMContentLoaded', function() {
  const counters = document.querySelectorAll('.counter');
  const speed = 200;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.innerText);
        let count = 0;
        
        const updateCount = () => {
          const increment = target / speed;
          
          if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 1);
          } else {
            counter.innerText = target;
          }
        };
        
        updateCount();
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.4 });
  
  counters.forEach(counter => {
    observer.observe(counter);
  });
});

// Smooth scroll for anchor links
document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
  
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL
        history.pushState(null, null, targetId);
      }
    });
  });
});

// Back to top button
document.addEventListener('DOMContentLoaded', function() {
  const backToTopButton = document.querySelector('.back-to-top');
  
  if (backToTopButton) {
    backToTopButton.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});

// Add animation to elements when they come into view
document.addEventListener('DOMContentLoaded', function() {
  const animatedElements = document.querySelectorAll('.service-card, .team-card, .mission-card, .value-card, .contact-info-card');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '0';
        entry.target.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
          entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animatedElements.forEach(element => {
    element.style.opacity = '0';
    observer.observe(element);
  });
});
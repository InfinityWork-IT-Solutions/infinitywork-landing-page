const FORM_SUBMISSION_URL = 'https://script.google.com/macros/s/AKfycbyKEKljnsOKzk_3WimSD-Jgx2VeXa7ApNyLP7FDYUyEvAD4vFde03YWm-eZHYCmK9hKrQ/exec';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('leadForm');
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, select, textarea');
        if (input) {
            input.addEventListener('blur', function() {
                validateField(group, input);
            });

            input.addEventListener('input', function() {
                if (group.classList.contains('error')) {
                    validateField(group, input);
                }
            });
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        formGroups.forEach(group => {
            const input = group.querySelector('input, select, textarea');
            if (input && input.hasAttribute('required')) {
                if (!validateField(group, input)) {
                    isValid = false;
                }
            }
        });

        if (isValid) {
            submitForm();
        }
    });

    function validateField(group, input) {
        const errorMessage = group.querySelector('.error-message');
        let isValid = true;
        let message = '';

        if (input.hasAttribute('required') && !input.value.trim()) {
            isValid = false;
            message = 'This field is required';
        } else if (input.type === 'email' && input.value.trim()) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        } else if (input.type === 'tel' && input.value.trim()) {
            const phoneRegex = /^[\d\s+()-]+$/;
            if (!phoneRegex.test(input.value.trim()) || input.value.trim().length < 10) {
                isValid = false;
                message = 'Please enter a valid phone number';
            }
        } else if (input.tagName === 'SELECT' && input.hasAttribute('required') && !input.value) {
            isValid = false;
            message = 'Please select an option';
        }

        if (!isValid) {
            group.classList.add('error');
            if (errorMessage) {
                errorMessage.textContent = message;
            }
        } else {
            group.classList.remove('error');
            if (errorMessage) {
                errorMessage.textContent = '';
            }
        }

        return isValid;
    }

    function submitForm() {
        const submitBtn = form.querySelector('.btn-submit');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');
        const successMessage = form.querySelector('.form-success');

        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';

        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };

        console.log('Form submitted:', formData);

        if (FORM_SUBMISSION_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            console.warn('Google Apps Script URL not configured. Please follow GOOGLE_SHEETS_SETUP.md');
            alert('Form configuration incomplete. Please contact the administrator.');
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            return;
        }

        fetch(FORM_SUBMISSION_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(() => {
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            form.reset();
            successMessage.style.display = 'block';

            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);

            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Lead Generation',
                    'event_label': 'Contact Form'
                });
            }
        })
        .catch(error => {
            console.error('Form submission error:', error);
            submitBtn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            alert('There was an error submitting your form. Please try again or contact us directly at mpumelelo@infinityworkitsolutions.com');
        });
    }

    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 1)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.service-card, .benefit-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
// Add interactive functionality to TheLintstones landing page

document.addEventListener('DOMContentLoaded', () => {

    // Sticky Header Logic
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('nav-active');

            // Toggle generic icon visual (bars <-> cross)
            const icon = mobileMenuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.replace('fa-bars', 'fa-xmark');
            } else {
                icon.classList.replace('fa-xmark', 'fa-bars');
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon.classList.contains('fa-xmark')) {
                    icon.classList.replace('fa-xmark', 'fa-bars');
                }
            });
        });
    }

    // Form Submission Handler
    const leadForm = document.getElementById('leadForm');

    if (leadForm) {
        leadForm.addEventListener('submit', function (e) {
            e.preventDefault(); // Prevent page reload

            // Get values
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            // Format data for simple logging or future API integration
            const formData = {
                name: name,
                phone: phone,
                message: message,
                source: 'Lead Generation Form (Landing Page)'
            };

            console.log('Sending lead to backend:', formData);

            // Visual feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;

            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            submitBtn.style.backgroundColor = '#4caf50'; // Success green

            // Simulate API request delay
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received!';

                // Reset form
                leadForm.reset();

                // Revert button after a few seconds
                setTimeout(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.style.backgroundColor = ''; // Revert to CSS default
                }, 3000);

                // Optional: Trigger an alert or a modal thanking the user
                alert('Thank you, ' + name + '! We have received your request and will contact you shortly regarding the $149 special.');

            }, 1000);
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's an anchor on this page, ignoring simple "#"
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Offset for fixed header
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });
});

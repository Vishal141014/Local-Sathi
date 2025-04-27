document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    feather.replace();
    
    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuBtn.classList.toggle('active');
    });

    // Animate elements that aren't using animate.css
    const animateElements = document.querySelectorAll('.feature-card, .demo-info, .contact-form');
    
    // Add animation classes to elements
    animateElements.forEach((element, index) => {
        element.classList.add('animate-on-scroll');
        
        // Add delay classes based on index within parent
        const siblings = Array.from(element.parentElement.children);
        const indexInParent = siblings.indexOf(element);
        
        if (indexInParent === 0) {
            element.classList.add('animate-delay-1');
        } else if (indexInParent === 1) {
            element.classList.add('animate-delay-2');
        } else if (indexInParent === 2) {
            element.classList.add('animate-delay-3');
        }
    });
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // For custom animations
                entry.target.style.opacity = '1';
                
                // For animate.css animations
                if (!entry.target.classList.contains('animate__animated')) {
                    entry.target.classList.add('animate__animated', 'animate__fadeIn');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observe all animate elements
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add hover animations to interactive elements
    const interactiveElements = document.querySelectorAll('.cta-btn, .pricing-btn, .social-icons a');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            element.classList.add('animate__animated', 'animate__pulse');
        });
        
        element.addEventListener('animationend', () => {
            element.classList.remove('animate__animated', 'animate__pulse');
        });
    });
    
    // Simple chat demo functionality
    const chatInput = document.querySelector('.chat-input input');
    const chatButton = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Sample responses for the demo
    const botResponses = {
        'hello': 'Hi there! How can I help you today?',
        'hi': 'Hello! What can I do for you?',
        'pricing': 'Our pricing starts at ₹599/month for the Basic plan. Would you like me to share more details?',
        'plans': 'We offer three plans: Basic (₹599/month), Business (₹999/month), and Premium (₹1499/month). Each offers different features to suit your needs.',
        'contact': 'You can reach our team at syntax@samurai.com or call us at +91 99999999.',
        'demo': 'You\'re using our demo right now! Feel free to ask any questions about SmartAssist.',
        'features': 'SmartAssist offers instant replies, human handoff for complex queries, and detailed analytics. Is there a specific feature you\'d like to know more about?',
        'business hours': 'We\'re available 24/7 to help your customers, so you never miss an opportunity!',
        'whatsapp': 'Yes, WhatsApp integration is available with our Business (₹999/month) and Premium (₹1499/month) plans.',
        'telegram': 'Telegram integration is available with all our plans, starting from our Basic plan at ₹599/month.'
    };
    
    // Default fallback response
    const defaultResponse = "Thanks for your message. In a full version, I'd answer this question using AI. Would you like to try our free trial to see SmartAssist in action?";
    
    // Send message function
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Add user message
        const userMessageElement = document.createElement('div');
        userMessageElement.classList.add('message', 'user', 'animate__animated', 'animate__fadeInRight');
        userMessageElement.innerHTML = `<p>${message}</p>`;
        chatMessages.appendChild(userMessageElement);
        
        // Clear input
        chatInput.value = '';
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot', 'typing-indicator', 'animate__animated', 'animate__fadeIn');
        typingIndicator.innerHTML = `<p><span class="dot"></span><span class="dot"></span><span class="dot"></span></p>`;
        chatMessages.appendChild(typingIndicator);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Simulate bot typing
        setTimeout(() => {
            // Remove typing indicator
            chatMessages.removeChild(typingIndicator);
            
            // Check for matching responses
            let botResponse = defaultResponse;
            for (const [key, response] of Object.entries(botResponses)) {
                if (message.toLowerCase().includes(key)) {
                    botResponse = response;
                    break;
                }
            }
            
            // Add bot response
            const botMessageElement = document.createElement('div');
            botMessageElement.classList.add('message', 'bot', 'animate__animated', 'animate__fadeInLeft');
            botMessageElement.innerHTML = `<p>${botResponse}</p>`;
            chatMessages.appendChild(botMessageElement);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1500);
    };
    
    // Event listeners for chat
    chatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Smooth scroll for navigation links with animation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
                
                // Highlight section when scrolled to
                setTimeout(() => {
                    target.classList.add('highlight-section');
                    setTimeout(() => {
                        target.classList.remove('highlight-section');
                    }, 1000);
                }, 500);
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation to logo
    const logo = document.querySelector('.logo h1');
    logo.addEventListener('mouseenter', () => {
        logo.classList.add('animate__animated', 'animate__rubberBand');
    });
    
    logo.addEventListener('animationend', () => {
        logo.classList.remove('animate__animated', 'animate__rubberBand');
    });
}); 
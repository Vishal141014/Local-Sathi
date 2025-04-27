document.addEventListener('DOMContentLoaded', () => {
    // Initialize Feather icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Language selector functionality
    const currentLang = localStorage.getItem('preferredLanguage') || 'en';
    
    // Dynamic language switcher (For demo purposes)
    const setupLanguageSelector = () => {
        // Create language selector element
        const langSelectorContainer = document.createElement('div');
        langSelectorContainer.className = 'language-selector';
        
        const languages = [
            { code: 'en', name: 'English' },
            { code: 'hi', name: 'हिंदी' },
            { code: 'bn', name: 'বাংলা' },
            { code: 'mr', name: 'मराठी' }
        ];
        
        // Create language options
        languages.forEach(lang => {
            const langOption = document.createElement('button');
            langOption.className = `lang-option ${currentLang === lang.code ? 'active' : ''}`;
            langOption.setAttribute('data-lang', lang.code);
            langOption.textContent = lang.name;
            
            langOption.addEventListener('click', () => {
                document.querySelectorAll('.lang-option').forEach(opt => opt.classList.remove('active'));
                langOption.classList.add('active');
                changeLanguage(lang.code);
            });
            
            langSelectorContainer.appendChild(langOption);
        });
        
        // Add to header
        const headerContainer = document.querySelector('header .container');
        headerContainer.appendChild(langSelectorContainer);
    };
    
    setupLanguageSelector();
    
    // Language translations 
    const translations = {
        en: {
            greeting: 'Hi there! I\'m Local Sathi. How can I help you today?',
            businessHours: 'We provide 24/7 support for your customers! So you never miss a business opportunity, even when you\'re busy or offline.',
            pricing: 'We offer three affordable plans: Basic at ₹599/month, Business at ₹1999/month with a 14-day free trial, and Premium at ₹1499/month. Each plan has different features to suit your business needs!',
            whatsapp: 'Yes, WhatsApp integration is available with our Business (₹1999/month) and Premium (₹1499/month) plans.',
            telegram: 'Telegram integration is available with all our plans, starting from our Basic plan at ₹599/month.',
            features: 'Local Sathi offers instant replies, human handoff for complex queries, and detailed analytics. Is there a specific feature you\'d like to know more about?',
            demoPrompt: 'Ask something...',
            defaultResponse: 'Thanks for your message. In a full version, I\'d answer this question using AI. Would you like to try our free trial to see Local Sathi in action?'
        },
        hi: {
            greeting: 'नमस्ते! मैं लोकल साथी हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
            businessHours: 'हम आपके ग्राहकों के लिए 24/7 सपोर्ट प्रदान करते हैं! ताकि आप व्यस्त या ऑफलाइन होने पर भी कोई बिजनेस अवसर न चूकें।',
            pricing: 'हम तीन किफायती प्लान प्रदान करते हैं: बेसिक ₹599/महीना, बिजनेस ₹1999/महीना 14-दिन फ्री ट्रायल के साथ, और प्रीमियम ₹1499/महीना। प्रत्येक प्लान में आपके व्यापार की आवश्यकताओं के अनुसार अलग-अलग सुविधाएँ हैं!',
            whatsapp: 'हां, व्हाट्सएप इंटीग्रेशन हमारे बिजनेस (₹1999/महीना) और प्रीमियम (₹1499/महीना) प्लान के साथ उपलब्ध है।',
            telegram: 'टेलीग्राम इंटीग्रेशन हमारे सभी प्लान के साथ उपलब्ध है, जो हमारे बेसिक प्लान ₹599/महीना से शुरू होता है।',
            features: 'लोकल साथी तुरंत जवाब, जटिल प्रश्नों के लिए मानव हस्तांतरण, और विस्तृत विश्लेषण प्रदान करता है। क्या आप किसी विशेष सुविधा के बारे में अधिक जानना चाहते हैं?',
            demoPrompt: 'कुछ पूछें...',
            defaultResponse: 'आपके संदेश के लिए धन्यवाद। पूर्ण संस्करण में, मैं इस प्रश्न का उत्तर AI का उपयोग करके दूंगा। क्या आप लोकल साथी को एक्शन में देखने के लिए हमारे फ्री ट्रायल को आज़माना चाहेंगे?'
        },
        bn: {
            greeting: 'হ্যালো! আমি লোকাল সাথী। আজ আপনাকে কীভাবে সাহায্য করতে পারি?',
            businessHours: 'আমরা আপনার গ্রাহকদের জন্য 24/7 সমর্থন প্রদান করি! তাই আপনি ব্যস্ত বা অফলাইন থাকলেও কোনও ব্যবসায়িক সুযোগ মিস করবেন না।',
            pricing: 'আমরা তিনটি সাশ্রয়ী মূল্যের প্ল্যান অফার করি: বেসিক ₹599/মাস, বিজনেস ₹999/মাস 14-দিনের ফ্রি ট্রায়ালের সাথে, এবং প্রিমিয়াম ₹1499/মাস। প্রতিটি প্ল্যানে আপনার ব্যবসার প্রয়োজনের উপযোগী আলাদা বৈশিষ্ট্য রয়েছে!',
            demoPrompt: 'কিছু জিজ্ঞাসা করুন...',
            defaultResponse: 'আপনার বার্তার জন্য ধন্যবাদ। একটি সম্পূর্ণ সংস্করণে, আমি AI ব্যবহার করে এই প্রশ্নের উত্তর দেব। আপনি কি লোকাল সাথী কার্যকরণে দেখতে আমাদের ফ্রি ট্রায়াল চেষ্টা করতে চান?'
        },
        mr: {
            greeting: 'नमस्कार! मी लोकल साथी आहे. मी आज तुमची कशी मदत करू शकतो?',
            businessHours: 'आम्ही तुमच्या ग्राहकांना 24/7 सपोर्ट देतो! म्हणजे तुम्ही व्यस्त किंवा ऑफलाइन असलात तरी तुम्ही कोणताही व्यावसायिक संधी चुकवणार नाही.',
            pricing: 'आम्ही तीन परवडणारे प्लॅन्स ऑफर करतो: बेसिक ₹599/महिना, बिझनेस ₹999/महिना 14-दिवसांच्या मोफत ट्रायलसह, आणि प्रीमियम ₹1499/महिना. प्रत्येक प्लॅनमध्ये तुमच्या व्यवसायाच्या गरजांनुसार वेगवेगळी वैशिष्ट्ये आहेत!',
            demoPrompt: 'काही विचारा...',
            defaultResponse: 'तुमच्या संदेशाबद्दल धन्यवाद. पूर्ण आवृत्तीमध्ये, मी या प्रश्नाचे उत्तर AI वापरून देईन. तुम्हाला लोकल साथी कृतीत पाहण्यासाठी आमची फ्री ट्रायल वापरून पाहायला आवडेल का?'
        }
    };
    
    function changeLanguage(langCode) {
        localStorage.setItem('preferredLanguage', langCode);
        
        // Update placeholder text
        const chatInput = document.querySelector('.chat-input input');
        if (chatInput) {
            chatInput.placeholder = translations[langCode].demoPrompt || 'Ask something...';
        }
        
        // For a real implementation, this would update all text content
        // But for this demo, we'll just refresh the chat
        refreshChatDemo(langCode);
    }
    
    function refreshChatDemo(langCode) {
        const chatMessages = document.querySelector('.chat-messages');
        if (!chatMessages) return;
        
        // Clear existing messages
        chatMessages.innerHTML = '';
        
        // Add initial bot message based on language
        const botGreeting = document.createElement('div');
        botGreeting.classList.add('message', 'bot', 'animate__animated', 'animate__fadeInLeft');
        botGreeting.innerHTML = `<p>👋 ${translations[langCode].greeting}</p>`;
        chatMessages.appendChild(botGreeting);
    }
    
    // Call change language with stored preference
    changeLanguage(currentLang);

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
    
    // Theme switcher for business types
    const setupThemeSwitcher = () => {
        const themeOptions = [
            { name: 'Default', color: '#FF78AC' },
            { name: 'Restaurant', color: '#E67E22' },
            { name: 'Healthcare', color: '#3498DB' },
            { name: 'Education', color: '#9B59B6' },
            { name: 'Retail', color: '#2ECC71' }
        ];
        
        const themeContainer = document.createElement('div');
        themeContainer.className = 'theme-switcher';
        themeContainer.innerHTML = '<h4>Try Different Business Themes:</h4><div class="theme-options"></div>';
        
        const optionsContainer = themeContainer.querySelector('.theme-options');
        
        themeOptions.forEach(theme => {
            const themeBtn = document.createElement('button');
            themeBtn.className = 'theme-option';
            themeBtn.style.backgroundColor = theme.color;
            themeBtn.setAttribute('title', theme.name);
            themeBtn.setAttribute('data-theme', theme.name.toLowerCase());
            
            themeBtn.addEventListener('click', () => {
                document.documentElement.style.setProperty('--pink', theme.color);
                document.querySelectorAll('.theme-option').forEach(btn => btn.classList.remove('active'));
                themeBtn.classList.add('active');
            });
            
            optionsContainer.appendChild(themeBtn);
        });
        
        // Add to the demo section
        const demoSection = document.querySelector('.demo .container');
        if (demoSection) {
            demoSection.appendChild(themeContainer);
        }
    };
    
    setupThemeSwitcher();
    
    // Simple chat demo functionality
    const chatInput = document.querySelector('.chat-input input');
    const chatButton = document.querySelector('.chat-input button');
    const chatMessages = document.querySelector('.chat-messages');
    
    // Send message function
    const sendMessage = () => {
        const message = chatInput.value.trim();
        if (message === '') return;
        
        // Get current language
        const currentLang = localStorage.getItem('preferredLanguage') || 'en';
        
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
            
            // Generate appropriate response based on language and message content
            let botResponse = translations[currentLang].defaultResponse;
            
            // Check for pricing-related keywords
            if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost') || 
                message.toLowerCase().includes('pricing') || message.toLowerCase().includes('plans')) {
                botResponse = translations[currentLang].pricing;
            } 
            // Check for free trial related questions
            else if (message.toLowerCase().includes('trial') || message.toLowerCase().includes('free')) {
                botResponse = 'Yes, we offer a 14-day free trial with our Business plan! You can test all the features and cancel anytime during the trial period. After the trial, it\'s just ₹999/month.';
            }
            // Check for business hours
            else if (message.toLowerCase().includes('hour') || message.toLowerCase().includes('timing') || 
                     message.toLowerCase().includes('time') || message.toLowerCase().includes('open')) {
                botResponse = translations[currentLang].businessHours;
            }
            // Check for features
            else if (message.toLowerCase().includes('feature') || message.toLowerCase().includes('do') || 
                     message.toLowerCase().includes('offer') || message.toLowerCase().includes('provide')) {
                botResponse = translations[currentLang].features;
            }
            // Check for WhatsApp
            else if (message.toLowerCase().includes('whatsapp')) {
                botResponse = translations[currentLang].whatsapp;
            }
            // Check for Telegram
            else if (message.toLowerCase().includes('telegram')) {
                botResponse = translations[currentLang].telegram;
            }
            
            // Add voice response capability
            const useSpeech = document.querySelector('.enable-voice-response')?.checked;
            if (useSpeech && 'speechSynthesis' in window) {
                const speech = new SpeechSynthesisUtterance(botResponse);
                speech.lang = currentLang === 'en' ? 'en-US' : 
                              currentLang === 'hi' ? 'hi-IN' : 
                              currentLang === 'bn' ? 'bn-IN' : 'mr-IN';
                window.speechSynthesis.speak(speech);
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
    if (chatButton) {
        chatButton.addEventListener('click', sendMessage);
    }
    
    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    // Add voice recognition capability
    const setupVoiceSupport = () => {
        const demoInfo = document.querySelector('.demo-info');
        if (!demoInfo) return;
        
        const voiceContainer = document.createElement('div');
        voiceContainer.className = 'voice-support';
        
        // Voice response toggle
        const voiceResponseToggle = document.createElement('div');
        voiceResponseToggle.className = 'toggle-container';
        voiceResponseToggle.innerHTML = `
            <label class="switch">
                <input type="checkbox" class="enable-voice-response">
                <span class="slider round"></span>
            </label>
            <span>Enable Voice Responses</span>
        `;
        
        // Voice input button
        const voiceInputBtn = document.createElement('button');
        voiceInputBtn.className = 'voice-input-btn';
        voiceInputBtn.innerHTML = '<i data-feather="mic"></i> Speak to Local Sathi';
        
        // Check if browser supports speech recognition
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();
            
            const currentLang = localStorage.getItem('preferredLanguage') || 'en';
            recognition.lang = currentLang === 'en' ? 'en-US' : 
                              currentLang === 'hi' ? 'hi-IN' : 
                              currentLang === 'bn' ? 'bn-IN' : 'mr-IN';
            
            recognition.continuous = false;
            
            voiceInputBtn.addEventListener('click', () => {
                voiceInputBtn.classList.add('listening');
                recognition.start();
            });
            
            recognition.onresult = function(event) {
                const transcript = event.results[0][0].transcript;
                if (chatInput) {
                    chatInput.value = transcript;
                    setTimeout(() => sendMessage(), 500);
                }
                voiceInputBtn.classList.remove('listening');
            };
            
            recognition.onerror = function() {
                voiceInputBtn.classList.remove('listening');
            };
            
            recognition.onend = function() {
                voiceInputBtn.classList.remove('listening');
            };
            
            voiceContainer.appendChild(voiceResponseToggle);
            voiceContainer.appendChild(voiceInputBtn);
            demoInfo.appendChild(voiceContainer);
            
            // Initialize feather icons for the mic button
            feather.replace();
        }
    };
    
    setupVoiceSupport();

    // Smooth scroll for navigation links with animation
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });
    
    // Add animation classes on scroll
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    function checkScroll() {
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.visibility = 'visible';
                if (element.classList.contains('animate__fadeIn') || 
                    element.classList.contains('animate__fadeInLeft') || 
                    element.classList.contains('animate__fadeInRight') || 
                    element.classList.contains('animate__fadeInUp')) {
                    // Element already has animation class
                } else {
                    element.classList.add('animate__fadeIn');
                }
            }
        });
    }
    
    // Run once on page load
    checkScroll();
    
    // Run on scroll
    window.addEventListener('scroll', checkScroll);
    
    // CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-btn');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const href = this.getAttribute('data-href') || 'form.html';
            window.location.href = href;
        });
    });
    
    // Add animation to logo
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.addEventListener('mouseenter', () => {
            logo.classList.add('animate__animated', 'animate__rubberBand');
        });
        
        logo.addEventListener('animationend', () => {
            logo.classList.remove('animate__animated', 'animate__rubberBand');
        });
    }
    
    // Lazy loading for images
    const lazyLoadImages = () => {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
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
            
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers that don't support Intersection Observer
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    };
    
    lazyLoadImages();
    
    // Optimize images by adding data-src attributes
    const optimizeImages = () => {
        const images = document.querySelectorAll('img:not([data-src]):not([data-no-optimize])');
        images.forEach(img => {
            // Skip if the image is already loaded (particularly external images)
            if (img.complete && img.naturalHeight !== 0) return;
            
            const src = img.src;
            img.setAttribute('data-src', src);
            img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
        });
        lazyLoadImages();
    };
    
    // Enable image optimization
    optimizeImages();
}); 
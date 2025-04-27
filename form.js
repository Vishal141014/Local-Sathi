// Form page functionality for Local Sathi
document.addEventListener('DOMContentLoaded', function() {
    // Get plan from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const planType = urlParams.get('plan') || 'premium'; // Default to premium if no plan specified
    const isTrial = urlParams.get('trial') === 'true';
    
    // Update plan information based on selection
    updatePlanInfo(planType, isTrial);
    
    // Language selector functionality
    setupLanguageSelector();
    
    // Multi-step form functionality
    setupMultiStepForm(planType, isTrial);
});

// Global plans object
const plans = {
    'basic': {
        price: '₹599',
        features: [
            'Standard customer support',
            'Basic service access',
            'Regular request handling',
            'Office hours assistance',
            'No member benefits'
        ]
    },
    'standard': {
        price: '₹999',
        features: [
            'Premium customer support',
            'Full service access',
            'Priority request handling',
            'Extended hours assistance',
            'Basic member benefits',
            '24/7 local assistance',
            'Exclusive member benefits'
        ]
    },
    'premium': {
        price: '₹1499',
        features: [
            'VIP customer support',
            'Unlimited service access',
            'Priority request handling',
            '24/7 local assistance',
            'Exclusive member benefits'
        ]
    },
    'enterprise': {
        price: '₹2599',
        features: [
            'Dedicated account manager',
            'Custom integration options',
            'Volume discounts',
            '24/7 priority support',
            'Customized solution'
        ]
    }
};

function updatePlanInfo(planType, isTrial) {
    const planSummaryTitle = document.getElementById('plan-summary-title');
    const priceTag = document.querySelector('.price-tag');
    const featureTexts = document.querySelectorAll('.feature-item span');
    
    // Get selected plan or default to premium
    const selectedPlan = plans[planType] || plans['premium'];
    
    // Update plan title based on the selected plan
    if (planSummaryTitle) {
        const planName = planType.charAt(0).toUpperCase() + planType.slice(1);
        planSummaryTitle.textContent = isTrial 
            ? `${planName} Plan - Free Trial` 
            : `${planName} Plan Summary`;
    }
    
    // Update price
    if (priceTag) {
        if (isTrial) {
            priceTag.innerHTML = `<span class="trial-badge">14-Day Free Trial</span>`;
            
            // Add trial info text
            const trialInfo = document.createElement('p');
            trialInfo.className = 'trial-info';
            trialInfo.innerHTML = `Then ${selectedPlan.price}<span class="price-period">/month</span>`;
            priceTag.appendChild(trialInfo);
            
            // Add cancel anytime text
            const cancelInfo = document.createElement('p');
            cancelInfo.className = 'cancel-info';
            cancelInfo.innerHTML = 'Cancel anytime during trial';
            priceTag.appendChild(cancelInfo);
        } else if (planType === 'enterprise') {
            priceTag.innerHTML = `${selectedPlan.price}`;
        } else {
            priceTag.innerHTML = `${selectedPlan.price}<span class="price-period">/month</span>`;
        }
    }
    
    // Update features
    if (featureTexts && featureTexts.length > 0) {
        selectedPlan.features.forEach((feature, index) => {
            if (index < featureTexts.length) {
                featureTexts[index].textContent = feature;
            }
        });
    }
    
    // Update form title and subtitle for trials
    const formTitle = document.getElementById('form-title');
    const formSubtitle = document.getElementById('form-subtitle');
    
    if (formTitle && isTrial) {
        formTitle.textContent = `Start Your Free Trial`;
    }
    
    if (formSubtitle && isTrial) {
        formSubtitle.textContent = `Complete your details to begin your 14-day free trial`;
    }
    
    // Add CSS classes for trial styling
    if (isTrial) {
        const planSummary = document.querySelector('.plan-summary');
        if (planSummary) {
            planSummary.classList.add('trial-mode');
        }
    }

    // Update QR code information (Step 2)
    updateQRCodeInfo(planType, selectedPlan.price, isTrial);
}

function updateQRCodeInfo(planType, price, isTrial) {
    const planNameElement = document.getElementById('qr-plan-name');
    const planPriceElement = document.getElementById('qr-plan-price');
    const selectedPlanNameElement = document.getElementById('selected-plan-name');
    const selectedPlanPriceElement = document.getElementById('selected-plan-price');
    
    if (planNameElement && planPriceElement) {
        const planName = planType.charAt(0).toUpperCase() + planType.slice(1);
        planNameElement.textContent = isTrial 
            ? `${planName} Plan - Free Trial` 
            : `${planName} Plan`;
        
        planPriceElement.textContent = price;
        
        // Set dynamic values in the plan summary section as well
        if (selectedPlanNameElement) {
            selectedPlanNameElement.textContent = `${planName} Plan`;
        }
        
        if (selectedPlanPriceElement) {
            selectedPlanPriceElement.innerHTML = `${price}<span class="price-period">/month</span>`;
        }
        
        // Generate reference number for success message
        const referenceNumberElement = document.getElementById('reference-number');
        if (referenceNumberElement) {
            const randomRef = Math.floor(100000 + Math.random() * 900000);
            referenceNumberElement.textContent = `REF-${randomRef}`;
        }
    }
    
    // Set deep link for payment apps based on the plan price
    setupPaymentDeepLink(planType, price);
}

function setupPaymentDeepLink(planType, price) {
    // Extract the numeric value from the price (remove ₹ symbol)
    const priceValue = price.replace('₹', '');
    
    // Get payment buttons
    const paymentButtons = document.querySelectorAll('.payment-platforms img');
    
    // Set UPI payment deep links for different apps
    if (paymentButtons && paymentButtons.length > 0) {
        const upiId = document.getElementById('payment-upi').textContent;
        const paymentDesc = `LocalSathi ${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan Payment`;
        
        // Add click handlers for payment apps
        paymentButtons.forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', function() {
                const appName = this.alt.toLowerCase();
                let deepLink = '';
                
                // Create appropriate deep links for different payment apps
                if (appName.includes('paytm')) {
                    deepLink = `paytmmp://pay?pa=${upiId}&pn=LocalSathi&am=${priceValue}&cu=INR&tn=${paymentDesc}`;
                } else if (appName.includes('google')) {
                    deepLink = `gpay://upi/pay?pa=${upiId}&pn=LocalSathi&am=${priceValue}&cu=INR&tn=${paymentDesc}`;
                } else if (appName.includes('phonepe')) {
                    deepLink = `phonepe://pay?pa=${upiId}&pn=LocalSathi&am=${priceValue}&cu=INR&tn=${paymentDesc}`;
                } else if (appName.includes('upi')) {
                    deepLink = `upi://pay?pa=${upiId}&pn=LocalSathi&am=${priceValue}&cu=INR&tn=${paymentDesc}`;
                }
                
                // Open the deep link
                if (deepLink) {
                    window.location.href = deepLink;
                }
            });
        });
    }
}

function setupLanguageSelector() {
    const languageToggle = document.getElementById('languageToggle');
    const languageDropdown = document.getElementById('languageDropdown');
    const langOptions = document.querySelectorAll('.lang-option');
    const currentFlag = document.getElementById('currentFlag');
    const currentLanguage = document.getElementById('currentLanguage');
    
    // Language translations
    const translations = {
        'en': {
            'form-title': 'Subscribe to Local Sathi',
            'form-subtitle': 'Complete your subscription details below to get started',
            'personal-info-title': 'Personal Information',
            'name-label': 'Full Name',
            'email-label': 'Email Address',
            'phone-label': 'Phone Number',
            'address-label': 'Address',
            'business-name-label': 'Business Name',
            'business-type-label': 'Business Type',
            'payment-title': 'Payment Information',
            'payment-instructions': 'Please scan the QR code below to make payment for your selected plan.',
            'transaction-title': 'Transaction Details',
            'transaction-instructions': 'Please provide the transaction details for verification.',
            'transaction-id-label': 'Transaction ID/Reference Number',
            'transaction-date-label': 'Payment Date',
            'payment-method-label': 'Payment Method',
            'payment-screenshot-label': 'Payment Screenshot (optional)',
            'cancel-btn': 'Cancel',
            'success-title': 'Thank You for Your Subscription!',
            'success-message-text': 'We have received your payment details. Our team will verify your payment and contact you within 24 hours to set up your Local Sathi account. If you have any questions, please feel free to contact us.',
            'contact-email': 'support@localsathi.com',
            'contact-phone': '+91 9876543210',
            'home-link': 'Back to Home',
            'footer-tagline': 'Your trusted local companion for all services and support.',
            'footer-quick-links': 'Quick Links',
            'footer-home': 'Home',
            'footer-services': 'Services',
            'footer-pricing': 'Pricing',
            'footer-contact': 'Contact',
            'footer-services-title': 'Services',
            'footer-service-1': 'Home Assistance',
            'footer-service-2': 'Local Guide',
            'footer-service-3': 'Business Support',
            'footer-service-4': 'Language Help',
            'footer-contact-title': 'Contact Us',
            'footer-address': '123 Main Street, Kathmandu, Nepal',
            'footer-phone': '+977 98XXXXXXXX',
            'footer-email': 'info@localsathi.com',
            'footer-copyright': '© 2023 Local Sathi. All rights reserved.'
        },
        'ne': {
            'form-title': 'लोकल साथी सदस्यता लिनुहोस्',
            'form-subtitle': 'सुरु गर्न तपाईंको सदस्यता विवरणहरू पूरा गर्नुहोस्',
            'personal-info-title': 'व्यक्तिगत जानकारी',
            'name-label': 'पूरा नाम',
            'email-label': 'इमेल ठेगाना',
            'phone-label': 'फोन नम्बर',
            'address-label': 'ठेगाना',
            'business-name-label': 'व्यापारको नाम',
            'business-type-label': 'व्यापारको प्रकार',
            'payment-title': 'भुक्तानी जानकारी',
            'payment-instructions': 'कृपया तपाईंको चयन गरिएको योजनाको भुक्तानी गर्न तलको QR कोड स्क्यान गर्नुहोस्।',
            'transaction-title': 'लेनदेन विवरणहरू',
            'transaction-instructions': 'कृपया प्रमाणीकरणका लागि लेनदेन विवरणहरू प्रदान गर्नुहोस्।',
            'transaction-id-label': 'लेनदेन आईडी/सन्दर्भ नम्बर',
            'transaction-date-label': 'भुक्तानी मिति',
            'payment-method-label': 'भुक्तानी विधि',
            'payment-screenshot-label': 'भुक्तानी स्क्रिनशट (वैकल्पिक)',
            'cancel-btn': 'रद्द गर्नुहोस्',
            'success-title': 'तपाईंको सदस्यताको लागि धन्यवाद!',
            'success-message-text': 'हामीले तपाईंको भुक्तानी विवरणहरू प्राप्त गरेका छौं। हाम्रो टोलीले तपाईंको भुक्तानी प्रमाणित गर्नेछ र तपाईंको लोकल साथी खाता सेटअप गर्न 24 घण्टा भित्र तपाईंलाई सम्पर्क गर्नेछ। यदि तपाईंसँग कुनै प्रश्नहरू छन् भने, कृपया हामीलाई सम्पर्क गर्न नहिचकिचाउनुहोस्।',
            'contact-email': 'support@localsathi.com',
            'contact-phone': '+९१ ९८७६५४३२१०',
            'home-link': 'गृह पृष्ठमा फर्कनुहोस्',
            'footer-tagline': 'सबै सेवा र समर्थनका लागि तपाईंको विश्वासिलो स्थानीय साथी।',
            'footer-quick-links': 'द्रुत लिङ्कहरू',
            'footer-home': 'गृह पृष्ठ',
            'footer-services': 'सेवाहरू',
            'footer-pricing': 'मूल्य निर्धारण',
            'footer-contact': 'सम्पर्क',
            'footer-services-title': 'सेवाहरू',
            'footer-service-1': 'घर सहायता',
            'footer-service-2': 'स्थानीय गाइड',
            'footer-service-3': 'व्यापार समर्थन',
            'footer-service-4': 'भाषा मद्दत',
            'footer-contact-title': 'हामीलाई सम्पर्क गर्नुहोस्',
            'footer-address': '१२३ मुख्य सडक, काठमाडौं, नेपाल',
            'footer-phone': '+९७७ ९८XXXXXXXX',
            'footer-email': 'info@localsathi.com',
            'footer-copyright': '© २०२३ लोकल साथी। सबै अधिकार सुरक्षित।'
        },
        'hi': {
            'form-title': 'लोकल साथी की सदस्यता लें',
            'form-subtitle': 'शुरू करने के लिए अपना सदस्यता विवरण पूरा करें',
            'personal-info-title': 'व्यक्तिगत जानकारी',
            'name-label': 'पूरा नाम',
            'email-label': 'ईमेल पता',
            'phone-label': 'फोन नंबर',
            'address-label': 'पता',
            'business-name-label': 'व्यापार का नाम',
            'business-type-label': 'व्यापार का प्रकार',
            'payment-title': 'भुगतान की जानकारी',
            'payment-instructions': 'अपने चुने हुए प्लान के लिए भुगतान करने के लिए कृपया नीचे दिए गए QR कोड को स्कैन करें।',
            'transaction-title': 'लेनदेन विवरण',
            'transaction-instructions': 'कृपया सत्यापन के लिए लेनदेन विवरण प्रदान करें।',
            'transaction-id-label': 'लेनदेन आईडी/संदर्भ संख्या',
            'transaction-date-label': 'भुगतान तिथि',
            'payment-method-label': 'भुगतान का तरीका',
            'payment-screenshot-label': 'भुगतान स्क्रीनशॉट (वैकल्पिक)',
            'cancel-btn': 'रद्द करें',
            'success-title': 'आपकी सदस्यता के लिए धन्यवाद!',
            'success-message-text': 'हमें आपका भुगतान विवरण प्राप्त हो गया है। हमारी टीम आपके भुगतान को सत्यापित करेगी और आपका लोकल साथी खाता सेट करने के लिए 24 घंटे के भीतर आपसे संपर्क करेगी। यदि आपके कोई प्रश्न हैं, तो कृपया हमसे संपर्क करने में संकोच न करें।',
            'contact-email': 'support@localsathi.com',
            'contact-phone': '+९१ ९८७६५४३२१०',
            'home-link': 'होम पेज पर वापस जाएं',
            'footer-tagline': 'सभी सेवाओं और समर्थन के लिए आपका विश्वसनीय स्थानीय साथी।',
            'footer-quick-links': 'त्वरित लिंक',
            'footer-home': 'होम',
            'footer-services': 'सेवाएं',
            'footer-pricing': 'मूल्य निर्धारण',
            'footer-contact': 'संपर्क करें',
            'footer-services-title': 'सेवाएं',
            'footer-service-1': 'घर सहायता',
            'footer-service-2': 'स्थानीय गाइड',
            'footer-service-3': 'व्यापार समर्थन',
            'footer-service-4': 'भाषा सहायता',
            'footer-contact-title': 'हमसे संपर्क करें',
            'footer-address': '१२३ मुख्य मार्ग, काठमांडू, नेपाल',
            'footer-phone': '+९७७ ९८XXXXXXXX',
            'footer-email': 'info@localsathi.com',
            'footer-copyright': '© २०२३ लोकल साथी। सर्वाधिकार सुरक्षित।'
        }
    };
    
    // Toggle language dropdown
    if (languageToggle) {
        languageToggle.addEventListener('click', function() {
            languageDropdown.classList.toggle('show');
        });
    }
    
    // Close language dropdown when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.language-selector')) {
            languageDropdown.classList.remove('show');
        }
    });
    
    // Change language functionality
    if (langOptions) {
        langOptions.forEach(option => {
            option.addEventListener('click', function() {
                const lang = this.getAttribute('data-lang');
                const imgSrc = this.querySelector('img').getAttribute('src');
                const langText = this.querySelector('span').textContent;
                
                // Update toggle button
                currentFlag.setAttribute('src', imgSrc);
                currentLanguage.textContent = langText;
                
                // Set language in localStorage
                localStorage.setItem('preferredLanguage', lang);
                
                // Update content with translations
                changeLanguage(lang);
                
                // Close dropdown
                languageDropdown.classList.remove('show');
            });
        });
    }
    
    // Function to change language on the page
    function changeLanguage(lang) {
        const translationObj = translations[lang];
        
        for (const key in translationObj) {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = translationObj[key];
            }
        }
    }
    
    // Check and apply saved language preference
    function applyLanguagePreference() {
        const savedLang = localStorage.getItem('preferredLanguage');
        if (savedLang) {
            const option = document.querySelector(`.lang-option[data-lang="${savedLang}"]`);
            if (option) {
                const imgSrc = option.querySelector('img').getAttribute('src');
                const langText = option.querySelector('span').textContent;
                
                currentFlag.setAttribute('src', imgSrc);
                currentLanguage.textContent = langText;
                
                changeLanguage(savedLang);
            }
        }
    }
    
    // Apply language preference on load
    applyLanguagePreference();
}

function setupMultiStepForm(planType, isTrial) {
    // Step elements
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const step3 = document.getElementById('step-3');
    const step4 = document.getElementById('step-4');
    
    // Step indicators
    const stepIndicators = document.querySelectorAll('.step');
    const stepConnectors = document.querySelectorAll('.step-connector');
    
    // Buttons
    const nextStep1Button = document.getElementById('next-step-1');
    const backStep1Button = document.getElementById('back-step-1');
    const nextStep2Button = document.getElementById('next-step-2');
    const backStep2Button = document.getElementById('back-step-2');
    const submitFormButton = document.getElementById('submit-form');
    const cancelButton = document.getElementById('cancel-btn');
    
    // Form inputs - Step 1
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const businessName = document.getElementById('businessName');
    const businessType = document.getElementById('businessType');
    
    // Form inputs - Step 3
    const transactionId = document.getElementById('transactionId');
    const transactionDate = document.getElementById('transactionDate');
    const paymentMethod = document.getElementById('paymentMethod');
    
    // Set current date as default for transaction date
    if (transactionDate) {
        const today = new Date().toISOString().split('T')[0];
        transactionDate.value = today;
    }
    
    // Step 1 to Step 2
    if (nextStep1Button) {
        nextStep1Button.addEventListener('click', function() {
            // Validate Step 1
            if (validateStep1()) {
                // Show Step 2
                step1.style.display = 'none';
                step2.style.display = 'block';
                
                // Update step indicators
                updateStepIndicators(2);
            }
        });
    }
    
    // Step 2 back to Step 1
    if (backStep1Button) {
        backStep1Button.addEventListener('click', function() {
            step2.style.display = 'none';
            step1.style.display = 'grid';
            updateStepIndicators(1);
        });
    }
    
    // Step 2 to Step 3
    if (nextStep2Button) {
        nextStep2Button.addEventListener('click', function() {
            step2.style.display = 'none';
            step3.style.display = 'block';
            updateStepIndicators(3);
        });
    }
    
    // Step 3 back to Step 2
    if (backStep2Button) {
        backStep2Button.addEventListener('click', function() {
            step3.style.display = 'none';
            step2.style.display = 'block';
            updateStepIndicators(2);
        });
    }
    
    // Submit form (Step 3 to Step 4)
    if (submitFormButton) {
        submitFormButton.addEventListener('click', function(event) {
            // Prevent default form submission
            event.preventDefault();
            
            // Validate Step 3
            if (validateStep3()) {
                try {
                    // Generate a unique reference number
                    const referenceNumber = `REF-${Math.floor(100000 + Math.random() * 900000)}`;
                    
                    // Display reference number in the success message
                    const refNumberElement = document.getElementById('reference-number');
                    if (refNumberElement) {
                        refNumberElement.textContent = referenceNumber;
                    }
                    
                    const refDisplayElement = document.getElementById('reference-display');
                    if (refDisplayElement) {
                        refDisplayElement.textContent = referenceNumber;
                    }
                    
                    // Show Step 4 (Success message)
                    if (step3) step3.style.display = 'none';
                    if (step4) step4.style.display = 'flex';
                    updateStepIndicators(4);
                    
                    // Modify URL without refreshing to prevent automatic redirect
                    if (window.history && window.history.pushState) {
                        const newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + '?complete=true';
                        window.history.pushState({path: newurl}, '', newurl);
                    }
                    
                    // Set up the home link to navigate properly without causing issues
                    const homeLink = document.getElementById('home-link');
                    if (homeLink) {
                        // Replace existing link with a button that looks like a link
                        const homeButton = document.createElement('button');
                        homeButton.className = 'home-link';
                        homeButton.id = 'home-link-btn';
                        homeButton.textContent = homeLink.textContent;
                        homeButton.addEventListener('click', function() {
                            // Use this safe method to navigate
                            document.location.href = 'index.html';
                        });
                        
                        // Replace the original link
                        homeLink.parentNode.replaceChild(homeButton, homeLink);
                    }
                    
                    // Log form data
                    console.log('Form data submitted:', {
                        plan: planType,
                        isTrial: isTrial,
                        fullName: fullName.value,
                        email: email.value,
                        phone: phone.value,
                        address: address.value,
                        businessName: businessName.value,
                        businessType: businessType.value,
                        transactionId: transactionId.value,
                        transactionDate: transactionDate.value,
                        paymentMethod: paymentMethod.value,
                        referenceNumber: referenceNumber
                    });
                    
                    // Add the copy button functionality
                    const copyBtn = document.getElementById('copy-reference-btn');
                    if (copyBtn) {
                        // Remove any existing event listeners to prevent duplicates
                        const newCopyBtn = copyBtn.cloneNode(true);
                        copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);
                        
                        newCopyBtn.addEventListener('click', function() {
                            const textToCopy = referenceNumber;
                            
                            // Use a fallback method for clipboard
                            const textarea = document.createElement('textarea');
                            textarea.value = textToCopy;
                            textarea.setAttribute('readonly', '');
                            textarea.style.position = 'absolute';
                            textarea.style.left = '-9999px';
                            document.body.appendChild(textarea);
                            textarea.select();
                            document.execCommand('copy');
                            document.body.removeChild(textarea);
                            
                            // Show success indicator
                            const originalHTML = this.innerHTML;
                            this.innerHTML = '<i class="fas fa-check"></i>';
                            setTimeout(() => {
                                this.innerHTML = originalHTML;
                            }, 1500);
                        });
                    }
                    
                    // Store submission data
                    const submissionData = {
                        id: Date.now(),
                        customer: fullName.value,
                        plan: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan`,
                        amount: plans[planType].price,
                        date: new Date().toISOString().split('T')[0],
                        status: 'pending',
                        email: email.value,
                        phone: phone.value,
                        address: address.value,
                        businessName: businessName.value,
                        businessType: businessType.value,
                        transactionId: transactionId.value,
                        transactionDate: transactionDate.value,
                        paymentMethod: paymentMethod.value,
                        referenceNumber: referenceNumber
                    };
                    
                    // Always save to localStorage as a backup
                    const existingSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]');
                    existingSubmissions.push(submissionData);
                    localStorage.setItem('formSubmissions', JSON.stringify(existingSubmissions));
                    
                    // Try to send to server API
                    fetch('http://localhost:3000/api/submissions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(submissionData),
                        // Add these options to prevent page reload/refresh
                        cache: 'no-cache',
                        redirect: 'follow',
                        referrerPolicy: 'no-referrer',
                        mode: 'cors'
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(data => {
                        console.log('Server success:', data);
                    })
                    .catch((error) => {
                        console.error('Server error:', error);
                        // Already saved to localStorage above
                    });
                    
                } catch (err) {
                    console.error('Error in form submission:', err);
                    alert('There was an error submitting the form. Please try again.');
                }
            }
        });
    }
    
    // Cancel button redirects to pricing page
    if (cancelButton) {
        cancelButton.addEventListener('click', function(e) {
            e.preventDefault();
            // Use direct assignment to prevent any interception
            document.location.href = 'pricing.html'; 
        });
    }
    
    // Update step indicators
    function updateStepIndicators(currentStep) {
        stepIndicators.forEach((indicator, index) => {
            // Convert from 0-based index to 1-based step number
            const stepNumber = index + 1;
            
            if (stepNumber === currentStep) {
                indicator.classList.add('active');
                indicator.classList.remove('completed');
            } else if (stepNumber < currentStep) {
                indicator.classList.remove('active');
                indicator.classList.add('completed');
            } else {
                indicator.classList.remove('active');
                indicator.classList.remove('completed');
            }
        });
        
        // Update connectors
        stepConnectors.forEach((connector, index) => {
            // There are only n-1 connectors for n steps
            if (index < currentStep - 1) {
                connector.classList.add('active');
            } else {
                connector.classList.remove('active');
            }
        });
    }
    
    // Validation functions
    function validateStep1() {
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isAddressValid = validateAddress();
        const isBusinessNameValid = validateBusinessName();
        const isBusinessTypeValid = validateBusinessType();
        
        return isFullNameValid && isEmailValid && isPhoneValid && 
               isAddressValid && isBusinessNameValid && isBusinessTypeValid;
    }
    
    function validateStep3() {
        const isTransactionIdValid = validateTransactionId();
        const isTransactionDateValid = validateTransactionDate();
        const isPaymentMethodValid = validatePaymentMethod();
        
        return isTransactionIdValid && isTransactionDateValid && isPaymentMethodValid;
    }
    
    function validateFullName() {
        if (fullName.value.trim() === '') {
            showError(fullName, 'fullName-error', true);
            return false;
        }
        showError(fullName, 'fullName-error', false);
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            showError(email, 'email-error', true);
            return false;
        }
        showError(email, 'email-error', false);
        return true;
    }
    
    function validatePhone() {
        const phoneRegex = /^[0-9+\-\s]{6,15}$/;
        if (!phoneRegex.test(phone.value.trim())) {
            showError(phone, 'phone-error', true);
            return false;
        }
        showError(phone, 'phone-error', false);
        return true;
    }
    
    function validateAddress() {
        if (address.value.trim() === '') {
            showError(address, 'address-error', true);
            return false;
        }
        showError(address, 'address-error', false);
        return true;
    }
    
    function validateBusinessName() {
        if (businessName.value.trim() === '') {
            showError(businessName, 'businessName-error', true);
            return false;
        }
        showError(businessName, 'businessName-error', false);
        return true;
    }
    
    function validateBusinessType() {
        if (businessType.value === '' || businessType.value === null) {
            showError(businessType, 'businessType-error', true);
            return false;
        }
        showError(businessType, 'businessType-error', false);
        return true;
    }
    
    function validateTransactionId() {
        if (transactionId.value.trim() === '') {
            showError(transactionId, 'transactionId-error', true);
            return false;
        }
        showError(transactionId, 'transactionId-error', false);
        return true;
    }
    
    function validateTransactionDate() {
        if (transactionDate.value === '') {
            showError(transactionDate, 'transactionDate-error', true);
            return false;
        }
        showError(transactionDate, 'transactionDate-error', false);
        return true;
    }
    
    function validatePaymentMethod() {
        if (paymentMethod.value === '' || paymentMethod.value === null) {
            showError(paymentMethod, 'paymentMethod-error', true);
            return false;
        }
        showError(paymentMethod, 'paymentMethod-error', false);
        return true;
    }
    
    // Helper function to show/hide error messages
    function showError(input, errorId, show) {
        const errorElement = document.getElementById(errorId);
        if (errorElement) {
            if (show) {
                input.classList.add('error');
                errorElement.style.display = 'block';
            } else {
                input.classList.remove('error');
                errorElement.style.display = 'none';
            }
        }
    }
    
    // Add input event listeners for real-time validation
    if (fullName) fullName.addEventListener('blur', validateFullName);
    if (email) email.addEventListener('blur', validateEmail);
    if (phone) phone.addEventListener('blur', validatePhone);
    if (address) address.addEventListener('blur', validateAddress);
    if (businessName) businessName.addEventListener('blur', validateBusinessName);
    if (businessType) businessType.addEventListener('blur', validateBusinessType);
    if (transactionId) transactionId.addEventListener('blur', validateTransactionId);
    if (transactionDate) transactionDate.addEventListener('blur', validateTransactionDate);
    if (paymentMethod) paymentMethod.addEventListener('blur', validatePaymentMethod);
} 
// Enhanced JavaScript for SHAH IMRAN Payment Page - 3D Theme
document.addEventListener('DOMContentLoaded', function() {
    // Initialize enhanced animations and effects
    initializeEnhancedEffects();
    
    // Elements
    const openPaymentFormBtn = document.getElementById('openPaymentForm');
    const closePaymentFormBtn = document.getElementById('closePaymentForm');
    const paymentFormModal = document.getElementById('paymentFormModal');
    const showPaymentOptionsBtn = document.getElementById('showPaymentOptions');
    const paymentModal = document.getElementById('paymentModal');
    const closeModalBtn = document.getElementById('closeModal');
    const completePaymentBtns = document.querySelectorAll('.payment-button');
    const successModal = document.getElementById('successModal');
    const successCloseButtons = document.querySelectorAll('.success-close');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentMethodSelect = document.getElementById('paymentMethod');
    const sendMoneyOptions = document.getElementById('sendMoneyOptions');
    const paymentOptions = document.getElementById('paymentOptions');
    const copyButtons = document.querySelectorAll('.copy-number');
    const successDetails = document.getElementById('successDetails');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const amountInput = document.getElementById('amount');
    const directPaymentLinks = document.querySelectorAll('.direct-payment-link');
    const tabItems = document.querySelectorAll('.tab-item');
    const tabContents = document.querySelectorAll('.tab-content');
    const copyWhatsappLinkBtn = document.getElementById('copyWhatsappLink');

    // Enhanced 3D Effects and Animations
    function initializeEnhancedEffects() {
        // Add parallax effect to floating shapes
        const shapes = document.querySelectorAll('.shape');
        let mouseX = 0, mouseY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 100;
            mouseY = (e.clientY / window.innerHeight) * 100;
            
            shapes.forEach((shape, index) => {
                const speed = (index + 1) * 0.5;
                const x = (mouseX - 50) * speed;
                const y = (mouseY - 50) * speed;
                
                shape.style.transform = `translate(${x}px, ${y}px) rotate(${x * 0.1}deg)`;
            });
        });

        // Add 3D tilt effect to cards
        const cards = document.querySelectorAll('.card-hover-3d');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transformStyle = 'preserve-3d';
            });

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;
                
                card.style.transform = `
                    translateY(-8px) 
                    perspective(1000px) 
                    rotateX(${rotateX}deg) 
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });

        // Enhanced button hover effects
        const buttons = document.querySelectorAll('.btn-3d');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', (e) => {
                createRippleEffect(e, button);
            });
        });

        // Add loading states
        const interactiveElements = document.querySelectorAll('[data-loading]');
        interactiveElements.forEach(el => {
            el.addEventListener('click', () => {
                showLoadingState(el);
            });
        });

        // Initialize intersection observer for animations
        initializeScrollAnimations();
    }

    // Create ripple effect on button click
    function createRippleEffect(e, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
            z-index: 1;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    // Add ripple animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
        
        @keyframes modalFadeIn {
            0% {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            100% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes bounceIn {
            0%, 20%, 40%, 60%, 80%, 100% {
                animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
            }
            0% {
                opacity: 0;
                transform: scale3d(.3, .3, .3);
            }
            20% {
                transform: scale3d(1.1, 1.1, 1.1);
            }
            40% {
                transform: scale3d(.9, .9, .9);
            }
            60% {
                opacity: 1;
                transform: scale3d(1.03, 1.03, 1.03);
            }
            80% {
                transform: scale3d(.97, .97, .97);
            }
            100% {
                opacity: 1;
                transform: scale3d(1, 1, 1);
            }
        }
    `;
    document.head.appendChild(style);

    // Initialize scroll-based animations
    function initializeScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'bounceIn 0.8s ease-out';
                    entry.target.style.opacity = '1';
                }
            });
        }, observerOptions);

        // Observe all cards
        document.querySelectorAll('.card-3d').forEach(card => {
            card.style.opacity = '0';
            observer.observe(card);
        });
    }

    // Enhanced modal functions
    function openPaymentForm(e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        paymentFormModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Enhanced entrance animation
        const modalContent = paymentFormModal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeIn 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Focus first input
        setTimeout(() => {
            nameInput.focus();
        }, 300);
        
        return false;
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        document.body.style.overflow = '';
        
        // Add exit animation
        const modalContent = modal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeOut 0.3s ease-in';
    }

    // Enhanced form validation with visual feedback
    function validateForm() {
        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();
        const amount = amountInput.value.trim();
        
        let isValid = true;
        
        // Reset previous error states
        [nameInput, phoneInput, amountInput].forEach(input => {
            input.classList.remove('error');
            input.style.borderColor = '';
        });
        
        if (!name) {
            showFieldError(nameInput, 'নাম প্রয়োজন');
            isValid = false;
        }
        
        if (!phone) {
            showFieldError(phoneInput, 'ফোন নম্বর প্রয়োজন');
            isValid = false;
        } else if (!/^01[3-9]\d{8}$/.test(phone)) {
            showFieldError(phoneInput, 'সঠিক ফোন নম্বর দিন');
            isValid = false;
        }
        
        if (!amount || amount <= 0) {
            showFieldError(amountInput, 'সঠিক পরিমাণ দিন');
            isValid = false;
        }
        
        return isValid;
    }

    function showFieldError(input, message) {
        input.style.borderColor = '#ff3366';
        input.style.boxShadow = '0 0 0 3px rgba(255, 51, 102, 0.3)';
        
        // Create error message element
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.textContent = message;
        errorMsg.style.cssText = `
            color: #ff3366;
            font-size: 0.8rem;
            margin-top: 4px;
            animation: shake 0.5s ease-in-out;
        `;
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        input.parentNode.appendChild(errorMsg);
        
        // Add shake animation
        input.style.animation = 'shake 0.5s ease-in-out';
        
        // Remove error state after user starts typing
        input.addEventListener('input', function clearError() {
            input.style.borderColor = '';
            input.style.boxShadow = '';
            input.style.animation = '';
            errorMsg.remove();
            input.removeEventListener('input', clearError);
        });
    }

    // Enhanced copy functionality with visual feedback
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showCopySuccess();
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            showCopySuccess();
        });
    }

    function showCopySuccess() {
        // Create floating success message
        const successMsg = document.createElement('div');
        successMsg.textContent = 'কপি হয়েছে!';
        successMsg.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
            color: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            animation: copySuccess 2s ease-in-out forwards;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        `;
        
        document.body.appendChild(successMsg);
        
        setTimeout(() => {
            successMsg.remove();
        }, 2000);
    }

    // Enhanced success modal functionality
    function showSuccessModal(formData) {
        const successName = document.getElementById('successName');
        const successPhone = document.getElementById('successPhone');
        const successAmount = document.getElementById('successAmount');
        const successMethod = document.getElementById('successMethod');
        const successTransactionId = document.getElementById('successTransactionId');
        
        if (successName) successName.textContent = formData.name;
        if (successPhone) successPhone.textContent = formData.phone;
        if (successAmount) successAmount.textContent = formData.amount;
        if (successMethod) successMethod.textContent = formData.method;
        if (successTransactionId) successTransactionId.textContent = formData.transactionId;
        
        // Close previous modals
        paymentModal.classList.remove('show');
        
        // Show success modal with enhanced animation
        successModal.classList.add('show');
        
        // Add confetti effect
        createConfettiEffect();
        
        // Play success sound (if available)
        playSuccessSound();
    }

    function createConfettiEffect() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#11998e'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: 50%;
                    z-index: 10000;
                    pointer-events: none;
                    left: ${Math.random() * 100}vw;
                    top: -10px;
                    animation: confetti 3s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    confetti.remove();
                }, 3000);
            }, i * 50);
        }
    }

    function playSuccessSound() {
        // Create audio context for success sound
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 800;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            // Ignore if audio context is not supported
        }
    }

    // Event Listeners with Enhanced Functionality

    // Open payment form modal
    if (openPaymentFormBtn) {
        openPaymentFormBtn.setAttribute('role', 'button');
        openPaymentFormBtn.setAttribute('tabindex', '0');
        
        ['click', 'touchstart'].forEach(eventType => {
            openPaymentFormBtn.addEventListener(eventType, openPaymentForm);
        });
        
        openPaymentFormBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openPaymentForm(e);
            }
        });
    }

    // Close payment form modal
    if (closePaymentFormBtn) {
        closePaymentFormBtn.addEventListener('click', function() {
            closeModal(paymentFormModal);
        });
    }

    // Show payment options with enhanced validation
    if (showPaymentOptionsBtn) {
        showPaymentOptionsBtn.addEventListener('click', function() {
            if (!validateForm()) {
                return;
            }

            // Add loading state
            showPaymentOptionsBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> লোড হচ্ছে...';
            showPaymentOptionsBtn.disabled = true;

            setTimeout(() => {
                closeModal(paymentFormModal);
                paymentModal.classList.add('show');
                document.body.style.overflow = 'hidden';
                
                const selectedMethod = paymentMethodSelect.value;
                showSelectedPaymentOptions(selectedMethod);
                
                // Reset button
                showPaymentOptionsBtn.innerHTML = '<span>পেমেন্ট অপশন দেখুন</span><i class="fas fa-arrow-right"></i>';
                showPaymentOptionsBtn.disabled = false;
            }, 1000);
        });
    }

    // Close payment modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal(paymentModal);
        });
    }

    // Enhanced payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked method
            this.classList.add('active');
            
            // Update hidden select
            const methodValue = this.dataset.method;
            paymentMethodSelect.value = methodValue;
            
            // Add selection animation
            this.style.animation = 'pulse 0.3s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 300);
        });
    });

    // Enhanced tab functionality
    tabItems.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabItems.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            showSelectedPaymentOptions(tabName);
            
            // Add tab switch animation
            const activeContent = document.querySelector(`#${tabName}Options`);
            if (activeContent) {
                activeContent.style.animation = 'tabFadeIn 0.5s ease-in-out';
            }
        });
    });

    // Enhanced copy number functionality
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const number = this.dataset.number;
            copyToClipboard(number);
            
            // Add visual feedback
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> কপি হয়েছে!';
            this.style.background = 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.background = '';
            }, 2000);
        });
    });

    // Enhanced payment completion
    const completeSendMoneyBtn = document.getElementById('completeSendMoneyPayment');
    const completeDirectPaymentBtn = document.getElementById('completeDirectPayment');

    [completeSendMoneyBtn, completeDirectPaymentBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                const transactionId = this.id.includes('SendMoney') ? 
                    document.getElementById('sendMoneyTransactionId').value :
                    document.getElementById('paymentTransactionId').value;
                
                if (!transactionId.trim()) {
                    const input = this.id.includes('SendMoney') ? 
                        document.getElementById('sendMoneyTransactionId') :
                        document.getElementById('paymentTransactionId');
                    showFieldError(input, 'ট্রানজেকশন আইডি প্রয়োজন');
                    return;
                }
                
                // Add loading state
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> প্রক্রিয়াকরণ...';
                this.disabled = true;
                
                setTimeout(() => {
                    const formData = {
                        name: nameInput.value,
                        phone: phoneInput.value,
                        amount: amountInput.value,
                        method: paymentMethodSelect.value === 'send-money' ? 'Send Money' : 'Payment',
                        transactionId: transactionId
                    };
                    
                    showSuccessModal(formData);
                    
                    // Reset button
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 1500);
            });
        }
    });

    // Enhanced success modal close
    successCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeModal(successModal);
            
            // Reset all forms
            document.getElementById('paymentForm').reset();
            const transactionInputs = [
                document.getElementById('sendMoneyTransactionId'),
                document.getElementById('paymentTransactionId')
            ];
            transactionInputs.forEach(input => {
                if (input) input.value = '';
            });
            
            // Reset payment method selection
            paymentMethods.forEach(m => m.classList.remove('active'));
            paymentMethods[0].classList.add('active');
            paymentMethodSelect.value = 'send-money';
        });
    });

    // Enhanced WhatsApp sharing
    const shareWhatsappBtn = document.getElementById('shareWhatsapp');
    if (shareWhatsappBtn) {
        shareWhatsappBtn.addEventListener('click', function() {
            const formData = {
                name: document.getElementById('successName').textContent,
                phone: document.getElementById('successPhone').textContent,
                amount: document.getElementById('successAmount').textContent,
                method: document.getElementById('successMethod').textContent,
                transactionId: document.getElementById('successTransactionId').textContent
            };
            
            const message = `🎉 পেমেন্ট সফল হয়েছে!\n\n📝 বিবরণ:\n👤 নাম: ${formData.name}\n📱 ফোন: ${formData.phone}\n💰 পরিমাণ: ${formData.amount} টাকা\n💳 মাধ্যম: ${formData.method}\n🔢 ট্রানজেকশন ID: ${formData.transactionId}\n\n✅ SHAH IMRAN - আপনার বিশ্বস্ত সেবা`;
            
            const whatsappUrl = `https://wa.me/8801301363728?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });
    }

    // Enhanced copy WhatsApp link
    if (copyWhatsappLinkBtn) {
        copyWhatsappLinkBtn.addEventListener('click', function() {
            const formData = {
                name: document.getElementById('successName').textContent,
                phone: document.getElementById('successPhone').textContent,
                amount: document.getElementById('successAmount').textContent,
                method: document.getElementById('successMethod').textContent,
                transactionId: document.getElementById('successTransactionId').textContent
            };
            
            const message = `🎉 পেমেন্ট সফল হয়েছে!\n\n📝 বিবরণ:\n👤 নাম: ${formData.name}\n📱 ফোন: ${formData.phone}\n💰 পরিমাণ: ${formData.amount} টাকা\n💳 মাধ্যম: ${formData.method}\n🔢 ট্রানজেকশন ID: ${formData.transactionId}\n\n✅ SHAH IMRAN - আপনার বিশ্বস্ত সেবা`;
            
            copyToClipboard(message);
        });
    }

    // Helper function to show selected payment options
    function showSelectedPaymentOptions(method) {
        const sendMoneyDiv = document.getElementById('sendMoneyOptions');
        const paymentDiv = document.getElementById('paymentOptions');
        
        if (method === 'send-money') {
            if (sendMoneyDiv) {
                sendMoneyDiv.classList.add('active');
                sendMoneyDiv.style.display = 'flex';
            }
            if (paymentDiv) {
                paymentDiv.classList.remove('active');
                paymentDiv.style.display = 'none';
            }
        } else {
            if (paymentDiv) {
                paymentDiv.classList.add('active');
                paymentDiv.style.display = 'flex';
            }
            if (sendMoneyDiv) {
                sendMoneyDiv.classList.remove('active');
                sendMoneyDiv.style.display = 'none';
            }
        }
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            if (successModal.classList.contains('show')) {
                closeModal(successModal);
            } else if (paymentModal.classList.contains('show')) {
                closeModal(paymentModal);
            } else if (paymentFormModal.classList.contains('show')) {
                closeModal(paymentFormModal);
            }
        }
    });

    // Enhanced click outside to close
    [paymentFormModal, paymentModal, successModal].forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    // Initialize enhanced animations on load
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Add additional CSS for enhanced animations
    const additionalStyles = document.createElement('style');
    additionalStyles.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes copySuccess {
            0% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.5);
            }
            20% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1.1);
            }
            80% {
                opacity: 1;
                transform: translate(-50%, -50%) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
        
        @keyframes confetti {
            0% {
                transform: translateY(-10px) rotateZ(0deg);
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotateZ(720deg);
                opacity: 0;
            }
        }
        
        @keyframes modalFadeOut {
            0% {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
        }
        
        .loaded {
            animation: pageLoad 1s ease-out;
        }
        
        @keyframes pageLoad {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(additionalStyles);

    // Performance optimization: Lazy load images
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

    // Enhanced accessibility
    function enhanceAccessibility() {
        // Add ARIA labels
        const buttons = document.querySelectorAll('button, [role="button"]');
        buttons.forEach(button => {
            if (!button.getAttribute('aria-label') && button.textContent) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });

        // Add focus management
        const focusableElements = document.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        focusableElements.forEach(element => {
            element.addEventListener('focus', function() {
                this.style.outline = '3px solid rgba(102, 126, 234, 0.5)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = '';
                this.style.outlineOffset = '';
            });
        });
    }

    enhanceAccessibility();

    console.log('🎉 Enhanced SHAH IMRAN Payment System Initialized Successfully!');
    console.log('✨ Features: 3D Animations, Modern UI, Enhanced UX');
});

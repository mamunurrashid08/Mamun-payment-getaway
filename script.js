// Main JavaScript for Mamunur Rashid eShop Payment Page
document.addEventListener('DOMContentLoaded', function() {
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
    const cardOptions = document.getElementById('cardOptions');
    const copyButtons = document.querySelectorAll('.copy-number');
    const successDetails = document.getElementById('successDetails');
    const nameInput = document.getElementById('name');
    const phoneInput = document.getElementById('phone');
    const amountInput = document.getElementById('amount');
    const ziinaPayBtn = document.getElementById('ziinaPay');

    // Function to open payment form modal - used by both click and touch events
    function openPaymentForm(e) {
        // Prevent default behavior to avoid keyboard popup
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        paymentFormModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = paymentFormModal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeIn 0.4s';
        
        // Return false to prevent any default behavior
        return false;
    }
    
    // Open payment form modal - add both click and touchstart events for mobile compatibility
    if (openPaymentFormBtn) {
        // Since we're now using a div instead of a button, ensure it's not focusable in a way that triggers keyboard
        openPaymentFormBtn.setAttribute('role', 'button');
        openPaymentFormBtn.setAttribute('tabindex', '0');
        
        // Add click event for desktop
        openPaymentFormBtn.addEventListener('click', function(e) {
            return openPaymentForm(e);
        });
        
        // Add touchstart event for mobile
        openPaymentFormBtn.addEventListener('touchstart', function(e) {
            return openPaymentForm(e);
        });
        
        // Add touchend event for mobile to prevent any default behavior
        openPaymentFormBtn.addEventListener('touchend', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        });
        
        // Add keyboard support for accessibility
        openPaymentFormBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                return openPaymentForm(e);
            }
        });
    }

    // Close payment form modal
    closePaymentFormBtn.addEventListener('click', function() {
        paymentFormModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Show payment options
    showPaymentOptionsBtn.addEventListener('click', function() {
        // Validate form
        if (!validateForm()) {
            return;
        }

        paymentFormModal.classList.remove('show');
        paymentModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Show the correct payment options based on selected method
        const selectedMethod = paymentMethodSelect.value;
        showSelectedPaymentOptions(selectedMethod);
    });

    // Close payment options modal
    closeModalBtn.addEventListener('click', function() {
        paymentModal.classList.remove('show');
        document.body.style.overflow = '';
    });

    // Complete payment buttons (including the ones in all tabs)
    completePaymentBtns.forEach(button => {
        if (button.id === 'openPaymentForm') return; // Skip the main payment button
        
        button.addEventListener('click', function() {
            const paymentMethod = paymentMethodSelect.value;
            
            // Validate transaction ID based on payment method
            let isValid = true;
            let transactionId = '';
            
            if (paymentMethod === 'send-money') {
                const transactionIdInput = document.getElementById('sendMoneyTransactionId');
                if (transactionIdInput && !transactionIdInput.value.trim()) {
                    transactionIdInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                    alert('অনুগ্রহ করে ট্রানজেকশন আইডি লিখুন');
                    return;
                } else if (transactionIdInput) {
                    transactionIdInput.style.borderColor = '';
                    transactionId = transactionIdInput.value;
                }
            } else if (paymentMethod === 'card') {
                const transactionIdInput = document.getElementById('cardTransactionId');
                if (transactionIdInput && !transactionIdInput.value.trim()) {
                    transactionIdInput.style.borderColor = 'var(--error-color)';
                    isValid = false;
                    alert('অনুগ্রহ করে ট্রানজেকশন আইডি লিখুন');
                    return;
                } else if (transactionIdInput) {
                    transactionIdInput.style.borderColor = '';
                    transactionId = transactionIdInput.value;
                }
            }
            
            if (!isValid) return;
            
            // Show success message
            paymentModal.classList.remove('show');
            successModal.classList.add('show');
            
            // Show payment details in success modal
            const name = nameInput.value;
            const amount = amountInput.value;
            const phone = phoneInput.value;
            
            successDetails.innerHTML = `
                <strong>নাম:</strong> ${name}<br>
                <strong>ফোন:</strong> ${phone}<br>
                <strong>পরিমাণ:</strong> ${amount} টাকা<br>
                <strong>পেমেন্ট মেথড:</strong> ${getPaymentMethodName(paymentMethod)}<br>
                <strong>ট্রানজেকশন আইডি:</strong> ${transactionId}
            `;
            
            // Redirect to WhatsApp with payment info including transaction ID
            setTimeout(function() {
                const whatsappMessage = `নাম: ${name}%0A` +
                                       `ফোন: ${phone}%0A` +
                                       `পরিমাণ: ${amount} টাকা%0A` +
                                       `পেমেন্ট মেথড: ${getPaymentMethodName(paymentMethod)}%0A` +
                                       `ট্রানজেকশন আইডি: ${transactionId}`;
                window.open(`https://wa.me/8801886191222?text=${whatsappMessage}`, '_blank');
            }, 2000);
        });
    });

    // Ziina Pay Button
    if (ziinaPayBtn) {
        ziinaPayBtn.addEventListener('click', function() {
            // Validate transaction ID
            const transactionIdInput = document.getElementById('cardTransactionId');
            if (transactionIdInput && !transactionIdInput.value.trim()) {
                transactionIdInput.style.borderColor = 'var(--error-color)';
                alert('অনুগ্রহ করে ট্রানজেকশন আইডি লিখুন');
                return;
            }
            
            const transactionId = transactionIdInput ? transactionIdInput.value : '';
            
            // Show success message
            paymentModal.classList.remove('show');
            successModal.classList.add('show');
            
            // Show payment details in success modal
            const name = nameInput.value;
            const amount = amountInput.value;
            const phone = phoneInput.value;
            
            successDetails.innerHTML = `
                <strong>নাম:</strong> ${name}<br>
                <strong>ফোন:</strong> ${phone}<br>
                <strong>পরিমাণ:</strong> ${amount} AED<br>
                <strong>পেমেন্ট মেথড:</strong> Ziina Card Payment<br>
                <strong>ট্রানজেকশন আইডি:</strong> ${transactionId}
            `;
            
            // Redirect to WhatsApp with payment info
            setTimeout(function() {
                const whatsappMessage = `নাম: ${name}%0A` +
                                       `ফোন: ${phone}%0A` +
                                       `পরিমাণ: ${amount} AED%0A` +
                                       `পেমেন্ট মেথড: Ziina Card Payment%0A` +
                                       `ট্রানজেকশন আইডি: ${transactionId}`;
                window.open(`https://wa.me/8801886191222?text=${whatsappMessage}`, '_blank');
            }, 2000);
        });
    }

    // Close success modal
    successCloseButtons.forEach(button => {
        button.addEventListener('click', function() {
            successModal.classList.remove('show');
            document.body.style.overflow = '';
            
            // Reset form
            document.getElementById('paymentForm').reset();
        });
    });

    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            // Remove active class from all methods
            paymentMethods.forEach(m => m.classList.remove('active'));
            
            // Add active class to clicked method
            this.classList.add('active');
            
            // Update hidden select value
            paymentMethodSelect.value = this.getAttribute('data-method');
        });
    });

    // Copy number to clipboard
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const number = this.getAttribute('data-number');
            
            // Create temporary input element
            const tempInput = document.createElement('input');
            tempInput.value = number;
            document.body.appendChild(tempInput);
            
            // Select and copy
            tempInput.select();
            document.execCommand('copy');
            
            // Remove temporary element
            document.body.removeChild(tempInput);
            
            // Change button text temporarily
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check"></i> কপি হয়েছে';
            
            // Reset button text after delay
            setTimeout(() => {
                this.innerHTML = originalText;
            }, 2000);
        });
    });

    // Close modals when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === paymentFormModal) {
            paymentFormModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        if (e.target === paymentModal) {
            paymentModal.classList.remove('show');
            document.body.style.overflow = '';
        }
        if (e.target === successModal) {
            successModal.classList.remove('show');
            document.body.style.overflow = '';
        }
    });

    // Helper functions
    function validateForm() {
        let isValid = true;
        
        // Check name
        if (!nameInput.value.trim()) {
            nameInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            nameInput.style.borderColor = '';
        }
        
        // Check phone
        if (!phoneInput.value.trim()) {
            phoneInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            phoneInput.style.borderColor = '';
        }
        
        // Check amount
        if (!amountInput.value.trim() || isNaN(amountInput.value) || amountInput.value <= 0) {
            amountInput.style.borderColor = 'var(--error-color)';
            isValid = false;
        } else {
            amountInput.style.borderColor = '';
        }
        
        return isValid;
    }

    function showSelectedPaymentOptions(method) {
        // Hide all options
        sendMoneyOptions.style.display = 'none';
        paymentOptions.style.display = 'none';
        cardOptions.style.display = 'none';
        
        // Show selected options
        if (method === 'send-money') {
            sendMoneyOptions.style.display = 'block';
        } else if (method === 'payment') {
            paymentOptions.style.display = 'block';
        } else if (method === 'card') {
            cardOptions.style.display = 'block';
        }
    }
    
    function getPaymentMethodName(method) {
        switch(method) {
            case 'send-money':
                return 'Send Money';
            case 'payment':
                return 'Payment';
            case 'card':
                return 'Card Payment';
            default:
                return method;
        }
    }

    // Add input event listeners to remove error styling
    nameInput.addEventListener('input', function() {
        this.style.borderColor = '';
    });
    
    phoneInput.addEventListener('input', function() {
        this.style.borderColor = '';
    });
    
    amountInput.addEventListener('input', function() {
        this.style.borderColor = '';
    });

    // App open buttons with improved cross-platform deep linking
    const appOpenButtons = document.querySelectorAll('.app-open-button');
    appOpenButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get app info
            const appName = button.getAttribute('data-app') || '';
            const appText = button.textContent || '';
            
            // Define app schemes and store URLs for each app
            let appSchemes = [];
            let appStoreUrl = '';
            let playStoreUrl = '';
            
            if (appName === 'bkash' || appText.includes('bKash')) {
                // bKash deep links
                appSchemes = ['bkash://', 'https://www.bkash.com/redirect'];
                playStoreUrl = 'https://play.google.com/store/apps/details?id=com.bKash.customerapp';
                appStoreUrl = 'https://apps.apple.com/us/app/bkash/id1351183172';
            } else if (appName === 'nagad' || appText.includes('Nagad')) {
                // Nagad deep links
                appSchemes = ['nagad://', 'https://nagad.com.bd/redirect'];
                playStoreUrl = 'https://play.google.com/store/apps/details?id=com.konasl.nagad';
                appStoreUrl = 'https://apps.apple.com/us/app/nagad/id1435157730';
            } else if (appName === 'upay' || appText.includes('Upay')) {
                // Upay deep links
                appSchemes = ['upay://', 'https://www.upaybd.com/redirect'];
                playStoreUrl = 'https://play.google.com/store/apps/details?id=com.ucb.upay';
                appStoreUrl = 'https://apps.apple.com/us/app/upay-bangladesh/id1452735817';
            } else if (appName === 'rocket' || appText.includes('Rocket')) {
                // Rocket deep links
                appSchemes = ['rocket://', 'https://www.dutchbanglabank.com/rocket/redirect'];
                playStoreUrl = 'https://play.google.com/store/apps/details?id=com.dbbl.mbs.apps.main';
                appStoreUrl = 'https://apps.apple.com/us/app/rocket-dbbl-mobile-banking/id1563785516';
            } else if (appName === 'cellfin' || appText.includes('Cellfin')) {
                // Cellfin deep links
                appSchemes = ['cellfin://', 'https://www.cellfin.com/redirect'];
                playStoreUrl = 'https://play.google.com/store/apps/details?id=com.progoti.cellfin';
                appStoreUrl = 'https://apps.apple.com/us/app/cellfin/id1526676537';
            }
            
            // Try to open the app using multiple approaches
            const openApp = () => {
                // Create hidden iframe for iOS
                const iframe = document.createElement('iframe');
                iframe.style.display = 'none';
                
                // Try primary app scheme
                if (appSchemes.length > 0) {
                    // First try with window.location
                    window.location.href = appSchemes[0];
                    
                    // Then try with iframe for iOS
                    iframe.src = appSchemes[0];
                    document.body.appendChild(iframe);
                    
                    // Remove iframe after a delay
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                    }, 100);
                }
                
                // Fallback to store if app doesn't open
                setTimeout(() => {
                    // Check if we're still here (app didn't open)
                    const now = new Date().getTime();
                    const timeoutDuration = 1500;
                    const openTime = button.getAttribute('data-open-time');
                    
                    if (!openTime || now - parseInt(openTime) > timeoutDuration) {
                        // Detect platform
                        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
                        
                        if (confirm('অ্যাপটি খুলতে সমস্যা হচ্ছে। অ্যাপ স্টোরে যেতে চান?')) {
                            if (isIOS && appStoreUrl) {
                                window.location.href = appStoreUrl;
                            } else if (playStoreUrl) {
                                window.location.href = playStoreUrl;
                            }
                        }
                    }
                }, 1500);
            };
            
            // Record time when trying to open app
            button.setAttribute('data-open-time', new Date().getTime().toString());
            
            // Try to open the app
            openApp();
        });
    });
});

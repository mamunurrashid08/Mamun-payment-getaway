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

    // Open payment form modal
    openPaymentFormBtn.addEventListener('click', function() {
        paymentFormModal.classList.add('show');
        document.body.style.overflow = 'hidden';
        
        // Add entrance animation
        const modalContent = paymentFormModal.querySelector('.modal-content');
        modalContent.style.animation = 'modalFadeIn 0.4s';
    });

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
            // Show success message
            paymentModal.classList.remove('show');
            successModal.classList.add('show');
            
            // Show payment details in success modal
            const name = nameInput.value;
            const amount = amountInput.value;
            const phone = phoneInput.value;
            const paymentMethod = paymentMethodSelect.value;
            
            successDetails.innerHTML = `
                <strong>নাম:</strong> ${name}<br>
                <strong>ফোন:</strong> ${phone}<br>
                <strong>পরিমাণ:</strong> ${amount} টাকা<br>
                <strong>পেমেন্ট মেথড:</strong> ${getPaymentMethodName(paymentMethod)}
            `;
            
            // Redirect to WhatsApp with payment info
            setTimeout(function() {
                const whatsappMessage = `নাম: ${name}%0A` +
                                       `ফোন: ${phone}%0A` +
                                       `পরিমাণ: ${amount} টাকা%0A` +
                                       `পেমেন্ট মেথড: ${getPaymentMethodName(paymentMethod)}`;
                window.open(`https://wa.me/8801886191222?text=${whatsappMessage}`, '_blank');
            }, 2000);
        });
    });

    // Ziina Pay Button
    if (ziinaPayBtn) {
        ziinaPayBtn.addEventListener('click', function() {
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
                <strong>পেমেন্ট মেথড:</strong> Ziina Card Payment
            `;
            
            // Redirect to WhatsApp with payment info
            setTimeout(function() {
                const whatsappMessage = `নাম: ${name}%0A` +
                                       `ফোন: ${phone}%0A` +
                                       `পরিমাণ: ${amount} AED%0A` +
                                       `পেমেন্ট মেথড: Ziina Card Payment`;
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

    // Add animation to payment options
    const paymentOptionElements = document.querySelectorAll('.payment-option');
    paymentOptionElements.forEach((option, index) => {
        option.style.opacity = '0';
        option.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            option.style.transition = 'opacity 0.3s ease, transform 0.3s ease, border-color 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease';
            option.style.opacity = '1';
            option.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});

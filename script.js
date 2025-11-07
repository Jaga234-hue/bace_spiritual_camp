document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submitButton');
    const payButton = document.getElementById('payButton');
    const fileInput = document.getElementById('screenshot');
    const fileInputButton = document.querySelector('.file-input-button');
    const previewPopup = document.getElementById('previewPopup');
    const closePopup = document.getElementById('closePopup');
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');
    
    // Handle payment button click
    payButton.addEventListener('click', function() {
        // UPI deep link - this will try to open UPI apps if installed
        const upiId = '9861828508@ybl';
        const amount = '200';
        const name = 'Spiritual Camp';
        const note = 'Spiritual Camp Registration Fee';
        
        // Create UPI URL
        const upiUrl = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&cu=INR&tn=${encodeURIComponent(note)}`;
        
        // Try to open UPI app
        window.location.href = upiUrl;
        
        // Fallback: Show instructions if UPI app not available
        setTimeout(function() {
            alert('If UPI app did not open, please manually open your UPI app and send ₹200 to: ' + upiId);
        }, 500);
    });
    
    // Update file input button text when a file is selected
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const fileName = this.files[0].name.length > 20 
                ? this.files[0].name.substring(0, 17) + '...' 
                : this.files[0].name;
                
            fileInputButton.textContent = fileName;
            fileInputButton.style.backgroundColor = '#e8f5e9';
            fileInputButton.style.borderColor = '#4caf50';
            fileInputButton.style.color = '#2e7d32';
        } else {
            fileInputButton.textContent = 'Upload Screenshot';
            fileInputButton.style.backgroundColor = '';
            fileInputButton.style.borderColor = '';
            fileInputButton.style.color = '';
        }
    });
    
    // Handle form submission preview
    submitButton.addEventListener('click', function() {
        // Basic validation
        const name = document.getElementById('name').value;
        const regdNo = document.getElementById('regd_no').value;
        const roomNo = document.getElementById('room_no').value;
        const phoneNo = document.getElementById('phone_no').value;
        const screenshot = document.getElementById('screenshot').files[0];
        const question = document.getElementById('any_question').value;
        
        if (!name || !regdNo || !roomNo || !phoneNo || !screenshot) {
            alert('Please fill in all required fields and upload payment screenshot.');
            return;
        }
        
        // Phone number validation (basic)
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = phoneNo.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }
        
        // Populate preview popup
        document.getElementById('previewName').textContent = name;
        document.getElementById('previewRegdNo').textContent = regdNo;
        document.getElementById('previewRoomNo').textContent = roomNo;
        document.getElementById('previewPhoneNo').textContent = phoneNo;
        document.getElementById('previewScreenshot').textContent = screenshot ? screenshot.name : 'Not uploaded';
        document.getElementById('previewQuestion').textContent = question || 'None';
        
        // Show the preview popup
        previewPopup.classList.add('active');
    });
    
    // Close popup
    closePopup.addEventListener('click', function() {
        previewPopup.classList.remove('active');
    });
    
    // Edit button in popup
    editButton.addEventListener('click', function() {
        previewPopup.classList.remove('active');
    });
    
    // Confirm registration
    confirmButton.addEventListener('click', function() {
        // Show loading state
        const originalText = confirmButton.innerHTML;
        confirmButton.innerHTML = 'Processing...';
        confirmButton.disabled = true;
        
        // Simulate form submission
        setTimeout(function() {
            alert('Registration confirmed successfully! We will contact you soon.');
            form.reset();
            fileInputButton.textContent = 'Upload Screenshot';
            fileInputButton.style.backgroundColor = '';
            fileInputButton.style.borderColor = '';
            fileInputButton.style.color = '';
            previewPopup.classList.remove('active');
            confirmButton.innerHTML = originalText;
            confirmButton.disabled = false;
        }, 2000);
    });
    
    // Close popup when clicking outside
    previewPopup.addEventListener('click', function(e) {
        if (e.target === previewPopup) {
            previewPopup.classList.remove('active');
        }
    });
    
    // Add input validation styles
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.style.backgroundColor = '#f0f8ff';
                this.style.borderColor = '#6a11cb';
            } else {
                this.style.backgroundColor = '';
                this.style.borderColor = '';
            }
        });
    });
    
    // Prevent form from being submitted on Enter key press
    form.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && e.target.type !== 'submit') {
            e.preventDefault();
        }
    });
    
    // Handle orientation change for better mobile experience
    window.addEventListener('orientationchange', function() {
        // Small delay to allow orientation to complete
        setTimeout(function() {
            // Adjust container height if needed
            const container = document.querySelector('.container');
            const viewportHeight = window.innerHeight;
            
            if (viewportHeight < 600) {
                container.style.height = '97vh';
                container.style.maxHeight = '580px';
            } else {
                container.style.height = '90vh';
                container.style.maxHeight = '700px';
            }
        }, 300);
    });
});
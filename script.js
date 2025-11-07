document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const payButton = document.getElementById('payButton');
    const submitButton = document.getElementById('submitButton');
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));

    // Handle payment button click
    payButton.addEventListener('click', function() {
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

    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        const name = document.getElementById('name').value;
        const regdNo = document.getElementById('regd_no').value;
        const roomNo = document.getElementById('room_no').value;
        const phoneNo = document.getElementById('phone_no').value;
        const screenshot = document.getElementById('screenshot').files[0];
        
        if (!name || !regdNo || !roomNo || !phoneNo || !screenshot) {
            alert('Please fill in all required fields and upload payment screenshot.');
            return;
        }
        
        // Phone number validation
        const phoneRegex = /^[0-9]{10}$/;
        const cleanPhone = phoneNo.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Show loading state
        const originalText = submitButton.innerHTML;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Processing...';
        submitButton.disabled = true;

        // Create FormData object
        const formData = new FormData(form);

        // Submit form via AJAX
        fetch('submit.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show success modal
                successModal.show();
                // Reset form
                form.reset();
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while submitting the form.');
        })
        .finally(() => {
            // Restore button state
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
    });

    // Add input validation styles
    const inputs = document.querySelectorAll('.form-control');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() !== '') {
                this.classList.add('is-valid');
                this.classList.remove('is-invalid');
            } else if (this.required) {
                this.classList.add('is-invalid');
                this.classList.remove('is-valid');
            }
        });
    });

    // File input validation
    const fileInput = document.getElementById('screenshot');
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            this.classList.add('is-valid');
            this.classList.remove('is-invalid');
        } else {
            this.classList.add('is-invalid');
            this.classList.remove('is-valid');
        }
    });
});
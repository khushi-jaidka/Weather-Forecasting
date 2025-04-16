
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('signup-form');
            const inputs = form.querySelectorAll('input');
            
            // Add focus and blur event listeners to all inputs
            inputs.forEach(input => {
                // Input focus effect
                input.addEventListener('focus', function() {
                    this.parentElement.querySelector('label').style.color = '#1e55c8';
                });
                
                // Input blur effect
                input.addEventListener('blur', function() {
                    this.parentElement.querySelector('label').style.color = '#2c5282';
                    validateInput(this);
                });
                
                // Real-time validation for all fields
                input.addEventListener('input', function() {
                    validateInput(this);
                });
            });
            
            // Form submission
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                
                // Validate all inputs
                inputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    // Animation for success
                    this.classList.add('success');
                    
                    // Success message with wave animation
                    const container = document.querySelector('.container');
                    container.innerHTML = `
                        <div style="text-align: center; animation: fadeIn 0.5s ease;">
                            <svg width="100" height="100" viewBox="0 0 24 24" style="margin: 0 auto; fill: none; stroke: #2c63b8; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; animation: success 0.5s ease;">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                <polyline points="22 4 12 14.01 9 11.01"></polyline>
                            </svg>
                            <h2 style="margin-top: 20px; color: #0a4b94;">Success!</h2>
                            <p style="color: #3a6097; margin-top: 15px;">Your account has been created successfully!</p>
                            <button id="restart-btn" style="margin-top: 30px; display: inline-block; width: auto; padding: 10px 30px;">Back to Sign Up</button>
                        </div>
                    `;
                    
                    // Add event listener to the restart button
                    document.getElementById('restart-btn').addEventListener('click', function() {
                        location.reload();
                    });
                }
            });
            
            // Function to validate inputs
            function validateInput(input) {
                const id = input.id;
                const value = input.value.trim();
                const errorElement = document.getElementById(`${id}-error`);
                
                let isValid = true;
                
                // Clear previous error
                input.classList.remove('error');
                errorElement.style.display = 'none';
                
                // Validate based on input type
                switch(id) {
                    case 'username':
                        if (value.length < 3) {
                            showError(input, errorElement, 'Username must be at least 3 characters');
                            isValid = false;
                        }
                        break;
                    case 'email':
                        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
                        if (!emailPattern.test(value)) {
                            showError(input, errorElement, 'Please enter a valid email address');
                            isValid = false;
                        }
                        break;
                    case 'password':
                        if (value.length < 6) {
                            showError(input, errorElement, 'Password must be at least 6 characters');
                            isValid = false;
                        }
                        break;
                    case 'confirm-password':
                        const password = document.getElementById('password').value;
                        if (value !== password) {
                            showError(input, errorElement, 'Passwords do not match');
                            isValid = false;
                        }
                        break;
                }
                
                return isValid;
            }
            
            // Function to show error
            function showError(input, errorElement, message) {
                input.classList.add('error');
                errorElement.textContent = message;
                errorElement.style.display = 'block';
                
                // Shake animation for error
                input.style.animation = 'none';
                setTimeout(() => {
                    input.style.animation = 'shake 0.5s ease';
                }, 10);
            }
            
            // Add shake animation to CSS
            const style = document.createElement('style');
            style.textContent = `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                    20%, 40%, 60%, 80% { transform: translateX(5px); }
                }
            `;
            document.head.appendChild(style);
        });

    

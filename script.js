
        document.addEventListener('DOMContentLoaded', function() {
            const loginForm = document.getElementById("loginForm");
            const username = document.getElementById("username");
            const password = document.getElementById("password");
            const submit_btn = document.getElementById("submit-btn");

            // Focus effects
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('focus', function() {
                    this.previousElementSibling.style.color = '#1e55c8';
                });
                
                input.addEventListener('blur', function() {
                    this.previousElementSibling.style.color = '#2c5282';
                });
            });

            // Login validation
            function validateLogin(event) {
                event.preventDefault();
                username.classList.remove('error', 'success');
                password.classList.remove('error', 'success');
                
                if (username.value.trim() === "") {
                    username.classList.add('error');
                    return;
                }
                submit_btn.classList.add('loading');
                
                setTimeout(() => {
                    submit_btn.classList.remove('loading');
                    
                    if (password.value === "password123") {
                        username.classList.add('success');
                        password.classList.add('success');
                        document.querySelector('.login-container').style.animation = 'success 0.5s ease';
                        loginForm.innerHTML = `
                            <div style="text-align: center; animation: fadeIn 0.5s ease;">
                                <i class="fa-solid fa-circle-check" style="font-size: 60px; color: #0d904f; margin-bottom: 20px;"></i>
                                <h2 style="margin-bottom: 15px;">Login Successful</h2>
                                <p style="color: #2c5282; margin-bottom: 25px;">Redirecting to dashboard...</p>
                                <div class="progress-bar" style="height: 4px; background: #e0e0e0; border-radius: 2px; overflow: hidden; margin: 0 auto; width: 80%;">
                                    <div class="progress" style="height: 100%; width: 0%; background: #1a73e8; transition: width 2s linear;"></div>
                                </div>
                            </div>`;
                        setTimeout(() => {
                            document.querySelector('.progress').style.width = '100%';
                        }, 100);
                        setTimeout(() => {
                            window.location.href = '/today.html';
                        }, 2000);
                    } else {
                        password.classList.add('error');
                        alert("Invalid username or password");
                    }
                }, 1000);
            }
            
            submit_btn.addEventListener("click", validateLogin);
        });

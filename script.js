// Change navbar on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll active link update
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

/* ---------- Demo Auth (fake) ---------- */
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

function getUser() {
    try {
        return JSON.parse(localStorage.getItem('user')) || null;
    } catch (e) { return null; }
}

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function clearUser() {
    localStorage.removeItem('user');
}

function setAuthUI(user) {
    const authArea = document.querySelector('.auth-area');
    if (!authArea) return;
    if (user) {
        const display = escapeHtml(user.name || user.email.split('@')[0]);
        authArea.innerHTML = `
            <span class="nav-link">Hi, ${display}</span>
            <button class="btn btn-outline-secondary ms-2" id="logoutBtn">Logout</button>
        `;
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                clearUser();
                setAuthUI(null);
            });
        }
    } else {
        authArea.innerHTML = '<a class="nav-link btn-login ms-lg-3" href="#" data-bs-toggle="modal" data-bs-target="#loginModal" id="authButton">Login</a>';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // initialize auth UI
    setAuthUI(getUser());

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('nameInput').value.trim();
            const email = document.getElementById('emailInput').value.trim();
            if (!email) return; // basic guard
            const user = { name: name || email.split('@')[0], email };
            setUser(user);
            setAuthUI(user);
            // hide modal
            const modalEl = document.getElementById('loginModal');
            if (modalEl) {
                const bsModal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                bsModal.hide();
            }
        });
    }
});

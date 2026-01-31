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
         .replace(/\"/g, "&quot;")
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

    /* Detail modal handlers for Explore/View Deal */
    const detailModalEl = document.getElementById('detailModal');
    let detailModal = null;
    if (detailModalEl) {
        detailModal = new bootstrap.Modal(detailModalEl);
    }

    let currentBooking = {};

    function openDetailModal({place, price, duration, description}) {
        if (!detailModal) return;
        currentBooking = { place, price, duration, description };
        document.getElementById('detailModalLabel').textContent = place || 'Details';
        document.getElementById('detailDescription').textContent = description || '';
        document.getElementById('detailPrice').textContent = price || 'N/A';
        document.getElementById('detailDuration').textContent = duration || '';
        detailModal.show();
    }

    /* Booking success handling */
    const successModalEl = document.getElementById('successModal');
    let successModal = null;
    if (successModalEl) {
        successModal = new bootstrap.Modal(successModalEl);
    }

    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // simulate booking success
            if (detailModal) detailModal.hide();
            if (successModal) {
                const msgEl = document.getElementById('successMessage');
                const placeEsc = escapeHtml(currentBooking.place || '');
                const priceEsc = escapeHtml(currentBooking.price || '');
                msgEl.innerHTML = `Your booking for <strong>${placeEsc}</strong> (${priceEsc}) was successful. We have sent a confirmation to your email.`;
                successModal.show();
            } else {
                alert('Booking successful');
            }
        });
    }

    document.querySelectorAll('.btn-view').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openDetailModal({
                place: btn.dataset.place,
                price: btn.dataset.price,
                duration: btn.dataset.duration,
                description: btn.dataset.description
            });
        });
    });

    document.querySelectorAll('.btn-explore').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openDetailModal({
                place: btn.dataset.place,
                description: btn.dataset.details,
                price: btn.dataset.price,
                duration: btn.dataset.duration
            });
        });
    });

    // Search button behavior: scroll to packages and highlight a matched card
    const whereInput = document.getElementById('whereInput');
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const val = (whereInput && whereInput.value || '').trim().toLowerCase();
            const packagesSection = document.getElementById('packages');
            if (packagesSection) packagesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (!val) return;
            // Search among both btn-view and btn-explore elements for a place match
            const candidates = Array.from(document.querySelectorAll('.btn-view, .btn-explore'));
            const matchBtn = candidates.find(b => b.dataset.place && b.dataset.place.toLowerCase().includes(val));
            if (matchBtn) {
                const card = matchBtn.closest('.card') || matchBtn.closest('.dest-card') || matchBtn.parentElement;
                if (card) {
                    card.classList.add('package-highlight');
                    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => card.classList.remove('package-highlight'), 3000);
                }
            }
        });
    }
});
// ==================== SCROLL-TO NAVIGATION ====================
    function scrollToSection(id) {
        const el = document.getElementById('section-' + id);
        if (el) {
            const offset = 80;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
        // Close mobile menu
        document.getElementById('navLinks').classList.remove('active');
    }

    // ==================== ACTIVE NAV ON SCROLL ====================
    const sections = document.querySelectorAll('.section[id]');
    const navItems = document.querySelectorAll('.nav-item[data-section]');

    function updateActiveNav() {
        let current = '';
        sections.forEach(sec => {
            const top = sec.getBoundingClientRect().top;
            if (top <= 120) current = sec.id.replace('section-', '');
        });
        navItems.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === current) btn.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveNav, { passive: true });
    updateActiveNav();

    // ==================== CURSOR ====================
    const cursor = document.getElementById('cursor');
    const aura = document.getElementById('cursor-aura');
    document.addEventListener('mousemove', (e) => {
        if (cursor) { cursor.style.left = e.clientX+'px'; cursor.style.top = e.clientY+'px'; }
        if (aura) { aura.style.left = e.clientX+'px'; aura.style.top = e.clientY+'px'; }
    });
    document.querySelectorAll('a, button, .contact-card, .skill-card, .explore-card').forEach(el => {
        el.addEventListener('mouseenter', () => cursor && (cursor.style.transform = 'scale(3)'));
        el.addEventListener('mouseleave', () => cursor && (cursor.style.transform = 'scale(1)'));
    });

    // ==================== HOME PARALLAX ====================
    const k1 = document.getElementById('k1');
    const k2 = document.getElementById('k2');
    const k3 = document.getElementById('k3');
    const title = document.getElementById('heroTitle');
    const hex1 = document.getElementById('hex1');

    document.addEventListener('mousemove', (e) => {
        const homeSection = document.getElementById('section-home');
        if (!homeSection) return;
        const rect = homeSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const x = e.clientX, y = e.clientY;
        const xMove = (window.innerWidth/2 - x)/20;
        const yMove = (window.innerHeight/2 - y)/20;
        if(k1) k1.style.transform = `translate(${xMove}px,${yMove}px)`;
        if(k2) k2.style.transform = `translate(${-xMove*1.5}px,${-yMove*0.5}px)`;
        if(k3) k3.style.transform = `translate(${xMove*0.8}px,${-yMove*1.2}px)`;
        if(title) { const rx=(y-window.innerHeight/2)/50; const ry=(x-window.innerWidth/2)/50; title.style.transform=`rotateX(${-rx}deg) rotateY(${ry}deg)`; }
        if(hex1 && Math.random()>0.97) { const h=()=>Math.floor(Math.random()*255).toString(16).toUpperCase().padStart(2,'0'); hex1.innerText=`0x${h()} 0x${h()} 0x${h()} 0x${h()}`; }
    });

    // ==================== ABOUT PARALLAX ====================
    const pillAnchor = document.getElementById('pillAnchor');
    const pillShroud = document.getElementById('pillShroud');
    const bgText = document.getElementById('bgText');
    const vChamber = document.querySelector('.visual-chamber');

    document.addEventListener('mousemove', (e) => {
        const aboutSection = document.getElementById('section-about');
        if (!aboutSection) return;
        const rect = aboutSection.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;

        const xVal = (window.innerWidth/2 - e.pageX)/50;
        const yVal = (window.innerHeight/2 - e.pageY)/50;
        if(bgText) bgText.style.transform = `translate(calc(-50% + ${xVal*2}px), calc(-50% + ${yVal*2}px))`;
        if(vChamber && pillAnchor) {
            const cr = vChamber.getBoundingClientRect();
            if(e.clientX > cr.left) {
                const x=(e.clientX-cr.left-cr.width/2)/30;
                const y=(e.clientY-cr.top-cr.height/2)/30;
                pillAnchor.style.transform=`translate(${x}px,${y}px) rotateY(${x/2}deg) rotateX(${-y/2}deg)`;
                if(pillShroud) pillShroud.style.transform=`translate(${-x/2}px,${-y/2}px)`;
            }
        }
    });
    if(vChamber) vChamber.addEventListener('mouseleave', () => {
        if(pillAnchor) pillAnchor.style.transform='translate(0,0) rotateY(0) rotateX(0)';
        if(pillShroud) pillShroud.style.transform='translate(0,0)';
    });

    // ==================== SKILLS ====================
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX-rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY-rect.top}px`);
        });
    });

    // ==================== EFFORTS ====================
    document.querySelectorAll('.creative-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX-rect.left;
            const y = e.clientY-rect.top;
            const cx=rect.width/2; const cy=rect.height/2;
            const dx=(x-cx)/10; const dy=(y-cy)/10;
            const ib=card.querySelector('.c-icon-box');
            const cg=card.querySelector('.c-content-group');
            if(ib) ib.style.transform=`translate(${dx}px,${dy}px) rotate(${-dx/2}deg)`;
            if(cg) cg.style.transform=`translate(${-dx/2}px,${-dy/2}px)`;
        });
        card.addEventListener('mouseleave', () => {
            const ib=card.querySelector('.c-icon-box');
            const cg=card.querySelector('.c-content-group');
            if(ib) ib.style.transform='translate(0,0) rotate(0deg)';
            if(cg) cg.style.transform='translate(0,0)';
        });
    });

    // ==================== EXPLORE ====================
    document.querySelectorAll('.explore-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--ex', ((e.clientX-rect.left)/rect.width*100)+'%');
            card.style.setProperty('--ey', ((e.clientY-rect.top)/rect.height*100)+'%');
        });
    });

    // ==================== CONNECT ====================
    document.querySelectorAll('.contact-card').forEach(card => {
        card.addEventListener('mouseenter', () => cursor && (cursor.style.transform='scale(5)'));
        card.addEventListener('mouseleave', () => cursor && (cursor.style.transform='scale(1)'));
    });

    // ==================== MOBILE NAV ====================
    const toggle = document.getElementById('menuToggle');
    const links = document.getElementById('navLinks');
    if(toggle){
        toggle.addEventListener('click', () => links.classList.toggle('active'));
    }
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.navbar')) links.classList.remove('active');
    });

    // ==================== FADE IN ====================
    document.body.style.opaci
    // NOTE: This file appears to be truncated in the original source.
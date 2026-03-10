
    // ==================== NAVIGATION ====================
    function showPage(id) {
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        const page = document.getElementById('page-' + id);
        if (page) {
            page.classList.add('active');
            window.scrollTo(0, 0);
        }
        const btn = document.querySelector(`[data-page="${id}"]`);
        if (btn) btn.classList.add('active');
        // Run page-specific init
        if (id === 'home') initHome();
        if (id === 'about') initAbout();
        if (id === 'skills') initSkills();
        if (id === 'efforts') initEfforts();
        if (id === 'explore') initExplore();
        if (id === 'connect') initConnect();
    }

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

    // ==================== HOME ====================
    function initHome() {
        const k1 = document.getElementById('k1');
        const k2 = document.getElementById('k2');
        const k3 = document.getElementById('k3');
        const title = document.getElementById('heroTitle');
        const hex1 = document.getElementById('hex1');
        function updateHome(x, y) {
            const xMove = (window.innerWidth/2 - x)/20;
            const yMove = (window.innerHeight/2 - y)/20;
            if(k1) k1.style.transform = `translate(${xMove}px,${yMove}px)`;
            if(k2) k2.style.transform = `translate(${-xMove*1.5}px,${-yMove*0.5}px)`;
            if(k3) k3.style.transform = `translate(${xMove*0.8}px,${-yMove*1.2}px)`;
            if(title) { const rx=(y-window.innerHeight/2)/50; const ry=(x-window.innerWidth/2)/50; title.style.transform=`rotateX(${-rx}deg) rotateY(${ry}deg)`; }
            if(hex1 && Math.random()>0.97) { const h=()=>Math.floor(Math.random()*255).toString(16).toUpperCase().padStart(2,'0'); hex1.innerText=`0x${h()} 0x${h()} 0x${h()} 0x${h()}`; }
        }
        const homeHandler = (e) => { if(document.getElementById('page-home').classList.contains('active')) updateHome(e.clientX,e.clientY); };
        document.addEventListener('mousemove', homeHandler);
    }
    initHome();

    // ==================== ABOUT ====================
    function initAbout() {
        const pillAnchor = document.getElementById('pillAnchor');
        const pillShroud = document.getElementById('pillShroud');
        const bgText = document.getElementById('bgText');
        const vChamber = document.querySelector('.visual-chamber');
        const aboutHandler = (e) => {
            if(!document.getElementById('page-about').classList.contains('active')) return;
            const xVal = (window.innerWidth/2 - e.pageX)/50;
            const yVal = (window.innerHeight/2 - e.pageY)/50;
            if(bgText) bgText.style.transform = `translate(calc(-50% + ${xVal*2}px), calc(-50% + ${yVal*2}px))`;
            if(vChamber && pillAnchor) {
                const rect = vChamber.getBoundingClientRect();
                if(e.clientX > rect.left) {
                    const x=(e.clientX-rect.left-rect.width/2)/30;
                    const y=(e.clientY-rect.top-rect.height/2)/30;
                    pillAnchor.style.transform=`translate(${x}px,${y}px) rotateY(${x/2}deg) rotateX(${-y/2}deg)`;
                    if(pillShroud) pillShroud.style.transform=`translate(${-x/2}px,${-y/2}px)`;
                }
            }
        };
        document.addEventListener('mousemove', aboutHandler);
        if(vChamber) vChamber.addEventListener('mouseleave', () => {
            if(pillAnchor) pillAnchor.style.transform='translate(0,0) rotateY(0) rotateX(0)';
            if(pillShroud) pillShroud.style.transform='translate(0,0)';
        });
    }

    // ==================== SKILLS ====================
    function initSkills() {
        document.querySelectorAll('.skill-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mouse-x', `${e.clientX-rect.left}px`);
                card.style.setProperty('--mouse-y', `${e.clientY-rect.top}px`);
            });
        });
    }

    // ==================== EFFORTS ====================
    function initEfforts() {
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
    }

    // ==================== EXPLORE ====================
    function initExplore() {
        document.querySelectorAll('.explore-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--ex', ((e.clientX-rect.left)/rect.width*100)+'%');
                card.style.setProperty('--ey', ((e.clientY-rect.top)/rect.height*100)+'%');
            });
        });
    }

    // ==================== CONNECT ====================
    function initConnect() {
        document.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('mouseenter', () => cursor && (cursor.style.transform='scale(5)'));
            card.addEventListener('mouseleave', () => cursor && (cursor.style.transform='scale(1)'));
        });
    }

    // Fade in on load
    document.body.style.opacity='0';
    setTimeout(()=>{ document.body.style.transition='opacity 1.5s ease'; document.body.style.opacity='1'; },100);


// ===== MOBILE NAV =====
const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');

if(toggle){
    toggle.addEventListener('click', ()=>{
        links.classList.toggle('active');
    });
}

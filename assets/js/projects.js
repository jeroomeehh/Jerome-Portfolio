// Projects data
const projectsData = [
    {
        "title": "Security Analysis of Automotive Remote Keyless Entry (RKE) Systems",
        "modal": "rke-modal",
        "githubLink": "https://github.com/jeroomeehh/Security-Analysis-of-Automotive-Remote-Keyless-Entry-RKE-Systems",
        "description": "Black-box RF security analysis of a Mini Cooper's keyless entry system using SDR hardware. Captured and decoded FSK/Manchester-encoded signals, then executed a replay attack that bypassed the 48-bit rolling code system."
    },
    {
        "title": "Network Exploitation & Reverse Engineering on Apple TV",
        "modal": "appletv-modal",
        "githubLink": "https://github.com/jeroomeehh/Network-Exploitation-Device-Reverse-Engineering-on-Apple-TV-HD-2015",
        "description": "Investigated WPA encryption and MitM attacks on wireless traffic using Wireshark and Bettercap, then SSH'd into a jailbroken Apple TV 4 to extract and reverse-engineer a third-party jailbreak app."
    },
    {
        "title": "Blockchain-Integrated Smart Home IoT Architecture",
        "modal": "smarthome-modal",
        "githubLink": "https://github.com/jeroomeehh/Blockchain-Integrated-Smart-Home-IOT-Architecture",
        "description": "Built a decentralized smart home network using Ethereum smart contracts for tamper-proof IoT data integrity, with a Python MQTT-blockchain bridge and a Web3.js dashboard for live device telemetry."
    },
    {
        "title": "3D Web-Based Interactive Application",
        "githubLink": "https://github.com/jeroomeehh/3D-Web-Application-using-X3D-X3DOM",
        "demoLink": "https://jeroomeehh.github.io/3D-Web-Application-using-X3D-X3DOM/",
        "demoLabel": "3D Model Demo",
        "description": "A web-based interactive 3D product viewer built for a Mobile Web 3D Applications module. The app displays X3D models of Coca-Cola, Sprite, and Fanta with camera controls, texture/lighting toggles, and animations, alongside a dynamic image gallery and video content."
    },
    {
        "title": "University Attendance Code Cracker - Python Application",
        "modal": "attendance-modal",
        "githubLink": "https://github.com/jeroomeehh/University-Attendance-Code-Cracker",
        "description": "Built in Year 2, A Python proof-of-concept demonstrating how weak, short-form authentication (a 4-digit numeric PIN) can be defeated through automated brute-forcing. Built as a white-hat security exercise against my own university attendance system."
    },
    {
        "title": "Mobile Ubiquitous Gym Tracker Application",
        "githubLink": "https://github.com/jeroomeehh/Gym-tracker-Application-Software-",
        "description": "Designed an end-to-end embedded systems solution, and a mobile application that turns a wearable Arduino board into a real-time workout tracker."
    },
    {
        "title": "Settlers 2D - Unity Game Development ",
        "githubLink": "https://github.com/jeroomeehh/Settlers2D-Game-Development-using-Unity",
        "description": "A 2D digital recreation of the classic Settlers of Catan board game, built in Unity as a team project. The prototype implements a full hex-grid board, turn-based gameplay, resource trading, building/upgrading, and a development card system, with local multiplayer support for up to 4 players."
    },
    {
        "dummy": true
    }
    
    
];

// Load and render projects dynamically
(function() {
    function loadProjects() {
        const postsSection = document.querySelector('section.posts');

        if (!postsSection) {
            console.error('Posts section not found');
            return;
        }

        // Clear existing content
        postsSection.innerHTML = '';

        // Create article elements for each project
        projectsData
            .filter(project => project.dummy || (project.title && project.title.trim() !== ''))
            .forEach(project => {
                const article = document.createElement('article');

                if (project.dummy) {
                    // Empty placeholder to keep the grid/border lines aligned
                    // when there is an odd number of real projects
                    article.classList.add('dummy-post');
                    postsSection.appendChild(article);
                    return;
                }

                let titleHtml;
                let actionsHtml = '';
                let hintHtml = '';
                if (project.githubLink) {
                    titleHtml = `<h2><a href="${project.githubLink}" target="_blank" rel="noopener">${project.title}</a></h2>`;
                    article.classList.add('clickable-card');
                    article.dataset.githubLink = project.githubLink;
                    hintHtml = `<span class="github-hint"><i class="fab fa-github"></i> View on GitHub <span aria-hidden="true">&rarr;</span></span>`;
                } else {
                    titleHtml = `<h2>${project.title}</h2>`;
                }

                if (project.modal || project.demoLink) {
                    const modalButton = project.modal
                        ? `<li><a href="#" class="button" data-modal-target="${project.modal}">Additional Info</a></li>`
                        : '';
                    const demoButton = project.demoLink
                        ? `<li><a href="${project.demoLink}" class="button" target="_blank" rel="noopener">${project.demoLabel || 'Live Demo'}</a></li>`
                        : '';
                    actionsHtml = `
                    <ul class="actions project-actions">
                        ${modalButton}${demoButton}
                    </ul>`;
                }

                article.innerHTML = `
                    ${titleHtml}
                    <p class="font-geometric">${project.description}</p>${hintHtml}${actionsHtml}
                `;

                postsSection.appendChild(article);
            });
    }

    // Load projects when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadProjects);
    } else {
        loadProjects();
    }
})();

// Modal handling (delegated so it works for dynamically-created buttons)
(function() {
    function openModal(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('active');
        document.body.classList.add('modal-open');
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }

    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-modal-target]');
        if (trigger) {
            e.preventDefault();
            openModal(trigger.getAttribute('data-modal-target'));
            return;
        }

        const closer = e.target.closest('[data-modal-close]');
        if (closer) {
            e.preventDefault();
            closeModal(closer.closest('.modal-overlay'));
            return;
        }

        // Click on the overlay background (outside the modal box) closes it
        if (e.target.classList.contains('modal-overlay')) {
            closeModal(e.target);
            return;
        }

        // Click anywhere on a project card (outside of links/buttons) opens its GitHub repo
        const card = e.target.closest('article.clickable-card');
        if (card && !e.target.closest('a, button')) {
            window.open(card.dataset.githubLink, '_blank', 'noopener');
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            closeModal(activeModal);
        }
    });
})();

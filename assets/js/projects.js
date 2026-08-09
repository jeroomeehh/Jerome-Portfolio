// Projects data
const projectsData = [
    {
        "title": "Security Analysis of Automotive Remote Keyless Entry (RKE) Systems",
        "modal": "rke-modal",
        "description": "Black-box RF security analysis of a Mini Cooper's keyless entry system using SDR hardware. Captured and decoded FSK/Manchester-encoded signals, then executed a replay attack that bypassed the 48-bit rolling code system."
    },
    {
        "title": "Network Exploitation & Reverse Engineering on Apple TV",
        "detailLink": "google.html",
        "description": "Investigated WPA encryption and MitM attacks on wireless traffic using Wireshark and Bettercap, then SSH'd into a jailbroken Apple TV 4 to extract and reverse-engineer a third-party jailbreak app."
    },
    {
        "title": "Blockchain-Integrated Smart Home IoT Architecture",
        "detailLink": "project3.html",
        "description": "Built a decentralized smart home network using Ethereum smart contracts for tamper-proof IoT data integrity, with a Python MQTT-blockchain bridge and a Web3.js dashboard for live device telemetry."
    },
    {
        "title": "Gym Tracker Mobile Application",
        "detailLink": "project3.html",
        "description": "Designed an end-to-end embedded systems solution, and a mobile application that turns a wearable Arduino board into a real-time workout tracker."
    },
    {
        "title": "University Attendance Code Cracking Python Application",
        "detailLink": "project3.html",
        "description": "Built in Year 2, A Python proof-of-concept demonstrating how weak, short-form authentication (a 4-digit numeric PIN) can be defeated through automated brute-forcing. Built as a white-hat security exercise against my own university attendance system."
    },
    {
        "title": "3D Web-Based Interactive Application",
        "detailLink": "project3.html",
        "description": "A web-based interactive 3D product viewer built for a Mobile Web 3D Applications module. The app displays X3D models of Coca-Cola, Sprite, and Fanta with camera controls, texture/lighting toggles, and animations, alongside a dynamic image gallery and video content."
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

                let detailButton;
                if (project.modal) {
                    detailButton = `<a href="#" class="button" data-modal-target="${project.modal}">More Info</a>`;
                } else if (project.detailLink) {
                    detailButton = `<a href="${project.detailLink}" class="button">More Info</a>`;
                } else {
                    detailButton = `<a href="#" class="button disabled" aria-disabled="true">More Info</a>`;
                }

                article.innerHTML = `
                    <h2>${project.title}</h2>
                    <p class="font-geometric">${project.description}</p>
                    <ul class="actions project-actions">
                        <li>${detailButton}</li>
                    </ul>
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
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal-overlay.active');
            closeModal(activeModal);
        }
    });
})();

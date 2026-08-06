// Projects data
const projectsData = [
    {
        "title": "Security Analysis of Automotive Remote Keyless Entry (RKE) Systems",
        "detailLink": "project1.html",
        "description": "Engineered a black-box security analysis of a modern Mini Cooper RKE system using Software-Defined Radio (SDR) hardware to capture and reverse-engineer RF communications. Analyzed and demodulated FSK signals and decoded Manchester II data streams. Executed a replay attack that bypassed a 48-bit rolling code system, uncovering a synchronization vulnerability and a denial-of-service (DoS) anti-replay lockout mechanism."
    },
    {
        "title": "Network Exploitation & Device Reverse Engineering on Apple TV",
        "detailLink": "project2.html",
        "description": "Analyzed wireless network traffic in monitor mode using Wireshark to investigate WPA encryption, and attempted Man-in-the-Middle (MitM) attacks utilizing Bettercap. Performed root-level filesystem analysis by establishing an SSH connection into a jailbroken Apple TV 4, subsequently extracting and reverse-engineering a third-party jailbreak application."
    },
    {
        "title": "Blockchain-Integrated Smart Home IoT Architecture",
        "detailLink": "project3.html",
        "description": "Architected a decentralized smart home network utilizing Ethereum smart contracts (Solidity) to ensure tamper-proof data integrity and security for connected IoT sensors. Developed a Python-based MQTT-SmartContract bridge and a lightweight Mosquitto broker to facilitate real-time, low-bandwidth communication between the blockchain network and edge devices. Deployed a locally simulated blockchain environment using Ganache and created a dynamic web dashboard utilizing Web3.js for secure user authentication and live device telemetry."
    },
    {
        "title": "",
        "dummy": true,
        "description": ""
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

                const detailButton = project.detailLink
                    ? `<a href="${project.detailLink}" class="button">More Info</a>`
                    : `<a href="#" class="button disabled" aria-disabled="true">More Info</a>`;

                article.innerHTML = `
                    <h2>${project.title}</h2>
                    <p>${project.description}</p>
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

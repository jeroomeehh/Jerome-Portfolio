// Project modal content, injected into the DOM so index.html stays short.
// Modal open/close behaviour is handled separately (see projects.js).
(function() {
	const modalsHtml = `
			<!-- Project Modal: Security Analysis of Automotive RKE Systems -->
			<div id="rke-modal" class="modal-overlay">
				<div class="modal-box font-geometric">
					<a href="#" class="modal-close" data-modal-close aria-label="Close">&times;</a>

					<h2>Security Analysis of Automotive Remote Keyless Entry (RKE) Systems</h2>

					<h4>1. Project Overview &amp; Goal</h4>
					<p><strong>Goal:</strong> To analyze the radio frequency (RF) signals of a car's key fob, searching for potential security flaws in its wireless keyless entry system through hands-on penetration testing.</p>
					<p><strong>Target System:</strong></p>
					<ul>
						<li>Vehicle: 2015 Mini One</li>
						<li>Key Fob: Standard MINI 3-Button Key Fob</li>
					</ul>
					<div class="modal-img-placeholder modal-img-small" data-img="RF000"><img src="images/RF000.png" alt="Target vehicle and key fob" onerror="this.parentElement.style.display='none'"></div>

					<h4>2. Methodology &amp; Tech Stack</h4>
					<p><strong>Software-Defined Radio (SDR) Hardware:</strong></p>
					<ul>
						<li>SDRplay RSP2pro (Used for high-precision signal reception)</li>
						<li>HackRF One (Used for signal transmission during replay attacks)</li>
						<li>420MHz Antenna &amp; Custom DIY Copper Antenna</li>
					</ul>
					<p><strong>Software &amp; Analysis Tools:</strong></p>
					<ul>
						<li>SDRconnect (Used for real-time RF spectrum visualization)</li>
						<li>Universal Radio Hacker - URH (Used for signal capturing, tweaking, and demodulation)</li>
					</ul>

					<h4>3. Signal Discovery &amp; Observation</h4>
					<p><strong>Frequency Identification:</strong></p>
					<ul>
						<li>Scanning revealed two distinct transmission frequencies: 433.2 MHz and 434.64 MHz.</li>
						<li>Dynamic frequency switching was observed based on fob distance/range relative to the car.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="RF001"><img src="images/RF001.png" alt="RF spectrum showing frequency switching" onerror="this.parentElement.style.display='none'"></div>

					<p><strong>Signal Capture &amp; Parameter Tuning:</strong></p>
					<ul>
						<li>Captured complex FSK signals using SDRconnect and URH.</li>
						<li>Optimized signal parameters:
							<ul>
								<li>Modulation: Frequency-Shift Keying (FSK)</li>
								<li>Sample Rate: 2.0M Sps</li>
								<li>Bandwidth: 500.0K Hz</li>
								<li>Samples/Symbol: 60</li>
								<li>Bits/Symbol: 1</li>
							</ul>
						</li>
					</ul>
					<div class="modal-img-placeholder" data-img="RF002"><img src="images/RF002.png" alt="Signal capture and parameter tuning in URH" onerror="this.parentElement.style.display='none'"></div>
					<div class="modal-img-placeholder" data-img="RF003"><img src="images/RF003.png" alt="Signal capture and parameter tuning in URH" onerror="this.parentElement.style.display='none'"></div>

					<h4>4. Signal Demodulation &amp; Reverse Engineering</h4>
					<p><strong>Bitstream Analysis:</strong></p>
					<ul>
						<li>Total Signal Length: 689 bits</li>
						<li>Preamble/Pattern: Starts with '011111', followed by alternating '01...01' bits.</li>
						<li>Encoding Scheme: Manchester II encoding (verified via FCC documentation).</li>
					</ul>
					<div class="modal-img-placeholder" data-img="RF004"><img src="images/RF004.png" alt="Bitstream analysis" onerror="this.parentElement.style.display='none'"></div>

					<p><strong>Decoded Data Frame Structure (341 Bits Decoded):</strong></p>
					<ul>
						<li>Bytes 55-66: Constant unique identifier (Device ID / Car ID).</li>
						<li>Byte 67: Function command code (e.g., 1 = Lock, 2 = Unlock, 3 = Boot).</li>
						<li>Bytes 73-74: Rolling code counter (increments by 1 on every button press).</li>
						<li>Bytes 75-86: Dynamic cryptographic authentication payload (rolling code authentication).</li>
					</ul>
					<div class="modal-img-placeholder" data-img="RF005"><img src="images/RF005.png" alt="Decoded data frame structure" onerror="this.parentElement.style.display='none'"></div>

					<h4>5. Security Exploits &amp; Demonstration</h4>
					<p><strong>Exploit 1: Successful Replay Attack (High Risk)</strong></p>
					<ul>
						<li>Captured a valid unlock signal while the key fob was out of range of the car.</li>
						<li>Replayed the captured signal using the HackRF One via Universal Radio Hacker.</li>
						<li>Result: The initial replayed signal successfully unlocked the car doors.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="RF006"><video src="images/RF006.mp4" controls playsinline muted loop onerror="this.parentElement.style.display='none'">Your browser does not support the video tag.</video></div>

					<p><strong>Exploit 2: Denial-of-Service (DoS) Attack (Low Risk)</strong></p>
					<ul>
						<li>Repeatedly transmitting the replayed signal forces the vehicle's receiver and key fob out of sync.</li>
						<li>Result: The car locks out the replayed signal and completely deactivates the legitimate key fob.</li>
					</ul>

					<h4>6. Vehicle Defense &amp; Threat Mitigation</h4>
					<p><strong>Automotive Countermeasures Observed:</strong></p>
					<ul>
						<li>Upon detecting repeated invalid/replayed signals, the car disabled the legitimate key fob.</li>
						<li>Resynchronization required unlocking the car using the physical backup key and initializing the ignition.</li>
					</ul>
					<p><strong>Recommended Mitigation Strategy:</strong></p>
					<ul>
						<li>Implement Bidirectional Communication with Acknowledgement (ACK):
							<ul>
								<li>The key fob should only advance its internal rolling counter after receiving an encrypted ACK signal from the vehicle confirming command execution.</li>
								<li>Prevents counter desynchronization and mitigates RollJam / replay attack windows.</li>
							</ul>
						</li>
					</ul>

					<h4>7. Possible Future Work</h4>
					<ul>
						<li>Chip-Level Decoding: Attempting to decipher the authentication code logic on the key fob's microcontroller.</li>
						<li>RollJam Attack Replication:
							<ul>
								<li>Jam the RF frequency preventing the signal from reaching the car.</li>
								<li>Capture the fresh, unused rolling code signal during the jamming sequence.</li>
								<li>Replay the captured signal to gain unauthorized entry at a later time.</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>

			<!-- Project Modal: Network Exploitation & Reverse Engineering on Apple TV -->
			<div id="appletv-modal" class="modal-overlay">
				<div class="modal-box font-geometric">
					<a href="#" class="modal-close" data-modal-close aria-label="Close">&times;</a>

					<h2>Penetration Test of the Apple TV HD (4th Generation)</h2>

					<h4>1. Project Overview &amp; Goal</h4>
					<p><strong>Goal:</strong> To conduct a comprehensive penetration test of the Apple TV HD, assessing its network, software, and physical security in order to identify and verify exploitable vulnerabilities through hands-on testing.</p>
					<p><strong>Target System:</strong></p>
					<ul>
						<li>Device: Apple TV HD 2015 (4th Generation)</li>
						<li>Operating System: tvOS 9.0 (the original OS the device shipped with)</li>
						<li>Connectivity: 802.11ac Wi-Fi, 10/100BASE-T Ethernet, Bluetooth 4.0</li>
					</ul>

					<h4>2. Methodology &amp; Tech Stack</h4>
					<p><strong>Network Analysis Tools:</strong></p>
					<ul>
						<li>Wireshark (Real-time traffic capture &amp; TLS inspection)</li>
						<li>Bettercap (Man-in-the-Middle attack via ARP spoofing)</li>
						<li>Nmap (Port scanning &amp; vulnerability script scans)</li>
					</ul>
					<p><strong>Exploitation Tools:</strong></p>
					<ul>
						<li>Metasploit Framework (AirPlay casting &amp; auth brute-force modules)</li>
						<li>Exploit-DB (CVE proof-of-concept research)</li>
						<li>Pangu Jailbreak + iOS App Signer + Xcode (Root access via sideloaded IPA)</li>
					</ul>
					<p><strong>Hardware &amp; Reverse Engineering Tools:</strong></p>
					<ul>
						<li>USBPcap (USB-C service port traffic capture)</li>
						<li>Multimeter &amp; logic analyser (JTAG interface hunting)</li>
						<li>dex2jar + Java Decompiler (3rd-party Android remote app analysis)</li>
					</ul>

					<h4>3. Network Analysis &amp; Reconnaissance</h4>
					<p><strong>Setup Traffic Observation:</strong></p>
					<ul>
						<li>Monitored outgoing connections during first-time device setup via Wireshark.</li>
						<li>Device contacted Apple servers: mesu.apple.com (firmware/updates) and configuration.apple.com (first-time setup config files).</li>
					</ul>
					<p><strong>Secure Data Transmission (Good Practice):</strong></p>
					<ul>
						<li>Device used TLSv1.2 with Elliptic-Curve Diffie-Hellman Key Exchange (ECDHE) and 256-bit AES for external communications.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="ATV001"><img src="images/ATV001.png" alt="Wireshark capture of secure setup traffic" onerror="this.parentElement.style.display='none'"></div>

					<p><strong>Man-in-the-Middle (MiTM):</strong></p>
					<ul>
						<li>Established a MiTM attack using Bettercap (arp.spoof + net.sniff).</li>
						<li>Redirected Apple TV traffic through our machine before forwarding to router.</li>
						<li>Observed the iTunes app communicating with init.itunes-apple.com.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="ATV002"><img src="images/ATV002.png" alt="Bettercap MiTM traffic capture" onerror="this.parentElement.style.display='none'"></div>

					<p><strong>Port Scanning (Nmap):</strong></p>
					<ul>
						<li>5000/tcp &amp; 7000/tcp -&gt; AirTunes (predecessor to AirPlay, audio streaming)</li>
						<li>7100/tcp -&gt; AirPlay (HTTP-based screen mirroring / media casting)</li>
						<li>62078/tcp -&gt; tcpwrapped (TLS-protected, iOS pairing/sync - not exploitable)</li>
					</ul>
					<div class="modal-img-placeholder" data-img="ATV003"><img src="images/ATV003.png" alt="Nmap port scan results" onerror="this.parentElement.style.display='none'"></div>

					<h4>4. Physical &amp; Hardware Investigation</h4>
					<p><strong>USB Debug Interface:</strong></p>
					<ul>
						<li>Captured USB-C service port traffic with USBPcap.</li>
						<li>Traffic consisted of URB bulk &amp; interrupt transfers, mostly zeroes - likely keepalive messages.</li>
					</ul>
					<p><strong>3rd-Party Android Remote Apps:</strong></p>
					<ul>
						<li>Tested multiple "Apple TV remote" apps from Play Store &amp; Aptoide.</li>
						<li>None could pair with the tvOS 9.0 device (most released years later).</li>
						<li>Decompiled APKs with dex2jar + Java Decompiler, but code was obfuscated and deemed out of scope to reverse-engineer.</li>
					</ul>
					<p><strong>Internal Hardware Teardown (JTAG Hunt):</strong></p>
					<ul>
						<li>Searched for pin headers / test pads that could form a JTAG interface.</li>
						<li>Continuity testing showed candidate pads were all linked - not JTAG.</li>
						<li>Concluded no easily accessible debug interface; device well secured from a physical standpoint.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="ATV004"><img src="images/ATV004.jpg" alt="Internal hardware teardown of the Apple TV" onerror="this.parentElement.style.display='none'"></div>

					<h4>5. Vulnerability Discovery &amp; Exploitation</h4>
					<p><strong>Exploit 1: Gained Root Access via Pangu Jailbreak</strong></p>
					<ul>
						<li>Used the Pangu jailbreak (supports tvOS 9.0 - 9.0.1).</li>
						<li>Signed &amp; installed a special IPA via Xcode + iOS App Signer.</li>
						<li>Result: Gained root access, successfully SSH'd into the filesystem.</li>
						<li>Note: Semi-tethered - must re-run the exploit on every reboot.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="ATV005"><img src="images/ATV005.png" alt="Root shell access via SSH after jailbreak" onerror="this.parentElement.style.display='none'"></div>

					<p><strong>Post-Jailbreak Fault:</strong></p>
					<ul>
						<li>On reboot the device hit the reported "black screen of death".</li>
						<li>The launchctl fix required SSH, but Wi-Fi/Ethernet stopped connecting, leaving us unable to load the fix.</li>
					</ul>

					<p><strong>Exploit 2: Slowloris DoS Attack (Low Risk)</strong></p>
					<ul>
						<li>Nmap --script vuln flagged CVE-2007-6750 on the AirPlay HTTPd (port 7100).</li>
						<li>Tested with Metasploit auxiliary/dos/http/slowloris.</li>
						<li>Result: Flooding port 7100 blocked new AirPlay connections. However, an already-active cast could NOT be interrupted (peer-to-peer session), so only the initial connection is at risk.</li>
					</ul>

					<p><strong>Exploit 3: Unauthorised AirPlay Casting (Medium Risk)</strong></p>
					<ul>
						<li>Metasploit search "appletv" returned 3 modules (casting x2, auth brute-force).</li>
						<li>Successfully cast images/videos to the TV WITHOUT authentication.</li>
						<li>"Require Device Verification" was OFF by default; enabling it blocked our spoofing (MAC + user-agent) bypass attempts.</li>
					</ul>

					<p><strong>Failed / Patched Exploits:</strong></p>
					<ul>
						<li>Brute-forcing AirPlay auth (None/Passcode/Password) - module incompatible with our tvOS version.</li>
						<li>DoS via CoreText unicode string (CVE-2017-13849) - device displayed the string with no crash.</li>
						<li>TIFF heap-corruption image (CVE-2016-4631) - device rendered image, no crash.</li>
					</ul>

					<h4>6. Weaknesses, Threat Modelling &amp; Mitigation</h4>
					<p><strong>Summary of Vulnerabilities:</strong></p>
					<ul>
						<li>Slowloris DoS - Risk: LOW - Prevents others from initiating AirPlay on the same Wi-Fi network.</li>
						<li>Unauthorised AirPlay Casting - Risk: MEDIUM - Attacker can cast media to the TV against the owner's will.</li>
						<li>Jailbreak (Pangu) - Risk: HIGH - Sideloading a crafted IPA grants root access to the device.</li>
					</ul>
					<p><strong>Threat Modelling:</strong></p>
					<ul>
						<li>Low impact for a typical home user (attacker must share the network, or have physical access for the jailbreak).</li>
						<li>Severity rises sharply in public deployments (hotels, schools, conferences) where many devices share one network - e.g. a script disrupting AirPlay across every room's Apple TV.</li>
					</ul>
					<p><strong>Recommended Mitigations:</strong></p>
					<ul>
						<li>Stronger request filtering to reduce Slowloris DoS impact.</li>
						<li>Enable "Require Device Verification" by DEFAULT in AirPlay settings.</li>
						<li>Enforce a mandatory OS update policy (device lacks any forced-update mechanism, leaving old tvOS 9.0 vulnerabilities exposed).</li>
					</ul>

					<h4>7. Possible Future Work</h4>
					<ul>
						<li>Retest all findings against the latest tvOS release for comparison.</li>
						<li>Investigate Bluetooth 4.0 vulnerabilities (Siri Remote pairing).</li>
						<li>Deeper hardware teardown - probe for concealed / non-standard debug interfaces possibly accessible via the USB-C port.</li>
						<li>Reverse-engineer the obfuscated 3rd-party Android remote apps to build a working tvOS 9.0 remote client.</li>
					</ul>
				</div>
			</div>

			<!-- Project Modal: Blockchain-Integrated Smart Home IoT Architecture -->
			<div id="smarthome-modal" class="modal-overlay">
				<div class="modal-box font-geometric">
					<a href="#" class="modal-close" data-modal-close aria-label="Close">&times;</a>

					<h2>Build An Internet of Things Application with Blockchain – Smart Home</h2>

					<h4>1. Project Overview &amp; Goal</h4>
					<p><strong>Goal:</strong> To design and build a smart home application that combines Internet of Things (IoT) technology with Blockchain, using a decentralised ledger to keep device data secure, tamper-proof and transparent while delivering everyday home automation.</p>
					<p><strong>Core Concept:</strong></p>
					<ul>
						<li>IoT devices capture real-time data (e.g. temperature, device on/off state).</li>
						<li>Data travels over MQTT and is permanently recorded on an Ethereum blockchain.</li>
						<li>Smart contracts interpret the data and trigger predefined automated actions.</li>
						<li>A web dashboard lets users control devices, build "Scenes" and schedule routines.</li>
					</ul>

					<h4>2. Methodology &amp; Tech Stack</h4>
					<p><strong>Blockchain &amp; Smart Contracts:</strong></p>
					<ul>
						<li>Ethereum (smart-contract platform for tamper-proof data storage)</li>
						<li>Ganache v2.7.1 (local in-memory blockchain; 12-second block time to mirror Ethereum's Proof-of-Stake)</li>
						<li>Solidity v0.5.16, compiled with Truffle v5.11.5</li>
					</ul>
					<p><strong>Communication Layer:</strong></p>
					<ul>
						<li>MQTT (lightweight publish/subscribe protocol ideal for IoT)</li>
						<li>Mosquitto v2.0.18 broker (port 1883 for MQTT, port 8081 for WebSockets)</li>
					</ul>
					<p><strong>Back-End (Python):</strong></p>
					<ul>
						<li>MQTT–Smart Contract Bridge: stores incoming messages on-chain and publishes automated action messages.</li>
						<li>Scene Timer: checks scene schedules every whole minute and fires scene messages.</li>
					</ul>
					<p><strong>Front-End:</strong></p>
					<ul>
						<li>HTML, CSS and JavaScript dashboard</li>
						<li>Web3.js for browser-to-Ethereum interaction</li>
						<li>Open-Meteo &amp; OpenStreetMap APIs for live weather and location</li>
					</ul>
					<p><strong>IoT Hardware &amp; Devices:</strong></p>
					<ul>
						<li>ESP8266 Wi-Fi module driving a real dimmable LED bulb (Arduino firmware)</li>
						<li>Virtual sensors, heaters and lamps built in HTML/JavaScript for testing</li>
					</ul>
					<div class="modal-img-placeholder" data-img="SH001"><img src="images/SH001.png" alt="System architecture diagram" onerror="this.parentElement.style.display='none'"></div>

					<h4>3. System Architecture</h4>
					<p><strong>Data Flow:</strong></p>
					<ul>
						<li>IoT devices publish/subscribe to the Mosquitto MQTT broker.</li>
						<li>From the broker, data splits to two Python back-ends.</li>
						<li>Back-end 1 bridges MQTT to the blockchain, storing each device's messages in its own smart contract and checking them against automation rules.</li>
						<li>Back-end 2 acts as a timer handler, triggering scheduled scenes.</li>
						<li>The HTML/JavaScript front-end connects to both back-ends and to the blockchain, giving real-time control, history and scheduling.</li>
						<li>All data is stored on the Ganache blockchain.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="SH002"><img src="images/SH002.jpg" alt="Data flow between IoT devices, back-ends and blockchain" onerror="this.parentElement.style.display='none'"></div>

					<h4>4. Smart Contract Design</h4>
					<p>Four Solidity contracts form the backbone of the system:</p>
					<ul>
						<li>SmartHome: central registry of every IoT device (name + contract address), with a deletion flag that preserves historical records.</li>
						<li>IoTdevice: one per device; logs timestamped messages and manages upper/lower thresholds that trigger automated alerts or actions.</li>
						<li>SceneList: manages the collection of scenes and their on/off timers, including repeat scheduling by day of the week.</li>
						<li>Scene: groups multiple devices and their control messages so they can be activated together with a single command.</li>
					</ul>

					<h4>5. Key Features &amp; Demonstration</h4>
					<p><strong>Core Features:</strong></p>
					<ul>
						<li>User authentication for secure access.</li>
						<li>Add, control, remove and recover IoT devices.</li>
						<li>Device history logging on the blockchain (tamper-proof audit trail).</li>
						<li>Threshold-based automation (e.g. switch on the heater when temperature drops).</li>
						<li>Scene creation and management (control many devices at once).</li>
						<li>Countdown timers and scheduled/repeating scene activation.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="SH003"><img src="images/SH003.jpg" alt="Dashboard showing core smart home features" onerror="this.parentElement.style.display='none'"></div>

					<p><strong>Live Demonstration:</strong></p>
					<ul>
						<li>A real ESP8266 LED bulb was connected to the system and dimmed / switched via the dashboard, with every command routed through the blockchain network.</li>
						<li>A virtual temperature sensor triggered an electric heater automatically once readings crossed the configured threshold.</li>
					</ul>
					<div class="modal-img-placeholder" data-img="SH004"><img src="images/SH004.jpg" alt="Live demonstration of ESP8266 bulb and virtual heater automation" onerror="this.parentElement.style.display='none'"></div>

					<h4>6. Testing &amp; Evaluation</h4>
					<p><strong>Unit Testing:</strong></p>
					<ul>
						<li>Requirement-based test cases covering authentication, device management, control, automation, scenes and timers.</li>
						<li>Result: 100% pass (19/19 test cases produced the expected output).</li>
					</ul>
					<p><strong>Usability Testing:</strong></p>
					<ul>
						<li>Participants completed all tasks (add devices, control, automate, build scenes, set timers) and found the interface intuitive and user-friendly.</li>
						<li>Feedback focused on visual polish (modern UI, brightness slider, on-screen clock, clearer timer setup) rather than functional faults.</li>
					</ul>

					<h4>7. Possible Future Work</h4>
					<ul>
						<li>Integrate a wider range of real IoT devices for richer automation.</li>
						<li>Explore alternative blockchains with faster, cheaper transactions.</li>
						<li>Add advanced cryptographic techniques to further strengthen data privacy.</li>
						<li>Investigate hybrid public/private blockchain models to balance performance and security.</li>
						<li>Adopt a modular design to improve scalability as devices and users grow.</li>
					</ul>
				</div>
			</div>

			<!-- Project Modal: University Attendance Code Cracker -->
			<div id="attendance-modal" class="modal-overlay">
				<div class="modal-box font-geometric">
					<a href="#" class="modal-close" data-modal-close aria-label="Close">&times;</a>

					<h2>University Attendance Code Cracker - Python Application</h2>

					<h4>1. Project Overview &amp; Goal</h4>
					<p><strong>Goal:</strong> A white-hat security exercise against my own university's attendance portal, demonstrating how a short, static, numeric-only PIN can be automatically brute-forced well within its validity window.</p>
					<p><strong>How the Attendance System Works:</strong></p>
					<ul>
						<li>The lecturer generates a random 4-digit PIN at the start of class.</li>
						<li>Students have a 5-minute window to manually enter the PIN into the portal to be marked present.</li>
						<li>This tool cracked the PIN and recorded attendance in around 30 seconds - well inside that 5-minute window.</li>
					</ul>
					<div class="modal-img-placeholder modal-img-small" data-img="AC001"><img src="images/AC001.png" alt="Attendance portal login screen" onerror="this.parentElement.style.display='none'"></div>

					<h4>2. How It Works</h4>
					<ol>
						<li>Authenticates a session against the attendance portal using standard login credentials (via <code>requests.Session</code>).</li>
						<li>Checks the current attendance/lesson status to determine whether a brute-force attempt is even valid (e.g. already recorded, no lesson scheduled, PIN not yet generated).</li>
						<li>Splits the full PIN range (<code>0000</code>–<code>9999</code>) across multiple worker threads.</li>
						<li>Each thread iterates its assigned range, submitting PIN guesses as GET requests and inspecting the response for a success indicator (<code>"recorded"</code> in the response body).</li>
						<li>Stops immediately once a valid PIN is found, reporting the PIN and total time taken.</li>
					</ol>
					<div class="modal-img-placeholder modal-img-small" data-img="AC002"><img src="images/AC002.png" alt="Script finished running, PIN cracked" onerror="this.parentElement.style.display='none'"></div>

					<h4>3. Result</h4>
					<p>The full 4-digit PIN keyspace (10,000 combinations) was exhausted by the multi-threaded brute-force in roughly 30 seconds, and the portal marked attendance as present - over 4 minutes faster than the 5-minute submission window students are given.</p>
					<div class="modal-img-placeholder modal-img-small" data-img="AC003"><img src="images/AC003.png" alt="Attendance recorded as present" onerror="this.parentElement.style.display='none'"></div>

					<h4>4. Risk Analysis &amp; Findings</h4>
					<p>This exercise highlights several real security weaknesses in the target system's design:</p>
					<div class="table-wrapper">
						<table>
							<thead>
								<tr>
									<th>Vulnerability</th>
									<th>Impact</th>
									<th>Recommended Fix</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Small keyspace (4-digit PIN)</td>
									<td>Entire PIN space brute-forceable in seconds with parallel requests</td>
									<td>Use longer, alphanumeric, or single-use cryptographic tokens (e.g. 8+ char, time-limited)</td>
								</tr>
								<tr>
									<td>No rate limiting / throttling</td>
									<td>Unlimited requests per session/IP allow rapid exhaustive search</td>
									<td>Implement per-user and per-IP rate limits (e.g. max 5 attempts per minute) with exponential backoff</td>
								</tr>
								<tr>
									<td>No account lockout / anomaly alerts on repeated failures</td>
									<td>Attacker can retry indefinitely and high-frequency requests from a single session go unnoticed</td>
									<td>Lock the PIN entry after N failed attempts within a time window, and log/alert on abnormal request volume per session/IP</td>
								</tr>
								<tr>
									<td>No CAPTCHA / bot detection</td>
									<td>Automated scripts are indistinguishable from real users</td>
									<td>Add CAPTCHA or behavioural challenge after a few failed attempts</td>
								</tr>
							</tbody>
						</table>
					</div>
					<p><strong>Takeaway:</strong> Authentication or verification mechanisms that rely on short, static, numeric-only codes without rate limiting are fundamentally insecure against automated attacks, regardless of how "obscure" the endpoint feels.</p>
				</div>
			</div>
	`;

	function injectModals() {
		document.body.insertAdjacentHTML('beforeend', modalsHtml);
	}

	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', injectModals);
	} else {
		injectModals();
	}
})();

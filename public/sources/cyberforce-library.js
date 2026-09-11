export const cyberforceLibrary = [
  {
    slug: "cyberforce-competition-101",
    title: "CyberForce Competition 101",
    category: "Competition",
    format: "Orientation guide",
    pages: 7,
    file: "CyberForce Competition 101.pdf",
    summary: "An orientation to the CyberForce Competition, its teams, participant roles, and the scoring model used to simulate a real energy-sector environment.",
    focus: "Understand the event before choosing a technical lane.",
    outcomes: ["Describe the competition purpose and team structure.", "Separate Blue, Red, Green, White, and Orange responsibilities.", "Recognize the difference between service uptime, anomaly, and ICS scoring."]
  },
  {
    slug: "anomalies-101",
    title: "Anomalies 101",
    category: "Competition",
    format: "Scenario guide",
    pages: 4,
    file: "Anomalies 101.pdf",
    summary: "A primer on anomalies in the CyberForce scenario: short, varied challenges that test technical judgment, prioritization, and communication under pressure.",
    focus: "Turn an unexpected signal into a calm, documented response.",
    outcomes: ["Explain what an anomaly is in the competition context.", "Practice prioritizing technical and non-technical work.", "Use CTF-style preparation to build confidence with common tools."]
  },
  {
    slug: "green-team-101",
    title: "Green Team 101",
    category: "Competition",
    format: "Role guide",
    pages: 4,
    file: "Green Team 101.pdf",
    summary: "An overview of the Green Team role and how volunteers emulate everyday users inside a realistic operational environment.",
    focus: "Keep the human side of the scenario visible.",
    outcomes: ["Describe how Green Team activity adds realism to the exercise.", "Identify the kinds of user needs a Blue Team must support.", "Balance availability, usability, and security decisions."]
  },
  {
    slug: "c-suite-panel-101",
    title: "C-Suite Panel 101",
    category: "Competition",
    format: "Communication guide",
    pages: 5,
    file: "C-Suite Panel 101.pdf",
    summary: "A briefing guide for translating technical risk into business outcomes, priorities, costs, and decisions that an executive audience can act on.",
    focus: "Make the operational impact clear without burying the decision.",
    outcomes: ["Frame a security issue around safety, continuity, people, and cost.", "Adjust technical depth for a business audience.", "Offer practical options with tradeoffs and next steps."]
  },
  {
    slug: "security-documentation-101",
    title: "Security Documentation 101",
    category: "Competition",
    format: "Documentation guide",
    pages: 5,
    file: "Security Documentation 101.pdf",
    summary: "A guide to the evidence and written artifacts that help a team explain its environment, decisions, mitigations, and operational readiness.",
    focus: "Make good defensive work visible, repeatable, and reviewable.",
    outcomes: ["Identify core security documentation deliverables.", "Record system state, changes, and rationale.", "Organize evidence so another operator can pick up the work."]
  },
  {
    slug: "ctfs-101",
    title: "CTFs 101",
    category: "Competition",
    format: "Practice guide",
    pages: 8,
    file: "CTFs 101.pdf",
    summary: "An introduction to Capture the Flag challenge families, including cryptography, web, reversing, forensics, steganography, and OSINT.",
    focus: "Build a broad mental map of common challenge types.",
    outcomes: ["Classify a challenge by the kind of evidence it presents.", "Choose a sensible first tool or line of inquiry.", "Practice documenting discoveries instead of guessing blindly."]
  },
  {
    slug: "base-tutorial",
    title: "Base Tutorial",
    category: "Foundations",
    format: "Concept guide",
    pages: 5,
    file: "Base Tutorial.pdf",
    summary: "A visual introduction to positional notation and converting between decimal, binary, octal, and hexadecimal representations.",
    focus: "Read the number systems that appear in tools, addresses, and files.",
    outcomes: ["Explain positional notation.", "Convert common values between bases 2, 8, 10, and 16.", "Use hexadecimal and binary tables as a quick reference."]
  },
  {
    slug: "intro-to-computer-hardware",
    title: "Intro to Computer Hardware",
    category: "Foundations",
    format: "Primer",
    pages: 7,
    file: "Intro to Computer Hardware.pdf",
    summary: "A plain-language tour of the physical components that make up a computer, including the system unit, CPU, memory, storage, firmware, and peripherals.",
    focus: "Connect what software reports to the hardware doing the work.",
    outcomes: ["Distinguish hardware, software, and firmware.", "Identify the main components inside a system unit.", "Relate performance and failure symptoms to likely components."]
  },
  {
    slug: "networking-101",
    title: "Networking 101",
    category: "Foundations",
    format: "Primer",
    pages: 11,
    file: "Networking 101.pdf",
    summary: "An introduction to networks, addressing, topologies, devices, protocols, and the path data takes between systems.",
    focus: "See the route, not just the endpoint.",
    outcomes: ["Describe the role of hosts, switches, routers, and firewalls.", "Recognize common network types and layouts.", "Use addressing and protocol concepts to reason about connectivity."]
  },
  {
    slug: "databases-101",
    title: "Databases 101",
    category: "Foundations",
    format: "Primer",
    pages: 4,
    file: "Databases 101.pdf",
    summary: "A survey of database concepts and common models, with an emphasis on how data is organized, stored, queried, and made available to applications.",
    focus: "Understand the data store behind the application.",
    outcomes: ["Compare relational, object-oriented, centralized, distributed, cloud, and hierarchical models.", "Recognize tables, records, fields, and relationships.", "Connect database design to availability and security decisions."]
  },
  {
    slug: "file-types-101",
    title: "File Types 101",
    category: "Foundations",
    format: "Reference guide",
    pages: 5,
    file: "File Types 101.pdf",
    summary: "A quick reference to common image, document, video, and audio formats and the storage, compression, and interoperability choices behind them.",
    focus: "Treat a file extension as a clue, not proof.",
    outcomes: ["Recognize common file families and extensions.", "Compare lossy and lossless compression.", "Use file type knowledge during triage and investigation."]
  },
  {
    slug: "useful-protocols",
    title: "Useful Protocols",
    category: "Foundations",
    format: "Reference guide",
    pages: 15,
    file: "Useful Protocols.pdf",
    summary: "An overview of common protocols and what they enable, including secure administration, remote desktop, name resolution, web traffic, mail, file transfer, and directory services.",
    focus: "Map a port or packet to the service and risk it represents.",
    outcomes: ["Associate common protocols with their typical ports.", "Recognize secure and legacy alternatives.", "Use protocol knowledge to support service inventory and hardening."]
  },
  {
    slug: "typical-services",
    title: "Typical Services",
    category: "Foundations",
    format: "Reference guide",
    pages: 7,
    file: "Typical Services.pdf",
    summary: "A reference to common server services, the difference between protocols and services, and why reducing unnecessary exposure matters.",
    focus: "Know what should be running before deciding what to change.",
    outcomes: ["Distinguish a service from the protocol it uses.", "Recognize common services and their operational purpose.", "Use least functionality as a starting point for review."]
  },
  {
    slug: "intro-to-wind-energy",
    title: "Intro to Wind Energy",
    category: "Foundations",
    format: "Industry primer",
    pages: 4,
    file: "Intro to Wind.pdf",
    summary: "A concise introduction to how wind turbines convert the kinetic energy of moving air into electricity and the major parts of a wind electric system.",
    focus: "Build the energy-sector context behind the technical scenario.",
    outcomes: ["Explain the basic energy conversion process.", "Identify major turbine and balance-of-system components.", "Connect physical process constraints to cyber-physical operations."]
  },
  {
    slug: "aws-ec2-101",
    title: "AWS EC2 101",
    category: "Cloud & systems",
    format: "Walkthrough",
    pages: 10,
    file: "AWS EC2 101.pdf",
    summary: "A beginner walkthrough of Amazon EC2: instance types, virtual private clouds, key pairs, security groups, storage, and connecting to a Linux instance.",
    focus: "Launch a small cloud lab with the major decisions in view.",
    outcomes: ["Explain what an EC2 instance is.", "Recognize the purpose of a VPC, key pair, security group, and storage volume.", "Connect to a Linux instance using the supplied AWS workflow."]
  },
  {
    slug: "aws-ec2-101-launch-windows-instance",
    title: "AWS EC2 101: Launch a Windows Instance",
    category: "Cloud & systems",
    format: "Walkthrough",
    pages: 13,
    file: "AWS EC2 101 - Launch a Windows Instance.pdf",
    summary: "A step-by-step AWS console walkthrough for launching, connecting to, stopping, and terminating a Windows EC2 instance.",
    focus: "Understand the Windows-specific path from launch to remote desktop.",
    outcomes: ["Configure a Windows instance in the EC2 console.", "Retrieve the connection details needed for RDP.", "Distinguish stopping, hibernating, and terminating an instance."]
  },
  {
    slug: "intro-to-linux",
    title: "Intro to Linux",
    category: "Cloud & systems",
    format: "Primer",
    pages: 14,
    file: "Intro to Linux.pdf",
    summary: "A broad introduction to Linux distributions, the filesystem, permissions, processes, package management, and everyday command-line administration.",
    focus: "Move comfortably through a Linux system before hardening it.",
    outcomes: ["Explain the role of the kernel and a Linux distribution.", "Navigate the filesystem and work with permissions.", "Use common administration concepts as a base for later hardening."]
  },
  {
    slug: "intro-to-windows",
    title: "Intro to Windows",
    category: "Cloud & systems",
    format: "Primer",
    pages: 17,
    file: "Intro to Windows.pdf",
    summary: "An introduction to Windows administration, including Remote Desktop, users and files, system navigation, and Active Directory concepts.",
    focus: "Build a reliable mental model of the Windows operator surface.",
    outcomes: ["Recognize common Windows editions and administration surfaces.", "Explain the purpose of RDP, local users, and file management.", "Describe where Active Directory fits in an enterprise environment."]
  },
  {
    slug: "intro-to-powershell",
    title: "Intro to PowerShell",
    category: "Cloud & systems",
    format: "Primer",
    pages: 15,
    file: "Intro to PowerShell.pdf",
    summary: "A practical introduction to PowerShell cmdlets, objects, pipelines, scripts, variables, and the administrative tasks the shell can automate.",
    focus: "Use the shell as an operator tool, not just a command prompt.",
    outcomes: ["Explain the object-based PowerShell pipeline.", "Read and compose common cmdlet patterns.", "Recognize the role of scripts, variables, and administrative automation."]
  },
  {
    slug: "linux-cheat-sheet",
    title: "Linux Cheat Sheet",
    category: "Cloud & systems",
    format: "Quick reference",
    pages: 4,
    file: "Linux Cheat Sheet.pdf",
    summary: "A compact command reference for navigating files, inspecting permissions, creating and moving content, searching, archiving, and managing processes.",
    focus: "Keep the high-frequency commands close at hand.",
    outcomes: ["Find and inspect files quickly.", "Recognize command patterns for permissions, processes, and archives.", "Use the reference as a companion while working through Linux labs."]
  },
  {
    slug: "ics-and-node-red",
    title: "ICS and Node-RED",
    category: "Cloud & systems",
    format: "Industry primer",
    pages: 11,
    file: "ICS and Node-RED.pdf",
    summary: "An introduction to industrial control systems, common ICS types, and Node-RED as a visual flow-based tool for connecting inputs, logic, and outputs.",
    focus: "Understand the process and the control logic together.",
    outcomes: ["Describe the purpose of ICS in critical infrastructure.", "Recognize SCADA and related control-system concepts.", "Read Node-RED flows as connected operational steps."]
  },
  {
    slug: "linux-hardening-101",
    title: "Linux Hardening 101",
    category: "Defense",
    format: "Hardening guide",
    pages: 8,
    file: "Linux Hardening 101.pdf",
    summary: "A practical starting point for Linux hardening: map the network, remove unnecessary services, review accounts and permissions, and keep changes testable.",
    focus: "Reduce exposure while preserving the services the mission needs.",
    outcomes: ["Start with service and port discovery.", "Identify unnecessary or risky services for review.", "Apply a repeatable hardening and verification sequence."]
  },
  {
    slug: "windows-hardening-101",
    title: "Windows Hardening 101",
    category: "Defense",
    format: "Hardening guide",
    pages: 8,
    file: "Windows Hardening 101.pdf",
    summary: "A Windows hardening checklist covering users and groups, passwords, services, firewall settings, updates, and other local-system controls.",
    focus: "Make the Windows baseline deliberate and reviewable.",
    outcomes: ["Review local users, groups, and memberships.", "Identify password, service, firewall, and update controls.", "Document changes so availability can be checked after hardening."]
  },
  {
    slug: "nessus-101",
    title: "Nessus 101",
    category: "Defense",
    format: "Tool guide",
    pages: 8,
    file: "Nessus 101.pdf",
    summary: "An introduction to Nessus as a vulnerability scanner, including installation, scan setup, results review, and the role of regular assessment.",
    focus: "Use scanner output to prioritize verification and remediation.",
    outcomes: ["Explain what a vulnerability scanner does and does not prove.", "Set up a basic scan in the documented workflow.", "Read findings as inputs to risk-based remediation."]
  },
  {
    slug: "nmap-101",
    title: "Nmap 101",
    category: "Defense",
    format: "Tool guide",
    pages: 6,
    file: "Nmap 101.pdf",
    summary: "An introduction to Nmap for network discovery and security auditing: finding hosts, identifying services, fingerprinting systems, and reading scan results.",
    focus: "Build an evidence-based picture of the network surface.",
    outcomes: ["Describe the questions Nmap can answer.", "Choose a scan approach appropriate to the exercise.", "Turn discovered services into a documented inventory."]
  },
  {
    slug: "wireshark-101",
    title: "Wireshark 101",
    category: "Defense",
    format: "Tool guide",
    pages: 4,
    file: "Wireshark 101.pdf",
    summary: "A beginner guide to capturing and analyzing traffic with Wireshark, including filters, packet inspection, and the limits of passive observation.",
    focus: "Use packets to explain what happened on the wire.",
    outcomes: ["Explain what Wireshark observes.", "Navigate captures and apply display filters.", "Use packet evidence to support troubleshooting and investigation."]
  },
  {
    slug: "encryption-and-ciphers-101",
    title: "Encryption and Ciphers 101",
    category: "Security concepts",
    format: "Concept guide",
    pages: 7,
    file: "Encryption and Ciphers 101.pdf",
    summary: "An introduction to plaintext, ciphertext, keys, symmetric and asymmetric encryption, and the classic cipher ideas that lead into modern cryptography.",
    focus: "Separate confidentiality concepts from the algorithms that provide them.",
    outcomes: ["Describe the path from plaintext to ciphertext and back.", "Compare symmetric and asymmetric encryption.", "Recognize why key management matters as much as the cipher."]
  },
  {
    slug: "hashing-101",
    title: "Hashing 101",
    category: "Security concepts",
    format: "Concept guide",
    pages: 4,
    file: "Hashing 101.pdf",
    summary: "A beginner explanation of one-way hashing, password storage, collisions, and why hashes should not be confused with encryption.",
    focus: "Know what a digest can prove—and what it cannot recover.",
    outcomes: ["Explain the one-way property of a cryptographic hash.", "Compare hashing and encryption.", "Recognize brute force and password-guessing as practical concerns."]
  },
  {
    slug: "rsa-encryption-101",
    title: "RSA Encryption 101",
    category: "Security concepts",
    format: "Concept guide",
    pages: 3,
    file: "RSA Encryption 101.pdf",
    summary: "A compact explanation of RSA’s public and private keys, the role of prime numbers, and the mathematical ideas behind asymmetric encryption.",
    focus: "Understand the key relationship before using the terminology.",
    outcomes: ["Explain the public/private key model.", "Describe why factoring large numbers is relevant to RSA.", "Relate RSA to the broader asymmetric encryption family."]
  },
  {
    slug: "steganography-101",
    title: "Steganography 101",
    category: "Security concepts",
    format: "Concept guide",
    pages: 3,
    file: "Steganography 101.pdf",
    summary: "An introduction to hiding a message inside an ordinary-looking carrier such as an image, audio file, video, or text.",
    focus: "Look for concealed meaning without losing sight of the carrier file.",
    outcomes: ["Define covert and overt communication.", "Recognize common digital carriers for hidden data.", "Use careful file inspection when a media file seems unusual."]
  },
  {
    slug: "command-injection-101",
    title: "Command Injection 101",
    category: "Security concepts",
    format: "Vulnerability guide",
    pages: 4,
    file: "Command Injection 101.pdf",
    summary: "A defensive introduction to command injection: how unsafe application input reaches an operating-system shell and how to reason about the resulting risk.",
    focus: "Understand the trust boundary so input can be validated safely.",
    outcomes: ["Explain how application input can cross into command execution.", "Recognize the difference between normal input and shell syntax.", "Identify safe defensive patterns such as allowlists and avoiding shell interpretation."]
  },
  {
    slug: "sql-injection-101",
    title: "SQL Injection 101",
    category: "Security concepts",
    format: "Vulnerability guide",
    pages: 5,
    file: "SQL Injection 101.pdf",
    summary: "A defensive introduction to SQL injection, starting with database structure and showing why untrusted input must not be mixed directly into queries.",
    focus: "Keep user input separate from database instructions.",
    outcomes: ["Explain how applications and databases interact.", "Recognize the trust boundary behind SQL injection.", "Identify parameterized queries and validation as core defenses."]
  },
  {
    slug: "john-the-ripper-101",
    title: "John the Ripper 101",
    category: "Security concepts",
    format: "Tool guide",
    pages: 4,
    file: "John the Ripper 101.pdf",
    summary: "A high-level introduction to John the Ripper and password-auditing approaches such as dictionary and brute-force attacks, framed for authorized practice.",
    focus: "Evaluate password resilience only in an approved lab or audit.",
    outcomes: ["Describe the purpose of password-auditing tools.", "Compare dictionary and brute-force approaches.", "Connect password policy and storage choices to audit results."]
  },
  {
    slug: "nist-nice-framework",
    title: "NIST NICE Framework",
    category: "Workforce & governance",
    format: "Workforce framework study guide",
    pages: 6,
    file: "NIST NICE Framework study guide",
    summary: "An original study guide to the NICE Framework's common language for cybersecurity work, including TKS statements, Work Roles, Competency Areas, Work Role Categories, and team application.",
    focus: "Connect cybersecurity learning and team responsibilities to observable work.",
    outcomes: ["Explain the purpose of the NICE Framework and SP 800-181 Rev. 1.", "Distinguish Tasks, Knowledge, Skills, Work Roles, and Competency Areas.", "Use current NICE components to plan learning, describe work, and identify capability gaps."]
  },
  {
    slug: "python-101",
    title: "Python 101",
    category: "Security concepts",
    format: "Programming primer",
    pages: 8,
    file: "Python 101.pdf",
    summary: "A beginner programming primer covering Python data types, variables, operators, conditionals, loops, functions, and small automation patterns.",
    focus: "Build enough fluency to automate repeatable analysis tasks.",
    outcomes: ["Recognize common Python data types and operators.", "Read basic control flow and functions.", "Use scripting concepts to support repeatable security work."]
  }
];

export const cyberforceLibraryCategories = [
  "Competition",
  "Foundations",
  "Cloud & systems",
  "Defense",
  "Security concepts",
  "Workforce & governance"
];

export function getCyberForceGuide(slug) {
  return cyberforceLibrary.find((guide) => guide.slug === slug);
}

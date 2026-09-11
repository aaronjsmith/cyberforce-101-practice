/* CyberForce 101 question bank built from the CyberForce 101 Library text. */
(function () {
  "use strict";

  var TOPICS = {
    competition: "Competition roles",
    foundations: "Foundations",
    networking: "Networking & services",
    systems: "Systems & cloud",
    defense: "Defense & tools",
    cyberforce_tools: "CyberForce tools & methods",
    crypto: "Cryptography",
    web_security: "Web security",
    automation: "Python & automation",
    harvard_overview: "Course overview",
    harvard_accounts: "Accounts & authentication",
    harvard_data: "Data & cryptography",
    harvard_systems: "Systems & networking",
    harvard_software: "Software security",
    harvard_privacy: "Privacy",
    soc2_overview: "Engagement overview",
    soc2_criteria: "Trust Services Criteria",
    soc2_scope: "Scope & system description",
    soc2_controls: "Controls & evidence",
    soc2_reports: "Reports & assurance",
    nice_overview: "NICE Framework overview",
    nice_components: "NICE Framework components",
    nice_application: "NICE Framework in practice",
    d3fend_overview: "D3FEND foundations",
    d3fend_model: "D3FEND model & exposure",
    d3fend_harden: "Harden countermeasures",
    d3fend_detect: "Detect analytics",
    d3fend_isolate: "Isolate access & content",
    d3fend_deceive: "Deceive with decoys",
    d3fend_evict: "Evict adversary access",
    d3fend_restore: "Restore operations",
    d3fend_identity: "Identity & credential defense",
    d3fend_network: "Network defense patterns",
    d3fend_endpoint: "Endpoint & application defense",
    d3fend_ot: "OT, firmware & physical defense"
  };
  var TOPIC_GROUPS = [
    { id: "cyberforce", label: "CyberForce 101", topics: ["competition", "foundations", "networking", "systems", "defense", "cyberforce_tools", "crypto", "web_security", "automation"] },
    { id: "harvard", label: "Harvard Cybersecurity", topics: ["harvard_overview", "harvard_accounts", "harvard_data", "harvard_systems", "harvard_software", "harvard_privacy"] },
    { id: "soc2", label: "SOC 2 foundations", topics: ["soc2_overview", "soc2_criteria", "soc2_scope", "soc2_controls", "soc2_reports"] },
    { id: "nice", label: "NIST NICE Framework", topics: ["nice_overview", "nice_components", "nice_application"] },
    { id: "d3fend", label: "MITRE D3FEND field guide", topics: ["d3fend_overview", "d3fend_model", "d3fend_harden", "d3fend_detect", "d3fend_isolate", "d3fend_deceive", "d3fend_evict", "d3fend_restore", "d3fend_identity", "d3fend_network", "d3fend_endpoint", "d3fend_ot"] }
  ];

  var HINT_CREDIT = { 0: 1, 1: 0.75, 2: 0.5, 3: 0.25 };
  var RETRY_CREDIT = 0.05;
  var MASTER = 10;
  var seq = 0;
  var generatorQueues = {};
  var lastGeneratorIndexes = {};
  var variationCounters = {};
  var VARIATION_CONTEXTS = {
    cyberforce: [
      "A competition team is reviewing a fresh anomaly with {count} evidence items.",
      "A blue-team analyst is preparing a response from {count} collected observations.",
      "A practice lab has recorded {count} relevant details for this case.",
      "A teammate has handed over {count} findings for a quick technical review.",
      "The operations log contains {count} entries connected to this exercise."
    ],
    harvard: [
      "A course study group is reviewing {count} observations from a new lab scenario.",
      "A learner is checking {count} pieces of evidence before choosing an answer.",
      "A security review worksheet contains {count} items for this course case.",
      "A classmate has documented {count} details from the current cybersecurity exercise.",
      "A practice review includes {count} facts that must be interpreted carefully."
    ],
    soc2: [
      "A service organization has prepared {count} evidence items for this control review.",
      "An audit walkthrough is tracking {count} artifacts for the current engagement.",
      "A control owner is explaining {count} pieces of evidence to the review team.",
      "The system description connects this question to {count} documented observations.",
      "A readiness check includes {count} records that need a defensible interpretation."
    ],
    d3fend: [
      "A blue-team review is mapping {count} observations to a D3FEND countermeasure.",
      "A defender is choosing a response from {count} pieces of system evidence.",
      "A cyber-physical operator has {count} facts to classify before changing a control.",
      "A security engineer is documenting {count} defensive actions for a handoff.",
      "A tabletop exercise contains {count} signals that need a D3FEND-shaped answer."
    ]
  };

  function id() { seq += 1; return "cf-" + seq; }
  function shuffle(items) {
    var out = items.slice();
    for (var i = out.length - 1; i > 0; i -= 1) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = out[i]; out[i] = out[j]; out[j] = tmp;
    }
    return out;
  }
  function pick(items) { return items[Math.floor(Math.random() * items.length)]; }
  function num(value) { return Math.round(Number(value) * 10000) / 10000; }
  function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function variationFamily(topic) {
    if (topic.indexOf("harvard_") === 0) return "harvard";
    if (topic.indexOf("soc2_") === 0) return "soc2";
    if (topic.indexOf("d3fend_") === 0) return "d3fend";
    return "cyberforce";
  }
  function varyQuestion(question, topic) {
    var index = variationCounters[topic] || 0;
    variationCounters[topic] = index + 1;
    var family = variationFamily(topic);
    var templates = VARIATION_CONTEXTS[family];
    var template = templates[index % templates.length];
    var count = 3 + ((index * 7 + topic.length) % 18);
    var caseId = family.toUpperCase().slice(0, 2) + "-" + String(100 + ((index * 53 + topic.length * 11) % 900));
    var context = template.replace("{count}", String(count)) + " Practice case " + caseId + ".";
    question.prompt = context + String.fromCharCode(10, 10) + question.prompt;
    if (question.setup) question.setup = "Case detail: " + count + " evidence items are in scope for this exercise.\n\n" + question.setup;
    return question;
  }
  var SOURCE_URLS = {
    "2025 CyberForce Competition Expectations.pdf": "https://cyberforce.energy.gov/wp-content/uploads/2026/01/2025-CyberForce-Competition-Expectations.pdf",
    "CS50 Cybersecurity course home": "https://cs50.harvard.edu/cybersecurity/",
    "CS50 Cybersecurity Week 0": "https://cs50.harvard.edu/cybersecurity/weeks/0/",
    "CS50 Cybersecurity Week 1": "https://cs50.harvard.edu/cybersecurity/weeks/1/",
    "CS50 Cybersecurity Week 2": "https://cs50.harvard.edu/cybersecurity/weeks/2/",
    "CS50 Cybersecurity Week 3": "https://cs50.harvard.edu/cybersecurity/weeks/3/",
    "CS50 Cybersecurity Week 4": "https://cs50.harvard.edu/cybersecurity/weeks/4/",
    "AICPA Trust Services Criteria": "https://www.aicpa-cima.com/resources/download/2017-trust-services-criteria-with-revised-points-of-focus-2022",
    "AICPA SOC 2 reporting": "https://www.aicpa-cima.com/cpe-learning/publication/soc-2-reporting-on-an-examination-of-controls-at-a-service-organization-relevant-to-security-availability-processing-integrity-confidentiality-or-privacy",
    "NIST NICE Framework overview": "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/about",
    "NIST NICE Framework Components": "https://www.nist.gov/itl/applied-cybersecurity/nice/nice-framework-resource-center/nice-framework-current-versions",
    "NIST SP 800-181 Rev. 1": "https://csrc.nist.gov/pubs/sp/800/181/r1/final",
    "NISTIR 8355": "https://csrc.nist.gov/pubs/ir/8355/final",
    "NICE Framework Components v2.2.0": "https://www.nist.gov/news-events/news/2026/04/nice-releases-nice-framework-components-v220",
    "NICE Framework components poster": "https://www.nist.gov/document/nice-framework-components-poster-march-2025",
    "MITRE D3FEND 1.6.0": "https://d3fend.mitre.org/"
  };
  function makeMc(topic, prompt, choices, answer, hint, setup, source) {
    return function () {
      return { id: id(), topic: topic, type: "mc", prompt: prompt, choices: shuffle(choices), answer: answer, hint: hint, setup: setup, calc: { ti: "Review the definition in the guide." }, source: source };
    };
  }
  function makeNum(topic, prompt, answer, hint, setup, source, tolerance) {
    return function () {
      return { id: id(), topic: topic, type: "numeric", prompt: prompt, answer: num(answer), tolerance: tolerance == null ? 0.01 : tolerance, hint: hint, setup: setup, calc: { ti: "Enter the arithmetic in your calculator." }, source: source };
    };
  }
  function makeBinaryConversion(topic, source) {
    var remainingDecimals = [];
    return function () {
      if (!remainingDecimals.length) {
        for (var value = 5; value <= 31; value += 1) remainingDecimals.push(value);
        remainingDecimals = shuffle(remainingDecimals);
      }
      var decimal = remainingDecimals.pop();
      var binary = decimal.toString(2);
      var placeValues = [];
      for (var index = binary.length - 1; index >= 0; index -= 1) {
        placeValues.push(String(Math.pow(2, index)));
      }
      return {
        id: id(),
        topic: topic,
        type: "numeric",
        prompt: "Convert binary " + binary + " to decimal.",
        answer: decimal,
        tolerance: 0,
        hint: "Use the place values " + placeValues.join(", ") + ".",
        setup: binary.split("").map(function (bit, position) {
          var exponent = binary.length - position - 1;
          return bit + "×" + Math.pow(2, exponent);
        }).join(" + ") + " = ?",
        calc: { ti: "Enter the binary place-value arithmetic in your calculator." },
        source: source
      };
    };
  }
  function makeShort(topic, prompt, answers, hint, setup, source) {
    return function () {
      var accepted = Array.isArray(answers) ? answers : [answers];
      return { id: id(), topic: topic, type: "short", prompt: prompt, answers: accepted, answer: accepted[0], hint: hint, setup: setup, calc: { ti: "Use the exact term from the guide." }, source: source };
    };
  }

  function makeTerminal(topic, prompt, terminal, answers, hint, setup, source) {
    return function () {
      var accepted = Array.isArray(answers) ? answers : [answers];
      return { id: id(), topic: topic, type: "terminal", prompt: prompt, terminal: terminal, answers: accepted, answer: accepted[0], hint: hint, setup: setup, calc: { ti: "Read the prompt and type the command exactly." }, source: source };
    };
  }
  function makeAttack(topic, prompt, simulation, choices, answer, hint, setup, source) {
    return function () {
      return { id: id(), topic: topic, type: "attack", prompt: prompt, simulation: simulation, choices: shuffle(choices), answer: answer, hint: hint, setup: setup, calc: { ti: "Identify the evidence before choosing a response." }, source: source };
    };
  }

  var GENERATORS = {
    competition: [
      makeMc("competition", "What is the central purpose of the CyberForce Competition described in the library?", ["Build a pipeline of qualified cybersecurity candidates", "Sell commercial firewall licenses", "Train only physical safety inspectors", "Replace every classroom with a live incident"], "Build a pipeline of qualified cybersecurity candidates", "Look for the stated long-term workforce goal.", "The guide connects the realistic energy-sector scenario to students gaining practical experience.", "CyberForce Competition 101.pdf"),
      makeMc("competition", "Anomalies in the competition are mapped to which framework?", ["NIST NICE Framework", "OSI routing table", "MITRE D3FEND only", "IEEE 802.11 standard"], "NIST NICE Framework", "The anomaly guide names a workforce framework.", "Anomalies connect technical and non-technical tasks to roles and prioritization.", "Anomalies 101.pdf"),
      makeMc("competition", "The C-Suite Panel brief is part of which competition team score?", ["Orange Team", "Green Team", "Red Team", "White Team"], "Orange Team", "The panel is about executive communication.", "The guide says the goal is to translate technical topics for technical and non-technical executives.", "C-Suite Panel 101.pdf"),
      makeMc("competition", "When an anomaly is syntax-sensitive, what should a competitor pay close attention to?", ["Spelling, grammar, and special characters", "Only capitalization", "Only the time of day", "Whether the answer is in a screenshot"], "Spelling, grammar, and special characters", "Syntax is about the exact form of the response.", "Most anomalies are not case-sensitive, but syntax-sensitive; follow any explicit case rule.", "Anomalies 101.pdf")
    ],
    foundations: [
      makeMc("foundations", "Hexadecimal numbers use which base?", ["2", "8", "10", "16"], "16", "Hex uses sixteen symbols: 0–9 and A–F.", "Base 16 is useful for compactly representing binary data.", "Base Tutorial.pdf"),
      makeBinaryConversion("foundations", "Base Tutorial.pdf"),
      makeMc("foundations", "Which statement correctly describes lossless compression?", ["The original data can be reconstructed exactly", "Some detail is intentionally discarded", "It only works on network packets", "It changes every file into plain text"], "The original data can be reconstructed exactly", "Think about whether decompression can restore every bit.", "Lossless methods preserve the original content; lossy methods trade fidelity for smaller size.", "File Types 101.pdf"),
      makeMc("foundations", "A wind turbine primarily converts the kinetic energy of moving air into what?", ["Electrical energy", "Database records", "Compressed video", "Cryptographic keys"], "Electrical energy", "Follow the energy conversion described in the industry primer.", "The physical process is the context behind the cyber-physical scenario.", "Intro to Wind.pdf")
    ],
    networking: [
      makeMc("networking", "Which device primarily forwards frames between devices on the same local network?", ["Switch", "Router", "Modem only", "Web server"], "Switch", "A switch is the local-network connection point.", "Routers move traffic between networks; switches connect hosts inside a LAN.", "Networking 101.pdf"),
      makeMc("networking", "Which port is normally associated with HTTPS?", ["21", "22", "80", "443"], "443", "HTTPS is the secure web service.", "The Useful Protocols guide pairs common services with their typical ports.", "Useful Protocols.pdf"),
      makeMc("networking", "What is a firewall's basic job?", ["Allow or reject traffic using defined rules", "Translate every file into hexadecimal", "Store database rows", "Capture keyboard input"], "Allow or reject traffic using defined rules", "Think about traffic crossing a boundary.", "Packet filtering reviews data packets before accepting or rejecting them based on rules.", "Networking 101.pdf"),
      makeMc("networking", "Why does service inventory matter during a security review?", ["It shows what should be running before changes are made", "It guarantees that no vulnerability exists", "It replaces all backups", "It makes passwords unnecessary"], "It shows what should be running before changes are made", "You need a baseline before deciding what to disable.", "Typical Services emphasizes distinguishing services from protocols and reducing unnecessary exposure.", "Typical Services.pdf")
    ],
    systems: [
      makeMc("systems", "In Linux, what does mkdir do?", ["Creates a directory", "Lists running processes", "Changes file ownership", "Prints the current directory"], "Creates a directory", "Read the command as 'make directory'.", "The Linux guide pairs mkdir with ls and cd for basic navigation.", "Intro to Linux.pdf"),
      makeMc("systems", "Which PowerShell concept lets cmdlets pass rich objects to the next command?", ["The object-based pipeline", "A compiled kernel module", "A DNS zone transfer", "A binary-only shell"], "The object-based pipeline", "PowerShell passes objects rather than only text.", "The pipeline lets commands compose operations on structured output.", "Intro to PowerShell.pdf"),
      makeMc("systems", "In AWS EC2, what is a security group?", ["A virtual firewall for instance traffic", "A physical rack cabinet", "A password hash", "A storage snapshot only"], "A virtual firewall for instance traffic", "It controls allowed network connections to an instance.", "The EC2 guide lists security groups alongside VPCs, key pairs, and storage.", "AWS EC2 101.pdf"),
      makeMc("systems", "In an industrial control system, what does SCADA commonly describe?", ["Supervisory control and data acquisition", "Secure cipher administration and data access", "System cache allocation and disk analysis", "Static configuration of application directories"], "Supervisory control and data acquisition", "Expand the acronym used in the ICS guide.", "SCADA is part of the control-system vocabulary used to monitor and operate physical processes.", "ICS and Node-RED.pdf"),
      makeTerminal("systems", "A Linux responder is checking a host after a suspicious service alert. Which command lists listening TCP/UDP sockets with owning processes?", { os: "linux", title: "Ubuntu IR shell", cwd: "/var/log", lines: [
        { prompt: "analyst@bluebox:/var/log$", command: "tail -n 3 auth.log", output: ["Sep 14 10:21 sudo: analyst : TTY=pts/0 ; PWD=/var/log", "Sep 14 10:22 sshd: Accepted publickey for analyst"] },
        { prompt: "analyst@bluebox:/var/log$", command: "", output: ["# type the next read-only investigation command"] }
      ] }, ["ss -tulpn", "ss -tulnp", "netstat -tulpn"], "Choose the socket-inspection utility and include flags for TCP, UDP, listening, and process details.", "The command should be read-only and expose both listening endpoints and the owning process.", "Intro to Linux.pdf"),
      makeTerminal("systems", "The Windows IR team needs a quick service inventory before changing anything. Which PowerShell command should the analyst run?", { os: "windows", title: "PowerShell 7 · IR console", cwd: "C:\\IR\\case-042", lines: [
        { prompt: "PS C:\\IR\\case-042>", command: "Get-Date", output: ["Sunday, September 14, 2025 10:24:06 AM"] },
        { prompt: "PS C:\\IR\\case-042>", command: "", output: ["# establish a baseline of installed and running services"] }
      ] }, ["Get-Service", "gsv"], "Use the PowerShell cmdlet whose name describes the inventory you need.", "Start with a baseline. A service inventory helps you distinguish an expected service from a newly exposed one.", "Intro to PowerShell.pdf"),
    ],
    defense: [
      makeMc("defense", "What is Nmap primarily used for?", ["Network discovery and service identification", "Editing image metadata", "Encrypting a disk", "Writing SQL queries"], "Network discovery and service identification", "Nmap builds an evidence-based view of the network surface.", "The guide highlights hosts, services, system fingerprinting, and scan results.", "Nmap 101.pdf"),
      makeMc("defense", "What does Wireshark let an analyst inspect?", ["Captured network traffic", "Only local user passwords", "The CPU instruction set", "A cloud billing invoice"], "Captured network traffic", "Wireshark is a packet-analysis tool.", "Use captures and display filters to support troubleshooting and investigation.", "Wireshark 101.pdf"),
      makeMc("defense", "What does Nessus provide?", ["Vulnerability scan findings", "A replacement operating system", "A hidden message inside an image", "A database schema"], "Vulnerability scan findings", "It is an assessment tool, not proof that every risk is gone.", "The guide frames scan output as input to verification and risk-based remediation.", "Nessus 101.pdf"),
      makeMc("defense", "Which is a sensible first step in Linux hardening?", ["Map the network and review exposed services", "Disable every service without testing", "Delete all user accounts", "Turn off logging"], "Map the network and review exposed services", "Start with discovery and preserve mission-required availability.", "The hardening guide emphasizes inventory, unnecessary services, accounts, permissions, and verification.", "Linux Hardening 101.pdf"),
      makeAttack("defense", "A security alert is open in the SOC dashboard. What is the best first response to this simulated credential-theft event?", { kind: "alert", app: "BlueWatch SOC", badge: "HIGH · INVESTIGATE", title: "Impossible travel + new mailbox rule", subtitle: "Account: j.ortiz · Identity provider", time: "10:31 UTC", facts: ["Login: 10.44.8.19 → 185.72.14.6 in 8 minutes", "New rule: forward invoices to external address", "MFA: push approved from unfamiliar device"], action: "Review sign-in and mailbox audit evidence before containment" }, ["Review sign-in and mailbox audit evidence before containment", "Delete all mailbox rules and close the alert", "Block every IP on the perimeter immediately", "Reset every user password without preserving evidence"], "Review sign-in and mailbox audit evidence before containment", "Preserve the timeline and confirm the scope before making a broad change.", "A defensible response begins with evidence collection, then containment that is proportional to what the evidence shows.", "2025 CyberForce Competition Expectations.pdf"),
    ],
    cyberforce_tools: [
      makeMc("cyberforce_tools", "According to the 2025 CyberForce expectations, what is Nmap primarily used for during anomaly work?", ["Network mapping", "Steganography decoding", "Disk-image examination", "Source-code versioning"], "Network mapping", "Choose the tool whose purpose is to build a view of hosts and services.", "Use Nmap to establish the network surface before deciding what evidence or remediation steps are needed.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which tool is suggested for decoding a message hidden inside an image or other carrier file?", ["Steghide", "Make", "Docker", "WinDbg"], "Steghide", "This tool's specialty is steganography.", "Steganography analysis asks whether an ordinary-looking carrier contains hidden data; preserve the original before extracting anything.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which pair is listed as password-cracking tools for CyberForce anomalies?", ["John the Ripper and hashcat", "Nmap and Autopsy", "Ghidra and WinDbg", "Git and Docker"], "John the Ripper and hashcat", "Look for the two tools associated with password auditing.", "Password cracking is an authorized analysis method in the competition context; use it only against provided challenge material.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "What is Autopsy best matched with in the suggested-software list?", ["Digital-forensics examination", "Network mapping", "Container deployment", "C/C++ compilation"], "Digital-forensics examination", "Think about investigating a disk or file-system image.", "Forensic tooling helps preserve a defensible record of what was found and how the evidence supports a conclusion.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which tool is suggested when an anomaly requires reverse engineering a binary?", ["Ghidra", "CyberChef", "Okteta", "7-Zip"], "Ghidra", "Choose the reverse-engineering tool.", "A useful method is to identify the artifact type first, then select the tool that can expose its structure or behavior.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which tool is specifically listed for inspecting or manipulating radio signals?", ["Universal Radio Hacker (URH)", "Outlook", "Git", "Clang-14"], "Universal Radio Hacker (URH)", "The initials URH appear in the suggested software list.", "Match the tool to the evidence: radio or RF artifacts require a radio-analysis workflow, not a web or source-control tool.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "What is CyberChef most useful for in an anomaly-solving workflow?", ["Transforming and decoding data", "Scanning for live hosts", "Debugging Windows processes", "Building a C program"], "Transforming and decoding data", "Think recipes, encodings, and format conversions.", "Use repeatable transformations to turn raw evidence into a form you can interpret, and record the steps so the result can be reproduced.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which sequence best reflects a defensible CyberForce investigation method?", ["Discover and preserve evidence → analyze with the appropriate tool → remediate → verify → document", "Delete the artifact → guess the answer → disable logging → submit", "Block every IP → reimage every VM → ask for the answer", "Install every tool → change all services → skip verification"], "Discover and preserve evidence → analyze with the appropriate tool → remediate → verify → document", "Start with evidence and end with a record of what changed.", "The expectations emphasize assessing and testing in setup, monitoring and answering anomalies during the attack phase, and documenting infrastructure and changes.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Why are snapshots part of the recommended method before significant infrastructure changes?", ["They provide a recovery point if a VM is damaged", "They add unlimited new VMs", "They hide a team from scoring", "They replace security documentation"], "They provide a recovery point if a VM is damaged", "A snapshot is a restore point, not a new machine.", "The guide recommends snapshots before and after major changes; restoring a VM outside the allowed process carries a scoring penalty.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which action is prohibited even if it might block an attacker?", ["Blocking specific IP addresses on the competition infrastructure", "Reviewing service inventory", "Hardening a provided VM", "Testing required services before competition day"], "Blocking specific IP addresses on the competition infrastructure", "The rules distinguish normal firewall use from targeted IP blocking.", "Preserve scoreboard and user reachability: defensive changes must not prevent the scoreboard or specified users from reaching required services.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "Which toolchain is suggested when an anomaly requires compiling code?", ["GCC-12, Clang-14, and Make", "Steghide, Autopsy, and URH", "Nmap, Nessus, and Wireshark", "Outlook, Docker, and Git"], "GCC-12, Clang-14, and Make", "Select the compiler and build-automation tools.", "Identify whether the task is compilation or build orchestration before choosing a tool; keep the build steps repeatable.", "2025 CyberForce Competition Expectations.pdf"),
      makeMc("cyberforce_tools", "During the competition attack phase, what should Blue teams continuously do?", ["Monitor systems, answer anomalies, and maintain the website", "Perform offensive actions against other teams", "Add unlimited virtual machines", "Wait for Red team instructions before checking services"], "Monitor systems, answer anomalies, and maintain the website", "This is the Blue team's operational loop.", "The method is continuous defense under availability constraints: investigate signals while keeping required services usable for Green and scoring systems.", "2025 CyberForce Competition Expectations.pdf")
    ],
    crypto: [
      makeMc("crypto", "What is the key property of a cryptographic hash?", ["It is designed to be one-way", "It always decrypts to the original message", "It uses two identical network ports", "It hides data inside an image"], "It is designed to be one-way", "A digest is not the same as encrypted text.", "Hashing supports integrity checks and password storage, but guessing attacks still matter.", "Hashing 101.pdf"),
      makeMc("crypto", "In symmetric encryption, how are the encryption and decryption keys related?", ["The same shared key is used", "There is never a key", "A public key is always paired with a DNS record", "Only a hash can decrypt"], "The same shared key is used", "Symmetric means the two directions share a secret.", "Asymmetric encryption uses different keys; symmetric encryption uses a shared secret.", "Encryption and Ciphers 101.pdf"),
      makeMc("crypto", "What does RSA rely on being difficult for large numbers?", ["Factoring a large composite number", "Sorting a short list", "Reading a file extension", "Resolving a local hostname"], "Factoring a large composite number", "The RSA guide calls out prime numbers and factoring.", "RSA is an asymmetric algorithm built around public and private keys.", "RSA Encryption 101.pdf"),
      makeMc("crypto", "What is steganography?", ["Hiding a message inside an ordinary-looking carrier", "Replacing a password with a port number", "Scanning a subnet for hosts", "Compressing a database without keys"], "Hiding a message inside an ordinary-looking carrier", "The carrier may be an image, audio, video, or text file.", "Inspect a suspicious carrier carefully; the visible file may not reveal its hidden content.", "Steganography 101.pdf")
    ],
    web_security: [
      makeMc("web_security", "In the SQL pattern SELECT ... FROM ... WHERE ..., what does WHERE provide?", ["A condition that must be met", "The database password", "The table's storage device", "The web server's IP address"], "A condition that must be met", "WHERE filters the rows selected by the query.", "The SQL Injection guide defines SELECT, FROM, and WHERE separately.", "SQL Injection 101.pdf"),
      makeMc("web_security", "Which practice keeps user input separate from SQL instructions?", ["Parameterized queries", "String concatenation everywhere", "Disabling database logs", "Using a longer URL"], "Parameterized queries", "The defense should preserve the boundary between data and code.", "Validate input and use parameterized queries so input is not interpreted as query syntax.", "SQL Injection 101.pdf"),
      makeMc("web_security", "Command injection occurs when unsafe application input reaches what?", ["An operating-system command interpreter", "A lossless image compressor", "A normalizing hash only", "A screen brightness setting"], "An operating-system command interpreter", "Trace the input from the application to the host.", "The command injection guide compares this trust-boundary failure with SQL injection.", "Command Injection 101.pdf"),
      makeMc("web_security", "Why can an expression such as 1=1 be dangerous in an unsafe SQL query?", ["It is always true and can change the query's logic", "It encrypts the entire database", "It closes the database connection", "It creates a new operating-system user"], "It is always true and can change the query's logic", "Evaluate the expression literally.", "The guide uses 1=1 to illustrate how injected logic can bypass an intended condition.", "SQL Injection 101.pdf"),
      makeAttack("web_security", "Inspect this simulated inbox message. Which signal most strongly indicates a phishing attempt?", { kind: "email", app: "FieldMail", badge: "SUSPICIOUS", sender: "IT Helpdesk <it-helpdesk@northwind-reset.com>", subject: "Action required: password expires in 30 minutes", body: "Your account will be disabled unless you confirm your password immediately. Use the secure verification page below.", linkLabel: "Verify my account", linkUrl: "https://northwind-reset.com/verify", details: ["Received: just now", "Reply-to: noreply@northwind-reset.com"] }, ["The sender domain does not match the organization and the message creates urgency", "The message contains a subject line", "The message arrived in an inbox", "The link uses blue text"], "The sender domain does not match the organization and the message creates urgency", "Compare the sender, reply-to, destination, and emotional pressure.", "Phishing often combines an unusual origin with urgency to push a user past normal verification.", "Phishing 101.pdf")
    ],
    harvard_overview: [
      makeMc("harvard_overview", "How is CS50’s Introduction to Cybersecurity organized?", ["Five weeks of material plus a final project", "One exam with no assignments", "Ten labs focused only on programming", "A single lecture about network scanning"], "Five weeks of material plus a final project", "The course home describes a five-week OpenCourseWare path.", "The sequence moves through accounts, data, systems, software, and privacy before the final project.", "CS50 Cybersecurity course home")
    ],
    harvard_accounts: [
      makeMc("harvard_accounts", "Which set lists the three common multi-factor authentication categories?", ["Knowledge, possession, and inherence", "Password, port, and protocol", "Hashing, salting, and encryption", "Browser, cookie, and certificate"], "Knowledge, possession, and inherence", "Think about what you know, have, and are.", "CS50 groups MFA factors as knowledge, possession, and inherence.", "CS50 Cybersecurity Week 0")
    ],
    harvard_data: [
      makeMc("harvard_data", "What is the defining property of a cryptographic hash function?", ["It is designed to be one-way", "It can always be decrypted with a public key", "It requires a VPN to run", "It stores the original password in plain text"], "It is designed to be one-way", "A hash is not intended to be reversed into the original input.", "Hashing supports integrity and password storage, but weak passwords can still be guessed.", "CS50 Cybersecurity Week 1")
    ],
    harvard_systems: [
      makeMc("harvard_systems", "What does TLS add to HTTPS?", ["Protection for data exchanged between a client and server", "A replacement for all user authentication", "A way to make every website public", "A method for deleting browser history"], "Protection for data exchanged between a client and server", "TLS is the security layer associated with HTTPS.", "CS50 connects HTTPS, certificates, certificate authorities, and TLS.", "CS50 Cybersecurity Week 2")
    ],
    harvard_software: [
      makeMc("harvard_software", "Which practice keeps application input separate from SQL instructions?", ["Prepared statements", "Concatenating raw input into a query", "Disabling server-side validation", "Putting the query in a cookie"], "Prepared statements", "The defense preserves the boundary between data and code.", "CS50’s software-security material presents prepared statements as a defense against SQL injection.", "CS50 Cybersecurity Week 3")
    ],
    harvard_privacy: [
      makeMc("harvard_privacy", "What privacy technique identifies a browser or device from a combination of attributes?", ["Fingerprinting", "Secure deletion", "Key exchange", "Packet routing"], "Fingerprinting", "The term describes a recognizable collection of browser or device characteristics.", "CS50’s privacy material covers fingerprinting alongside cookies, tracking parameters, and private browsing.", "CS50 Cybersecurity Week 4")
    ],
    soc2_overview: [
      makeMc("soc2_overview", "What does a SOC 2 engagement primarily examine?", ["A service organization’s system description and relevant controls", "Only a company’s income statement", "A software license’s source code", "A physical building’s fire exits"], "A service organization’s system description and relevant controls", "SOC 2 is about controls over systems used to provide services.", "The report helps users understand how a service organization’s controls address relevant Trust Services Criteria.", "AICPA SOC 2 reporting")
    ],
    soc2_criteria: [
      makeMc("soc2_criteria", "Which list contains the five Trust Services Criteria categories?", ["Security, availability, processing integrity, confidentiality, and privacy", "Revenue, payroll, inventory, tax, and treasury", "Authentication, routing, storage, backup, and logging", "Quality, speed, cost, staffing, and marketing"], "Security, availability, processing integrity, confidentiality, and privacy", "The categories describe different dimensions of trustworthy systems and information.", "Organizations select the criteria relevant to the services and commitments being examined.", "AICPA Trust Services Criteria"),
      makeMc("soc2_criteria", "Which Trust Services Criteria category focuses on whether a system is available for operation and use as committed?", ["Availability", "Confidentiality", "Processing integrity", "Privacy"], "Availability", "Match the category to reliable access and operation.", "Availability addresses whether systems and services are available according to commitments or requirements.", "AICPA Trust Services Criteria")
    ],
    soc2_scope: [
      makeMc("soc2_scope", "Why should an organization define the system scope before mapping controls?", ["Scope identifies the services, components, and boundaries the controls must cover", "Scope automatically proves every control is effective", "Scope eliminates the need for evidence", "Scope replaces management’s system description"], "Scope identifies the services, components, and boundaries the controls must cover", "Controls cannot be evaluated against an undefined system.", "A useful scope connects the service, people, processes, technology, data, and relevant third parties.", "AICPA SOC 2 reporting")
    ],
    soc2_controls: [
      makeMc("soc2_controls", "Which evidence practice produces the most defensible control record?", ["Tie evidence to the control, owner, period, system, and any exception", "Collect screenshots without dates or context", "Keep only successful samples", "Store evidence without naming the responsible owner"], "Tie evidence to the control, owner, period, system, and any exception", "A reviewer needs to understand what the evidence proves and when.", "Evidence should support repeatable testing and make gaps or remediation visible rather than hiding them.", "AICPA Trust Services Criteria")
    ],
    soc2_reports: [
      makeMc("soc2_reports", "What is the key difference between a Type 1 and a Type 2 SOC 2 report?", ["Type 1 evaluates controls at a point in time; Type 2 also evaluates operating effectiveness over a period", "Type 1 is for privacy and Type 2 is for security only", "Type 1 is internal and Type 2 is never shared", "Type 1 covers vendors and Type 2 covers employees only"], "Type 1 evaluates controls at a point in time; Type 2 also evaluates operating effectiveness over a period", "One report has an as-of date; the other includes a period of operation.", "The report type changes the evidence window and the assurance users receive about control operation.", "AICPA SOC 2 reporting")
    ],
    nice_overview: [
      makeMc("nice_overview", "What is the primary purpose of the NIST NICE Framework?", ["Provide a common language for describing cybersecurity work and capabilities", "Assign one universal job title to every security professional", "Replace technical training with a single certification exam", "Define firewall rules for every organization"], "Provide a common language for describing cybersecurity work and capabilities", "Think workforce language, not a technical control.", "NICE helps employers, learners, educators, and training providers communicate about cybersecurity work, hiring, and development.", "NIST NICE Framework overview"),
      makeMc("nice_overview", "Which statements are the core building blocks of the NICE Framework?", ["Task, Knowledge, and Skill statements", "Risk, Threat, and Vulnerability statements", "User, Host, and Network statements", "Policy, Procedure, and Audit statements"], "Task, Knowledge, and Skill statements", "The three terms are often abbreviated TKS.", "Tasks describe work to be done; Knowledge and Skills describe what someone needs to know or be able to do to complete it.", "NIST SP 800-181 Rev. 1"),
      makeMc("nice_overview", "In the NICE Framework, what is a Work Role?", ["A grouping of work for which an individual or team is responsible or accountable", "A required four-year degree for a security job", "A list of products approved by NIST", "A synonym for an organization's department"], "A grouping of work for which an individual or team is responsible or accountable", "Focus on responsibility and accountability.", "Work Roles describe kinds of work. They are not the same thing as job titles or occupations.", "NIST NICE Framework overview"),
      makeMc("nice_overview", "Who can use the NICE Framework?", ["Employers, learners, educators, and training or certification providers", "Only federal agencies", "Only security software vendors", "Only people who already hold a certification"], "Employers, learners, educators, and training or certification providers", "NICE is designed for a broad workforce ecosystem.", "The framework supports workforce assessment, career planning, education, training, hiring, and development across sectors.", "NIST NICE Framework overview")
    ],
    nice_components: [
      makeMc("nice_components", "What does a NICE Framework Competency Area represent?", ["A cluster of related Knowledge and Skill statements associated with capability in a domain", "A fixed salary band for a Work Role", "A network segment that needs a firewall", "A certification exam score"], "A cluster of related Knowledge and Skill statements associated with capability in a domain", "Competency Areas focus on capability in a domain.", "Competency Areas can be used with Work Roles or on their own to describe learning and capability development.", "NISTIR 8355"),
      makeMc("nice_components", "How is a Work Role different from a job title?", ["A job may combine several Work Roles, while a Work Role describes a grouping of work", "A Work Role is always a management position", "A job title is maintained by NIST and a Work Role is not", "They are identical terms in the NICE Framework"], "A job may combine several Work Roles, while a Work Role describes a grouping of work", "Separate the work from the label on an employee's business card.", "Organizations can map their own jobs and occupations to the Work Roles that best describe the work being performed.", "NIST SP 800-181 Rev. 1"),
      makeMc("nice_components", "Which list matches the five broad Work Role Categories shown in the current NICE component set?", ["Oversight & Governance; Design & Development; Implementation & Operation; Protection & Defense; Investigation", "Accounts; Data; Systems; Software; Privacy", "Identify; Protect; Detect; Respond; Recover", "Red; Blue; Green; White; Orange"], "Oversight & Governance; Design & Development; Implementation & Operation; Protection & Defense; Investigation", "These are broad categories of cybersecurity responsibility.", "Use NIST's Current Versions page for the authoritative component list because the components are maintained separately from SP 800-181.", "NICE Framework components poster"),
      makeMc("nice_components", "Why should a learner check NIST's Current Versions page when using NICE components?", ["The components are maintained and updated separately from the framework publication", "The page converts every Work Role into a college degree", "The page is required to unlock the quiz", "The components never change, but the page stores passwords"], "The components are maintained and updated separately from the framework publication", "Look for the reason the resource is maintained separately.", "NIST describes the component set as agile and regularly reviewed so it can respond to changes in cybersecurity work.", "NIST NICE Framework Components")
    ],
    nice_application: [
      makeMc("nice_application", "A learner wants to become better at incident response. What is the most useful NICE-aligned next step?", ["Choose a relevant Work Role or Competency Area, inspect its TKS statements, and practice the gaps", "Memorize every job title used by security teams", "Buy a tool before identifying the work to be done", "Treat one course grade as proof of every capability"], "Choose a relevant Work Role or Competency Area, inspect its TKS statements, and practice the gaps", "Start with the work and capabilities, then choose practice.", "NICE can turn a broad career goal into specific, observable learning activities and evidence.", "NIST NICE Framework overview"),
      makeMc("nice_application", "What is a good employer use of the NICE Framework?", ["Create clearer work descriptions and identify workforce capability gaps", "Require every employee to perform every cybersecurity task", "Replace interviews with a single framework number", "Guarantee that a candidate will succeed in any environment"], "Create clearer work descriptions and identify workforce capability gaps", "Think about communication, recruiting, and development.", "NIST presents NICE as a reference that organizations can use to identify, recruit, develop, and retain talent.", "NIST NICE Framework overview"),
      makeMc("nice_application", "A cyber-physical team maps service inventory, industrial-system security, alert investigation, and executive briefing. What does NICE add?", ["A precise way to describe responsibilities and the capabilities needed across the team", "A guarantee that the team will never experience an incident", "A replacement for the team's operating procedures", "A rule that only one person may own all security work"], "A precise way to describe responsibilities and the capabilities needed across the team", "NICE improves shared understanding of work and capability.", "Different jobs and teammates can contribute different Work Roles and TKS statements to a shared mission.", "NIST NICE Framework overview"),
      makeMc("nice_application", "Which statement best describes how teams relate to the NICE Framework?", ["Teams can combine people with complementary skills and experience to tackle complex challenges", "Teams must be organized into one Work Role only", "Teams are outside the scope of workforce frameworks", "Teams are defined by the tools they purchase"], "Teams can combine people with complementary skills and experience to tackle complex challenges", "The framework includes teams as a way to organize complementary capability.", "Use Work Roles and competency information to make ownership, collaboration, and development needs easier to discuss.", "NIST NICE Framework overview"),
      makeMc("nice_application", "NIST's v2.2.0 NICE Framework Components release added which Work Role?", ["Cybersecurity Supply Chain Risk Management", "Social Media Account Manager", "Cloud Password Administrator", "Wireless Help Desk Specialist"], "Cybersecurity Supply Chain Risk Management", "Look for the supply-chain role in the release notes.", "The v2.2.0 release also updated the Cryptography and DevSecOps Competency Areas.", "NICE Framework Components v2.2.0")
    ],
    d3fend_overview: [
      makeMc("d3fend_overview", "What is MITRE D3FEND?", ["A knowledge graph of cybersecurity countermeasures", "A password manager for defenders", "A replacement for network routing standards", "A catalog of offensive malware"], "A knowledge graph of cybersecurity countermeasures", "D3FEND is organized around defensive countermeasures.", "Use D3FEND to connect adversary behavior with defensive actions and supporting artifacts.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "What does a D3FEND tactic describe?", ["A broad defensive purpose such as Harden or Detect", "A vendor product license", "A specific CVE severity score", "A job title in a security organization"], "A broad defensive purpose such as Harden or Detect", "Tactics are the large buckets in the matrix.", "Techniques sit beneath tactics and describe more concrete defensive countermeasures.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "Which list contains the seven D3FEND tactics shown in the current matrix?", ["Model, Harden, Detect, Isolate, Deceive, Evict, Restore", "Identify, Protect, Detect, Respond, Recover, Govern, Map", "Red, Blue, Green, White, Orange, Purple, Gold", "Plan, Build, Test, Ship, Patch, Audit, Retire"], "Model, Harden, Detect, Isolate, Deceive, Evict, Restore", "Recall the tactic names used by the D3FEND site.", "The tactics describe a defensive lifecycle from understanding the environment through recovery.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "How should a learner use D3FEND alongside ATT&CK?", ["Use ATT&CK to describe adversary behavior and D3FEND to explore countermeasures", "Use D3FEND only to assign incident severity", "Use ATT&CK for passwords and D3FEND for software licensing", "Treat the two knowledge bases as identical technique lists"], "Use ATT&CK to describe adversary behavior and D3FEND to explore countermeasures", "One is offensive-behavior oriented; the other is defensive-countermeasure oriented.", "D3FEND is most useful when it helps a defender reason from an observed behavior to possible defensive coverage.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "What is the relationship between a D3FEND tactic and a D3FEND technique?", ["A tactic is a broad defensive purpose and a technique is a more specific countermeasure", "A technique is always an incident ticket and a tactic is a password", "They are unrelated labels from different websites", "A tactic is a CVE and a technique is a network port"], "A tactic is a broad defensive purpose and a technique is a more specific countermeasure", "Think broad bucket versus concrete action.", "For example, Harden is a tactic that contains specific techniques such as Multi-factor Authentication and Application Hardening.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "What kind of relationship does D3FEND help a defender explore?", ["Observed adversary behavior to possible defensive countermeasures", "Employee title to annual salary", "File extension to operating-system license", "Router brand to internet speed"], "Observed adversary behavior to possible defensive countermeasures", "D3FEND is the defensive side of the reasoning chain.", "Use the matrix to organize countermeasure options and their relationships to defensive goals and artifacts.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "Why should a D3FEND learner keep the live matrix bookmarked?", ["Definitions, relationships, identifiers, and releases can be maintained over time", "The quiz only works when the matrix is open", "The matrix stores the learner's private passwords", "Every technique changes on every visit"], "Definitions, relationships, identifiers, and releases can be maintained over time", "Use the official source for current details.", "This practice layer paraphrases the matrix; the live MITRE resource remains authoritative.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_overview", "Which sequence best turns D3FEND into a practical study method?", ["Model the environment, identify the defensive goal, choose countermeasures, and verify coverage", "Choose a product, delete evidence, and skip validation", "Start with a tactic name and assume every technique applies", "Restore everything before defining the affected system"], "Model the environment, identify the defensive goal, choose countermeasures, and verify coverage", "Start with context, then select and validate.", "D3FEND is most useful when countermeasures are tied to a specific system, behavior, and defensive outcome.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_model: [
      makeMc("d3fend_model", "What is the purpose of D3FEND's Model tactic?", ["Build a structured understanding of assets, dependencies, exposure, and risk", "Terminate every process on a host", "Replace all authentication with certificates", "Create decoy credentials for attackers"], "Build a structured understanding of assets, dependencies, exposure, and risk", "Model comes before selecting a control.", "D3FEND lists models such as Asset Inventory, Network Mapping, Access Modeling, and System Vulnerability Assessment.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "Which countermeasure belongs to the Model tactic?", ["Network Mapping", "File Encryption", "Process Termination", "Decoy User Credential"], "Network Mapping", "Look for a technique that describes understanding relationships in the environment.", "Network Mapping can establish how nodes and links relate before a defender evaluates or restricts them.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "Why is Service Dependency Mapping valuable to a defender?", ["It reveals which services rely on one another before a change or isolation action", "It automatically patches every dependency", "It encrypts all service traffic", "It proves that a service is malicious"], "It reveals which services rely on one another before a change or isolation action", "Dependencies help predict blast radius.", "A model supports safer decisions by making operational relationships explicit.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "An analyst wants to document a baseline of hosts, software, and configurations. Which D3FEND idea fits best?", ["Inventory and mapping", "Deception", "Eviction", "Credential revocation"], "Inventory and mapping", "Start by naming what exists and how it connects.", "Asset Inventory, Software Inventory, Configuration Inventory, and System Mapping are model-building techniques.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "Which model helps show how a system relies on other systems or services?", ["System Dependency Mapping", "Decoy Public Release", "Session Termination", "File Encryption"], "System Dependency Mapping", "Look for the technique that describes dependencies.", "Dependency models help a defender anticipate impact when a component is isolated, evicted, or restored.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "What does an Asset Inventory establish?", ["What assets exist and can be accounted for in the environment", "Which fake credential an attacker will use", "Which process should be terminated immediately", "Which file should be encrypted with RSA"], "What assets exist and can be accounted for in the environment", "Inventory answers what is present.", "Asset Inventory is a foundation for selecting controls and identifying gaps in defensive coverage.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "Why does Access Modeling matter before changing permissions?", ["It shows intended subjects, resources, and allowed interactions", "It automatically grants least privilege to every account", "It replaces authentication logs", "It identifies malware by file extension"], "It shows intended subjects, resources, and allowed interactions", "Model the access relationship before enforcing it.", "Access Modeling supports precise access mediation and helps prevent availability surprises.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_model", "What does an Operational Risk Assessment add to a technical inventory?", ["A reasoned view of consequences and priorities for the operational mission", "A list of all known password hashes", "A decoy network for attackers", "A guarantee that the system is secure"], "A reasoned view of consequences and priorities for the operational mission", "Risk adds consequence and priority.", "Operational Risk Assessment helps connect technical findings to safety, continuity, and mission impact.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_harden: [
      makeMc("d3fend_harden", "According to D3FEND, how does Harden differ from Detect?", ["Harden generally increases exploitation cost before a system is online and operational", "Harden is only for investigating physical entry", "Harden means deleting all logs after an incident", "Harden is another name for a decoy environment"], "Harden generally increases exploitation cost before a system is online and operational", "The distinction is timing and purpose.", "Hardening changes system, application, credential, message, platform, or source-code properties to reduce exploitability.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "Which D3FEND technique reduces an application's attack surface by changing its settings?", ["Application Configuration Hardening", "File Carving", "Network Traffic Analysis", "Process Eviction"], "Application Configuration Hardening", "Match the technique to application settings.", "Application Configuration Hardening is a child of Application Hardening in the D3FEND model.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "What does D3FEND mean by Change Default Password?", ["Replace factory-set credentials with strong, unique credentials before deployment", "Rotate every password after every keystroke", "Store the factory password in a public inventory", "Use a default password only on internet-facing systems"], "Replace factory-set credentials with strong, unique credentials before deployment", "Think about devices arriving with known credentials.", "Changing defaults is a practical hardening step for systems and devices that ship with factory credentials.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "What is the goal of TPM Boot Integrity?", ["Show that boot begins from a trusted hardware and software combination", "Monitor email sender reputation", "Filter DNS requests by domain", "Create a honeynet around a database"], "Show that boot begins from a trusted hardware and software combination", "It concerns the trust chain during startup.", "TPM Boot Integrity is associated with a static root of trust measurement and platform hardening.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "Which technique replaces old software on a computer component?", ["Software Update", "File Carving", "Decoy Object", "User Behavior Analysis"], "Software Update", "Match the action to maintaining current software.", "Software Update is a Platform Hardening technique in D3FEND.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "What does Certificate Pinning strengthen?", ["Confidence that a client is communicating with the expected server identity", "The number of processes allowed to run", "The physical security of a server room", "The size of a database backup"], "Confidence that a client is communicating with the expected server identity", "It compares a presented identity with a trusted certificate or key.", "Certificate Pinning is listed under Credential Hardening.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "What is the purpose of Stack Frame Canary Validation?", ["Detect or prevent a stack overwrite by comparing a stored value with an expected value", "Rotate an API key after login", "Block an unknown DNS domain", "Restore a deleted file"], "Detect or prevent a stack overwrite by comparing a stored value with an expected value", "Canaries are known-good values near a stack frame.", "Stack Frame Canary Validation is an Application Hardening technique.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_harden", "Which hardening technique removes unreachable code from a compiled program?", ["Dead Code Elimination", "Content Excision", "Process Eviction", "Network Mapping"], "Dead Code Elimination", "It is a source or application reduction step.", "Dead Code Elimination is listed beneath Application Hardening.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_detect: [
      makeMc("d3fend_detect", "What is the purpose of the Detect tactic?", ["Identify adversary access or unauthorized activity on computer networks", "Make every platform physically indestructible", "Restore a deleted database from backup", "Create a fake user for an attacker"], "Identify adversary access or unauthorized activity on computer networks", "Detect is about recognizing activity.", "D3FEND groups file, identifier, message, network, platform, process, user, and physical monitoring under Detect.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "What does File Hashing help a defender do?", ["Compare file hashes to detect known malware or unexpected changes", "Map physical links between substations", "Restrict OT variable access", "Reissue a compromised credential"], "Compare file hashes to detect known malware or unexpected changes", "A hash is a compact file-derived value.", "File Hashing is a Detect technique; it can support integrity and reputation workflows.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "Which technique analyzes failed network connections to identify possible scanning or unauthorized activity?", ["Connection Attempt Analysis", "Disk Encryption", "Credential Rotation", "Content Rebuild"], "Connection Attempt Analysis", "Look for the technique that studies connection failures.", "D3FEND also lists Network Traffic Analysis and Inbound Session Volume Analysis as network detection options.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "What is Process Lineage Analysis concerned with?", ["The ancestry and related metadata of processes in a process tree", "The physical location of a data center", "The age of a TLS certificate", "The contents of a backup archive"], "The ancestry and related metadata of processes in a process tree", "Lineage means parent, child, and sibling relationships.", "Process lineage can expose suspicious execution chains even when individual processes look familiar.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "Which technique analyzes email or instant-message content for unauthorized activity?", ["Message Analysis", "Disk Partitioning", "Credential Rotation", "Physical Locking"], "Message Analysis", "Match the technique to message content.", "Message Analysis can be paired with sender and URL reputation analysis when triaging suspicious communications.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "What does File Integrity Monitoring focus on?", ["Detecting suspicious changes to files", "Encrypting every file before use", "Mapping all physical links", "Creating a new user account"], "Detecting suspicious changes to files", "Integrity monitoring is change detection.", "A known-good baseline makes file changes easier to identify and investigate.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "What can Protocol Metadata Anomaly Detection reveal?", ["Communication behavior that is statistically unusual for the protocol", "The private key that encrypted a message", "The correct physical lock for a room", "The contents of a deleted disk"], "Communication behavior that is statistically unusual for the protocol", "Metadata can be useful even when payloads are unavailable.", "D3FEND describes this technique as collecting protocol metadata and identifying outliers.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_detect", "What does an Endpoint Health Beacon use an absent response to suggest?", ["The endpoint may be compromised or unavailable", "The endpoint has been successfully restored", "The user has changed their password", "The network has a valid DNS allowlist"], "The endpoint may be compromised or unavailable", "A beacon expects periodic health messages.", "Endpoint Health Beacon is a monitoring technique; absence is a signal that needs investigation.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_isolate: [
      makeMc("d3fend_isolate", "What is the goal of the Isolate tactic?", ["Limit access, execution, communication, or content exposure to contain risk", "Make a system more attractive to an attacker", "Create a cryptographic key pair", "Map all business relationships"], "Limit access, execution, communication, or content exposure to contain risk", "Isolation narrows what can interact with what.", "D3FEND includes network, process, content, file, policy, and physical isolation techniques.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "Which technique restricts software to an approved set of executables?", ["Executable Allowlisting", "File Hash Reputation Analysis", "Decoy File", "Host Reboot"], "Executable Allowlisting", "Allowlisting defines what may run.", "Executable Allowlisting is an Isolate technique that limits execution to trusted programs.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "What does Network Isolation do in a defensive plan?", ["Separates a system or segment from other network communication paths", "Changes the file format of an attachment", "Replaces a user password with a token", "Checks whether a pointer is null"], "Separates a system or segment from other network communication paths", "Think of containment at the network boundary.", "Network Isolation can reduce lateral movement or outbound reach while the incident is investigated.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "When is Content Quarantine the best match?", ["When suspicious content should be held away from normal use for review", "When a trusted file should be copied into production", "When a credential needs to be reissued", "When a process tree needs to be visualized"], "When suspicious content should be held away from normal use for review", "Quarantine is a holding state.", "D3FEND includes Content Quarantine with content validation and file-format verification under Isolate.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "What does Access Mediation decide?", ["Whether a requested interaction with a resource is permitted", "Whether a file hash is popular", "Whether a process has a parent", "Whether a firmware image is compressed"], "Whether a requested interaction with a resource is permitted", "Mediation sits at an access boundary.", "D3FEND lists Access Mediation and several more specific network, file, and session mediation techniques.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "What does DNS Denylisting restrict?", ["Resolution or use of domains identified as unwanted", "Execution of every signed binary", "Access to all local files", "Physical entry through an electronic lock"], "Resolution or use of domains identified as unwanted", "A denylist names what is blocked.", "DNS Denylisting is one of the network-isolation patterns in D3FEND.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "Which technique contains a suspicious process by limiting it to a separated execution context?", ["Application-based Process Isolation", "File Hashing", "Message Authentication", "Restore Software"], "Application-based Process Isolation", "Focus on separating process execution.", "D3FEND includes application-, hardware-, and kernel-based process isolation options.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_isolate", "Why can isolation require an operational-impact review?", ["Restricting access or communication can interrupt required services or safety functions", "Isolation always deletes all evidence", "Isolation automatically creates a backup", "Isolation makes every alert a false positive"], "Restricting access or communication can interrupt required services or safety functions", "Containment can affect availability.", "Model dependencies and mission requirements before isolating a production or OT component.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_deceive: [
      makeMc("d3fend_deceive", "What is the purpose of the Deceive tactic?", ["Present believable decoys that can expose or divert unauthorized activity", "Encrypt every production disk", "Guarantee that an account cannot be locked", "Replace all monitoring with backups"], "Present believable decoys that can expose or divert unauthorized activity", "Deception changes the attacker's picture of the environment.", "D3FEND lists decoy environments, honeynets, decoy objects, personas, credentials, and session tokens.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "What is a Connected Honeynet?", ["A decoy environment connected to a production environment or network", "A backup that is never connected to a network", "A certificate authority for internal users", "A tool that searches for homoglyphs"], "A decoy environment connected to a production environment or network", "The name describes its relationship to the real environment.", "D3FEND distinguishes connected, integrated, and standalone honeynet patterns.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "Which D3FEND technique creates a fake credential intended to attract unauthorized use?", ["Decoy User Credential", "Credential Rotation", "Credential Revocation", "Strong Password Policy"], "Decoy User Credential", "This is a deception technique, not normal credential hygiene.", "A decoy credential should be monitored and carefully scoped so it cannot grant real privilege.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "What makes a decoy useful to a defender?", ["Activity against it can provide a high-signal indicator of unauthorized behavior", "It removes the need for asset inventory", "It automatically restores compromised files", "It disables all legitimate access"], "Activity against it can provide a high-signal indicator of unauthorized behavior", "Legitimate users should have little reason to touch it.", "Decoy artifacts are valuable when their expected-use pattern is narrow and monitoring is in place.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "What is a Decoy File intended to do?", ["Attract unauthorized access or handling so the activity can be observed", "Replace every production document", "Provide the only copy of a critical backup", "Authenticate a service component"], "Attract unauthorized access or handling so the activity can be observed", "It is an object used for deception.", "A decoy file should be clearly monitored and should not contain real secrets or mission data.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "What is a Decoy Persona?", ["A fabricated identity or profile used to mislead or observe an adversary", "A real administrator's privileged account", "A database recovery image", "A hardware write-protection switch"], "A fabricated identity or profile used to mislead or observe an adversary", "Persona means an identity presented to someone.", "Decoy Persona is part of D3FEND's Deceive tactic.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "What is the main safety rule for a decoy credential?", ["It must not provide unintended access to real systems or sensitive data", "It should use a real administrator password", "It should be exempt from monitoring", "It should be reused across production services"], "It must not provide unintended access to real systems or sensitive data", "Deception should not become a privilege path.", "Decoy credentials are useful only when they are isolated, scoped, and monitored.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_deceive", "Which honeynet design is deployed as its own separate environment?", ["Standalone Honeynet", "Connected Honeynet", "Integrated Honeynet", "Network Access Mediation"], "Standalone Honeynet", "Standalone describes separation from production.", "D3FEND distinguishes standalone, connected, and integrated honeynet patterns.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_evict: [
      makeMc("d3fend_evict", "What is the purpose of the Evict tactic?", ["Remove adversary access, persistence, objects, or processes from an environment", "Model the environment before deployment", "Monitor physical motion only", "Improve application performance"], "Remove adversary access, persistence, objects, or processes from an environment", "Eviction is the removal step.", "D3FEND includes credential eviction, object eviction, process eviction, host shutdown, and session termination.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "Which action best matches Credential Revocation?", ["Invalidate a credential so it can no longer authenticate", "Create a new decoy password", "Map the credential's network route", "Hash a file for reputation analysis"], "Invalidate a credential so it can no longer authenticate", "Revocation makes the old credential unusable.", "Credential Revocation is different from rotation: revocation invalidates access, while rotation replaces a secret.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "What does Process Suspension provide during an investigation?", ["A way to pause a process while preserving the option to examine it", "A permanent disk wipe", "A new authentication factor", "A DNS allowlist"], "A way to pause a process while preserving the option to examine it", "Suspension is not the same as termination.", "Eviction offers graduated responses; the least disruptive action that contains the risk may preserve evidence and availability.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "Which is a destructive eviction action that should be considered carefully?", ["Disk Erasure", "URL Analysis", "Network Mapping", "Certificate Analysis"], "Disk Erasure", "Look for the action that removes stored content.", "Eviction can be irreversible; preserve evidence and confirm authority before erasing or formatting a disk.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "What does Session Termination remove?", ["An active authenticated session", "A file's metadata", "A device's factory password", "A network's topology model"], "An active authenticated session", "Terminate the access session itself.", "Session termination can cut off current access while preserving other evidence for investigation.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "What is Authentication Cache Invalidation intended to do?", ["Make cached authentication material unusable", "Add a user to a decoy persona", "Map an application dependency", "Monitor a firmware update"], "Make cached authentication material unusable", "Think of stored authentication state.", "Authentication Cache Invalidation is an Evict technique for removing reusable access material.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "What does Process Termination do compared with Process Suspension?", ["Termination stops the process, while suspension pauses it", "Termination restores the process, while suspension encrypts it", "They are identical actions", "Termination only affects DNS and suspension only affects email"], "Termination stops the process, while suspension pauses it", "One ends execution; one pauses execution.", "Choose the least disruptive effective action when evidence and availability still matter.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_evict", "Why preserve evidence before an irreversible eviction step?", ["To support scope, attribution, recovery, and lessons learned", "To make the attacker more persistent", "To avoid verifying the restored system", "To guarantee that the action is harmless"], "To support scope, attribution, recovery, and lessons learned", "Eviction can destroy useful evidence.", "Document authority, preserve relevant artifacts, and coordinate destructive actions with the incident process.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_restore: [
      makeMc("d3fend_restore", "What does the Restore tactic address?", ["Returning access, objects, configurations, data, or software to an intended state", "Adding more attacker infrastructure", "Detecting a homoglyph in a domain", "Reducing a password's length"], "Returning access, objects, configurations, data, or software to an intended state", "Restore is the recovery-oriented tactic.", "D3FEND lists Restore Access, Restore Configuration, Restore Database, Restore Disk Image, Restore File, and more.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "What is the difference between Restore Configuration and Restore Database?", ["One returns system settings; the other returns database state or contents", "One is for users; the other is only for physical locks", "They are two names for password rotation", "Neither changes the state of a system"], "One returns system settings; the other returns database state or contents", "Match each technique to the object it restores.", "Naming the object makes recovery plans more precise and testable.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "Why should a restoration step include verification?", ["To confirm the restored state is usable, trusted, and within the intended scope", "To make the incident timeline impossible to reconstruct", "To guarantee that no future attack can happen", "To avoid recording the recovery action"], "To confirm the restored state is usable, trusted, and within the intended scope", "Recovery is a state change that needs evidence.", "A restore point is useful only when the team can validate integrity, availability, and the services that depend on it.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "Which D3FEND technique most directly returns a deleted file?", ["Restore File", "File Eviction", "File Analysis", "File Content Rules"], "Restore File", "Choose the technique named for the recovered object.", "A recovery plan should identify the source, integrity checks, owner, and validation steps for restored files.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "What does Restore Access return?", ["An intended ability to reach a resource or service", "A deleted process's memory", "A malicious domain's reputation", "A decoy environment's fake identity"], "An intended ability to reach a resource or service", "Restore the access relationship.", "Restoring access should include authorization and availability checks, not only a connectivity test.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "Which recovery action returns a compromised account to usable status?", ["Restore User Account Access", "File Metadata Verification", "Network Traffic Filtering", "Dynamic Analysis"], "Restore User Account Access", "Match the technique to the recovered object.", "Account restoration should follow identity verification, authorization, and credential-safety checks.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "What should be checked before restoring a disk image to production?", ["That the image is trusted, appropriate, and compatible with the intended system", "That all logs have been deleted", "That the image contains a default password", "That the system has no dependencies"], "That the image is trusted, appropriate, and compatible with the intended system", "A restore source is part of the security decision.", "Restoring an untrusted or mismatched image can reintroduce compromise or cause operational failure.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_restore", "Why is Restore Software different from simply reinstalling any available package?", ["The restored software should match a trusted, intended version and be verified", "A reinstall never changes system state", "Software restoration only applies to physical locks", "It removes the need for configuration management"], "The restored software should match a trusted, intended version and be verified", "Trust and intended state matter.", "Recovery should return the system to a known-good state, not merely a running state.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_identity: [
      makeMc("d3fend_identity", "Which D3FEND technique requires proof from two or more pieces of evidence?", ["Multi-factor Authentication", "Password Authentication", "Identifier Analysis", "Session Termination"], "Multi-factor Authentication", "The technique name points to multiple factors.", "D3FEND includes password, certificate-based, token-based, biometric, and multi-factor authentication under Harden.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_identity", "What is Credential Rotation intended to reduce?", ["The time an exposed credential remains useful", "The number of assets in an inventory", "The size of a packet capture", "The need for authorization events"], "The time an exposed credential remains useful", "Rotation replaces an authentication secret.", "Credential Rotation can apply to passwords, API keys, certificates, or similar authenticators.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_identity", "What does User Account Permissions control?", ["Which actions or resources a user account is allowed to access", "Which bytes appear in a malware sample", "Which DNS record is authoritative", "Which process is the parent of another"], "Which actions or resources a user account is allowed to access", "Permissions are about authorization.", "User Account Permissions and User Group Permissions appear under Isolate as access-policy controls.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_identity", "What does User Geolocation Logon Pattern Analysis look for?", ["Logon locations that differ from a user's normal behavior profile", "Files that contain a known magic byte", "A process that modifies its own code", "A system with an outdated bootloader"], "Logon locations that differ from a user's normal behavior profile", "This is a behavioral baseline technique.", "D3FEND also lists Authentication Event Thresholding and User Behavior Analysis for identity-related detection.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_network: [
      makeMc("d3fend_network", "What is Network Access Mediation?", ["Controlling which network connections are permitted across an access boundary", "Checking whether a file is compressed", "Comparing two call stacks", "Reissuing a user account"], "Controlling which network connections are permitted across an access boundary", "Mediation is an access decision.", "D3FEND places Network Access Mediation, LAN Access Mediation, and Routing Access Mediation under Isolate.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "What does DNS Allowlisting do?", ["Permits resolution for approved domains while restricting unknown domains", "Encrypts a disk partition", "Adds a fake session token", "Monitors firmware behavior"], "Permits resolution for approved domains while restricting unknown domains", "An allowlist names what is permitted.", "D3FEND pairs DNS allowlisting with denylisting and other network isolation techniques.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "Which technique analyzes communication metadata and looks for statistical outliers?", ["Protocol Metadata Anomaly Detection", "Physical Enclosure Hardening", "Credential Scrubbing", "Restore Network Access"], "Protocol Metadata Anomaly Detection", "It is a network detection technique.", "Metadata can reveal unusual communication patterns without requiring full payload inspection.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "What is Relay Pattern Analysis intended to detect?", ["An internal host relaying traffic between internal and external networks", "A compromised bootloader", "A fake user credential in a honeynet", "A deleted registry key"], "An internal host relaying traffic between internal and external networks", "Think about a host acting as an unexpected bridge.", "Relay detection helps a defender identify boundary-bridging behavior that may support persistence or lateral movement.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "What does Outbound Traffic Filtering control?", ["Traffic leaving a network or host based on defined rules", "The contents of a stack frame", "The version of a restored database", "The identity of a decoy persona"], "Traffic leaving a network or host based on defined rules", "Outbound means leaving.", "Outbound Traffic Filtering is an Isolate technique that can limit command-and-control or data-exfiltration paths.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "What does Inbound Traffic Filtering control?", ["Traffic entering a network or host based on defined rules", "Only the contents of an email body", "The validity of a pointer", "The integrity of a firmware image"], "Traffic entering a network or host based on defined rules", "Inbound means entering.", "Inbound Traffic Filtering can reduce exposed services and unwanted connection attempts.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "What is a Directional Network Link useful for?", ["Constraining communication to an intended direction across a boundary", "Making a two-way password from a hash", "Creating a fake file", "Restoring a user account"], "Constraining communication to an intended direction across a boundary", "Focus on one-way or controlled flow.", "Directional Network Link is listed under Network Isolation.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_network", "What does Network Traffic Analysis inspect?", ["Intercepted or summarized traffic to identify unauthorized activity", "Only the CPU instruction set", "Only the factory password of a device", "Only the contents of a disk image"], "Intercepted or summarized traffic to identify unauthorized activity", "It is a network detection technique.", "Traffic analysis can be combined with signatures, metadata anomalies, DNS analysis, and baseline comparisons.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_endpoint: [
      makeMc("d3fend_endpoint", "What does File Integrity Monitoring detect?", ["Suspicious changes to files on a computer system", "Unauthorized motion in a physical room", "A user's geographic location", "The availability of a DNS resolver"], "Suspicious changes to files on a computer system", "Integrity monitoring focuses on change.", "File Integrity Monitoring is a Platform Monitoring technique in the Detect tactic.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "What is Control Flow Integrity designed to enforce?", ["Legal control-flow transfers during application execution", "Approved DNS names for outbound traffic", "A list of authorized human users", "A known-good database backup"], "Legal control-flow transfers during application execution", "It protects how code moves through execution.", "Control Flow Integrity is listed under Application Hardening and helps resist classes of control-flow attacks.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "What does Credential Scrubbing remove from source code?", ["Hard-coded credentials that could be exposed accidentally", "All comments and documentation", "Every third-party library", "Network routing tables"], "Hard-coded credentials that could be exposed accidentally", "Scrubbing is cleanup of secrets.", "Credential Scrubbing is a Source Code Hardening technique in D3FEND.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "Which technique compares a service binary to a source of truth?", ["Service Binary Verification", "Application Performance Monitoring", "Content Format Conversion", "Unlock Account"], "Service Binary Verification", "The technique is about verifying service code.", "Binary verification can detect unauthorized replacement or tampering with a service executable.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "What does Dynamic Analysis do to a suspicious file?", ["Executes or opens it in a synthetic environment to observe behavior", "Restores it directly to production", "Changes its default password", "Maps its network dependency without running it"], "Executes or opens it in a synthetic environment to observe behavior", "Dynamic means behavior during execution.", "D3FEND describes Dynamic Analysis as using a sandbox-like environment to determine whether a file is malicious or exploits another program.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "What does File Content Analysis examine?", ["The content of a file using pattern matching or static analysis", "The physical lock state of a building", "The uptime of a platform", "The permissions of a network route"], "The content of a file using pattern matching or static analysis", "This is static file analysis.", "File Content Analysis and File Content Rules are Detect techniques for examining artifacts.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "What does Trusted Library contribute to secure software?", ["Pre-verified code components that reduce the chance of introducing known risks", "A list of all attacker-controlled libraries", "A backup of every user account", "A DNS denylist"], "Pre-verified code components that reduce the chance of introducing known risks", "Trusted means vetted before reuse.", "D3FEND places Trusted Library under Source Code Hardening.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_endpoint", "What does Process Code Segment Verification compare?", ["A process's code memory segment with a trusted source of truth", "A user's current location with a decoy persona", "A DNS request with a password policy", "A database with a physical lock"], "A process's code memory segment with a trusted source of truth", "Verify executable code against expected code.", "Process Code Segment Verification is a Process Analysis technique.", "MITRE D3FEND 1.6.0")
    ],
    d3fend_ot: [
      makeMc("d3fend_ot", "What does Operating Mode Monitoring watch in an OT environment?", ["Modes such as Program, Run, Remote, or Stop", "Only the hash of a user password", "The number of files in a home directory", "Which certificate authority issued a browser certificate"], "Modes such as Program, Run, Remote, or Stop", "These are control-system operating states.", "D3FEND connects Operating Mode Monitoring to detecting unauthorized changes in operational environments.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "What does OT Variable Access Restriction limit?", ["Which users or processes can read or change operational technology variables", "Which files can be restored from backup", "Which domains appear in a browser history", "Which certificates are pinned by an application"], "Which users or processes can read or change operational technology variables", "The technique is an access boundary around control variables.", "OT Variable Access Restriction is listed under Isolate and supports safety- and mission-aware containment.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "What does Firmware Verification provide?", ["Cryptographic verification that installed firmware has expected integrity", "A list of active network sessions", "A fake process tree", "A replacement for physical access controls"], "Cryptographic verification that installed firmware has expected integrity", "Verification compares the installed artifact to trusted evidence.", "D3FEND includes Firmware Verification, Peripheral Firmware Verification, and System Firmware Verification.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "Which tactic includes Electronic Lock Monitoring, Motion Sensor Monitoring, and Video Surveillance?", ["Detect", "Model", "Deceive", "Restore"], "Detect", "These techniques observe physical activity.", "D3FEND treats physical monitoring as part of detecting unauthorized access and related events.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "What does Operational Process Monitoring observe?", ["Physical parameters and operator actions in an operational environment", "Only a web session cookie", "Only a file's hash", "Only a user's password length"], "Physical parameters and operator actions in an operational environment", "Operational means the process and its operators.", "Operational Process Monitoring is a Detect technique and is also described as supervisory control monitoring.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "What does Remote Firmware Update Monitoring look for?", ["Unauthorized software installations delivered through remote firmware update commands", "A user entering a building", "A file with a double extension", "A DNS request to an approved domain"], "Unauthorized software installations delivered through remote firmware update commands", "The technique monitors update commands.", "Firmware update paths deserve monitoring because they can change a platform below the application layer.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "What is Bus Message Authentication intended to verify?", ["The sender identity and integrity of individual bus frames", "The availability of an email inbox", "The age of a server certificate", "The parent of a Windows process"], "The sender identity and integrity of individual bus frames", "Bus messages need origin and integrity.", "Bus Message Authentication applies cryptographic primitives to individual bus frames.", "MITRE D3FEND 1.6.0"),
      makeMc("d3fend_ot", "Why should an OT defender model operating modes before applying a restriction?", ["The same variable or command may be safe in one mode and unsafe in another", "Operating modes are unrelated to safety", "Restrictions always improve availability", "Mode modeling replaces physical monitoring"], "The same variable or command may be safe in one mode and unsafe in another", "Context changes the meaning of an action.", "Operating Mode Monitoring and OT Variable Access Restriction should respect control logic, safety, and mission requirements.", "MITRE D3FEND 1.6.0")
    ],
    automation: [
      makeMc("automation", "Which Python type is an ordered, mutable collection?", ["List", "Tuple", "Boolean", "Integer"], "List", "A list can be changed after it is created.", "Use the Python primer's data-type vocabulary before choosing a control-flow tool.", "Python 101.pdf"),
      makeMc("automation", "What is the purpose of a loop in a script?", ["Repeat an operation over items or while a condition holds", "Encrypt every file automatically", "Assign a MAC address to a switch", "Replace the operating system kernel"], "Repeat an operation over items or while a condition holds", "Loops express repetition.", "Python uses loops with variables, conditions, and collections to automate repeatable work.", "Python 101.pdf"),
      makeMc("automation", "What does the PowerShell cmdlet Get-ChildItem return?", ["Items or child items at a location", "Only service passwords", "A packet capture", "An RSA private key"], "Items or child items at a location", "The cmdlet name points to children in a path.", "The PowerShell guide shows it being used to list items in locations.", "Intro to PowerShell.pdf"),
      makeMc("automation", "In Node-RED, a flow is best understood as what?", ["Connected nodes that carry inputs through logic to outputs", "A disk image backup", "A password-cracking wordlist", "A static HTML file only"], "Connected nodes that carry inputs through logic to outputs", "Think visually: inputs, processing, and outputs connected together.", "The ICS exercise combines Modbus, SQL, and a web display through connected nodes.", "ICS and Node-RED.pdf")
    ]
  };

  var FLASHCARDS = [
    makeShort("flashcards", "Name the protocol commonly used for secure remote administration over SSH.", ["SSH"], "Recall the secure remote administration protocol.", "The Useful Protocols guide contrasts secure administration with legacy alternatives.", "Useful Protocols.pdf"),
    makeShort("flashcards", "What is the short name for the Structured Query Language used to access databases?", ["SQL", "structured query language"], "Use the three-letter abbreviation.", "The SQL Injection guide spells out the language name.", "SQL Injection 101.pdf"),
    makeShort("flashcards", "What tool is introduced for packet capture analysis?", ["Wireshark"], "Think of the packet-analysis guide.", "The tool uses captures and display filters.", "Wireshark 101.pdf"),
    makeShort("flashcards", "What is the Linux command for showing the current working directory?", ["pwd"], "It prints the path you are currently in.", "The Linux cheat sheet groups it with cd and ls.", "Linux Cheat Sheet.pdf")
  ];

  var REVIEW_FRAMES = [
    "For a quick check:",
    "In a study session:",
    "During a tabletop review:",
    "When coaching a teammate:",
    "As an analyst writing a note:",
    "When preparing for a review:",
    "In a blue-team briefing:",
    "Before making a change:",
    "While validating an answer:",
    "From an operator's perspective:",
    "For a control walkthrough:",
    "When reviewing evidence:",
    "In a post-incident debrief:",
    "As a system owner:",
    "When explaining the concept to a peer:",
    "For a readiness check:",
    "In a practical lab:",
    "When deciding what to do next:",
    "From a risk-review perspective:",
    "As a final knowledge check:"
  ];

  function expandGeneratorPool(list, minimum) {
    var expanded = list.slice();
    var variant = 0;
    while (expanded.length < minimum && list.length) {
      (function (base, frame) {
        expanded.push(function () {
          var question = base();
          question.prompt = frame + String.fromCharCode(10, 10) + question.prompt;
          return question;
        });
      })(list[variant % list.length], REVIEW_FRAMES[variant % REVIEW_FRAMES.length]);
      variant += 1;
    }
    return expanded;
  }

  Object.keys(GENERATORS).forEach(function (topic) {
    GENERATORS[topic] = expandGeneratorPool(GENERATORS[topic], topic.indexOf("d3fend_") === 0 ? 40 : 20);
  });

  function generatorWeight(topic, index) {
    var progress = window.QuizProgress;
    if (progress && typeof progress.questionWeight === "function") {
      var weight = Number(progress.questionWeight(topic + ":" + index));
      if (isFinite(weight) && weight >= 0) return weight;
    }
    return 1;
  }

  function chooseGeneratorIndex(topic, list) {
    var last = lastGeneratorIndexes[topic];
    var candidates = list.map(function (_, index) { return index; });
    if (candidates.length > 1 && last != null) {
      candidates = candidates.filter(function (index) { return index !== last; });
    }

    var weighted = candidates.map(function (index) {
      return { index: index, weight: generatorWeight(topic, index) };
    });
    var total = weighted.reduce(function (sum, item) { return sum + item.weight; }, 0);
    if (total <= 0) {
      return candidates[Math.floor(Math.random() * candidates.length)];
    }

    var roll = Math.random() * total;
    for (var i = 0; i < weighted.length; i += 1) {
      roll -= weighted[i].weight;
      if (roll <= 0) return weighted[i].index;
    }
    return weighted[weighted.length - 1].index;
  }

  function generateQuestion(topic) {
    var list = topic === "flashcards" ? FLASHCARDS : GENERATORS[topic];
    if (!list || !list.length) list = GENERATORS.foundations;
    var generatorIndex = chooseGeneratorIndex(topic, list);
    lastGeneratorIndexes[topic] = generatorIndex;
    var maker = list[generatorIndex];
    var q = maker();
    q = varyQuestion(q, topic);
    q._gen = maker;
    q._genKey = topic + ":" + generatorIndex;
    return q;
  }
  function remixQuestion(question) {
    return generateQuestion(question && question.topic ? question.topic : "foundations");
  }
  function parseNumber(raw) {
    var s = String(raw == null ? "" : raw).trim().replace(/,/g, "");
    if (!s) return NaN;
    var fraction = s.match(/^(-?\d+(?:\.\d+)?)\/(-?\d+(?:\.\d+)?)$/);
    if (fraction) return Number(fraction[1]) / Number(fraction[2]);
    return /^-?\d+(?:\.\d+)?$/.test(s) ? Number(s) : NaN;
  }
  function checkAnswer(question, userAnswer) {
    if (!question) return [false, ""];
    if (question.type === "mc") return [String(userAnswer) === String(question.answer), String(question.answer)];
    if (question.type === "numeric") {
      var actual = parseNumber(userAnswer);
      var expected = Number(question.answer);
      return [Number.isFinite(actual) && Math.abs(actual - expected) <= Number(question.tolerance || 0.01), String(question.answer)];
    }
    var raw = String(userAnswer == null ? "" : userAnswer).toLowerCase().trim().replace(/\s+/g, "");
    var answers = question.answers || [question.answer];
    var ok = answers.some(function (answer) { return raw === String(answer).toLowerCase().trim().replace(/\s+/g, ""); });
    return [ok, String(question.answer || answers[0] || "")];
  }
  function publicQuestion(q) {
    var overview = "Focus on the definition, the trust boundary, and the evidence in the prompt.";
    var key = "hint_overview_" + (q.topic || "");
    if (window.QuizI18n && window.QuizI18n.has && window.QuizI18n.has(key)) overview = window.QuizI18n.t(key);
    var hint1 = q.hint ? overview + "\n\n" + q.hint : overview;
    var calc = q.calc || null;
    return {
      id: q.id, topic: q.topic, topic_label: TOPICS[q.topic] || q.topic, type: q.type,
      prompt: q.prompt, hint1: hint1, hint2: q.setup || "", hint3: calc && calc.ti ? calc.ti : "",
      hint3_ti: calc && calc.ti ? calc.ti : "", hint3_casio: "", hint3_excel: "", calc: calc,
      hint: hint1, setup: q.setup || "", clarify: overview + "\n\n" + (q.hint || "Review the guide definition.") + "\n\nThen choose the answer that best fits the evidence.",
      has_hint1: true, has_hint2: Boolean(q.setup), has_hint3: Boolean(calc), has_hint: true, has_setup: Boolean(q.setup || calc), has_clarify: true,
      unit: q.unit || "", choices: q.type === "mc" || q.type === "attack" ? q.choices : undefined, placeholder: q.type === "flashcards" || q.type === "short" ? "Type the term" : q.type === "terminal" ? "Type the command" : undefined,
      simulation: q.simulation || null, terminal: q.terminal || null,
      source: q.source,
      source_url: SOURCE_URLS[q.source] || ""
    };
  }
  function setBossTheme() {}

  window.QuizQuestions = {
    get TOPICS() { return TOPICS; },
    get TOPIC_GROUPS() { return TOPIC_GROUPS; },
    HINT_CREDIT: HINT_CREDIT,
    RETRY_CREDIT: RETRY_CREDIT,
    UNAIDED_TO_MASTER: MASTER,
    generateQuestion: generateQuestion,
    remixQuestion: remixQuestion,
    checkAnswer: checkAnswer,
    publicQuestion: publicQuestion,
    setBossTheme: setBossTheme,
    shuffle: shuffle,
    choice: pick,
    num: num,
    id: id
  };
})();

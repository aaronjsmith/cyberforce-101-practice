/* CyberForce 101 question bank built from the imported IT 333r library text. */
(function () {
  "use strict";

  var TOPICS = {
    competition: "Competition roles",
    foundations: "Foundations",
    networking: "Networking & services",
    systems: "Systems & cloud",
    defense: "Defense & tools",
    crypto: "Cryptography",
    web_security: "Web security",
    automation: "Python & automation"
  };

  var HINT_CREDIT = { 0: 1, 1: 0.75, 2: 0.5, 3: 0.25 };
  var RETRY_CREDIT = 0.05;
  var MASTER = 10;
  var seq = 0;

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
  function sourceLabel(file) { return "Source: " + file; }
  function makeMc(topic, prompt, choices, answer, hint, setup, source) {
    return function () {
      return { id: id(), topic: topic, type: "mc", prompt: prompt + "\n\n" + sourceLabel(source), choices: shuffle(choices), answer: answer, hint: hint, setup: setup, calc: { ti: "Review the definition in the guide." }, source: source };
    };
  }
  function makeNum(topic, prompt, answer, hint, setup, source, tolerance) {
    return function () {
      return { id: id(), topic: topic, type: "numeric", prompt: prompt + "\n\n" + sourceLabel(source), answer: num(answer), tolerance: tolerance == null ? 0.01 : tolerance, hint: hint, setup: setup, calc: { ti: "Enter the arithmetic in your calculator." }, source: source };
    };
  }
  function makeShort(topic, prompt, answers, hint, setup, source) {
    return function () {
      var accepted = Array.isArray(answers) ? answers : [answers];
      return { id: id(), topic: topic, type: "short", prompt: prompt + "\n\n" + sourceLabel(source), answers: accepted, answer: accepted[0], hint: hint, setup: setup, calc: { ti: "Use the exact term from the guide." }, source: source };
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
      makeNum("foundations", "Convert binary 1010 to decimal.", 10, "Use place values 8, 4, 2, and 1.", "1010 = 1×8 + 0×4 + 1×2 + 0×1.", "Base Tutorial.pdf", 0),
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
      makeMc("systems", "In an industrial control system, what does SCADA commonly describe?", ["Supervisory control and data acquisition", "Secure cipher administration and data access", "System cache allocation and disk analysis", "Static configuration of application directories"], "Supervisory control and data acquisition", "Expand the acronym used in the ICS guide.", "SCADA is part of the control-system vocabulary used to monitor and operate physical processes.", "ICS and Node-RED.pdf")
    ],
    defense: [
      makeMc("defense", "What is Nmap primarily used for?", ["Network discovery and service identification", "Editing image metadata", "Encrypting a disk", "Writing SQL queries"], "Network discovery and service identification", "Nmap builds an evidence-based view of the network surface.", "The guide highlights hosts, services, system fingerprinting, and scan results.", "Nmap 101.pdf"),
      makeMc("defense", "What does Wireshark let an analyst inspect?", ["Captured network traffic", "Only local user passwords", "The CPU instruction set", "A cloud billing invoice"], "Captured network traffic", "Wireshark is a packet-analysis tool.", "Use captures and display filters to support troubleshooting and investigation.", "Wireshark 101.pdf"),
      makeMc("defense", "What does Nessus provide?", ["Vulnerability scan findings", "A replacement operating system", "A hidden message inside an image", "A database schema"], "Vulnerability scan findings", "It is an assessment tool, not proof that every risk is gone.", "The guide frames scan output as input to verification and risk-based remediation.", "Nessus 101.pdf"),
      makeMc("defense", "Which is a sensible first step in Linux hardening?", ["Map the network and review exposed services", "Disable every service without testing", "Delete all user accounts", "Turn off logging"], "Map the network and review exposed services", "Start with discovery and preserve mission-required availability.", "The hardening guide emphasizes inventory, unnecessary services, accounts, permissions, and verification.", "Linux Hardening 101.pdf")
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
      makeMc("web_security", "Why can an expression such as 1=1 be dangerous in an unsafe SQL query?", ["It is always true and can change the query's logic", "It encrypts the entire database", "It closes the database connection", "It creates a new operating-system user"], "It is always true and can change the query's logic", "Evaluate the expression literally.", "The guide uses 1=1 to illustrate how injected logic can bypass an intended condition.", "SQL Injection 101.pdf")
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

  function generateQuestion(topic) {
    var list = topic === "flashcards" ? FLASHCARDS : GENERATORS[topic];
    if (!list || !list.length) list = GENERATORS.foundations;
    var maker = pick(list);
    var q = maker();
    q._gen = maker;
    q._genKey = topic + ":" + list.indexOf(maker);
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
      unit: q.unit || "", choices: q.type === "mc" ? q.choices : undefined, placeholder: q.type === "flashcard" || q.type === "short" ? "Type the term" : undefined,
      source: q.source
    };
  }
  function setBossTheme() {}

  window.QuizQuestions = {
    get TOPICS() { return TOPICS; },
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

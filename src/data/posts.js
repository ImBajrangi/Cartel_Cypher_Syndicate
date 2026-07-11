export const categoryColors = { CTF: '#00ff41', Research: '#ff4444', Tutorial: '#ffaa00', News: '#00aaff' };

export const posts = [
  {
    id: 1,
    title: 'Bypassing WAF Rules with Unicode Normalization',
    category: 'Research',
    date: '2026-06-28',
    author: 'Ph4nt0m',
    excerpt: 'A deep dive into how Unicode normalization can be weaponized to bypass web application firewalls, with practical examples against ModSecurity and Cloudflare.',
    readTime: '12 min',
    featured: true,
    content: [
      {
        heading: 'Introduction',
        body: `Web Application Firewalls (WAFs) are a critical layer of defense for modern web applications. They inspect incoming HTTP requests and block those that match known attack patterns — SQL injection, XSS, path traversal, and more. However, WAFs rely on pattern matching, and pattern matching has a fundamental weakness: character encoding.

Unicode normalization is the process by which Unicode text is converted into a canonical form. There are four normalization forms — NFC, NFD, NFKC, and NFKD — and each transforms characters differently. When a WAF inspects a request using one normalization form, but the backend application processes it with another, an attacker can craft payloads that slip through undetected.`
      },
      {
        heading: 'How Unicode Normalization Works',
        body: `Unicode defines "equivalent" characters. For example, the character "ñ" can be represented as a single codepoint (U+00F1) or as two codepoints: "n" (U+006E) + combining tilde (U+0303). NFC compresses them into one; NFD expands them into two.

NFKC and NFKD go further — they handle "compatibility" equivalences. The fullwidth Latin letter "Ａ" (U+FF21) is normalized to regular "A" (U+0041) under NFKC. This is where things get interesting for attackers.

Consider a WAF blocking the string "SELECT". An attacker could send "ＳＥＬＥＣＴ" using fullwidth characters. The WAF sees unfamiliar characters and lets it through. The backend, if it normalizes with NFKC before processing, converts it back to "SELECT" — and the injection succeeds.`
      },
      {
        heading: 'Practical Bypass: ModSecurity CRS',
        body: `ModSecurity with the OWASP Core Rule Set (CRS) is one of the most widely deployed WAFs. In our testing, we found that CRS rules primarily match against ASCII patterns. By encoding SQL keywords using Unicode fullwidth characters, we achieved a bypass rate of approximately 73% against default CRS configurations.

Example payload that bypassed detection:
' ＵＮＩＯＮ ＳＥＬＥＣＴ password ＦＲＯＭ users--

The key insight is that ModSecurity's transformation functions (t:lowercase, t:urlDecodeUni) do not perform NFKC normalization by default. This gap allows fullwidth and other Unicode-equivalent characters to evade detection.`
      },
      {
        heading: 'Cloudflare WAF Testing',
        body: `Cloudflare's WAF is significantly more sophisticated and handles many Unicode tricks out of the box. However, we discovered that combining Unicode normalization with other encoding layers — such as double URL encoding of the Unicode characters themselves — could still cause inconsistencies.

It's worth noting that Cloudflare has since patched the specific vectors we reported through their bug bounty program. This underscores the importance of continuous testing even against "best-in-class" WAFs.`
      },
      {
        heading: 'Mitigation Strategies',
        body: `1. Normalize early: Apply NFKC normalization to all user input before it reaches your WAF or application logic.
2. Reject unexpected Unicode: If your application only expects ASCII in certain fields, validate and reject non-ASCII codepoints.
3. Test your WAF: Use tools like our open-source "waf-unicode-fuzzer" to test your specific WAF configuration against Unicode bypass techniques.
4. Defense in depth: WAFs should never be your only line of defense. Parameterized queries, output encoding, and proper input validation remain essential.
5. Monitor normalization behavior: Log and alert on requests containing unusual Unicode patterns, especially in security-sensitive parameters.`
      },
      {
        heading: 'Conclusion',
        body: `Unicode normalization bypasses represent a systemic weakness in pattern-matching security controls. As applications become more internationalized and accept a wider range of character sets, the attack surface for normalization-based evasion will only grow. Security teams must understand these techniques to build robust defenses.

All vulnerabilities discussed in this article were responsibly disclosed to the respective vendors before publication.`
      }
    ]
  },
  {
    id: 2,
    title: 'CTF Writeup: HackTheBox — Phantom Machine',
    category: 'CTF',
    date: '2026-06-22',
    author: 'V3ct0r',
    excerpt: 'Full walkthrough of the Phantom Machine from HackTheBox. Covers initial enumeration, privilege escalation via SUID binary, and root flag extraction.',
    readTime: '15 min',
    featured: false,
    content: [
      {
        heading: 'Machine Overview',
        body: `Phantom is a medium-difficulty Linux machine on HackTheBox that tests your skills in web enumeration, custom exploit development, and Linux privilege escalation. The machine runs a custom web application with a hidden API endpoint that leaks sensitive information.

Machine Stats:
- OS: Ubuntu 22.04 LTS
- Difficulty: Medium
- Points: 30
- IP: 10.10.11.xxx`
      },
      {
        heading: 'Reconnaissance & Enumeration',
        body: `Starting with a standard nmap scan:

nmap -sC -sV -oN phantom.nmap 10.10.11.xxx

Results revealed three open ports:
- Port 22: OpenSSH 8.9p1
- Port 80: Nginx 1.18.0 (redirects to phantom.htb)
- Port 8080: Custom Python web server

After adding phantom.htb to /etc/hosts, we ran gobuster for directory enumeration:

gobuster dir -u http://phantom.htb -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt

This revealed /api/v1/debug — an unauthenticated debug endpoint that exposed internal configuration, including database credentials.`
      },
      {
        heading: 'Initial Foothold',
        body: `The debug endpoint leaked PostgreSQL credentials: phantom_dev:Gh0stInTh3Sh3ll!

We used these credentials to connect to the PostgreSQL instance running on port 5432 (only accessible internally, so we used the web app's SSRF vulnerability in the /api/v1/fetch endpoint):

POST /api/v1/fetch
{"url": "postgresql://phantom_dev:Gh0stInTh3Sh3ll!@localhost:5432/phantom_db"}

From the database, we extracted SSH credentials for the user "specter" and obtained the user flag.`
      },
      {
        heading: 'Privilege Escalation',
        body: `Once logged in as specter, we ran linPEAS for enumeration and discovered a custom SUID binary at /opt/phantom/ghost_runner.

Running strings on the binary revealed it called /usr/bin/python3 without an absolute path for the imported modules. This made it vulnerable to Python library hijacking.

We created a malicious os.py in a directory we controlled, set the PYTHONPATH environment variable, and executed the SUID binary:

export PYTHONPATH=/tmp/exploit
echo 'import subprocess; subprocess.call(["/bin/bash", "-p"])' > /tmp/exploit/os.py
/opt/phantom/ghost_runner

This gave us a root shell. We grabbed the root flag from /root/root.txt.

Root flag: HTB{ph4nt0m_in_th3_mach1n3_2026}`
      },
      {
        heading: 'Key Takeaways',
        body: `1. Always check for debug endpoints — they're a goldmine for attackers.
2. SUID binaries that call external programs without absolute paths are a classic privilege escalation vector.
3. SSRF vulnerabilities can be chained with internal services to escalate access.
4. Database credentials should never be exposed through API endpoints, even in development.
5. Python's module import system can be weaponized when SUID binaries are involved.`
      }
    ]
  },
  {
    id: 3,
    title: 'Building a Custom C2 Framework in Rust',
    category: 'Tutorial',
    date: '2026-06-15',
    author: 'Sh4d0w',
    excerpt: 'Step-by-step guide to building a lightweight, encrypted command & control framework using Rust for red team operations.',
    readTime: '20 min',
    featured: false,
    content: [
      {
        heading: 'Why Rust for C2?',
        body: `Traditional C2 frameworks like Cobalt Strike, Sliver, and Mythic are powerful but well-known to defenders. Their signatures are widely documented, and EDR solutions are trained to detect them. Building a custom C2 in Rust offers several advantages:

1. Memory safety without garbage collection — no runtime overhead that EDR can hook into.
2. Small binary sizes with static compilation.
3. Cross-compilation support for Windows, Linux, and macOS from a single codebase.
4. Growing ecosystem of cryptography and networking libraries.
5. Rust binaries are less commonly analyzed, meaning fewer pre-built YARA rules target them.`
      },
      {
        heading: 'Architecture Overview',
        body: `Our C2 framework, codenamed "Wraith," consists of three components:

1. Operator Console: A terminal-based UI built with ratatui for managing implants.
2. Team Server: An async Rust server using tokio and axum that handles implant check-ins, task queuing, and operator authentication.
3. Implant: A lightweight agent compiled per-target with configurable communication protocols (HTTPS, DNS-over-HTTPS, WebSocket).

Communication is encrypted using X25519 key exchange with ChaCha20-Poly1305 for symmetric encryption. Each implant generates a unique keypair on first execution and performs a key exchange with the team server during its initial check-in.`
      },
      {
        heading: 'Building the Team Server',
        body: `The team server is the core of the C2 infrastructure. Here's the basic structure:

We use axum for HTTP routing, tokio for async runtime, and sqlx for database operations. The server exposes two sets of endpoints:

Operator Endpoints (authenticated via mTLS):
- POST /api/tasks — Queue a new task for an implant
- GET /api/implants — List active implants
- GET /api/results/:id — Fetch task results

Implant Endpoints (authenticated via implant keys):
- POST /check-in — Implant registration and heartbeat
- GET /tasks/:implant_id — Fetch queued tasks
- POST /results — Submit task output

All implant communication uses jitter-based intervals (30-90 seconds by default) to avoid detection by network monitoring tools that look for beaconing patterns.`
      },
      {
        heading: 'Building the Implant',
        body: `The implant is designed to be as small and stealthy as possible. Key features:

1. Process Injection: On Windows, we use NtCreateThreadEx for reflective DLL injection. On Linux, we use ptrace-based injection.
2. Anti-Analysis: The implant checks for debuggers, virtual machines, and sandboxes before executing. It uses CPUID checks, timing-based detection, and filename analysis.
3. Persistence: Configurable persistence mechanisms including registry keys (Windows), cron jobs (Linux), and launch agents (macOS).
4. Modular Tasks: Tasks are compiled as separate shared libraries that are loaded at runtime, keeping the base implant small.

The compiled implant is approximately 800KB for Windows and 600KB for Linux — small enough to be delivered via phishing payloads or embedded in legitimate applications.`
      },
      {
        heading: 'Operational Security Considerations',
        body: `Building a C2 is only half the battle. Operational security is critical:

1. Domain Fronting: Route traffic through legitimate CDN providers to hide the true destination.
2. Malleable Profiles: Customize HTTP headers and body formats to mimic legitimate web traffic.
3. Infrastructure Rotation: Use Terraform to automate infrastructure deployment and rotation.
4. Log Sanitization: The team server automatically sanitizes logs and supports encrypted storage.

DISCLAIMER: This tutorial is intended for authorized red team operations and security research only. Unauthorized access to computer systems is illegal. Always obtain written authorization before conducting penetration tests.`
      }
    ]
  },
  {
    id: 4,
    title: 'Zero-Day in Popular npm Package: Timeline & Analysis',
    category: 'News',
    date: '2026-06-10',
    author: 'Cyph3r',
    excerpt: 'Analysis of a critical prototype pollution vulnerability found in a widely-used npm package with 50M+ weekly downloads.',
    readTime: '8 min',
    featured: false,
    content: [
      {
        heading: 'Discovery Timeline',
        body: `On May 15, 2026, security researcher @null_byte_hunter discovered a critical prototype pollution vulnerability in "deep-object-merge," an npm package with over 50 million weekly downloads. The package is used by thousands of applications for deeply merging JavaScript objects.

Timeline:
- May 15: Vulnerability discovered during routine code audit
- May 16: Initial report submitted to package maintainer via GitHub Security Advisory
- May 17: Maintainer acknowledges the report
- May 22: Patch developed and tested
- May 23: Version 4.2.1 released with fix
- June 1: CVE-2026-XXXXX assigned
- June 10: Public disclosure (this article)`
      },
      {
        heading: 'Technical Analysis',
        body: `The vulnerability exists in the merge function's recursive property assignment. When processing user-supplied input, the function fails to check for the "__proto__" property, allowing an attacker to inject properties into Object.prototype.

Vulnerable code pattern:
function deepMerge(target, source) {
  for (let key in source) {
    if (typeof source[key] === 'object') {
      target[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}

An attacker can send: {"__proto__": {"isAdmin": true}}
After merging, ALL objects in the application would have isAdmin === true.`
      },
      {
        heading: 'Impact Assessment',
        body: `Prototype pollution can lead to:

1. Authentication Bypass: If authentication checks rely on object properties, polluting the prototype can grant unauthorized access.
2. Remote Code Execution: In Node.js applications using template engines (Pug, EJS, Handlebars), prototype pollution can be chained to achieve RCE.
3. Denial of Service: Polluting the prototype with invalid values can crash applications.

CVSS Score: 9.8 (Critical)
Attack Vector: Network
Attack Complexity: Low
Privileges Required: None

Given the package's download count, we estimate that approximately 15,000-20,000 production applications were vulnerable at the time of discovery.`
      },
      {
        heading: 'Remediation',
        body: `If you use deep-object-merge in your project:

1. Update immediately to version 4.2.1 or later.
2. Audit your application for any signs of exploitation.
3. Consider using Object.create(null) for objects that store user-supplied data.
4. Implement property name validation that rejects "__proto__", "constructor", and "prototype".
5. Use npm audit regularly to catch known vulnerabilities early.

The broader lesson: always sanitize property names when performing dynamic object manipulation with user-supplied data.`
      }
    ]
  },
  {
    id: 5,
    title: 'Smart Contract Reentrancy: A Modern Approach',
    category: 'Research',
    date: '2026-06-05',
    author: 'Cyph3r',
    excerpt: 'How cross-function and cross-contract reentrancy attacks are evolving in DeFi, and how to audit for them.',
    readTime: '18 min',
    featured: false,
    content: [
      {
        heading: 'The Evolution of Reentrancy',
        body: `The DAO hack of 2016 introduced the world to reentrancy attacks, draining $60 million in ETH and ultimately causing the Ethereum hard fork. Nearly a decade later, reentrancy remains one of the most devastating vulnerabilities in smart contract security — but the attacks have evolved significantly.

Classic reentrancy exploited a single function that made an external call before updating state. Modern reentrancy attacks are far more sophisticated:

1. Cross-function reentrancy: Exploiting shared state between multiple functions.
2. Cross-contract reentrancy: Leveraging callbacks across multiple contracts in a protocol.
3. Read-only reentrancy: Exploiting view functions that return stale state during execution.
4. ERC-777/ERC-1155 hook reentrancy: Using token callback mechanisms as entry points.`
      },
      {
        heading: 'Cross-Contract Reentrancy in DeFi',
        body: `The most dangerous modern reentrancy attacks target DeFi protocols where multiple contracts share state. Consider a lending protocol with separate contracts for lending, borrowing, and liquidation.

Attack flow:
1. Attacker deposits collateral into the lending contract.
2. Attacker calls borrow() on the borrowing contract.
3. During the token transfer callback, the attacker re-enters the lending contract's withdraw() function.
4. Because the borrowing contract hasn't updated the collateral balance yet, the lending contract still sees the full collateral.
5. Attacker withdraws their collateral while keeping the borrowed funds.

This attack was used in several major exploits in 2024-2025, including the Curve pool exploit that drained over $70M.`
      },
      {
        heading: 'Read-Only Reentrancy',
        body: `Read-only reentrancy is particularly insidious because it exploits view functions — functions that don't modify state and are therefore assumed to be safe. However, if a view function is called during a state transition, it may return stale or inconsistent data.

Example: A price oracle that calculates the exchange rate based on pool balances. During a flash loan, the pool balances are temporarily manipulated. If another protocol reads the oracle's price during this manipulation, it receives an incorrect price that can be exploited for profit.

This type of reentrancy is harder to detect because:
- It doesn't violate checks-effects-interactions pattern.
- The reentered function doesn't modify state.
- Traditional reentrancy guards don't prevent it.`
      },
      {
        heading: 'Auditing Methodology',
        body: `Our audit methodology for reentrancy includes:

1. State Dependency Mapping: Map all state variables and identify which functions read vs. write them.
2. External Call Analysis: Catalog every external call (transfers, callbacks, oracle reads) and trace execution flow after each.
3. Cross-Contract Flow Analysis: For protocols with multiple contracts, map all inter-contract calls and shared state.
4. Invariant Testing: Write fuzzing tests that assert key invariants hold at every point during execution.
5. Formal Verification: Use tools like Certora or Halmos to formally verify that reentrancy is impossible given the contract's guard conditions.

Tools we use: Slither, Echidna, Foundry (forge test --fuzz), Certora Prover, and custom Python scripts for control flow analysis.`
      },
      {
        heading: 'Mitigation Best Practices',
        body: `1. Use OpenZeppelin's ReentrancyGuard on ALL state-modifying functions, not just the obvious ones.
2. Follow checks-effects-interactions religiously — update state before making external calls.
3. For cross-contract reentrancy, implement protocol-level locks that prevent re-entry across the entire protocol.
4. For read-only reentrancy, add reentrancy locks to view functions that are used by external protocols.
5. Consider using pull-over-push patterns for token transfers.
6. Implement circuit breakers that pause the protocol if unexpected state changes are detected.
7. Get multiple independent audits and maintain an active bug bounty program.`
      }
    ]
  },
  {
    id: 6,
    title: 'OSINT Masterclass: Tracking Digital Footprints',
    category: 'Tutorial',
    date: '2026-05-29',
    author: 'N3ur0n',
    excerpt: 'A comprehensive guide to open-source intelligence gathering — from social media reconnaissance to dark web monitoring.',
    readTime: '25 min',
    featured: false,
    content: [
      {
        heading: 'What is OSINT?',
        body: `Open Source Intelligence (OSINT) is the collection and analysis of information from publicly available sources. In cybersecurity, OSINT is used for threat intelligence, attack surface mapping, social engineering reconnaissance, and incident investigation.

Unlike other intelligence disciplines, OSINT relies entirely on publicly accessible data — social media profiles, domain registrations, leaked databases, public records, satellite imagery, and more. The challenge isn't access; it's knowing where to look and how to connect the dots.

OSINT is legal by definition (it uses public sources), but ethical considerations still apply. Always respect privacy laws and use your skills responsibly.`
      },
      {
        heading: 'Social Media Reconnaissance',
        body: `Social media is the richest OSINT source. People voluntarily share personal information, location data, work details, and social connections. Key techniques:

1. Profile Enumeration: Use tools like Sherlock to find a username across 300+ platforms simultaneously.
2. Metadata Extraction: Photos posted on social media often contain EXIF data — GPS coordinates, camera model, and timestamps.
3. Connection Mapping: Map a target's social graph to identify associates, employers, and potential phishing targets.
4. Temporal Analysis: Track posting patterns to determine timezone, work schedule, and travel patterns.
5. Content Analysis: Analyze language patterns, interests, and opinions for social engineering preparation.

Pro tip: Archived versions of profiles (via Wayback Machine or Google Cache) often contain information that has since been deleted.`
      },
      {
        heading: 'Domain & Infrastructure Recon',
        body: `For corporate targets, domain and infrastructure reconnaissance reveals the technical attack surface:

1. DNS Enumeration: Use tools like subfinder, amass, and dnsx to discover subdomains.
2. WHOIS Analysis: Historical WHOIS data (via DomainTools or SecurityTrails) reveals registration patterns and contact information.
3. Certificate Transparency: Search crt.sh for SSL certificates issued to a domain — this often reveals hidden subdomains.
4. Shodan/Censys: Search for internet-connected devices and services associated with the target's IP ranges.
5. Cloud Asset Discovery: Use tools like cloud_enum to find S3 buckets, Azure blobs, and GCP storage associated with the target.
6. Technology Stack: Use Wappalyzer, BuiltWith, or manual HTTP header analysis to identify frameworks, CMS platforms, and server software.`
      },
      {
        heading: 'Dark Web Monitoring',
        body: `The dark web is a critical OSINT source for threat intelligence:

1. Credential Leaks: Monitor paste sites and dark web forums for leaked credentials associated with your organization.
2. Data Breaches: Track dark web marketplaces for stolen data being sold.
3. Threat Actor Tracking: Follow threat actor forums to understand TTPs and upcoming campaigns.
4. Brand Monitoring: Detect fake websites, phishing kits, and impersonation campaigns.

Tools for dark web monitoring:
- Tor Browser for manual investigation
- OnionScan for automated .onion analysis
- IntelligenceX for dark web search
- Ahmia for Tor hidden service search
- Custom scrapers using stem (Tor controller library for Python)

WARNING: Dark web monitoring should be conducted carefully. Use dedicated VMs, VPNs, and never interact with illegal marketplaces.`
      },
      {
        heading: 'Building an OSINT Workflow',
        body: `An effective OSINT investigation follows a structured workflow:

1. Define Objectives: What are you looking for? A person's identity? An organization's attack surface? Threat intelligence?
2. Source Identification: List all relevant sources for your specific objective.
3. Data Collection: Gather raw data using automated tools and manual techniques.
4. Data Processing: Clean, normalize, and deduplicate the collected data.
5. Analysis: Look for patterns, connections, and anomalies in the data.
6. Reporting: Document findings with evidence, confidence levels, and recommendations.

Recommended OSINT Toolkit:
- Maltego (graph-based analysis)
- SpiderFoot (automated recon)
- theHarvester (email and domain enumeration)
- Recon-ng (modular recon framework)
- Obsidian (knowledge management and link analysis)

Remember: The best OSINT analysts combine tool proficiency with critical thinking. Tools collect data; analysts create intelligence.`
      }
    ]
  },
];

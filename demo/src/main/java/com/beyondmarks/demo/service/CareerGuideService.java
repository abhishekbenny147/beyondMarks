package com.beyondmarks.demo.service;

import com.beyondmarks.demo.entity.CareerDomain;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CareerGuideService {

    public Map<String, Object> generateGuide(CareerDomain career) {
        String slug = career.getSlug() != null ? career.getSlug() : "";
        String category = career.getCategory() != null ? career.getCategory() : "";

        return switch (slug) {

            // ── TECH & DIGITAL ──────────────────────────────────────────

            case "full-stack-developer" -> guide(
                "You start your morning reviewing GitHub pull requests, then jump into a standup with your team. The afternoon is spent building a new React feature while fixing a Node.js API bug. You end the day reviewing a junior developer's code and deploying a hotfix to production.",
                roadmap(
                    step(1, "Master HTML, CSS, JavaScript", "Build 5 static websites. Learn DOM manipulation, CSS Flexbox, Grid, and responsive design.", "0-2 months"),
                    step(2, "Learn React & Frontend Ecosystem", "Build interactive UIs with React. Learn hooks, state management with Zustand or Redux, and React Router.", "2-5 months"),
                    step(3, "Backend with Node.js or Java", "Build REST APIs, learn Express or Spring Boot, handle authentication with JWT.", "5-8 months"),
                    step(4, "Databases & Deployment", "Learn SQL (PostgreSQL/MySQL), NoSQL (MongoDB), Docker basics, and deploy to AWS or Vercel.", "8-11 months"),
                    step(5, "Build a Full Portfolio Project", "Create a complete full-stack application — e-commerce, social platform, or SaaS tool — and deploy it live.", "11-14 months")
                ),
                resources(
                    res("The Odin Project", "Free Curriculum", "https://theodinproject.com"),
                    res("Full Stack Open", "Free Course", "https://fullstackopen.com"),
                    res("freeCodeCamp", "Platform", "https://freecodecamp.org")
                ),
                salary("$60,000 - $85,000", "$85,000 - $120,000", "$120,000 - $180,000"),
                companies("Google", "Shopify", "Airbnb", "Stripe", "Netflix"),
                pros("Work on both frontend and backend — never bored", "Extremely high demand globally", "Can build complete products solo"),
                cons("Must constantly learn new frameworks", "Broad scope can feel overwhelming", "Jack of all trades stigma in some companies")
            );

            case "backend-engineer" -> guide(
                "Your day starts with designing a new microservice architecture, then writing Java Spring Boot endpoints. You spend the afternoon optimizing slow SQL queries and reviewing API documentation. Evening ends with setting up Docker containers for the staging environment.",
                roadmap(
                    step(1, "Learn a Backend Language", "Master Java or Python deeply — OOP, data structures, algorithms, and standard libraries.", "0-3 months"),
                    step(2, "Build REST APIs", "Learn Spring Boot or Django. Build CRUD APIs, handle validation, error handling, and pagination.", "3-6 months"),
                    step(3, "Databases & SQL", "Master PostgreSQL — joins, indexes, transactions. Learn query optimization and schema design.", "6-8 months"),
                    step(4, "System Design Fundamentals", "Learn caching (Redis), message queues (Kafka), load balancing, and microservices architecture.", "8-11 months"),
                    step(5, "Cloud & DevOps Basics", "Deploy on AWS/GCP, learn Docker, CI/CD pipelines, and monitoring with Datadog or Grafana.", "11-15 months")
                ),
                resources(
                    res("Spring Boot Official Docs", "Documentation", "https://spring.io"),
                    res("System Design Primer", "Free Guide", "https://github.com/donnemartin/system-design-primer"),
                    res("LeetCode", "Practice Platform", "https://leetcode.com")
                ),
                salary("$70,000 - $95,000", "$95,000 - $130,000", "$130,000 - $200,000"),
                companies("Amazon", "Google", "Microsoft", "Uber", "LinkedIn"),
                pros("Core of every tech product — always in demand", "High salary ceiling", "Deep, intellectually satisfying work"),
                cons("Less visible than frontend — rarely see end product", "On-call responsibilities for production systems", "Requires strong CS fundamentals")
            );

            case "ml-engineer", "ai-researcher" -> guide(
                "You begin by pulling the latest model training metrics from MLflow, then spend hours tuning hyperparameters on a neural network. The afternoon involves debugging a data pipeline in Python and reviewing research papers on transformer architectures. You end the day pushing a model to production via a FastAPI endpoint.",
                roadmap(
                    step(1, "Math & Statistics Foundation", "Linear algebra, calculus, probability, and statistics. Khan Academy + 3Blue1Brown for intuition.", "0-3 months"),
                    step(2, "Python for Data Science", "Master NumPy, Pandas, Matplotlib, Scikit-learn. Build classical ML models — regression, classification, clustering.", "3-6 months"),
                    step(3, "Deep Learning", "Learn TensorFlow or PyTorch. Build CNNs, RNNs, and Transformers. Complete fast.ai or deeplearning.ai courses.", "6-10 months"),
                    step(4, "MLOps & Deployment", "Learn MLflow, Airflow, Docker. Deploy models as APIs. Learn feature stores and model monitoring.", "10-13 months"),
                    step(5, "Specialize & Publish", "Pick a domain — NLP, Computer Vision, or RL. Kaggle competitions + publish on GitHub or arXiv.", "13-18 months")
                ),
                resources(
                    res("fast.ai", "Free Course", "https://fast.ai"),
                    res("deeplearning.ai", "Specialization", "https://deeplearning.ai"),
                    res("Kaggle", "Practice Platform", "https://kaggle.com")
                ),
                salary("$95,000 - $130,000", "$130,000 - $170,000", "$170,000 - $300,000+"),
                companies("OpenAI", "Google DeepMind", "Meta AI", "Anthropic", "Hugging Face"),
                pros("Cutting-edge work shaping the future", "Top salaries in tech", "Publish research and gain global recognition"),
                cons("Requires strong math background", "Model training can be expensive and slow", "Field changes extremely fast")
            );

            case "security-analyst", "cybersecurity-analyst" -> guide(
                "Your morning starts with reviewing overnight SIEM alerts and triaging potential incidents. You spend the afternoon hunting for suspicious network traffic using Splunk, then write a threat intelligence report. The day ends with patching vulnerabilities found in a recent penetration test.",
                roadmap(
                    step(1, "Networking & OS Fundamentals", "Learn TCP/IP, DNS, HTTP, firewalls. Get comfortable with Linux command line. Study CompTIA Network+.", "0-3 months"),
                    step(2, "Security Fundamentals", "Study CompTIA Security+ — covers cryptography, identity management, threats, and compliance.", "3-5 months"),
                    step(3, "Hands-on Lab Practice", "Use TryHackMe and HackTheBox. Practice log analysis, SIEM tools (Splunk/ELK), and incident response.", "5-9 months"),
                    step(4, "Specialize", "Choose Blue Team (defense) or Red Team (offense). Get CEH, CySA+, or pursue OSCP for penetration testing.", "9-13 months"),
                    step(5, "Get Certified & Apply", "Build a home lab. Document your work on GitHub. Apply for SOC Analyst or junior pentester roles.", "13-16 months")
                ),
                resources(
                    res("TryHackMe", "Platform", "https://tryhackme.com"),
                    res("CompTIA Security+", "Certification", "https://comptia.org"),
                    res("SANS Institute", "Training", "https://sans.org")
                ),
                salary("$65,000 - $85,000", "$85,000 - $120,000", "$120,000 - $180,000"),
                companies("CrowdStrike", "Palo Alto Networks", "Microsoft", "IBM Security", "Deloitte"),
                pros("Critical role — always in demand", "Constant intellectual challenge", "Meaningful work protecting people"),
                cons("On-call during incidents can be stressful", "Adversarial field — attackers always evolving", "Requires continuous learning")
            );

            case "ethical-hacker" -> guide(
                "You start by reading your scope of engagement for today's penetration test. Morning is spent running Nmap scans and enumerating services. Afternoon involves exploiting a misconfigured web application and documenting findings. You end the day writing a professional vulnerability report for the client.",
                roadmap(
                    step(1, "Networking & Linux Mastery", "Master TCP/IP, subnetting, DNS, HTTP. Become fluent in Linux terminal — Kali Linux specifically.", "0-3 months"),
                    step(2, "Web Application Security", "Study OWASP Top 10. Practice on DVWA and PortSwigger Web Security Academy — completely free.", "3-6 months"),
                    step(3, "Penetration Testing Tools", "Master Nmap, Burp Suite, Metasploit, Wireshark. Do TryHackMe and HackTheBox beginner paths.", "6-9 months"),
                    step(4, "Get Certified", "Pursue CEH or eJPT first, then aim for OSCP — the gold standard for ethical hackers.", "9-14 months"),
                    step(5, "Bug Bounty & Portfolio", "Join HackerOne or Bugcrowd. Report real vulnerabilities. Build a blog documenting your findings.", "14-18 months")
                ),
                resources(
                    res("PortSwigger Web Academy", "Free Training", "https://portswigger.net/web-security"),
                    res("HackTheBox", "Platform", "https://hackthebox.com"),
                    res("Offensive Security (OSCP)", "Certification", "https://offensive-security.com")
                ),
                salary("$75,000 - $100,000", "$100,000 - $140,000", "$140,000 - $220,000"),
                companies("HackerOne", "Bugcrowd", "Rapid7", "NCC Group", "KPMG Cyber"),
                pros("Get paid to think like a criminal legally", "Massive shortage of skilled pentesters", "Bug bounties can earn you $10K+ per vulnerability"),
                cons("Strict legal and ethical boundaries", "High responsibility — one mistake can cause harm", "OSCP is notoriously difficult")
            );

            case "data-analyst", "bi-analyst" -> guide(
                "You start by pulling sales data from the data warehouse with SQL queries. Morning is spent cleaning a messy dataset in Python. Afternoon involves building a Power BI dashboard for the marketing team and presenting insights to stakeholders. You end the day automating a weekly report.",
                roadmap(
                    step(1, "Excel & SQL Mastery", "Master Excel (PivotTables, VLOOKUP, charts) and SQL (joins, subqueries, window functions). These are non-negotiable.", "0-3 months"),
                    step(2, "Data Visualization", "Learn Tableau or Power BI. Build 5 dashboards on real public datasets from Kaggle or data.gov.", "3-5 months"),
                    step(3, "Python for Analysis", "Learn Pandas, NumPy, Matplotlib, Seaborn. Automate repetitive analysis tasks with Python scripts.", "5-8 months"),
                    step(4, "Statistics & Business Acumen", "Study descriptive statistics, A/B testing, and cohort analysis. Understand KPIs and business metrics.", "8-10 months"),
                    step(5, "Build Portfolio & Apply", "Complete 3 end-to-end analysis projects. Publish on GitHub and Tableau Public. Apply to analyst roles.", "10-13 months")
                ),
                resources(
                    res("Mode SQL Tutorial", "Free Course", "https://mode.com/sql-tutorial"),
                    res("Tableau Public", "Free Tool", "https://public.tableau.com"),
                    res("Google Data Analytics Certificate", "Certification", "https://coursera.org/google-certificates")
                ),
                salary("$55,000 - $75,000", "$75,000 - $100,000", "$100,000 - $140,000"),
                companies("McKinsey", "Amazon", "Walmart", "Deloitte", "Accenture"),
                pros("Needed in every industry", "Clear career progression path", "High impact — decisions driven by your insights"),
                cons("Can become repetitive with routine reporting", "Stakeholders often don't act on insights", "Data quality issues are frustrating")
            );

            case "product-designer", "ux-designer" -> guide(
                "Your morning starts with a user research session — interviewing 3 customers about pain points. You spend the afternoon synthesizing findings into user journey maps in FigJam. Then you prototype a new onboarding flow in Figma and present it to the product team for feedback.",
                roadmap(
                    step(1, "Design Fundamentals", "Study typography, color theory, layout, and visual hierarchy. Read 'The Design of Everyday Things' by Don Norman.", "0-2 months"),
                    step(2, "Master Figma", "Learn Figma completely — components, auto layout, prototyping, design systems. Recreate apps you love.", "2-4 months"),
                    step(3, "User Research Methods", "Learn user interviews, usability testing, surveys, and affinity mapping. Practice with real people.", "4-7 months"),
                    step(4, "Build a Case Study Portfolio", "Design 3 complete products with problem statement, research, wireframes, prototypes, and final UI.", "7-11 months"),
                    step(5, "Apply & Iterate", "Apply to junior roles. Expect design critiques. Iterate your portfolio based on feedback.", "11-15 months")
                ),
                resources(
                    res("Figma for Beginners", "Free Course", "https://figma.com/resources/learn-design"),
                    res("Google UX Design Certificate", "Certification", "https://coursera.org/google-certificates"),
                    res("Nielsen Norman Group", "Research Articles", "https://nngroup.com")
                ),
                salary("$60,000 - $85,000", "$85,000 - $115,000", "$115,000 - $160,000"),
                companies("Apple", "Figma", "Airbnb", "Spotify", "Google"),
                pros("Creative and analytical work combined", "Seat at the table in product decisions", "Remote-friendly career globally"),
                cons("Subjective feedback can be frustrating", "Portfolio takes months to build", "Design by committee kills good work")
            );

            case "cloud-engineer", "devops-engineer" -> guide(
                "You start by reviewing overnight alerts from your monitoring stack — a Lambda function is hitting timeout limits. You spend the morning optimizing it and updating Terraform infrastructure code. Afternoon involves setting up a new CI/CD pipeline in GitHub Actions and mentoring a junior engineer on Kubernetes deployments.",
                roadmap(
                    step(1, "Linux & Networking Basics", "Get comfortable with Linux CLI, bash scripting, networking concepts — IP, DNS, HTTP, TCP/IP.", "0-2 months"),
                    step(2, "Learn a Cloud Platform", "Start with AWS — get AWS Cloud Practitioner then Solutions Architect Associate. Hands-on labs only.", "2-6 months"),
                    step(3, "Docker & Kubernetes", "Containerize applications with Docker. Orchestrate with Kubernetes. Do CKA certification.", "6-9 months"),
                    step(4, "Infrastructure as Code", "Learn Terraform and Ansible. Automate everything — never click in a console manually.", "9-12 months"),
                    step(5, "CI/CD & Monitoring", "Set up GitHub Actions or Jenkins pipelines. Learn Prometheus, Grafana, Datadog for observability.", "12-16 months")
                ),
                resources(
                    res("AWS Free Tier", "Platform", "https://aws.amazon.com/free"),
                    res("KodeKloud", "Hands-on Labs", "https://kodekloud.com"),
                    res("Terraform Registry", "Documentation", "https://registry.terraform.io")
                ),
                salary("$80,000 - $110,000", "$110,000 - $150,000", "$150,000 - $220,000"),
                companies("AWS", "Google Cloud", "Netflix", "Cloudflare", "HashiCorp"),
                pros("Extremely high demand and salaries", "Work with cutting-edge infrastructure", "Remote work is the norm"),
                cons("On-call rotations for production incidents", "Breadth of tools to master is overwhelming", "Cloud costs can spiral without discipline")
            );

            case "cloud-security-engineer" -> guide(
                "Your morning starts by reviewing Cloud Audit Logs for anomalous IAM activity. You spend time hardening GCP service account permissions and reviewing Terraform security policies. Afternoon involves running Prowler for a cloud security posture assessment and writing detection rules in Chronicle SIEM.",
                roadmap(
                    step(1, "Cloud & Security Fundamentals", "Get CompTIA Security+ and AWS/GCP Cloud Practitioner. Understand shared responsibility model.", "0-3 months"),
                    step(2, "IAM & Identity Security", "Master IAM policies, least privilege, service accounts, federation, and identity governance.", "3-6 months"),
                    step(3, "Cloud Security Tools", "Learn Prowler, ScoutSuite, CloudSploit. Practice on flAWS.cloud and CloudGoat intentionally vulnerable labs.", "6-10 months"),
                    step(4, "Detection & Response", "Set up SIEM with cloud logs. Write detection rules. Learn cloud incident response playbooks.", "10-13 months"),
                    step(5, "Certifications & Portfolio", "Pursue CCSP or Google Professional Cloud Security Engineer. Build a GCP security audit project.", "13-18 months")
                ),
                resources(
                    res("flAWS.cloud", "Free Lab", "http://flaws.cloud"),
                    res("Google Cloud Security Engineer Cert", "Certification", "https://cloud.google.com/certification"),
                    res("Prowler", "Open Source Tool", "https://github.com/prowler-cloud/prowler")
                ),
                salary("$90,000 - $120,000", "$120,000 - $160,000", "$160,000 - $230,000"),
                companies("Google", "Palo Alto Networks", "CrowdStrike", "AWS", "Microsoft"),
                pros("Critical shortage of cloud security talent globally", "High salaries at top tech companies", "Defensive work with massive real-world impact"),
                cons("Must master both cloud AND security — double the breadth", "Fast-moving threat landscape", "Requires hands-on lab time that is self-directed")
            );

            case "game-programmer", "three-d-developer" -> guide(
                "You start reviewing bug reports from QA on yesterday's build. Morning is spent fixing a physics collision bug in Unreal Engine. Afternoon involves implementing a new enemy AI behavior tree and optimizing draw calls to hit the 60fps target. You end the day in a design review with the game director.",
                roadmap(
                    step(1, "Programming Fundamentals", "Learn C++ or C# deeply. Focus on OOP, memory management, data structures, and algorithms.", "0-3 months"),
                    step(2, "Choose Your Engine", "Pick Unity (C#) or Unreal (C++). Complete the official tutorials and build 3 small games from scratch.", "3-7 months"),
                    step(3, "Core Game Systems", "Implement physics, collision, animation state machines, AI pathfinding, and input systems.", "7-11 months"),
                    step(4, "Specialize", "Pick a focus — gameplay programming, graphics/shaders, tools engineering, or network/multiplayer.", "11-14 months"),
                    step(5, "Build a Demo Reel", "Ship a complete polished game on itch.io or Steam. Quality over quantity — one great game beats five bad ones.", "14-18 months")
                ),
                resources(
                    res("Unity Learn", "Free Platform", "https://learn.unity.com"),
                    res("Unreal Online Learning", "Free Platform", "https://dev.epicgames.com/community/learning"),
                    res("Game Programming Patterns", "Free Book", "https://gameprogrammingpatterns.com")
                ),
                salary("$65,000 - $90,000", "$90,000 - $130,000", "$130,000 - $180,000"),
                companies("Epic Games", "Riot Games", "EA", "CD Projekt Red", "Valve"),
                pros("Build interactive experiences millions enjoy", "Creative and technical work combined", "Gaming industry growing faster than film"),
                cons("Crunch culture at major studios is real", "Breaking in is competitive", "Game projects can be cancelled after years of work")
            );

            case "content-creator", "podcaster" -> guide(
                "Your morning is spent filming and editing a video tutorial. You respond to 50 comments and analyze last week's analytics to understand what topics performed best. Afternoon is a brand partnership call, then you film a talking-head segment for tomorrow's upload. You end planning next month's content calendar.",
                roadmap(
                    step(1, "Find Your Niche", "Identify a specific topic you can talk about for years. Niche down hard — 'tech for college students' beats 'tech'.", "0-1 month"),
                    step(2, "Learn Basic Production", "Master your phone camera or entry-level camera. Learn DaVinci Resolve (free) for editing. Audio first — bad audio kills channels.", "1-3 months"),
                    step(3, "Publish Consistently", "Post weekly for 6 months minimum. Study your analytics obsessively. Optimize thumbnails and titles for SEO.", "3-9 months"),
                    step(4, "Build & Engage Community", "Reply to every comment. Build a Discord or newsletter. Collaborate with creators in your niche.", "9-14 months"),
                    step(5, "Monetize", "Apply for YouTube Partner Program, launch Patreon or Substack, pitch brand sponsorships, sell a course or digital product.", "14-24 months")
                ),
                resources(
                    res("YouTube Creator Academy", "Free Course", "https://creatoracademy.youtube.com"),
                    res("DaVinci Resolve", "Free Software", "https://blackmagicdesign.com/products/davinciresolve"),
                    res("vidIQ", "Analytics Tool", "https://vidiq.com")
                ),
                salary("$0 - $30,000 (year 1)", "$30,000 - $100,000 (year 2-3)", "$100,000 - $1M+ (established)"),
                companies("YouTube", "Spotify", "Patreon", "Substack", "Self-employed"),
                pros("Complete creative and schedule freedom", "Income scales without trading more time", "Build a personal brand that lasts decades"),
                cons("Income is unpredictable for years", "Algorithm changes can devastate your channel overnight", "Burnout is extremely common")
            );

            // ── BUSINESS & MANAGEMENT ──────────────────────────────────

            case "startup-founder", "product-manager" -> guide(
                "You start with a 9am all-hands standup, then jump into a prioritization session with engineering. You spend the afternoon reviewing user feedback, updating the product roadmap, and mediating a disagreement between design and engineering. Evening is a call with a potential investor.",
                roadmap(
                    step(1, "Learn Business & Product Basics", "Read 'Zero to One', 'The Lean Startup', 'Inspired by Marty Cagan'. Understand markets, users, and product-market fit.", "0-2 months"),
                    step(2, "Develop Technical Literacy", "Learn enough to talk to engineers — understand APIs, databases, system design basics. Take a CS50 course.", "2-5 months"),
                    step(3, "Work in Startups First", "Join an early-stage startup in any role — sales, operations, or growth. Learn how products get built and shipped.", "5-14 months"),
                    step(4, "Build Your Own Product", "Launch something — even a simple tool. Go through the entire cycle: idea, build, launch, market, iterate.", "14-20 months"),
                    step(5, "Raise or Scale", "Raise from angels or VCs, or grow organically. Apply to Y Combinator, Techstars, or local accelerators.", "20-30 months")
                ),
                resources(
                    res("Y Combinator Startup School", "Free Course", "https://startupschool.org"),
                    res("Product Hunt", "Community", "https://producthunt.com"),
                    res("Lenny's Newsletter", "Newsletter", "https://lennysnewsletter.com")
                ),
                salary("$0 - $80,000 (early stage)", "$80,000 - $150,000 (Series A)", "$150,000 - $500,000+ (senior PM/founder)"),
                companies("Y Combinator", "a16z", "Sequoia", "Google", "Meta"),
                pros("Build something from nothing", "Shape entire product direction", "Massive financial upside with equity"),
                cons("Extremely high failure rate for startups", "Stressful and all-consuming", "Responsibility for team livelihoods")
            );

            case "financial-analyst", "chartered-accountant" -> guide(
                "You start by pulling Bloomberg data to update your financial model. Morning is spent on a valuation analysis for an acquisition target. Afternoon involves presenting findings to the MD and refining assumptions based on feedback. You end the day preparing for tomorrow's client earnings call.",
                roadmap(
                    step(1, "Master Excel & Financial Modeling", "Learn Excel deeply — VBA, PivotTables, advanced formulas. Build DCF, LBO, and comparable company models.", "0-3 months"),
                    step(2, "Study Accounting & Finance", "Understand financial statements — income statement, balance sheet, cash flow. Study for CFA Level 1 or CA exams.", "3-8 months"),
                    step(3, "Get Certified", "Pursue CFA, CA, CPA, or CMA depending on your region and career goal — these open doors significantly.", "8-24 months"),
                    step(4, "Internships in Finance", "Land internships at banks, consulting firms, or corporates. Big 4 accounting firms are excellent entry points.", "Concurrent"),
                    step(5, "Specialize", "Choose investment banking, equity research, corporate finance, or audit. Build domain expertise in one industry.", "24-36 months")
                ),
                resources(
                    res("CFI Financial Modeling", "Course", "https://corporatefinanceinstitute.com"),
                    res("CFA Institute", "Certification", "https://cfainstitute.org"),
                    res("Wall Street Prep", "Training", "https://wallstreetprep.com")
                ),
                salary("$55,000 - $80,000", "$80,000 - $120,000", "$120,000 - $300,000+"),
                companies("Goldman Sachs", "JP Morgan", "McKinsey", "Deloitte", "BlackRock"),
                pros("Prestigious and well-compensated", "Transferable skills across all industries", "Clear certification-based progression"),
                cons("Long hours — especially in banking", "High stress during reporting seasons", "Years of study for top certifications")
            );

            case "management-consultant" -> guide(
                "You fly to a client's office Monday morning and spend the week embedded with their leadership team. Days involve interviewing stakeholders, building Excel models, and creating PowerPoint presentations. Friday you present findings to the C-suite and fly home. Repeat every week.",
                roadmap(
                    step(1, "Build Case Interview Skills", "Practice 100+ case interviews. Read 'Case in Point'. Use CaseCoach and PrepLounge platforms daily.", "0-4 months"),
                    step(2, "Master PowerPoint & Excel", "Learn to build consulting-grade presentations and models. Study McKinsey and BCG publicly available decks.", "0-3 months"),
                    step(3, "Target Top MBA or Undergraduate Programs", "MBB (McKinsey, BCG, Bain) recruit heavily from target schools. Network with alumni aggressively.", "Ongoing"),
                    step(4, "Land an Internship", "Summer consulting internships are the primary pipeline. Perform well and convert to a full-time offer.", "Year 2-3 of degree"),
                    step(5, "Specialize Post-Entry", "After 2-3 years, specialize in a sector (healthcare, tech, financial services) or function (strategy, operations, digital).", "3-5 years in")
                ),
                resources(
                    res("Case in Point Book", "Book", "https://amazon.com"),
                    res("PrepLounge", "Platform", "https://preplounge.com"),
                    res("McKinsey Insights", "Free Articles", "https://mckinsey.com/insights")
                ),
                salary("$85,000 - $110,000", "$110,000 - $180,000", "$180,000 - $500,000+"),
                companies("McKinsey", "BCG", "Bain", "Deloitte", "Accenture"),
                pros("Exposure to diverse industries and problems", "Elite professional network", "Prestigious brand name opens all doors"),
                cons("Extensive travel is exhausting", "Work-life balance is poor", "Golden handcuffs make it hard to leave")
            );

            // ── CREATIVE & MEDIA ────────────────────────────────────────

            case "photographer", "film-maker" -> guide(
                "You start your day editing yesterday's product shoot in Lightroom. Afternoon is a 3-hour location scout for a brand campaign. Evening you negotiate a contract with a new client and back up your drives. Weekends often involve shooting events, weddings, or personal creative projects.",
                roadmap(
                    step(1, "Master Your Camera", "Learn exposure triangle — aperture, shutter speed, ISO. Shoot in manual mode only until it's instinct.", "0-2 months"),
                    step(2, "Learn Post-Processing", "Master Lightroom for photography, Premiere Pro and DaVinci Resolve for video. Develop a signature style.", "2-5 months"),
                    step(3, "Shoot Everything", "Build a diverse portfolio. Second-shoot for established photographers. Offer free shoots to build your portfolio initially.", "5-10 months"),
                    step(4, "Niche Down", "Specialize — weddings, commercial, documentary, fashion, or product. Generalists earn less than specialists.", "10-14 months"),
                    step(5, "Build Client Pipeline", "Create a professional website, list on directories, network with event planners and brands, run Instagram actively.", "14-20 months")
                ),
                resources(
                    res("Peter McKinnon YouTube", "Free Content", "https://youtube.com"),
                    res("Adobe Creative Cloud", "Software", "https://adobe.com"),
                    res("Skillshare Photography", "Courses", "https://skillshare.com")
                ),
                salary("$35,000 - $55,000", "$55,000 - $90,000", "$90,000 - $200,000+"),
                companies("Getty Images", "Adobe", "National Geographic", "Condé Nast", "Self-employed"),
                pros("Creative freedom and artistic expression", "Varied work — no two days the same", "High earning potential when specialized"),
                cons("Highly competitive market", "Income is inconsistent as freelancer", "Equipment costs are significant upfront")
            );

            case "music-producer", "sound-engineer" -> guide(
                "You start your session at noon — music producers work late. You spend hours layering beats, adjusting EQ on a track, and collaborating remotely with a vocalist over Zoom. Evening is a mixing session for a podcast client. You end the night uploading a finished track to streaming platforms.",
                roadmap(
                    step(1, "Music Theory Fundamentals", "Learn scales, chords, rhythm, and song structure. Use musictheory.net — free and comprehensive.", "0-3 months"),
                    step(2, "Master Your DAW", "Choose Ableton, Logic Pro, or FL Studio. Learn it deeply — sampling, MIDI, mixing, automation, mastering.", "3-8 months"),
                    step(3, "Produce Constantly", "Produce one track per week minimum. Study the production of your favorite songs by recreating them.", "8-14 months"),
                    step(4, "Build Your Network", "Connect with artists, vocalists, and other producers. Collaborate extensively — music is a relationship business.", "Ongoing"),
                    step(5, "Release & License", "Put music on Spotify, SoundCloud, and Bandcamp. License beats online via BeatStars. Build a client roster.", "14-24 months")
                ),
                resources(
                    res("Produce Like A Pro", "YouTube Channel", "https://youtube.com"),
                    res("Ableton Learning Music", "Free Course", "https://learningmusic.ableton.com"),
                    res("BeatStars", "Marketplace", "https://beatstars.com")
                ),
                salary("$30,000 - $55,000", "$55,000 - $90,000", "$90,000 - $500,000+"),
                companies("Universal Music", "Sony Music", "Spotify", "Apple Music", "Self-employed"),
                pros("Create art that moves people emotionally", "Global reach through streaming", "Top producers earn life-changing income"),
                cons("Income extremely unpredictable early on", "Oversaturated market", "Success often requires the right connections")
            );

            // ── SCIENCE & HEALTH ────────────────────────────────────────

            case "doctor" -> guide(
                "You start rounds at 7am reviewing patient charts. Morning involves seeing 12 patients — diagnosing, ordering tests, adjusting medications. Afternoon you perform a procedure, then review lab results. You end the day with 30 minutes of documentation. On-call nights involve handling emergencies.",
                roadmap(
                    step(1, "Undergraduate Pre-Med", "Complete biology, chemistry, physics, and math. Maintain GPA above 3.5. Shadow doctors and volunteer in hospitals.", "4 years"),
                    step(2, "NEET / MCAT & Medical School Entry", "In India: NEET UG. In US: MCAT. These are highly competitive — start prep 12-18 months early.", "1-2 years prep"),
                    step(3, "MBBS / Medical School", "5.5 years in India, 4 years MD in US. Clinical rotations expose you to all specialties.", "4-6 years"),
                    step(4, "Residency / Internship", "1-year internship in India, 3-7 year residency in US depending on specialty. Grueling but essential.", "1-7 years"),
                    step(5, "Specialize or Practice", "Choose general practice or pursue a fellowship to specialize in cardiology, surgery, psychiatry, etc.", "Ongoing")
                ),
                resources(
                    res("NEET Preparation", "Exam", "https://nta.ac.in"),
                    res("First Aid for USMLE", "Book", "https://amazon.com"),
                    res("Osmosis", "Medical Learning", "https://osmosis.org")
                ),
                salary("$30,000 - $60,000 (residency)", "$100,000 - $200,000 (general)", "$200,000 - $500,000+ (specialist)"),
                companies("AIIMS", "Apollo Hospitals", "Mayo Clinic", "Johns Hopkins", "Self-practice"),
                pros("Literally save lives every day", "Highest social respect in most cultures", "Job security is unmatched globally"),
                cons("12-15 years of training before full practice", "Emotional burden of patient deaths", "Student debt in US is catastrophic")
            );

            case "therapist-counselor" -> guide(
                "You see 6-8 clients per day in 50-minute sessions. Morning clients include a teen dealing with anxiety and a couple in conflict. You take notes, maintain confidentiality, and practice active listening all day. Afternoon involves supervision with your clinical supervisor. You end with self-care — therapists need therapy too.",
                roadmap(
                    step(1, "Psychology Undergraduate Degree", "Study psychology, sociology, or social work. Focus on research methods, abnormal psychology, and development.", "3-4 years"),
                    step(2, "Master's in Counseling or Clinical Psychology", "Specialize in CBT, DBT, trauma therapy, or family systems. Clinical hours are mandatory.", "2 years"),
                    step(3, "Clinical Supervised Hours", "Log 2,000-4,000 supervised clinical hours required for licensure in most countries.", "2-3 years"),
                    step(4, "Get Licensed", "Pass your licensing exam — LCSW, LPC, or MFT depending on your specialization and country.", "After hours"),
                    step(5, "Build Your Practice", "Work in a clinic, hospital, or school, or open a private practice. Teletherapy has massively expanded reach.", "Ongoing")
                ),
                resources(
                    res("Psychology Today Therapist Directory", "Platform", "https://psychologytoday.com"),
                    res("Beck Institute (CBT)", "Training", "https://beckinstitute.org"),
                    res("APA Resources", "Professional Body", "https://apa.org")
                ),
                salary("$45,000 - $65,000", "$65,000 - $95,000", "$95,000 - $150,000+"),
                companies("Kaiser Permanente", "BetterHelp", "Talkspace", "NHS", "Private practice"),
                pros("Profound impact on people's lives", "Mental health demand at all-time high globally", "Private practice offers full autonomy"),
                cons("Compassion fatigue is real and serious", "Years of expensive training required", "Emotional weight accumulates over career")
            );

            // ── SOCIAL & SPECIALIZED ────────────────────────────────────

            case "lawyer", "legal-advisor" -> guide(
                "Your morning starts reviewing case files and legal briefs. You spend two hours in court for a hearing, then return to draft a contract for a corporate client. Afternoon involves legal research for an upcoming case and a client consultation call. You end the day billing hours and preparing tomorrow's arguments.",
                roadmap(
                    step(1, "Undergraduate in Law or Any Field", "In India: 5-year BA LLB or 3-year LLB after graduation. In US: Any bachelor's degree before law school.", "3-5 years"),
                    step(2, "CLAT / LSAT Preparation", "In India: CLAT for NLUs. In US: LSAT for law school. Both require 6-12 months of serious preparation.", "6-12 months prep"),
                    step(3, "Law School", "Study contract law, torts, criminal law, constitutional law, and procedure. Moot courts and internships are critical.", "3-5 years"),
                    step(4, "Bar Exam / Enrollment", "Pass the Bar Council exam (India) or Bar Exam (US). This is required to practice law professionally.", "6-12 months prep"),
                    step(5, "Specialize & Build Practice", "Join a law firm, corporate legal team, or government. Specialize in corporate, criminal, IP, or family law.", "Ongoing")
                ),
                resources(
                    res("CLAT Consortium", "Exam", "https://consortiumofnlus.ac.in"),
                    res("Khan Academy LSAT Prep", "Free Prep", "https://khanacademy.org/prep/lsat"),
                    res("Indian Kanoon", "Legal Research", "https://indiankanoon.org")
                ),
                salary("$40,000 - $70,000", "$70,000 - $130,000", "$130,000 - $500,000+"),
                companies("Cyril Amarchand Mangaldas", "AZB & Partners", "Latham & Watkins", "Supreme Court Bar", "Corporate Legal Teams"),
                pros("Prestigious and intellectually demanding", "Transferable to business, politics, and policy", "Top lawyers earn extraordinary income"),
                cons("Years of expensive education required", "Extremely competitive at top firms", "High-stress, long-hours culture")
            );

            case "ias-officer" -> guide(
                "Your day starts at 9am reviewing district reports and citizen grievances. You chair a meeting on infrastructure project delays, then inspect a government school in the afternoon. Evening involves policy briefings for the state government. Your decisions affect millions of people's daily lives.",
                roadmap(
                    step(1, "Complete Undergraduate Degree", "Any discipline qualifies — engineering, arts, science, commerce. Focus on current affairs from day one.", "3-4 years"),
                    step(2, "UPSC Prelims Preparation", "Study NCERTs, standard textbooks. Cover Polity, History, Geography, Economy, Science, Environment, Current Affairs.", "12-18 months"),
                    step(3, "Clear Prelims & Mains", "Prelims is objective, Mains is 9 papers — essay, GS 1-4, and optional subject. Quality over quantity in answers.", "Ongoing"),
                    step(4, "Personality Test (Interview)", "Prepare for the UPSC board interview — current affairs, governance, leadership, and self-awareness.", "After Mains"),
                    step(5, "LBSNAA Training", "Selected candidates train at Lal Bahadur Shastri National Academy of Administration in Mussoorie for 2 years.", "2 years")
                ),
                resources(
                    res("NCERT Textbooks", "Free Books", "https://ncert.nic.in"),
                    res("Insights on India", "Platform", "https://insightsonindia.com"),
                    res("Vision IAS", "Coaching", "https://visionias.in")
                ),
                salary("₹56,000 - ₹1,00,000/month (starting)", "₹1,00,000 - ₹1,80,000/month (mid)", "₹2,00,000+/month (senior) + perks"),
                companies("Government of India", "State Governments", "PSUs", "UN Agencies", "World Bank"),
                pros("Unparalleled power to create social change", "Highest prestige in Indian public life", "Job security and comprehensive benefits"),
                cons("UPSC has less than 1% selection rate", "Transfers disrupt personal and family life", "Bureaucratic system can be frustrating")
            );

            case "sports-analyst" -> guide(
                "You start by downloading last night's match data and running statistical models to identify performance patterns. Morning is spent building a dashboard for the coaching staff. Afternoon involves a video analysis session with players and writing a scouting report on an upcoming opponent.",
                roadmap(
                    step(1, "Build Statistics & Data Foundations", "Master statistics, probability, and regression. Learn R or Python for sports data analysis.", "0-3 months"),
                    step(2, "Learn Sports-Specific Metrics", "Study advanced stats for your sport — Expected Goals (soccer), WAR (baseball), PER (basketball).", "3-6 months"),
                    step(3, "Master Visualization Tools", "Learn Tableau, Power BI, and sport-specific platforms like Wyscout, Catapult, or StatSports.", "6-9 months"),
                    step(4, "Build a Portfolio", "Analyze publicly available match data. Write analytical articles on Medium or a personal blog. Get attention.", "9-14 months"),
                    step(5, "Network Into the Industry", "Attend sports analytics conferences (MIT Sloan). Apply to clubs, leagues, sports media, or betting firms.", "14-20 months")
                ),
                resources(
                    res("MIT Sloan Sports Analytics Conference", "Conference", "https://sloansportsconference.com"),
                    res("StatsBomb Open Data", "Free Data", "https://github.com/statsbomb/open-data"),
                    res("Football Reference", "Data Source", "https://fbref.com")
                ),
                salary("$45,000 - $70,000", "$70,000 - $110,000", "$110,000 - $200,000+"),
                companies("Manchester City", "Golden State Warriors", "ESPN", "Sportradar", "DraftKings"),
                pros("Combine passion for sports with data skills", "Growing field with massive investment", "Work directly with elite athletes and coaches"),
                cons("Breaking in requires luck and networking", "Contract-based work with job insecurity", "Small field — fewer positions than demand")
            );

            // ── DEFAULT FALLBACK ─────────────────────────────────────────
            default -> buildDefaultGuide(career);
        };
    }

    // ── Helpers ──────────────────────────────────────────────────────────

    private Map<String, Object> guide(String dayInLife, List<Map<String,Object>> roadmap,
            List<Map<String,Object>> resources, Map<String,String> salary,
            List<String> companies, List<String> pros, List<String> cons) {
        Map<String, Object> g = new HashMap<>();
        g.put("dayInLife", dayInLife);
        g.put("roadmap", roadmap);
        g.put("resources", resources);
        g.put("salaryBreakdown", salary);
        g.put("topCompanies", companies);
        g.put("prosAndCons", Map.of("pros", pros, "cons", cons));
        return g;
    }

    private Map<String,Object> step(int n, String title, String desc, String duration) {
        return Map.of("step", n, "title", title, "description", desc, "duration", duration);
    }

    private List<Map<String,Object>> roadmap(Map<String,Object>... steps) {
        return List.of(steps);
    }

    private Map<String,Object> res(String name, String type, String url) {
        return Map.of("name", name, "type", type, "url", url);
    }

    private List<Map<String,Object>> resources(Map<String,Object>... items) {
        return List.of(items);
    }

    private Map<String,String> salary(String entry, String mid, String senior) {
        return Map.of("entry", entry, "mid", mid, "senior", senior);
    }

    private List<String> companies(String... names) { return List.of(names); }
    private List<String> pros(String... items) { return List.of(items); }
    private List<String> cons(String... items) { return List.of(items); }

    private Map<String, Object> buildDefaultGuide(CareerDomain career) {
        String[] skills = career.getRequiredSkills() != null
            ? career.getRequiredSkills().split(",") : new String[]{"core skills"};
        return guide(
            "A typical day as a " + career.getName() + " involves collaborating with teams, solving real problems, and continuously growing your expertise in " + career.getCategory() + ".",
            roadmap(
                step(1, "Build Core Foundations", "Learn the fundamentals of " + (skills.length > 0 ? skills[0].trim() : "the field") + " through structured courses and books.", "0-3 months"),
                step(2, "Develop Key Skills", "Master essential tools: " + (skills.length > 1 ? skills[1].trim() : "industry-standard tools") + ". Practice daily.", "3-6 months"),
                step(3, "Build Real Projects", "Create 2-3 portfolio projects that demonstrate your capabilities to potential employers.", "6-10 months"),
                step(4, "Get Certified", "Earn recognized certifications that validate your skills and open doors to opportunities.", "10-14 months"),
                step(5, "Land Your First Role", "Apply actively, network in the community, and target internships or junior roles.", "14-18 months")
            ),
            resources(
                res("Coursera", "Platform", "https://coursera.org"),
                res("LinkedIn Learning", "Platform", "https://linkedin.com/learning"),
                res("YouTube", "Free Resource", "https://youtube.com")
            ),
            salary("$45,000 - $65,000", "$65,000 - $95,000", career.getAverageSalary() != null ? career.getAverageSalary() + "+" : "$95,000+"),
            companies("Google", "Microsoft", "Amazon", "Meta", "Top Industry Leaders"),
            pros("High demand and strong career growth", "Intellectually stimulating work", "Transferable skills across industries"),
            cons("Requires continuous upskilling", "Competitive to break into at top companies", "May involve long hours in early career")
        );
    }
}
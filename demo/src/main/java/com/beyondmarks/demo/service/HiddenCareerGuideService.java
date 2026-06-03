package com.beyondmarks.demo.service;

import com.beyondmarks.demo.entity.HiddenCareer;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class HiddenCareerGuideService {

    public Map<String, Object> generateGuide(HiddenCareer career) {
        String title = career.getTitle() != null ? career.getTitle().toLowerCase() : "";

        if (title.contains("prompt engineer")) return promptEngineer();
        if (title.contains("forensic account")) return forensicAccountant();
        if (title.contains("science communicat")) return scienceCommunicator();
        if (title.contains("urban farm")) return urbanFarmer();
        if (title.contains("esport") || title.contains("esports coach")) return esportsCoach();
        if (title.contains("conversational ai")) return conversationalAI();
        if (title.contains("biohack")) return biohacker();
        if (title.contains("music supervis")) return musicSupervisor();
        if (title.contains("ux research")) return uxResearcher();
        if (title.contains("ethical hack")) return ethicalHacker();

        return buildDefaultGuide(career);
    }

    // ── GUIDES ────────────────────────────────────────────────────────────

    private Map<String, Object> promptEngineer() {
        return guide(
            "You start the day reviewing outputs from yesterday's AI pipeline — something went wrong with the summarization prompts. You spend the morning diagnosing failure modes and rewriting the prompt chain. Afternoon is a collaboration session with ML engineers to integrate your prompts into a production feature. You end the day documenting best practices for the team.",
            roadmap(
                step(1, "Understand How LLMs Work", "Study transformer architecture basics, tokenization, context windows, and temperature. Read OpenAI and Anthropic documentation thoroughly.", "0-1 month"),
                step(2, "Master Prompt Patterns", "Learn zero-shot, few-shot, chain-of-thought, and role prompting. Practice on ChatGPT, Claude, and Gemini daily.", "1-3 months"),
                step(3, "Build Prompt Systems", "Create multi-step prompt pipelines for real tasks — summarization, extraction, classification, generation. Use LangChain or LlamaIndex.", "3-6 months"),
                step(4, "Measure & Optimize", "Learn prompt evaluation — build evals, measure consistency, hallucination rates, and accuracy. Use LangSmith or PromptLayer.", "6-9 months"),
                step(5, "Build a Public Portfolio", "Publish prompt systems on GitHub. Write detailed blog posts on your techniques. Contribute to open-source AI projects.", "9-14 months")
            ),
            resources(
                res("OpenAI Prompt Engineering Guide", "Free Guide", "https://platform.openai.com/docs/guides/prompt-engineering"),
                res("Anthropic Prompt Library", "Free Resource", "https://docs.anthropic.com/en/prompt-library"),
                res("LangChain Documentation", "Framework", "https://python.langchain.com")
            ),
            salary("$90,000 - $120,000", "$120,000 - $160,000", "$160,000 - $250,000"),
            companies("OpenAI", "Anthropic", "Google DeepMind", "Microsoft", "Cohere"),
            pros("One of the hottest roles in AI right now", "No traditional CS degree required", "Rapidly growing compensation packages"),
            cons("Field is so new — no standardized career path", "Role may be absorbed into engineering over time", "Requires constant learning as models evolve")
        );
    }

    private Map<String, Object> forensicAccountant() {
        return guide(
            "Your morning begins reviewing thousands of financial transactions flagged by your detection software. You identify a suspicious pattern — an executive approving their own expense reimbursements. Afternoon involves interviewing witnesses and documenting findings for the legal team. You testify as an expert witness in court next week.",
            roadmap(
                step(1, "Get Accounting Foundations", "Complete a degree in accounting or finance. Master financial statements, bookkeeping, and auditing fundamentals.", "3-4 years"),
                step(2, "Get CPA or CA Certified", "Pass the CPA (US) or CA (India/UK) exam. This is the foundation all forensic accounting is built on.", "1-3 years"),
                step(3, "Study Fraud & Investigation", "Learn fraud schemes, money laundering, asset tracing, and interview techniques. Study ACFE resources.", "6-12 months"),
                step(4, "Get CFE Certified", "Earn the Certified Fraud Examiner (CFE) credential — the gold standard for forensic accountants globally.", "6 months prep"),
                step(5, "Join a Firm or Law Enforcement", "Start at Big 4 forensics divisions (Deloitte, PwC, KPMG, EY) or apply to financial crimes divisions of government agencies.", "After certification")
            ),
            resources(
                res("ACFE (Association of Certified Fraud Examiners)", "Professional Body", "https://acfe.com"),
                res("CFE Exam Prep", "Certification", "https://acfe.com/cfe-credential"),
                res("Forensic CPA Society", "Community", "https://forensiccpa.com")
            ),
            salary("$65,000 - $85,000", "$85,000 - $130,000", "$130,000 - $250,000+"),
            companies("Deloitte Forensics", "PwC Forensics", "FBI Financial Crimes", "KPMG Forensics", "SEC Enforcement"),
            pros("Combines accounting with detective work — never boring", "Expert witness fees can be extremely lucrative", "Always in demand — fraud never stops"),
            cons("Requires dual expertise in law and accounting", "Court appearances can be stressful", "Cases can drag on for years")
        );
    }

    private Map<String, Object> scienceCommunicator() {
        return guide(
            "You start your morning reading three newly published research papers, flagging the most significant finding for your next video. Afternoon is spent scripting and filming an explainer on CRISPR gene editing — making it accessible without dumbing it down. Evening you respond to audience questions and pitch a documentary concept to a streaming platform.",
            roadmap(
                step(1, "Build Science Expertise", "Study a scientific field deeply — biology, physics, chemistry, neuroscience, or climate. You cannot communicate what you don't understand.", "2-4 years"),
                step(2, "Develop Writing & Storytelling", "Practice writing clear, compelling explanations for non-experts. Study science journalism. Read Carl Sagan, Richard Feynman.", "6-12 months"),
                step(3, "Start Creating Content", "Launch a YouTube channel, blog, or podcast. Cover one topic per week. Prioritize clarity over comprehensiveness.", "Immediately"),
                step(4, "Build Your Audience", "Engage with science communities on Twitter/X and Reddit. Collaborate with researchers. Get quoted in media.", "1-3 years"),
                step(5, "Monetize & Scale", "Pitch to science magazines, documentaries, TV, or online courses. Apply for science communication fellowships and grants.", "2-4 years")
            ),
            resources(
                res("AAAS Mass Media Fellowship", "Fellowship", "https://aaas.org/programs/mass-media-fellowship"),
                res("Minute Physics YouTube", "Inspiration", "https://youtube.com"),
                res("Coursera Science Communication", "Course", "https://coursera.org")
            ),
            salary("$40,000 - $60,000", "$60,000 - $90,000", "$90,000 - $200,000+"),
            companies("National Geographic", "BBC Science", "NASA Outreach", "Kurzgesagt", "Self-employed"),
            pros("Bridge the gap between research and public understanding", "Massive impact on science literacy globally", "Creative freedom to explore any scientific topic"),
            cons("Building an audience takes years of consistent effort", "Income is unpredictable as independent creator", "Oversimplification criticism from academic community")
        );
    }

    private Map<String, Object> urbanFarmer() {
        return guide(
            "You start at 6am checking nutrient levels in the hydroponic systems. Morning involves harvesting microgreens for restaurant delivery and replanting trays. Afternoon is a meeting with a hotel chef about a year-round supply contract. You end the day testing a new LED lighting configuration to improve yield per square meter.",
            roadmap(
                step(1, "Learn Horticulture Basics", "Study plant biology, soil science, nutrient cycles, and pest management. Take a permaculture design course.", "0-3 months"),
                step(2, "Master Controlled Environment Agriculture", "Learn hydroponics, aeroponics, and aquaponics. Build a small system at home and grow your first crops.", "3-8 months"),
                step(3, "Understand the Business", "Study farm economics, supply chain, food safety regulations, and direct-to-consumer sales models.", "6-10 months"),
                step(4, "Find Your Niche Crop", "Specialize in high-value crops — microgreens, herbs, mushrooms, or exotic vegetables. These have the best margins.", "8-14 months"),
                step(5, "Launch & Find Customers", "Start selling at farmers markets, to restaurants, or direct through Instagram. Scale only after proving product-market fit.", "14-24 months")
            ),
            resources(
                res("Bright Agrotech YouTube", "Free Content", "https://youtube.com"),
                res("Cornell Small Farms Program", "Free Resources", "https://smallfarms.cornell.edu"),
                res("Plenty (vertical farming company)", "Industry Leader", "https://plenty.ag")
            ),
            salary("$35,000 - $55,000", "$55,000 - $90,000", "$90,000 - $300,000+ (own farm)"),
            companies("AeroFarms", "Plenty", "AppHarvest", "Local Restaurants", "Self-employed"),
            pros("Solving one of humanity's most critical problems — food security", "Growing demand as cities expand", "Combine technology with nature"),
            cons("High upfront capital for equipment", "Crop failures can be devastating financially", "Physical work in difficult conditions")
        );
    }

    private Map<String, Object> esportsCoach() {
        return guide(
            "You start your day reviewing VOD recordings of yesterday's scrimmage, noting positioning errors and decision-making patterns. Morning is a 2-hour team strategy session, breaking down opponent tendencies. Afternoon is individual coaching sessions with players on mental resilience and mechanical skill. Evening is a live tournament match where you call strategies in real time.",
            roadmap(
                step(1, "Reach Elite Level in Your Game", "You must be in the top 1-5% of players in your chosen game. Rank up relentlessly — credibility requires demonstrated mastery.", "1-3 years"),
                step(2, "Study Coaching & Sports Psychology", "Learn sports psychology, leadership, communication, and performance coaching. These skills separate great coaches from good ones.", "6-12 months"),
                step(3, "Start Coaching Informally", "Coach friends, local teams, or offer free coaching sessions online. Build a track record of measurable player improvement.", "6-18 months"),
                step(4, "Build Your Reputation", "Stream your coaching sessions, create educational content on YouTube or TikTok, get testimonials from players you've improved.", "1-2 years"),
                step(5, "Break Into Professional Esports", "Apply to collegiate esports programs, semi-pro teams, or partner with esports organizations. Network at LAN events.", "2-4 years")
            ),
            resources(
                res("Coaching Platform — Metafy", "Platform", "https://metafy.gg"),
                res("Gamer Sensei", "Coaching Marketplace", "https://gamersensei.com"),
                res("NACE (Collegiate Esports)", "Association", "https://nacesports.org")
            ),
            salary("$30,000 - $55,000", "$55,000 - $100,000", "$100,000 - $500,000+"),
            companies("Team Liquid", "Cloud9", "FaZe Clan", "G2 Esports", "Collegiate Programs"),
            pros("Turn your gaming passion into a legitimate career", "Booming industry with massive prize pools", "Help players achieve their dreams"),
            cons("Extremely competitive — few professional coaching spots exist", "Game titles can lose popularity overnight", "Irregular hours around tournament schedules")
        );
    }

    private Map<String, Object> conversationalAI() {
        return guide(
            "You start the day reviewing conversation logs from your chatbot deployment — users are confused at a specific dialogue branch. You rewrite the conversational flow, then A/B test two versions of a bot persona with focus groups. Afternoon is a cross-functional meeting with engineers and product managers to define the AI assistant's personality guidelines.",
            roadmap(
                step(1, "Study Linguistics & UX Writing", "Learn linguistics fundamentals, conversational patterns, and UX writing. Read 'Conversational Design' by Erika Hall.", "0-3 months"),
                step(2, "Learn Chatbot Platforms", "Get hands-on with Dialogflow, Rasa, Microsoft Bot Framework, and Voiceflow. Build complete conversation flows.", "3-6 months"),
                step(3, "Study NLP Fundamentals", "Learn how intent recognition, entity extraction, and dialogue management work — you don't need to code them, but you need to understand them.", "4-7 months"),
                step(4, "Develop AI Persona Design Skills", "Learn how to define AI personality, tone of voice, and error handling. Study successful AI assistants — Alexa, Siri, Google Assistant.", "6-10 months"),
                step(5, "Build Portfolio Projects", "Design complete conversational experiences — customer service bot, mental health companion, educational assistant. Document your design decisions.", "10-15 months")
            ),
            resources(
                res("Voiceflow", "Design Platform", "https://voiceflow.com"),
                res("Botmock", "Tool", "https://botmock.com"),
                res("Conversational Design Institute", "Training", "https://conversationdesigninstitute.com")
            ),
            salary("$70,000 - $95,000", "$95,000 - $130,000", "$130,000 - $200,000"),
            companies("Amazon Alexa Team", "Google Assistant", "Microsoft Cortana", "Nuance", "Ada Support"),
            pros("Unique intersection of psychology, writing, and AI", "Extremely rare skill set — low competition", "Shape how millions of people interact with AI"),
            cons("Role is still being defined — job titles vary wildly", "Requires understanding both human psychology and AI limitations", "Rapidly changing as AI models evolve")
        );
    }

    private Map<String, Object> biohacker() {
        return guide(
            "You wake up, check your Oura Ring sleep score, and take your morning supplement stack. After reviewing your blood glucose readings from your continuous glucose monitor, you write a detailed blog post about your 30-day experiment with cold exposure. Afternoon is a podcast interview about longevity. Evening you analyze your latest lab results and adjust your protocol.",
            roadmap(
                step(1, "Build Scientific Foundations", "Study biology, biochemistry, nutrition science, and neuroscience. You need to distinguish evidence-based practices from pseudoscience.", "0-6 months"),
                step(2, "Self-Experiment Systematically", "Start with the basics — sleep optimization, nutrition, exercise. Track everything. Change one variable at a time.", "0-12 months"),
                step(3, "Build an Audience", "Document your experiments publicly — blog, YouTube, or podcast. The biohacking community rewards authenticity and data.", "6-18 months"),
                step(4, "Build Credibility", "Collaborate with scientists and doctors. Get blood work and biomarkers tested regularly. Cite peer-reviewed research.", "12-24 months"),
                step(5, "Monetize Your Platform", "Launch a newsletter, online course, or supplement line. Speak at biohacking conferences. Consult for wellness companies.", "24-36 months")
            ),
            resources(
                res("Examine.com", "Research Database", "https://examine.com"),
                res("Quantified Self Community", "Community", "https://quantifiedself.com"),
                res("Huberman Lab Podcast", "Free Content", "https://hubermanlab.com")
            ),
            salary("$40,000 - $70,000", "$70,000 - $120,000", "$120,000 - $1,000,000+ (own brand)"),
            companies("Bulletproof", "HVMN", "InsideTracker", "Levels Health", "Self-employed"),
            pros("Complete autonomy over your work and experiments", "Growing wellness industry with massive consumer interest", "Push the frontier of human performance"),
            cons("High risk of spreading misinformation without scientific rigor", "Personal health experiments carry real physical risks", "Monetization takes years to build")
        );
    }

    private Map<String, Object> musicSupervisor() {
        return guide(
            "Your morning starts reviewing the rough cut of a Netflix drama episode — the director wants something melancholic for a breakup scene. You spend hours searching your music library and licensing database for the perfect track. Afternoon involves negotiating sync license fees with a music publisher. You end the day on a call with the film's music editor aligning on the final soundtrack.",
            roadmap(
                step(1, "Build Deep Music Knowledge", "Develop broad knowledge across genres — you must know what sounds right for any emotional scene. Listen obsessively.", "Ongoing"),
                step(2, "Study Music Law & Licensing", "Learn copyright law, sync licensing, master rights vs. publishing rights, and royalty structures. This is the technical backbone.", "3-6 months"),
                step(3, "Break Into Film & TV Production", "Work as a production assistant, music clearance coordinator, or intern at a post-production house to get access.", "1-2 years"),
                step(4, "Build Relationships", "Connect with music publishers, record labels, artists, and music libraries. Relationships determine what tracks you can access.", "Ongoing"),
                step(5, "Build Your Reel", "Compile examples of your music placements — even student films count. Create a reel that demonstrates your taste and instincts.", "2-4 years")
            ),
            resources(
                res("Guild of Music Supervisors", "Professional Body", "https://guildofmusicsupervisors.com"),
                res("Music Business Worldwide", "Industry News", "https://musicbusinessworldwide.com"),
                res("Berklee Online Music Licensing", "Course", "https://online.berklee.edu")
            ),
            salary("$50,000 - $75,000", "$75,000 - $120,000", "$120,000 - $300,000+"),
            companies("Netflix", "HBO", "Disney", "Sony Pictures", "Musicbed"),
            pros("Combine deep music passion with visual storytelling", "Each project is unique and creatively stimulating", "Top supervisors work on iconic films and series"),
            cons("Breaking in requires years of unpaid or low-paid work", "High pressure deadlines in post-production", "Highly competitive — few positions at the top")
        );
    }

    private Map<String, Object> uxResearcher() {
        return guide(
            "You start by preparing discussion guides for today's user interviews — you're researching how people manage their finances on mobile. Morning involves three 45-minute Zoom interviews with participants. Afternoon is spent affinity mapping findings in FigJam with the design team. You present a synthesis of insights to the product team at 4pm.",
            roadmap(
                step(1, "Study Research Methods", "Learn qualitative and quantitative research — user interviews, surveys, usability tests, card sorting, and A/B testing.", "0-3 months"),
                step(2, "Build Psychology Foundation", "Study cognitive psychology, behavioral economics, and human-computer interaction. Read 'Don't Make Me Think' by Steve Krug.", "2-4 months"),
                step(3, "Practice Research on Real Products", "Run unsolicited usability tests on apps you use. Document findings professionally. Build a research portfolio.", "4-9 months"),
                step(4, "Master Research Tools", "Learn UserTesting, Maze, Hotjar, Dovetail, Optimal Workshop, and survey platforms. These are industry standard.", "6-10 months"),
                step(5, "Get Your First Research Role", "Apply to UX Researcher or Research Assistant roles. Many companies hire from design or psychology backgrounds.", "10-15 months")
            ),
            resources(
                res("Nielsen Norman Group UX Research", "Articles & Courses", "https://nngroup.com"),
                res("User Interviews Platform", "Tool", "https://userinterviews.com"),
                res("Dovetail", "Research Repository", "https://dovetailapp.com")
            ),
            salary("$70,000 - $95,000", "$95,000 - $135,000", "$135,000 - $200,000"),
            companies("Google", "Apple", "Microsoft", "Airbnb", "Meta"),
            pros("Deep impact on product decisions based on real human insight", "High demand as companies become more user-centric", "Fascinating intersection of psychology and technology"),
            cons("Research findings are often deprioritized by business needs", "Requires patience — insights take time to gather properly", "Proving ROI of research can be challenging")
        );
    }

    private Map<String, Object> ethicalHacker() {
        return guide(
            "You receive your Rules of Engagement document — you have two weeks to penetrate a financial company's infrastructure legally. Morning is reconnaissance — OSINT, subdomain enumeration, port scanning. Afternoon you find an unpatched Apache server and exploit it. Evening you document the full attack chain for your final report.",
            roadmap(
                step(1, "Networking & Linux Mastery", "Master TCP/IP, subnetting, routing, and Linux command line. Without these, everything else falls apart.", "0-3 months"),
                step(2, "Web Application Security", "Complete PortSwigger Web Security Academy — free and the best resource for web hacking. Master OWASP Top 10.", "3-6 months"),
                step(3, "Practice on Legal Platforms", "Complete TryHackMe learning paths then HackTheBox machines. Document your methodology for every box you solve.", "6-12 months"),
                step(4, "Get Certified", "Start with eJPT or CEH, then pursue OSCP — the most respected hands-on penetration testing certification globally.", "12-18 months"),
                step(5, "Bug Bounty & Freelance", "Join HackerOne and Bugcrowd. Report real vulnerabilities. Even small bounties build your reputation and portfolio.", "Ongoing")
            ),
            resources(
                res("PortSwigger Web Security Academy", "Free Training", "https://portswigger.net/web-security"),
                res("TryHackMe", "Platform", "https://tryhackme.com"),
                res("HackerOne Bug Bounty", "Platform", "https://hackerone.com")
            ),
            salary("$75,000 - $100,000", "$100,000 - $150,000", "$150,000 - $300,000+"),
            companies("HackerOne", "Rapid7", "NCC Group", "Offensive Security", "Bug Bounty Programs"),
            pros("Legally break into systems — endlessly fascinating work", "Bug bounties can earn thousands per vulnerability", "Critical shortage of skilled pentesters worldwide"),
            cons("Legal boundaries are strict — one mistake has serious consequences", "OSCP is one of the hardest certifications to earn", "Requires constant learning as attack surfaces change")
        );
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

    private Map<String, Object> buildDefaultGuide(HiddenCareer career) {
        String[] skills = career.getRequiredSkills() != null
            ? career.getRequiredSkills().split(",") : new String[]{"core skills"};
        return guide(
            "A typical day involves working at the unique intersection of skills that makes " + career.getTitle() + " so rare and valuable. You solve problems that most people don't even know exist.",
            roadmap(
                step(1, "Discover the Field", "Research this career deeply — find practitioners on LinkedIn, read their blogs, watch their talks. Understand what the day-to-day actually looks like.", "0-2 months"),
                step(2, "Build Foundation Skills", "Learn " + (skills.length > 0 ? skills[0].trim() : "core fundamentals") + " through structured courses and books.", "2-6 months"),
                step(3, "Practice & Experiment", "Apply your skills on real projects. Volunteer, freelance, or build personal projects in this space.", "6-12 months"),
                step(4, "Connect With Practitioners", "Find communities, attend niche events, and connect directly with people already doing this work. Cold outreach works.", "Ongoing"),
                step(5, "Create Your Own Opportunity", "This career rarely has a traditional job listing — you may need to create the role. Build a portfolio that makes your value undeniable.", "12-24 months")
            ),
            resources(
                res("LinkedIn Learning", "Platform", "https://linkedin.com/learning"),
                res("Coursera", "Platform", "https://coursera.org"),
                res("YouTube", "Free Resource", "https://youtube.com")
            ),
            salary("$45,000 - $65,000", "$65,000 - $95,000", "$95,000 - $150,000+"),
            companies("Innovative Startups", "Research Organizations", "Media Companies", "Tech Giants", "Self-employed"),
            pros("Rare skill set means less competition for opportunities", "Pioneering a path others will follow", "Deeply fulfilling — you are doing what most people never discover"),
            cons("No clear roadmap — you must figure it out yourself", "Explaining what you do to others is always complicated", "May take longer to find your first paid opportunity")
        );
    }
}
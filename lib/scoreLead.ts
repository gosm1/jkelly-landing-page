import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

interface LeadData {
    name: string;
    email: string;
    niche?: string;
    message?: string;
    goals?: string[];
    audience?: string;
    existingSite?: string;
    investmentAmount?: number;
    references?: string;
    brandTone?: string;
    contactMethod?: string;
}

interface ScoreResult {
    score: number;
    status: "Hot" | "Warm" | "Cold";
    analysis: string;
}

// Initialize Gemini client only if key exists
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;

export async function scoreLead(leadData: LeadData): Promise<ScoreResult> {
    if (!genAI) {
        console.warn("GEMINI_API_KEY missing — using rule-based scoring.");
        return fallbackScoring(leadData);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a ruthlessly accurate lead qualification AI for a premium web design agency charging $3,000-$25,000+ per project.

Your job is to score leads STRICTLY. Do NOT be generous. Most leads are Cold or Warm. Only truly committed, high-budget leads with detailed requirements deserve Hot status.

**Lead Submission Data:**
- Name: ${leadData.name}
- Email: ${leadData.email}
- Niche/Industry: ${leadData.niche || "NOT PROVIDED"}
- Project Description: ${leadData.message || "NOT PROVIDED"}
- Website Goals: ${leadData.goals?.join(", ") || "NOT PROVIDED"}
- Target Audience: ${leadData.audience || "NOT PROVIDED"}
- Existing Website: ${leadData.existingSite || "NOT PROVIDED"}
- Investment Budget: ${leadData.investmentAmount ? "$" + leadData.investmentAmount.toLocaleString() : "NOT PROVIDED"}
- Reference Websites: ${leadData.references || "NOT PROVIDED"}
- Brand Tone: ${leadData.brandTone || "NOT PROVIDED"}
- Preferred Contact: ${leadData.contactMethod || "NOT PROVIDED"}

**STRICT Scoring Rules:**

SCORE 5 (Hot - Ideal Client):
- Budget $5,000+ explicitly stated
- Detailed project description (100+ words)
- Provided reference websites AND brand tone
- Clear goals and target audience defined
- Business email domain (not gmail/yahoo/hotmail)
- ALL of the above must be true

SCORE 4 (Hot - Strong Prospect):
- Budget $3,000+ stated
- Good project detail (50+ words)
- At least 2 of: references, brand tone, existing site, audience
- Shows urgency or specificity in their message

SCORE 3 (Warm - Interested):
- Budget $1,000-$2,999 OR no budget but detailed message (50+ words)
- Some goals defined
- Shows genuine interest but missing key details

SCORE 2 (Cold - Browsing):
- Budget under $1,000 OR not stated
- Vague or short project description (under 50 words)
- Missing most optional fields
- Generic email (gmail, yahoo, hotmail)

SCORE 1 (Cold - Spam/Unqualified):
- Extremely minimal info (just name + email)
- No budget, no description, no goals
- Looks like a test submission or spam

**CRITICAL: Count "NOT PROVIDED" fields. If 5+ fields say "NOT PROVIDED", the lead CANNOT score above 3. If 7+ fields say "NOT PROVIDED", the lead CANNOT score above 2.**

Respond with ONLY this JSON (no markdown, no code fences):
{"score": <1-5>, "status": "<Hot|Warm|Cold>", "analysis": "<2-3 sentences explaining your reasoning, mention specific strengths and weaknesses>"}`;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        const cleaned = text.replace(/```json\n?|\n?```/g, "").trim();
        const parsed = JSON.parse(cleaned);

        const score = Math.min(5, Math.max(1, parseInt(parsed.score)));
        let status: "Hot" | "Warm" | "Cold";

        if (score >= 4) status = "Hot";
        else if (score === 3) status = "Warm";
        else status = "Cold";

        return {
            score,
            status,
            analysis: parsed.analysis || "AI analysis completed.",
        };
    } catch {
        console.warn("AI scoring unavailable. Using rule-based fallback.");
        return fallbackScoring(leadData);
    }
}

/* ──────────────────────────────────────────────────────────
   Multi-Factor Point-Based Fallback Scoring
   ────────────────────────────────────────────────────────── */
function fallbackScoring(lead: LeadData): ScoreResult {
    let points = 0;
    const strengths: string[] = [];
    const weaknesses: string[] = [];

    // ── 1. Budget (0 to 3 points) ──
    const budget = lead.investmentAmount || 0;
    if (budget >= 5000) {
        points += 3;
        strengths.push("high budget ($" + budget.toLocaleString() + ")");
    } else if (budget >= 3000) {
        points += 2;
        strengths.push("solid budget ($" + budget.toLocaleString() + ")");
    } else if (budget >= 1000) {
        points += 1;
        strengths.push("moderate budget");
    } else if (budget > 0) {
        points += 0.25;
        weaknesses.push("low budget ($" + budget.toLocaleString() + ")");
    } else {
        weaknesses.push("no budget specified");
    }

    // ── 2. Message Detail (0 to 2 points) ──
    const msgLen = lead.message?.length || 0;
    if (msgLen > 200) {
        points += 2;
        strengths.push("very detailed project description");
    } else if (msgLen > 100) {
        points += 1.5;
        strengths.push("good project description");
    } else if (msgLen > 50) {
        points += 0.75;
    } else if (msgLen > 0) {
        points += 0.25;
        weaknesses.push("vague project description");
    } else {
        weaknesses.push("no project description");
    }

    // ── 3. Goals (0 to 1 point) ──
    const goalCount = lead.goals?.length || 0;
    if (goalCount >= 3) {
        points += 1;
        strengths.push("clear goals defined");
    } else if (goalCount >= 2) {
        points += 0.5;
    } else if (goalCount === 1) {
        points += 0.25;
    } else {
        weaknesses.push("no goals specified");
    }

    // ── 4. References (0 to 1 point) ──
    if (lead.references && lead.references.trim().length > 5) {
        points += 1;
        strengths.push("provided reference websites");
    }

    // ── 5. Brand Tone (0 to 0.5 points) ──
    if (lead.brandTone && lead.brandTone.trim().length > 3) {
        points += 0.5;
    }

    // ── 6. Target Audience (0 to 0.5 points) ──
    if (lead.audience && lead.audience.trim().length > 10) {
        points += 0.5;
        strengths.push("defined target audience");
    } else if (!lead.audience) {
        weaknesses.push("no target audience defined");
    }

    // ── 7. Existing Site (0 to 0.5 points) ──
    if (lead.existingSite && lead.existingSite.trim().length > 5) {
        points += 0.5;
    }

    // ── 8. Email Quality (0 to 0.5 points) ──
    const emailDomain = lead.email.split("@")[1]?.toLowerCase() || "";
    const genericDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "mail.com", "icloud.com"];
    if (!genericDomains.includes(emailDomain)) {
        points += 0.5;
        strengths.push("business email");
    } else {
        weaknesses.push("generic email provider");
    }

    // ── 9. Contact Method (0 to 0.25 points) ──
    if (lead.contactMethod) {
        points += 0.25;
    }

    // ── Map Points → Score ──
    // Max possible: ~10 points
    let score: number;
    let status: "Hot" | "Warm" | "Cold";

    if (points >= 7) {
        score = 5;
        status = "Hot";
    } else if (points >= 5) {
        score = 4;
        status = "Hot";
    } else if (points >= 3.5) {
        score = 3;
        status = "Warm";
    } else if (points >= 2) {
        score = 2;
        status = "Cold";
    } else {
        score = 1;
        status = "Cold";
    }

    // ── Build Analysis ──
    const strengthText = strengths.length > 0
        ? "Strengths: " + strengths.join(", ") + "."
        : "";
    const weaknessText = weaknesses.length > 0
        ? "Weaknesses: " + weaknesses.join(", ") + "."
        : "";

    let verdict: string;
    if (score >= 4) {
        verdict = "High-value prospect showing strong buying signals.";
    } else if (score === 3) {
        verdict = "Shows interest but needs nurturing before conversion.";
    } else if (score === 2) {
        verdict = "Early-stage prospect with limited commitment indicators.";
    } else {
        verdict = "Minimal information provided — likely browsing or testing.";
    }

    const analysis = [verdict, strengthText, weaknessText].filter(Boolean).join(" ");

    return { score, status, analysis };
}

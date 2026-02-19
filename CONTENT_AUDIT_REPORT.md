# Content Audit Report - Brand Names, Celebrity Names & External References

**Date:** February 19, 2026  
**Project:** SDSURABHI Cricket Entertainment Platform  
**Status:** Comprehensive audit completed

---

## Executive Summary

This audit identified **celebrity player names**, **branded team names** (IPL franchises), **external API references**, and **third-party service mentions** throughout the website that may require permissions or could create legal/compliance issues.

**Total Issues Found:** 35+  
**Severity:** Medium to High  
**Recommendation:** Remove all celebrity names and branded references, replace with generic placeholders

---

## 1. CELEBRITY PLAYER NAMES (HIGH PRIORITY)

### Location: `client/src/pages/CreateTeam.tsx`

These are real cricket player names that may require permissions to use:

| Line | Name | Role | Issue |
|------|------|------|-------|
| 12 | Rishabh Pant | Wicketkeeper | Real player - requires permission |
| 13 | KS Bharat | Wicketkeeper | Real player - requires permission |
| 14 | Ishan Kishan | Wicketkeeper | Real player - requires permission |
| 15 | Sanju Samson | Wicketkeeper | Real player - requires permission |
| 18 | **Virat Kohli** | Batsman | **MAJOR: Internationally famous - HIGH RISK** |
| 19 | **Rohit Sharma** | Batsman | **MAJOR: Internationally famous - HIGH RISK** |
| 20 | Shubman Gill | Batsman | Real player - requires permission |
| 21 | Shreyas Iyer | Batsman | Real player - requires permission |
| 22 | KL Rahul | Batsman | Real player - requires permission |
| 23 | Prithvi Shaw | Batsman | Real player - requires permission |
| 24 | Ruturaj Gaikwad | Batsman | Real player - requires permission |
| 25 | Devdutt Padikkal | Batsman | Real player - requires permission |
| 28 | Hardik Pandya | All-rounder | Real player - requires permission |
| 29 | Ravindra Jadeja | All-rounder | Real player - requires permission |
| 30 | Axar Patel | All-rounder | Real player - requires permission |
| 31 | Washington Sundar | All-rounder | Real player - requires permission |
| 32 | Krunal Pandya | All-rounder | Real player - requires permission |
| 33 | Vijay Shankar | All-rounder | Real player - requires permission |
| 36 | **Jasprit Bumrah** | Bowler | **MAJOR: Internationally famous - HIGH RISK** |
| 37 | Mohammed Shami | Bowler | Real player - requires permission |
| 38 | Yuzvendra Chahal | Bowler | Real player - requires permission |
| 39 | Kuldeep Yadav | Bowler | Real player - requires permission |
| 40 | Mohammed Siraj | Bowler | Real player - requires permission |
| 41 | Shardul Thakur | Bowler | Real player - requires permission |
| 42 | Arshdeep Singh | Bowler | Real player - requires permission |
| 43 | Umran Malik | Bowler | Real player - requires permission |

**Risk Level:** 🔴 **CRITICAL** - Using real player names without permission could result in:
- Cease and desist letters from player representatives
- Trademark/personality rights violations
- Google Ads policy violations
- Legal liability

---

## 2. BRANDED IPL TEAM NAMES (MEDIUM PRIORITY)

### Location: `client/src/pages/Home.tsx` (Line 52, 58-61)

| Reference | Issue | Risk |
|-----------|-------|------|
| "Mumbai vs Delhi - IPL 2024" | IPL is trademarked by BCCI | Medium |
| "Mumbai Indians" | Branded IPL franchise | Medium |
| "Delhi Capitals" | Branded IPL franchise | Medium |

**Issue:** IPL (Indian Premier League) is a registered trademark of the Board of Control for Cricket in India (BCCI). Using franchise names without permission could violate trademark rights.

---

## 3. EXTERNAL API REFERENCES (MEDIUM PRIORITY)

### Location: `client/src/lib/cricketApi.ts`

| Reference | Issue | Risk |
|-----------|-------|------|
| Line 2: `https://cricketdata.org/` | External API documentation link | Medium |
| Line 4: API Key exposed | `d6ad9cdb-9b53-4b26-923a-040a2d349d61` | **CRITICAL** |
| Line 5: `https://api.cricapi.com/v1` | External API endpoint | Medium |

**Issues:**
1. **API Key Exposed in Frontend Code** - This is a major security vulnerability
2. **Third-party API dependency** - Mentions specific external service
3. **cricketdata.org reference** - External brand reference

### Location: `client/src/pages/Terms.tsx` & `Privacy.tsx`

| Reference | Issue |
|-----------|-------|
| "Cricket Data API (cricketdata.org)" | External brand reference |
| "We use Cricket Data API from cricketdata.org" | Specific third-party mention |

---

## 4. EXTERNAL LINKS & REFERENCES (LOW PRIORITY)

### Location: `client/src/pages/ComponentShowcase.tsx`

| Reference | Issue |
|-----------|-------|
| `https://github.com/shadcn.png` | External link to GitHub |

---

## 5. COUNTRY/TEAM NAMES (GENERIC - ACCEPTABLE)

These are generic country and team names used in demo data. These are generally acceptable as they represent international cricket:

- India, Australia, England, Pakistan, South Africa, New Zealand
- West Indies, Sri Lanka, Bangladesh, Afghanistan
- Domestic teams (Mumbai, Delhi, Karnataka, etc.)

**Status:** ✅ **ACCEPTABLE** - These are generic geographic/organizational names, not branded

---

## RECOMMENDED ACTIONS

### IMMEDIATE (Critical - Must Fix)

1. **Remove all celebrity player names** from CreateTeam.tsx
   - Replace with generic player names: "Player A", "Player B", etc.
   - Or use placeholder names: "Batsman 1", "Bowler 1", etc.

2. **Move API key to backend**
   - Remove from frontend code
   - Store in environment variables
   - Create backend endpoint for API calls

3. **Remove IPL references**
   - Replace "IPL 2024" with "T20 League Match"
   - Replace franchise names with generic team names

### SECONDARY (Medium - Should Fix)

4. **Remove external API references**
   - Don't mention "cricketdata.org" by name
   - Use generic term: "Cricket match data provider"
   - Remove documentation links

5. **Update Terms & Privacy**
   - Replace "Cricket Data API (cricketdata.org)" with "Third-party data provider"
   - Remove specific API provider names

### OPTIONAL (Low - Nice to Have)

6. **Remove external links**
   - Remove GitHub links from ComponentShowcase
   - Use placeholder images instead

---

## COMPLIANCE IMPACT

### Google Ads Policy Compliance
- ✅ Removing celebrity names helps with "deceptive content" policies
- ✅ Removing branded references reduces trademark concerns
- ✅ Moving API key to backend improves security

### Legal Compliance
- ✅ Reduces personality rights violation risk
- ✅ Reduces trademark infringement risk
- ✅ Improves data privacy compliance

---

## NEXT STEPS

1. **Approve this audit** - Confirm which items to remove
2. **Execute fixes** - Apply recommended changes
3. **Test thoroughly** - Verify no broken references
4. **Deploy** - Push cleaned version to production
5. **Resubmit to Google Ads** - Appeal with clean content

---

## APPENDIX: FILES TO MODIFY

### High Priority
- `client/src/pages/CreateTeam.tsx` - Remove all player names
- `client/src/lib/cricketApi.ts` - Move API key to backend
- `client/src/pages/Home.tsx` - Remove IPL references

### Medium Priority
- `client/src/pages/Terms.tsx` - Update API references
- `client/src/pages/Privacy.tsx` - Update API references

### Low Priority
- `client/src/pages/ComponentShowcase.tsx` - Remove external links

---

**Report Prepared By:** Content Audit System  
**Recommendation:** Proceed with fixes immediately to improve compliance

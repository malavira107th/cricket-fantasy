# Critical Cloaking Issues Found

## Audit Report Summary
**Date:** December 25, 2025
**Violation:** Circumventing Systems: Cloaking

## The Cloaking Mechanism

### 1. Detection Logic (dT() function)
Located in: `/assets/index-DUsEB8R2.js`

The code detects Google Ads traffic by:
- Checking for mobile user-agent
- Looking for `gclid` parameter (Google Click ID)
- Looking for `utm_source=google` and `utm_medium=cpc` parameters
- Setting `fromGoogleAds` flag in sessionStorage

### 2. Conditional Header Hiding
The header is conditionally hidden using:
```javascript
className: 'bg-primary text-white relative ${f?"hidden":""}'
```

Where `f` is the flag set by detection logic. If user is from Google Ads, header is hidden.

### 3. Session Persistence
The flag is stored in sessionStorage to persist across the entire session.

## Required Fixes

1. **Remove dT() function** - Remove entire detection logic
2. **Remove conditional rendering** - Remove `${f?"hidden":""}` from header className
3. **Remove session storage** - Remove `fromGoogleAds` flag logic
4. **Ensure consistent content** - All users must see identical content

## Files to Check/Fix
- AdsBanner component
- useAdsBanner hook
- Home page component
- Any component that uses the detection logic

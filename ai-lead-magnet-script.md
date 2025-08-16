# AI Script: Interactive Cash Offer Quiz Lead Magnet

## Project Overview
Create an interactive quiz lead magnet for a real estate cash offer business called "Flash Cash Offers". The quiz calculates estimated home cash offers to capture leads and drive calendar bookings.

## Design Requirements

### Color Scheme
- Primary color: #F6BC3E (golden yellow)
- Background: Dark smokey theme with gradients from slate-950 to gray-950 to black
- Text: White and light gray for contrast
- Accent: Golden gradients for CTAs and highlights

### Typography
- Headings: Space Grotesk font family
- Body text: DM Sans font family
- Use font-sans and font-serif classes in Tailwind

### Layout & Styling
- Enterprise-grade, modern fintech aesthetic
- Dark mode with professional polish
- Smooth animations and transitions
- Mobile-responsive design
- Generous whitespace and clean typography hierarchy

## Logo Integration
- Use Flash Cash Offers logo: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/flashcash-hmxAt4GUT4oxplE8A2KbWzkfe8aaXc.png
- Position prominently on welcome screen
- Size: w-24 h-24 with proper spacing

## Quiz Flow & Functionality

### Screen Progression
1. Welcome Screen - Brand introduction with logo
2. Question 1: Home value range (dropdown)
3. Question 2: Equity amount (slider input)
4. Question 3: Repair needs (multiple choice buttons)
5. Question 4: Timeline urgency (button selection)
6. Lead Capture Form (required before results)
7. Results Screen with calculated offer

### Questions Specification
**Q1: "What's your home's rough value?"**
- Dropdown options: Under $100K, $100K-$300K, $300K-$500K, $500K-$750K, $750K-$1M, $1M-$1.5M, Over $1.5M

**Q2: "How much equity do you have in your home?"**
- Slider input: $0 to $500K+ range
- Display current value dynamically

**Q3: "Any major repairs needed?"**
- Button options: "None - Move-in ready", "Minor cosmetic work", "Major structural repairs"

**Q4: "How fast do you need to sell?"**
- Button options: "ASAP (within 30 days)", "1-3 months", "Just exploring options"

### Lead Capture Form
**Required fields:**
- Full name
- Email address
- Phone number (with validation)

**Optional fields:**
- Property address
- Current loan balance

**Validation:**
- Email format validation
- Phone: 10-digit US format
- Required field indicators
- Error messaging

### Offer Calculation Algorithm
Base calculation: 87% of home value (range 85-90%)

**Adjustments:**
- Repair condition: None (+2%), Minor (0%), Major (-3%)
- Timeline: ASAP (+1%), 1-3 months (0%), Exploring (-1%)
- Equity level: High equity (+1% if >50% of value)

**Display format:**
- Animated number counting effect
- "Your estimated cash offer: $XXX,XXX"
- "Save $30K-$60K vs traditional sale!"

## Animations & Interactions

### Welcome Screen
- Fade-in animations for all elements
- Gradient background with subtle movement
- Hover effects on CTA button

### Question Screens
- Smooth transitions between questions
- Progress bar animation
- Button hover effects with scale transforms
- Slide-in animations for new questions

### Results Screen
- Lightning strike animation when offer appears
- Single large lightning bolt in center
- Flash effect covering screen (0.3s duration)
- Confetti-style celebration
- Animated number counting for offer amount

### General Interactions
- Smooth page transitions (500ms duration)
- Button hover effects with golden gradients
- Loading states with spinners
- Form validation with real-time feedback

## Technical Implementation

### React Context Structure
\`\`\`typescript
interface QuizData {
  homeValue: string;
  equity: number;
  repairs: string;
  timeline: string;
  leadInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string;
    loanBalance?: string;
  };
}
\`\`\`

### Component Architecture
- QuizProvider (React Context)
- WelcomeScreen
- QuestionScreen (handles all 4 questions)
- LeadCaptureScreen
- ResultsScreen
- Progress indicator component

### Key Features
- Form validation with proper error handling
- Phone number formatting and validation
- Responsive design for all screen sizes
- Accessibility compliance (ARIA labels, semantic HTML)
- SEO optimization with proper meta tags

## Calendar Integration
- Book a call button links to: https://app.fyxie.ai/widget/booking/tuJLSOgIBKY96Rgn7l0g
- Opens in new tab
- Primary CTA: "Get Your REAL Offer—Book a Call Now!"
- Secondary CTA: "Email My Estimate"

## Trust Elements & Social Proof
- Customer testimonials with star ratings
- "No obligation" messaging
- "Secure & confidential" badges
- Professional styling to build credibility

## Deployment Requirements
- Remove all v0 branding and watermarks
- Clean package.json (name: "cash-offer-quiz")
- Optimized for iframe embedding
- Full-page and popup versions
- Custom domain ready (cashoffer.fyxie.ai)

## CSS Watermark Prevention
Include aggressive CSS to hide any potential watermarks:
\`\`\`css
/* Hide any potential watermarks */
[class*="watermark"], [id*="watermark"],
[class*="v0"], [id*="v0"],
div[style*="position: fixed"][style*="bottom"],
div[style*="position: absolute"][style*="bottom"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
}
\`\`\`

## Performance Optimization
- Add Vercel Speed Insights
- Optimize images and animations
- Minimize bundle size
- Fast loading times for mobile

## Success Metrics Focus
- High offer percentages (85-90%) to increase conversion
- Lead capture before results to maximize data collection
- Compelling CTAs and urgency messaging
- Professional design to build trust and credibility

This script provides complete specifications to recreate the exact interactive cash offer quiz lead magnet with all design, functionality, and technical requirements included.

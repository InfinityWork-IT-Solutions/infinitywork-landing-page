# InfinityWork IT Solutions - Lead Generation Landing Page

## Project Overview
A conversion-focused marketing landing page for InfinityWork IT Solutions (Pty) Ltd. The landing page is designed to generate leads, collect client emails, and showcase the company's IT services and solutions.

## Purpose
- Generate leads for the IT solutions business
- Collect potential client emails
- Showcase services and build brand awareness
- Establish online presence and credibility
- Convert visitors into clients

## Technology Stack
- **Frontend**: Vanilla HTML5, CSS3, JavaScript
- **Server**: Python HTTP Server
- **Libraries**: Font Awesome (icons), Google Fonts (Poppins)

## Project Structure
```
.
├── index.html              # Main landing page
├── styles.css              # Styling with brand colors
├── script.js               # Form validation and interactions
├── attached_assets/        # Company logos and images
│   ├── Company_logo_plus_name-removebg_1762628197565.png
│   └── Transparent logo_1762628178662.png
└── README.md              # Project documentation
```

## Brand Information
- **Company Name**: InfinityWork IT Solutions (Pty) Ltd
- **Tagline**: "Infinite Tech. Limitless Solutions."
- **Primary Colors**: 
  - Blue: #1e3a5f
  - Cyan: #00d4ff
- **Logo**: Infinity symbol with circuit design

## Landing Page Sections
1. **Header/Navigation**: Logo and navigation links (white background for better logo visibility)
2. **Hero Section**: Compelling headline, value proposition, CTAs, trust indicators, and 2 floating service cards
3. **Services Section**: 6 service cards (Web Dev, Cloud, SEO, Security, Consulting, Support)
4. **Benefits Section**: 6 reasons to choose InfinityWork
5. **Contact/Lead Form**: Form with validation for collecting leads (integrates with Google Sheets & Email)
6. **Footer**: Contact info, social media links, company details (gradient background for better visibility)

## Contact Information
- **Email**: mpumelelo@infinityworkitsolutions.com
- **Phone**: +27 72 061 4477
- **Social Media**:
  - Instagram: https://www.instagram.com/infinityworkitsolutions/
  - LinkedIn: https://www.linkedin.com/company/infinityworkitsolutions/
  - Facebook: https://www.facebook.com/profile.php?id=61583330903742

## Features
- Mobile-responsive design
- Form validation with real-time feedback
- Smooth scroll navigation
- Animated floating cards
- Intersection observer for scroll animations
- Professional styling matching brand colors

## Development Notes
- Built with vanilla HTML/CSS/JavaScript for simplicity and speed
- No React or frameworks to ensure fast loading times
- Form submissions currently logged to console (ready for backend integration)
- Ready for email integration or CRM connection

## Recent Changes
- November 8, 2025: Landing page updates and Google integration
  - Updated contact details (email: mpumelelo@infinityworkitsolutions.com, phone: +27 72 061 4477)
  - Removed "Visit Us" section (remote work)
  - Made company name field required in contact form
  - Replaced Mobile Development with SEO Optimization service
  - Removed mobile app floating card (kept 2 cards: Web Dev & Cloud)
  - Improved header background (white) for better logo visibility
  - Enhanced footer with gradient background for cleaner look
  - Added background gradient to floating cards area
  - Integrated Google Sheets API for lead capture
  - Set up email notifications to mpumelelo@infinityworkitsolutions.com
  - Created setup guide in GOOGLE_SHEETS_SETUP.md

- November 8, 2025: Initial landing page created
  - Implemented responsive design
  - Added form validation
  - Integrated brand colors and logos
  - Set up Python HTTP server on port 5000

## Google Sheets Integration
- Form submissions automatically saved to Google Sheets
- Email notifications sent to mpumelelo@infinityworkitsolutions.com
- Setup instructions in GOOGLE_SHEETS_SETUP.md
- Requires one-time Google Apps Script deployment

## Next Steps (Future Enhancements)
- Complete Google Apps Script deployment (follow GOOGLE_SHEETS_SETUP.md)
- Analytics tracking (Google Analytics)
- Testimonials section (when available)
- Blog/resources section for content marketing
- Live chat widget integration
- Add Mobile Development service back when ready

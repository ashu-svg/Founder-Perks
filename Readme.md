🚀 FounderPerks
Empowering early-stage founders with the tools they actually need.
FounderPerks is a full-stack platform built to help startup founders, early-stage teams, and indie hackers claim exclusive deals and cloud credits. This project bridges the gap between expensive SaaS tools and founders who need them to scale.

The Story
Building FounderPerks was a deep dive into the MERN stack. The core mission was to create a "restricted access" environment—ensuring that high-value perks, like $5,000 in AWS credits, are only accessible to verified, logged-in founders.

Technical Deep-Dive
1. End-to-End Application Flow
Discovery: Users arrive at the landing page to browse available partner deals.

Authentication: To "Claim" a deal, users must register or sign in.

Interaction: Once logged in, the Navbar updates to show a personalized welcome message.

Fulfillment: Users claim perks on the /deals page, which are then instantly synced and displayed on their private /dashboard.

2. Authentication and Authorization Strategy
Strategy: Stateless authentication using JSON Web Tokens (JWT).

Authorization: Protected backend routes verify the JWT before allowing a user to claim a perk or view dashboard data.

Security: User passwords are encrypted using BcryptJS hashing before storage in MongoDB.

3. Internal Flow of Claiming a Deal
When a user clicks "Claim Perk," the frontend triggers an API POST request to the backend with the userId and perkId.

The backend identifies the user in MongoDB and pushes the unique perkId into the user's claimedPerks array.

The dashboard then performs a .populate() query to convert those IDs into full deal details (Name, Value, Description) for display.

4. Interaction Between Frontend and Backend
The Next.js frontend communicates with the Node.js/Express backend via RESTful API endpoints.

The frontend uses the fetch API to send data and handles responses (success alerts or error screens) based on HTTP status codes.

5. Known Limitations & Weak Points
Persistence: Session data is stored in localStorage, which can be cleared by the user, requiring a re-login.

Manual Verification: Currently, perk "verification" is simulated; a production version would require API integration with partners like AWS or Notion.

6. Improvements Required for Production Readiness
Secure Cookies: Moving from localStorage to httpOnly cookies for JWT storage to prevent XSS.

Input Validation: Adding a validation layer (like Zod) to ensure all incoming API data is clean.

Email Integration: Sending automated "Claim Confirmation" emails to founders.

7. UI and Performance Considerations
Responsive Design: Built with Tailwind CSS to ensure a mobile-first, professional layout.

GPU Acceleration: Utilized Framer Motion for smooth, high-performance animations on the dashboard and deal cards.

Tech Stack
Frontend: Next.js 15, Tailwind CSS, Framer Motion, Lucide Icons.

Backend: Node.js, Express.js, JWT, BcryptJS.

Database: MongoDB (Mongoose ODM).

Built by Tushar Bhardwaj
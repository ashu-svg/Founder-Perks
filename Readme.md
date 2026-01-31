FounderPerks
Empowering early-stage founders with the tools they actually need.
Hey there! This is FounderPerks, a full-stack platform I built to help startup founders claim exclusive deals and cloud credits. It’s a project that took me through the deep ends of the MERN stack—from handling database relationships in MongoDB to making sure the UI feels snappy with Next.js and Tailwind CSS.

The Backstory
I wanted to build something that felt real. Founders often struggle to find all their startup credits in one place, so I created a "Deals Marketplace". The biggest challenge was making sure that when a user clicks "Claim," the data actually follows them back to their private dashboard. After a few rounds of debugging backend routes and password hashing, it’s now fully functional.

What it Does
Authentication: Users can sign up and log in securely. Their passwords aren't stored as plain text—I used bcrypt to hash them for safety.

The Marketplace: A clean grid of partner deals (like AWS and Notion) fetched directly from a MongoDB database.

Real-time Dashboard: A private space for founders to see their status and a list of every perk they've claimed.

Responsive UI: It looks just as good on a phone as it does on a 27-inch monitor.

The Tech I Used
Frontend: Next.js 15 (App Router), Tailwind CSS for styling, and Framer Motion for those smooth animations.

Backend: Node.js and Express.js to handle the API logic.

Database: MongoDB with Mongoose to keep track of users and their claimed deals.

How to Run it Locally
Clone the repo (You're already here!).

Backend Setup:

Navigate to /backend and run npm install.

Add your MONGO_URI and JWT_SECRET to a .env file.

Fire it up with node server.js.

Frontend Setup:

Navigate to /frontend and run npm install.

Start the dev server with npm run dev.

Head over to localhost:3000 and start claiming perks!

Lessons Learned (The Hard Way)
Building FounderPerks wasn't just about writing code; it was about solving puzzles. Here are a few things I learned while getting my hands dirty with the MERN stack:

Middleware is Precise: I learned that in Mongoose async middleware, calling next() can actually crash your server with a "next is not a function" error. Keeping the flow clean is key to a stable backend.

The Power of Population: I realized that storing just an ID in the database isn't enough. Using .populate() in Express is the "magic" that allows the dashboard to display actual perk names like "AWS" instead of just a long string of random numbers.

Safe Navigation in React: I hit a few "red screen" crashes because I tried to read data before it finished loading from the API. Learning to use the optional chaining operator (?.) saved my UI from breaking while the database was still thinking.

Environment Variables Matter: I discovered that having duplicate keys in a .env file can silently break your JWT authentication. Keeping your configuration clean is just as important as keeping your code clean.

UI Hierarchy: I struggled with "double headers" until I realized how Next.js handles global layouts. Moving the Navbar into layout.tsx was the "aha!" moment that made the whole site feel professional.

What's Next? (Future Roadmap)
Even though the core MERN loop is complete, there’s always room to grow. If I had more time, here’s what I’d build next:

Email Notifications: Use Nodemailer or SendGrid to send an actual welcome email with the discount code as soon as a founder clicks "Claim".

Search & Filter: As the list of partner deals grows, I’d add a search bar and category filters (e.g., "Cloud," "Marketing," "Design") so founders can find exactly what they need.

Founder Profile Editing: Create a "Settings" page where users can update their startup name, profile picture, and change their password.

Admin Dashboard: Build a secret portal for the "FounderPerks" team to add, edit, or delete deals directly from the UI instead of using MongoDB Compass.

Dark Mode: Add a toggle for dark mode because, let’s be honest, most founders are working late into the night.

Built with ☕ and curiosity by Tushar Bhardwaj.
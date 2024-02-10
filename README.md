# SSC24

A site to keep track of progress in various school subjects.

You can also view the routine for each subjects.

After selecting your subjects, you'll get an email everyday which will remind you how many days are left for the next exam and wish you good luck.

The site is live at [ssc24.vercel.app](https://ssc24.vercel.app)

## Tech Stack

- Next.js
- Tailwind CSS
- Firebase
- NextAuth.js
- Vercel Cron Jobs

## How to run

1. Clone the repository
2. Run `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in the required details
4. Run `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Pages

- `/` - Home page
- `/login` - Login page
- `/register` - Register page
- `/change` - Change subjects page
- `/routine` - Routine page
- `/settings` - Settings page
- `/create` - Choose subjects page

## API Routes

- `/api/cron` - Cron job endpoint to send emails
- `/api/auth` - Auth endpoint for NextAuth.js

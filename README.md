# University of Swat — University Website

A responsive university website built with Next.js App Router, React JSX, Tailwind CSS and MongoDB/Mongoose. This is an update of the existing UniVision project: the visual direction and page structure are retained and the brand/content are adapted to the University of Swat.

## Requirements
- Node.js 20+
- MongoDB local instance or MongoDB Atlas connection string

## Setup
1. Extract the ZIP and open the project folder in VS Code.
2. Install packages: `npm install`
3. Copy `.env.example` to `.env.local` and set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Start MongoDB (if using a local database).
5. Run `npm run seed` to create the initial administrator and sample content.
6. Start the website: `npm run dev`
7. Open `http://localhost:3000`.

## Administrator
Open `/admin/login`. The initial seed administrator is controlled by `ADMIN_EMAIL` and `ADMIN_PASSWORD` in `.env.local`. Change the example password before use. The dashboard shows content statistics and provides a content studio for creating news, events, departments, faculty and programs. Write APIs require the administrator session.

## Student accounts
- `/signup` creates a student account.
- `/login` signs in.
- The navigation switches between Login/Sign up and Logout based on the current session.

## Notes
- All application source is JavaScript/JSX; TypeScript and TSX files/configuration have been removed.
- The homepage uses a remote MP4 background video with a still-image poster fallback. Replace the video URL with an officially licensed campus video before production.
- University-specific descriptions, statistics, contact details and imagery should be reviewed and replaced with verified official information before public deployment. This is a website project, not an assertion that it is the official university site.
- Configure MongoDB and strong secrets before deployment. Use HTTPS in production.


## Admin publishing and media setup

- Sign in at `/admin/login`, then open the content studio at `/admin/content`.
- Create, edit, publish/unpublish, and delete news, events, departments, faculty, programs, gallery images, research entries, and announcements. Published content is read from MongoDB by its matching public page; unpublishing hides it from visitors without deleting it.
- Configure Cloudinary in `.env.local` using values from your Cloudinary dashboard:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Image uploads are sent through the authenticated server endpoint to Cloudinary. Only the secure CDN URL is saved in MongoDB. You can also paste an existing image URL into the image field.
- To use your own homepage video, place an MP4 file at `public/videos/campus.mp4`. The homepage uses a regular local HTML `<video>` element and does not embed a third-party video.
- Restart the development server after changing `.env.local`.


## Department image uploads (Cloudinary)

Department images are uploaded through `/api/upload`. The department record stores the Cloudinary CDN URL in both `imageUrl` (canonical) and `image` (backward compatibility), plus `cloudinaryPublicId`. The admin form preview should show immediately after upload; click **Publish content** / **Save changes** to persist the URL in MongoDB. Ensure all three Cloudinary environment variables are configured and restart the dev server after changing `.env.local`. Existing department records are not automatically changed; edit and save them again to attach an image.

## Admin-managed image uploads

The admin content studio supports Cloudinary image uploads for News, Events, Departments, Faculty, Programs, Gallery, Research, and Announcements/Notices. The upload endpoint returns Cloudinary's secure CDN URL and public ID. Content APIs persist both `image` and `imageUrl` for compatibility, plus `cloudinaryPublicId`; public pages prefer `imageUrl` and fall back to `image` for older records.

Keep your existing `.env.local` file in the project root and ensure it contains `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. The archive intentionally excludes `.env.local`; `.env.example` shows the required variable names. After extracting, run `npm install` and `npm run dev`.

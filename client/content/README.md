# Managing Content Locally

This portfolio relies on a static, file-based content management system. You do not need a database or admin panel to update your site. Everything is managed directly via JSON and markdown right here in the repository!

## Where to put images
All images used for projects, blogs, and certificates must be placed inside the `client/public/content-images/` directory.

- Projects images go in `client/public/content-images/projects/`
- Blog cover images go in `client/public/content-images/blogs/`
- Certificate images go in `client/public/content-images/certificates/`

When referencing an image in your JSON file, use the absolute path starting with `/content-images/`, for example: `"/content-images/projects/my-screenshot.png"`.

---

## How to add a new Project

Open `client/content/projects.json` and add a new object to the array.

**Required Fields:**
- `id`: A unique string identifier.
- `title`: The display name of the project.
- `slug`: A URL-friendly version of the title (e.g., `my-cool-project`).
- `summary`: A short 1-2 sentence description for the listing card.
- `category`: Must be one of: `"Frontend"`, `"Full-stack"`, `"AI/ML"`, or `"Other"`.

**Optional Fields:**
- `description`: Markdown string detailing the full project overview, features, etc.
- `thumbnail`: String path to the image in `/content-images/projects/`.
- `gallery`: Array of string paths to images.
- `githubUrl` / `liveUrl`: Links to the project.
- `technologies`: Array of strings (e.g., `["React", "Tailwind"]`).
- `featured`: Boolean `true` or `false`.

---

## How to add a new Blog Post

Open `client/content/blogs.json` and add a new object to the array.
*(Note: You do not need to manually calculate `readTime` or `views`—read time is calculated automatically at build time, and views are mocked for the demo).*

**Required Fields:**
- `id`: A unique string identifier.
- `title`: The display name of the blog.
- `slug`: A URL-friendly version of the title.
- `content`: The raw markdown body of the post.

**Optional Fields:**
- `coverImage`: String path to the image in `/content-images/blogs/`.
- `tags`: Array of strings (e.g., `["Design", "CSS"]`).
- `published`: Boolean `true` or `false`.
- `date`: String date (e.g., `"Oct 24, 2024"`).

---

## How to update Skills and Certificates

Simply modify `skills.json` or `certificates.json` following the existing object patterns found inside the files.

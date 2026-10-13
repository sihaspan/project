# CMS setup (Keystatic + GitHub login)

The client edits the site at **`https://YOUR-DOMAIN/admin`**. They sign in with GitHub, edit copy in a form,
and click **Save**. Each save is a commit to the GitHub repo, which triggers a redeploy (~1 min).

**Permissions = GitHub permissions.** Anyone with *write* access to the repo can edit; nobody else can.
To give the client access: repo → Settings → Collaborators → add their GitHub username.

---

## One-time setup (developer)

### 1. Hosting
Deploy to **Vercel** (or any host that runs Next.js server code — a static export will not work, since login needs
an API route). Connect the GitHub repo so every push to `main` redeploys.

### 2. Create the GitHub App (do this locally, once)
Keystatic can create the GitHub App for you:

```bash
npm install
NEXT_PUBLIC_KEYSTATIC_STORAGE=github NEXT_PUBLIC_GITHUB_REPO=owner/repo npm run dev
```

Open http://localhost:3000/keystatic and follow the **"Create GitHub App"** prompt. When it finishes it writes these
to `.env`:

```
KEYSTATIC_GITHUB_CLIENT_ID=...
KEYSTATIC_GITHUB_CLIENT_SECRET=...
KEYSTATIC_SECRET=...
NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=...
```

### 3. Add environment variables on the host
In Vercel → Project → Settings → Environment Variables, add the four values above **plus**:

```
NEXT_PUBLIC_GITHUB_REPO=owner/repo
```

Redeploy. (`.env` files are git-ignored — never commit these secrets.)

### 4. Allow the production URL on the GitHub App
GitHub → Settings → Developer settings → GitHub Apps → *your app* →
add this **Callback URL** (keep the localhost one for development):

```
https://YOUR-DOMAIN/api/keystatic/github/oauth/callback
```

Make sure the app is **installed on the repo** (App page → Install App). If the client gets an error signing in with
their own GitHub account, check the app's *Advanced → visibility* allows other accounts.

### 5. Add the client
Invite the client's GitHub account as a collaborator on the repo with **Write** access.

---

## Day-to-day (local development)

`npm run dev` edits the files in `content/` directly (no GitHub needed). Open http://localhost:3000/admin.

## What the client can edit

| CMS section | Controls |
|---|---|
| Home page | Hero, sector strip, "Why SihaSpan", section headings, call-to-action |
| About page | Intro, body paragraphs, stats, "How we work" steps |
| Services page | Each service (name, letter icon, tag, description, capabilities) — also feeds the Home page service cards |
| Who we serve page | Sector cards |
| Contact page | Heading text |
| Blog posts | Add / edit / delete articles (title, date, summary, cover image, rich-text body) |
| Blog page text | Heading and intro on the /blog page |
| Insights page text | Heading and intro on the /insights page |
| Site settings | Phone, WhatsApp, location, social links (empty = hidden), footer text |
| Every page | SEO title and description |

Not editable in the CMS (needs a developer): navigation links, layout/design, logos, the contact form's behaviour.

## Adding a blog post

1. Go to `/admin` → **Blog posts** → **Create entry**.
2. Fill in the title (the URL address is created from it), publish date, a short summary, an optional cover image, then write the article. The editor supports headings, bold/italic, lists, quotes, links, dividers and inline images.
3. Click **Save**. The post appears at `/blog/your-address` and on the `/blog` list about a minute later, and is added to the sitemap automatically.

- **Blog or Insight:** the *Where should this appear?* field decides whether a post shows on the Blog page (`/blog`) or the Insights page (`/insights`). Older posts count as Blog.
- **Draft:** tick *Draft* to save work without publishing it.
- **Scheduling:** set a future publish date and the post stays hidden until that day (the site refreshes hourly).
- Images are stored in `public/images/posts/` in the repo. Keep them under ~1 MB for fast loading.
- Deleting a post in the CMS removes it from the site on the next deploy.

## Tips for the client
- Changes go live about a minute after clicking **Save**.
- Keystatic's GitHub mode can also work on a branch and open a pull request, if you ever want review before publishing.
- To undo a mistake, ask the developer to revert the commit in GitHub (full history is kept).

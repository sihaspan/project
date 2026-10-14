import { collection, config, fields, singleton } from "@keystatic/core";

/**
 * Content is stored as JSON files in /content and committed to GitHub.
 *
 *  - In development (`npm run dev`) the CMS edits local files.
 *  - In production the CMS at /admin logs in with GitHub and commits to the repo,
 *    which triggers a redeploy.
 *
 * Set NEXT_PUBLIC_GITHUB_REPO in your host's environment variables
 * (format: "owner/repo"), or replace the fallback below.
 */
const GITHUB_REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || "OWNER/REPO";

// Local file editing in dev, unless you deliberately want to test the GitHub login locally
// (needed once to create the GitHub App — see CMS-SETUP.md).
const useLocalStorage =
  process.env.NODE_ENV === "development" &&
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE !== "github";

// ---------- reusable field groups ----------

const seo = () =>
  fields.object(
    {
      title: fields.text({ label: "Page title (shown in browser tab & Google)" }),
      description: fields.text({
        label: "Page description (shown in Google results)",
        multiline: true,
      }),
    },
    { label: "Search engine (SEO)" }
  );

const pageHead = () =>
  fields.object(
    {
      kicker: fields.text({ label: "Small label above heading" }),
      heading: fields.text({ label: "Heading" }),
      lede: fields.text({ label: "Intro paragraph", multiline: true }),
    },
    { label: "Page header" }
  );

const sectionHead = () =>
  fields.object(
    {
      kicker: fields.text({ label: "Small label above heading" }),
      heading: fields.text({ label: "Heading" }),
      description: fields.text({ label: "Side description", multiline: true }),
    },
    { label: "Section header" }
  );

const ctaBand = () =>
  fields.object(
    {
      heading: fields.text({ label: "Heading", multiline: true }),
      text: fields.text({ label: "Text" }),
      button: fields.text({ label: "Button text" }),
    },
    { label: "Call-to-action band" }
  );

const titleBodyList = (label, itemLabel) =>
  fields.array(
    fields.object({
      title: fields.text({ label: "Title" }),
      body: fields.text({ label: "Description", multiline: true }),
    }),
    {
      label,
      itemLabel: (props) => props.fields.title.value || itemLabel,
    }
  );

const iconField = (label = "Icon") =>
  fields.select({
    label,
    options: [
      { label: "Person", value: "user" },
      { label: "Team", value: "team" },
      { label: "Target with arrow", value: "target-arrow" },
      { label: "Growth chart", value: "growth" },
      { label: "Screen with pulse (technology)", value: "technology" },
      { label: "Shield with tick (quality)", value: "governance" },
      { label: "Hospital building", value: "facility" },
      { label: "Target rings", value: "advisory" },
    ],
    defaultValue: "advisory",
  });

// ---------- config ----------

export default config({
  storage: useLocalStorage
    ? { kind: "local" }
    : { kind: "github", repo: GITHUB_REPO },

  ui: {
    brand: { name: "SihaSpan — Content" },
    navigation: {
      Pages: ["home", "about", "services", "contact"],
      Insights: ["posts", "insights"],
      Site: ["settings"],
    },
  },

  collections: {
    // ------------------------------------------------ Insight articles
    posts: collection({
      label: "Insight articles",
      slugField: "title",
      path: "content/posts/*/",
      columns: ["publishedDate", "draft"],
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: { label: "Title" },
          slug: {
            label: "URL address",
            description:
              "Created from the title. This becomes the end of the article's web address — avoid changing it after publishing.",
          },
        }),
        draft: fields.checkbox({
          label: "Draft (hide from the website)",
          description:
            "Tick this to save your work without publishing. Untick it when you're ready to go live.",
          defaultValue: false,
        }),
        publishedDate: fields.date({
          label: "Publish date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        author: fields.text({ label: "Author", defaultValue: "SihaSpan Team" }),
        excerpt: fields.text({
          label: "Short summary",
          description:
            "Shown on the Insights list and in Google results. One or two sentences.",
          multiline: true,
          validation: { isRequired: true, length: { max: 300 } },
        }),
        coverImage: fields.image({
          label: "Cover image (optional)",
          description: "Wide images work best (e.g. 1600 × 900).",
          directory: "public/images/posts",
          publicPath: "/images/posts/",
        }),
        coverAlt: fields.text({
          label: "Cover image description (for accessibility)",
        }),
        content: fields.document({
          label: "Article",
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: "public/images/posts",
            publicPath: "/images/posts/",
          },
        }),
      },
    }),
  },

  singletons: {
    // ------------------------------------------------ Insights page text
    insights: singleton({
      label: "Insights page text",
      path: "content/insights",
      format: { data: "json" },
      schema: {
        seo: seo(),
        head: pageHead(),
        emptyMessage: fields.text({
          label: "Message shown when there are no insights yet",
        }),
      },
    }),

    // ------------------------------------------------ Site-wide settings
    settings: singleton({
      label: "Site settings",
      path: "content/settings",
      format: { data: "json" },
      schema: {
        contact: fields.object(
          {
            phoneDisplay: fields.text({
              label: "Phone number (as displayed)",
              description: "e.g. 0721 917 972",
            }),
            phoneTel: fields.text({
              label: "Phone number (international, for tap-to-call)",
              description: "e.g. +254721917972",
            }),
            whatsapp: fields.text({
              label: "WhatsApp number (digits only, with country code)",
              description: "e.g. 254721917972",
            }),
            location: fields.text({ label: "Based in" }),
          },
          { label: "Contact details" }
        ),
        social: fields.object(
          {
            linkedin: fields.url({ label: "LinkedIn URL" }),
            facebook: fields.url({ label: "Facebook URL" }),
            instagram: fields.url({ label: "Instagram URL" }),
            tiktok: fields.url({ label: "TikTok URL" }),
          },
          {
            label: "Social media",
            description: "Leave a link empty to hide that button on the site.",
          }
        ),
        footer: fields.object(
          {
            blurb: fields.text({ label: "Footer description", multiline: true }),
          },
          { label: "Footer" }
        ),
      },
    }),

    // ------------------------------------------------ Home
    home: singleton({
      label: "Home page",
      path: "content/home",
      format: { data: "json" },
      schema: {
        seo: seo(),
        hero: fields.object(
          {
            eyebrow: fields.text({ label: "Small label" }),
            heading: fields.text({
              label: "Main heading",
              description: "Each line goes on its own row, so press Enter to start a new line.",
              multiline: true,
            }),
            lede: fields.text({ label: "Intro paragraph", multiline: true }),
            primaryButton: fields.text({ label: "Primary button text" }),
            secondaryButton: fields.text({ label: "Secondary button text" }),
            tagline: fields.text({
              label: "Tagline over the photo (optional)",
              description: "Leave empty to show no text over the photo. One short phrase per line.",
              multiline: true,
            }),
          },
          { label: "Hero" }
        ),
        strip: fields.array(
          fields.object({
            number: fields.text({ label: "Number (optional, e.g. 01)" }),
            name: fields.text({ label: "Title" }),
            detail: fields.text({ label: "Detail (optional)", multiline: true }),
            icon: iconField(),
          }),
          {
            label: "Highlights strip (under hero)",
            itemLabel: (props) => props.fields.name.value || "Item",
          }
        ),
        why: fields.object(
          {
            head: sectionHead(),
            items: titleBodyList("Highlights", "Highlight"),
          },
          { label: "“Why SihaSpan” section" }
        ),
        whatWeDo: fields.object(
          {
            head: sectionHead(),
            buttonText: fields.text({ label: "“View all” button text" }),
          },
          {
            label: "“What we do” section",
            description:
              "The five service columns here are pulled automatically from the Services page.",
          }
        ),
        diagram: fields.object(
          {
            nodes: fields.array(fields.text({ label: "Label" }), {
              label: "Circles around the logo",
              description: "Each label becomes one circle. Three works best; up to six fit.",
              itemLabel: (props) => props.value || "Circle",
              validation: { length: { min: 1, max: 6 } },
            }),
          },
          { label: "Logo diagram" }
        ),
        cta: ctaBand(),
      },
    }),

    // ------------------------------------------------ About
    about: singleton({
      label: "About page",
      path: "content/about",
      format: { data: "json" },
      schema: {
        seo: seo(),
        head: pageHead(),
        paragraphs: fields.array(
          fields.text({ label: "Paragraph", multiline: true }),
          {
            label: "Body paragraphs",
            itemLabel: (props) => (props.value || "Paragraph").slice(0, 50),
          }
        ),
        stats: fields.array(
          fields.object({
            number: fields.text({ label: "Number" }),
            text: fields.text({ label: "Description", multiline: true }),
          }),
          {
            label: "Key stats",
            itemLabel: (props) => props.fields.number.value || "Stat",
          }
        ),
        approach: fields.object(
          {
            head: sectionHead(),
            steps: fields.array(
              fields.object({
                phase: fields.text({ label: "Phase (one word)" }),
                title: fields.text({ label: "Title" }),
                body: fields.text({ label: "Description", multiline: true }),
              }),
              {
                label: "Steps",
                itemLabel: (props) => props.fields.phase.value || "Step",
              }
            ),
          },
          { label: "“How we work” section" }
        ),
      },
    }),

    // ------------------------------------------------ Services
    services: singleton({
      label: "Services & who we serve page",
      path: "content/services",
      format: { data: "json" },
      schema: {
        seo: seo(),
        head: pageHead(),
        items: fields.array(
          fields.object({
            icon: iconField(),
            title: fields.text({ label: "Service name" }),
            tag: fields.text({ label: "Short tag (e.g. Direction)" }),
            body: fields.text({ label: "Description", multiline: true }),
            capabilities: fields.array(fields.text({ label: "Capability" }), {
              label: "Capabilities",
              itemLabel: (props) => props.value || "Capability",
            }),
          }),
          {
            label: "Services",
            itemLabel: (props) => props.fields.title.value || "Service",
          }
        ),
        serve: fields.object(
          {
            head: pageHead(),
            items: titleBodyList("Sectors served", "Sector"),
          },
          {
            label: "“Who we serve” section",
            description: "Shown below the services on the Services page.",
          }
        ),
        cta: ctaBand(),
      },
    }),

    // ------------------------------------------------ Contact
    contact: singleton({
      label: "Contact page",
      path: "content/contact",
      format: { data: "json" },
      schema: {
        seo: seo(),
        head: pageHead(),
        infoHeading: fields.text({ label: "Contact card heading" }),
      },
    }),
  },
});

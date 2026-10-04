import { config, fields, singleton } from "@keystatic/core";

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

// ---------- config ----------

export default config({
  storage: useLocalStorage
    ? { kind: "local" }
    : { kind: "github", repo: GITHUB_REPO },

  ui: {
    brand: { name: "SihaSpan — Content" },
    navigation: {
      Pages: ["home", "about", "services", "whoWeServe", "contact"],
      Site: ["settings"],
    },
  },

  singletons: {
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
            heading: fields.text({ label: "Main heading" }),
            lede: fields.text({ label: "Intro paragraph", multiline: true }),
            primaryButton: fields.text({ label: "Primary button text" }),
            secondaryButton: fields.text({ label: "Secondary button text" }),
          },
          { label: "Hero" }
        ),
        strip: fields.array(
          fields.object({
            name: fields.text({ label: "Bold name" }),
            detail: fields.text({ label: "Detail" }),
          }),
          {
            label: "Sector strip (under hero)",
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
              "The four service cards here are pulled automatically from the Services page.",
          }
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
      label: "Services page",
      path: "content/services",
      format: { data: "json" },
      schema: {
        seo: seo(),
        head: pageHead(),
        items: fields.array(
          fields.object({
            mark: fields.text({
              label: "Icon letter",
              validation: { length: { max: 2 } },
            }),
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
        cta: ctaBand(),
      },
    }),

    // ------------------------------------------------ Who we serve
    whoWeServe: singleton({
      label: "Who we serve page",
      path: "content/who-we-serve",
      format: { data: "json" },
      schema: {
        seo: seo(),
        head: pageHead(),
        items: titleBodyList("Sectors served", "Sector"),
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

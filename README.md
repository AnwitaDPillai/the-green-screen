# The Green Screen
> Climatizing Infrastructure: Green Retrofit

A digital magazine and archive for climate fiction about the built environment. It publishes short stories, essays, and poetry about buildings and pairs each piece with a real building and a real retrofit solution.

---

## Architecture & Project Structure

- **Framework:** [Astro](https://astro.build/) (Static Site Generation)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `@tailwindcss/typography`
- **CMS:** [Pages CMS](https://pagescms.org/) (configured via [`.pages.yml`](./.pages.yml))
- **Design Tokens:**
  - Canvas / Warm Ivory: `#F3F0E7`
  - Ink / Charcoal: `#222722`
  - Signature Forest Green: `#174C3B`
  - Sage Moss: `#A9B7A5`
  - Terracotta: `#B65F45`
  - Gold: `#C49A45`

---

## Editorial Workflow & Publication Security

This project enforces a strict separation between content editing and publication authorization:

1. **Intake & Review (Private):** Unpublished drafts, contributor contact details, review comments, and fact-checking records must remain in private workspaces—never committed to public production branches.
2. **Single Publication Rule (`src/lib/publication.ts`):**
   - Pieces must have `status: "published"`.
   - Intended `publishDate` must not be in the future (`publishDate <= now`).
   - Must have verified `approvedBy` and `approvedAt` editorial approval metadata.
3. **Route Leak Prevention:**
   - Dynamic route generator (`src/pages/archive/[slug].astro`) only generates HTML for verified published items.
   - Unpublished items (`status: "draft"` or `"review"`) are automatically excluded from the archive index, broadside, and static route output.
4. **Automated Verification:**
   - Run `npm run verify-publications` before build to check required approval metadata.

---

## Getting Started

### Development
```bash
npm install
npm run dev
```

### Build & Verify
```bash
npm run build
```

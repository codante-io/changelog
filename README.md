# Codante Changelog

Commit is a [Tailwind UI](https://tailwindui.com) site template built using [Tailwind CSS](https://tailwindcss.com) and [Next.js](https://nextjs.org).

## Getting started

To get started, first install dependencies via npm:

```bash
npm install
```

Next, create a `.env.local` file in the root of your project and set the `NEXT_PUBLIC_SITE_URL` environment variable to your site's public URL:

```
NEXT_PUBLIC_SITE_URL=https://example.com
```

Then start the development server:

```bash
npm run dev
```

Finally, open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Customizing

We've tried to build this template exactly the same way we'd build it if it we were building a real website, so there's no weird configuration files or global variables like you might see in a product that has been built as a "theme" rather than as an actual site.

Instead, you make changes by just opening the files you want to change, and changing whatever it is you want to change.

We'll cover a lot of the fundamentals here to help you get going quickly, but at the end of the day the whole codebase is yours and you should feel free to edit everything directly as much as you need to.

### Project structure

The template is built as a pretty standard Next.js website, but using the `src` folder so things like the `pages` directory are located at `./src/pages` instead of being top-level.

### Title and metadata

You can update your site's `<title>` and metadata in `./src/pages/_app.jsx`.

### Hero content

The main hero section for the site that includes your logo, headline, description, and links are all located in `./src/components/Intro.jsx`.

### Adding changelog entries

All of the changelog entries are stored in one big `./src/pages/index.mdx` file. We were inspired to set it up this way by how projects commonly maintain plaintext `CHANGELOG` files, and thought it would be cool to parse this sort of format and turn it into a nicely designed site.

Each changelog entry should be separated by a horizontal rule (`---`) and should include an `<h2>` with a date, specified as an [MDX annotation](https://github.com/bradlc/mdx-annotations):

```md
---

![](@/images/your-screenshot.png)

## My new changelog entry {{ date: '2023-04-06T00:00Z' }}

Your content...
```

## Learn more.

To learn more about the technologies used in this site template, see the following resources:

- [Tailwind CSS](https://tailwindcss.com/docs) - the official Tailwind CSS documentation
- [Next.js](https://nextjs.org/docs) - the official Next.js documentation
- [Motion One](https://motion.dev/) - the official Motion One documentation
- [MDX](https://mdxjs.com/) - the official MDX documentation

## Production deployment

The changelog is exported to `out/` and served directly by nginx. Production does not run `next start`, PM2, or a service on port 3010. Images are emitted as static assets without Next.js image optimization.

Pushes to `main` build the exact pushed commit in a new directory under `/var/www/codante-changelog-static/releases/`. The workflow uses the server's system Node.js 22/npm, the existing SSH secrets, and its existing GitHub deploy key. The deploy user must own the static deployment directory.

Only a successful build containing the homepage, 404 page, and RSS feed can replace the `current` symlink. nginx must use `/var/www/codante-changelog-static/current` as its document root, with `try_files $uri $uri.html $uri/ =404`. A failed build leaves the published release untouched. Deployments are serialized and old releases are retained.

To roll back, create a temporary symlink to a previous release's `out` directory and atomically replace `current` with `mv -Tf`. No nginx reload is required. Remove old build directories only after confirming they are no longer needed for rollback.

For a local production build:

```sh
npm ci --include=dev
NEXT_PUBLIC_SITE_URL=https://changelog.codante.io npm run build
```

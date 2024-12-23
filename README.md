# Jmills Site

The project is built in 2 parts

1. `web` - The public website - [https://www.jmillsent.com/](https://www.jmillsent.com/)
1. `studio` - The Sanity CMS - [https://jmillsent-studio.vercel.app/](https://jmillsent-studio.vercel.app/)

## Public site

Built using Next.js, consumes data from Sanity

### Working on the public site

- Log in to Santiy and get an API token for the [Jmills project](https://jmillsent.sanity.studio/)
- `cd` in to web
- Run `cp .env.example .env.local`
- Paste your token in the appropriate place
- Run `npm run dev`

### Deploying your changes to the public site

- Push your code to `master` and wait about a minute for Vercel to build it

## Sanity CMS

We are using Sanity's CMS to power the content creation process.

[https://jmillsent-studio.vercel.app/](https://jmillsent-studio.vercel.app/)

### Working on the Sanity CMS locally

- `cd` in to studio
- Run `npm run start`

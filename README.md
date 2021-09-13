# Jmills Site

The project is built in 2 parts

1. `web` - The public website
1. `studio` - The Sanity CMS

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

### Working on the Sanity CMS

- `cd` in to studio
- Run `sanity login`
- Run `npm run start`

### Deploying your changes to the CMS

- `cd` in to studio
- Run `sanity deploy`

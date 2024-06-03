# sanity-plugin-podcast-rss

> This is a **Sanity Studio v3** plugin.

## Installation

```sh
npm install sanity-plugin-podcast-rss
```

## Usage

Add it as a plugin in `sanity.config.ts` (or .js):

```ts
import {defineConfig} from 'sanity'
import {podcastRssPlugin} from 'sanity-plugin-podcast-rss'

export default defineConfig({
  //...
  plugins: [
    podcastRss({
      podcasts: [
        {
          title: 'CodingCat.dev',
          url: 'https://anchor.fm/s/115b203c/podcast/rss',
        },
        {
          title: 'Syntax.fm',
          url: 'https://feed.syntax.fm/',
        },
      ],
    }),
  ],
})
```

## Sanity Studio

Preview of selecting the episode:

![Selected Episode](https://media.codingcat.dev/image/upload/v1717379785/Screenshot_2024-06-02_at_9.54.59_PM_ttele8.png)

Select any of the provided Podcast RSS feeds and then search for episodes:

![Popup with selection of podcast and search](https://media.codingcat.dev/image/upload/v1717379787/Screenshot_2024-06-02_at_9.55.19_PM_h8yhun.png)

## License

[MIT](LICENSE) © Alex Patterson

## Develop & test

This plugin uses [@sanity/plugin-kit](https://github.com/sanity-io/plugin-kit)
with default configuration for build & watch scripts.

See [Testing a plugin in Sanity Studio](https://github.com/sanity-io/plugin-kit#testing-a-plugin-in-sanity-studio)
on how to run this plugin with hotreload in the studio.

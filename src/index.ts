/**
 * Usage in `sanity.config.ts` (or .js)
 *
 * ```ts
 * import {defineConfig} from 'sanity'
 * import {myPlugin} from 'sanity-plugin-podcast-rss'
 *
 * export default defineConfig({
 *   // ...
 *   plugins: [myPlugin()],
 * })
 * ```
 */

import {definePlugin} from 'sanity'

import {podcastRssEpisode} from './schema/podcastRssEpisode'

export interface Podcast {
  title: string
  url: string
}
export interface PodcastRssConfig {
  podcasts: Podcast[]
}

export const podcastRss = definePlugin<PodcastRssConfig | void>((config) => {
  return {
    name: 'sanity-plugin-podcast-rss',
    schema: {
      types: [podcastRssEpisode(config)],
    },
  }
})

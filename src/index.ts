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

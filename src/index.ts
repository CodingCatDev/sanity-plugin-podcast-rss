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

import {defineField, definePlugin} from 'sanity'

interface MyPluginConfig {
  podcasts: [
    {
      title: string
      url: string
    },
  ]
}

export const podcastRss = definePlugin<MyPluginConfig | void>((config) => {
  // eslint-disable-next-line no-console
  console.log('hello from sanity-plugin-podcast-rss', config)
  return {
    name: 'sanity-plugin-podcast-rss',
    schema: {
      types: [
        {
          title: 'Icon Picker',
          name: 'iconPicker',
          type: 'object',
          components: { input: PodcastPicker },
          fields: [
            defineField({
              title: 'Provider',
              name: 'provider',
              type: 'string',
            }),
            defineField({
              title: 'Name',
              name: 'name',
              type: 'string',
            }),
            defineField({
              title: 'Inline SVG',
              name: 'svg',
              type: 'string',
            }),
          ],
        },
      ],
    },
  }
})


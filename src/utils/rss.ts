import {parseStringPromise} from 'xml2js'

import {Podcast} from '../index'
import {Episode, RSSObject} from '../types'

export async function fetchRssToJson(podcast: Podcast | undefined): Promise<Episode[]> {
  if (!podcast) {
    return []
  }

  try {
    const response = await fetch(podcast.url)
    const xmlData = await response.text()
    const jsonData: RSSObject = await parseStringPromise(xmlData)

    const episodes: Episode[] =
      jsonData?.rss?.channel?.at(0)?.item.map((item) => {
        return {
          title: item?.title[0] || '',
          description: item?.description[0] || '',
          link: item?.link[0] || '',
          pubDate: item?.pubDate[0]
            ? new Date(item?.pubDate[0]).toISOString()
            : new Date().toISOString(),
          guid: {
            id: item?.guid[0]?._ || '',
            isPermaLink: item?.guid[0]?.$.isPermaLink === 'true' || false,
          },
          enclosures: item?.enclosure?.map((enclosure) => {
            return {
              url: enclosure?.$.url || '',
              length: enclosure?.$.length ? Number(enclosure?.$.length) : 0,
              type: enclosure?.$.type || '',
            }
          }),
          itunes: {
            summary: item['itunes:summary']?.at(0) || '',
            explicit: item['itunes:explicit']?.at(0) || '',
            duration: item['itunes:duration']?.at(0) || '',
            season: item['itunes:season']?.at(0) || '',
            episode: item['itunes:episode']?.at(0) || '',
            episodeType: item['itunes:episodeType']?.at(0) || '',
            image: {
              href: item['itunes:image']?.at(0)?.$?.href || '',
            },
          },
        }
      }) || []

    return episodes
  } catch (error) {
    console.error('Error fetching RSS feed:', error)
    throw error
  }
}

/* eslint-disable no-use-before-define */

export interface Episode {
  title: string
  description: string
  link: string
  guid: {
    id: string
    isPermaLink: boolean
  }
  pubDate: Date
  enclosures: {
    url: string
    length: number
    type: string
  }[]
  itunes: {
    summary: string
    explicit: string
    duration: string
    season: string
    episode: string
    episodeType: string
    image: {
      href: string
    }
  }
}

export interface RSS {
  rss: RSSObject
}

// Gross RSS Types
export interface RSSObject {
  rss: {
    $: GeneratedType
    channel: Channel[]
  }
}

export interface GeneratedType {
  'xmlns:dc': string
  'xmlns:content': string
  'xmlns:atom': string
  version: string
  'xmlns:itunes': string
  'xmlns:anchor': string
}

export interface Channel {
  title: string[]
  description: string[]
  link: string[]
  image: Image[]
  generator: string[]
  lastBuildDate: string[]
  'atom:link': AtomLink[]
  author: string[]
  copyright: string[]
  language: string[]
  'anchor:support': string[]
  'anchor:station': string[]
  'itunes:author': string[]
  'itunes:summary': string[]
  'itunes:type': string[]
  'itunes:owner': ItunesOwner[]
  'itunes:explicit': string[]
  'itunes:category': ItunesCategory[]
  'itunes:image': ItunesImage[]
  item: Item[]
}

export interface Image {
  url: string[]
  title: string[]
  link: string[]
}

export interface AtomLink {
  $: GeneratedType2
}

export interface GeneratedType2 {
  href: string
  rel: string
  type?: string
}

export interface ItunesOwner {
  'itunes:name': string[]
  'itunes:email': string[]
}

export interface ItunesCategory {
  $: GeneratedType3
}

export interface GeneratedType3 {
  text: string
}

export interface ItunesImage {
  $: GeneratedType4
}

export interface GeneratedType4 {
  href: string
}

export interface Item {
  title: string[]
  description: string[]
  link: string[]
  guid: Guid[]
  'dc:creator': string[]
  pubDate: string[]
  enclosure: Enclosure[]
  'itunes:summary': string[]
  'itunes:explicit': string[]
  'itunes:duration': string[]
  'itunes:image': ItunesImage2[]
  'itunes:season': string[]
  'itunes:episode': string[]
  'itunes:episodeType': string[]
}

export interface Guid {
  _: string
  $: GeneratedType5
}

export interface GeneratedType5 {
  isPermaLink: string
}

export interface Enclosure {
  $: GeneratedType6
}

export interface GeneratedType6 {
  url: string
  length: string
  type: string
}

export interface ItunesImage2 {
  $: GeneratedType7
}

export interface GeneratedType7 {
  href: string
}

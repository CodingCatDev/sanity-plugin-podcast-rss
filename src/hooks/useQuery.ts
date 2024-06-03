/* eslint-disable no-console */
import type {Dispatch, SetStateAction} from 'react'
import {useEffect, useState} from 'react'

import {LOADING_TIMER_MS} from '../constants'
import {Podcast} from '../index'
import {Episode} from '../types'
import {fetchRssToJson} from '../utils/rss'
import useDebouncedCallback from './useDebouncedCallback'

interface UseQueryResult {
  query: string
  loading: boolean
  results: Episode[]
  setQuery: Dispatch<SetStateAction<string>>
}

interface UseQueryProps {
  (podcast: Podcast | undefined): UseQueryResult
}

export const useQuery: UseQueryProps = (podcast) => {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [results, setResults] = useState<Episode[]>([])

  const debouncedFetchEpisodes = useDebouncedCallback(async () => {
    if (query && podcast) {
      const episodes = await fetchRssToJson(podcast)

      const queryResults = episodes.filter(({title}) =>
        title.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(queryResults)
      setLoading(false)
    } else {
      setResults([])
      setLoading(false)
    }
  }, LOADING_TIMER_MS)

  useEffect(() => {
    if (!loading) {
      setLoading(true)
    }
    debouncedFetchEpisodes()
  }, [query, podcast])

  return {
    query,
    loading,
    results,
    setQuery,
  }
}

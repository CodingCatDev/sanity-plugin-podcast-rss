import {Button, Flex, Spinner} from '@sanity/ui'
import {useRef} from 'react'
import styled from 'styled-components'

import {Episode} from '../types'

const Wrapper = styled.section`
  min-height: 200px;
  width: 100%;
  position: relative;
`

export type SearchResultsOnSelectCallback = (episode: Episode) => void

interface ISearchResults {
  results: Episode[]
  onSelect: SearchResultsOnSelectCallback
  loading: boolean
  selectedEpisode?: Episode
}

const SearchResults = ({results, loading, onSelect, selectedEpisode}: ISearchResults) => {
  const EpisodeButton = (episode: Episode) => {
    const buttonRef = useRef<HTMLButtonElement>(null)

    return (
      <Button
        ref={buttonRef}
        key={episode.guid.id}
        mode="ghost"
        // eslint-disable-next-line react/jsx-no-bind
        onClick={() => onSelect(episode)}
        text={episode.title}
        style={{marginTop: '5px'}}
        selected={!!selectedEpisode && selectedEpisode?.guid?.id === episode.guid.id}
      />
    )
  }

  return (
    <Wrapper>
      {loading && (
        <Flex
          align="center"
          justify="center"
          style={{width: '100%', height: '100%', position: 'absolute'}}
        >
          <Spinner size={4} muted />
        </Flex>
      )}
      {!loading && results && (
        <Flex
          direction="column"
          align="flex-start"
          justify="flex-start"
          style={{width: '100%', height: '100%', position: 'absolute'}}
        >
          {results.map((e) => EpisodeButton(e))}
        </Flex>
      )}
    </Wrapper>
  )
}

export default SearchResults

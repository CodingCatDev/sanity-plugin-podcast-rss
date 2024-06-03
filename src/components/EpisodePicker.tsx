import {
  Avatar,
  Button,
  Card,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  Select,
  Stack,
  Text,
} from '@sanity/ui'
import {useCallback, useState} from 'react'
import {set, setIfMissing, unset} from 'sanity'

import {useQuery} from '../hooks/useQuery'
import type {EpisodePickerParams} from '../schema/podcastRssEpisode'
import {Episode} from '../types'
import Popup from './Popup'
import SearchBar, {SearchBarOnChange} from './SearchBar'
import SearchResults, {SearchResultsOnSelectCallback} from './SearchResults'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const EpisodePicker = (params: EpisodePickerParams) => {
  const {podcasts} = params
  const {schemaType, onChange, value} = params
  const defaultEpisode = value as Episode

  const [selectedPodcast, setSelectedPodcast] = useState(podcasts.at(0))
  const [isPopupOpen, setOpen] = useState(false)
  const {query, loading, results, setQuery} = useQuery(selectedPodcast)
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | undefined>(defaultEpisode)

  const onClose = useCallback(() => setOpen(false), [])
  const onOpen = useCallback(() => setOpen(true), [])
  const onQueryChange: SearchBarOnChange = (e) => {
    const searchQuery = e.target.value
    setQuery(searchQuery)
  }

  const unsetEpisode = () => {
    onChange(unset())
    setSelectedEpisode(undefined)
  }

  const handleMenuClick = () => {
    return unsetEpisode()
  }

  const setEpisode: SearchResultsOnSelectCallback = (episode: Episode) => {
    if (selectedEpisode && episode.guid.id === selectedEpisode.guid.id) return unsetEpisode()

    onChange([
      setIfMissing({
        _type: schemaType.name,
      }),
      set(episode),
    ])

    setOpen(false)

    return setSelectedEpisode(episode)
  }

  const searchResultsProps = {
    onSelect: setEpisode,
    results,
    loading,
    query,
    selectedEpisode,
  }

  return (
    <Card>
      <Stack padding={2} space={[3, 3, 4, 5]}>
        {selectedEpisode && (
          <Card padding={[3, 3, 4]} radius={2} shadow={1}>
            <Flex align="center" justify="space-between">
              <Avatar
                alt={selectedEpisode.title}
                src={selectedEpisode.itunes.image.href}
                size={2}
              />

              <Text size={[2, 2, 3]}>
                <a href={selectedEpisode.link} target="_blank" rel="noopener noreferrer">
                  {selectedEpisode.title}
                </a>
              </Text>

              <MenuButton
                button={<Button text="..." mode="ghost" />}
                id="podcast-rss-menu-button"
                menu={
                  <Menu>
                    <MenuItem
                      text="Delete"
                      // eslint-disable-next-line react/jsx-no-bind
                      onClick={handleMenuClick}
                    />
                  </Menu>
                }
                popover={{portal: true, placement: 'bottom-start'}}
              />
            </Flex>
          </Card>
        )}
        <Button onClick={onOpen} mode="ghost" text="Search for Episodes" />
        <Popup
          // eslint-disable-next-line react/jsx-no-bind
          onClose={onClose}
          isOpen={isPopupOpen}
        >
          <Stack padding={4} space={[3, 3, 4, 5]}>
            <Select
              fontSize={[2, 2, 3, 4]}
              padding={[3, 3, 4]}
              space={[3, 3, 4]}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={(e) =>
                setSelectedPodcast(
                  podcasts.find((p) => p.url === (e.target as HTMLInputElement).value),
                )
              }
            >
              {podcasts.map((podcast) => (
                <option
                  key={podcast.title}
                  value={podcast.url}
                  selected={podcast === selectedPodcast}
                >
                  {podcast.title}
                </option>
              ))}
            </Select>
            <SearchBar
              value={query}
              // eslint-disable-next-line react/jsx-no-bind
              onChange={onQueryChange}
            />
            <SearchResults {...searchResultsProps} />
          </Stack>
        </Popup>
      </Stack>
    </Card>
  )
}

export default EpisodePicker

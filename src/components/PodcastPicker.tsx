import {Card} from '@sanity/ui'

const PodcastPicker = ({schemaType, value = {}, readOnly, onChange}: ObjectInputProps) => {
  const options: IconPickerOptions = schemaType.options
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const {query, loading, results, setQuery} = useQuery(options)
  const {selected, setSelected} = useSelectedIcon(value.name, results)

  const unsetIcon = () => {
    onChange(unset())
    setSelected(null)
  }

  const setIcon: SearchResultsOnSelectCallback = (icon: IconObject, ele: HTMLButtonElement) => {
    if (selected && icon.name === selected.name) return unsetIcon()

    const getSvgString = () => ele.getElementsByTagName('svg')[0].outerHTML

    onChange([
      setIfMissing({
        _type: schemaType.name,
      }),
      set(icon.name, ['name']),
      set(icon.provider, ['provider']),
      schemaType.options.storeSvg ? set(getSvgString(), ['svg']) : unset(['svg']),
    ])

    return setSelected(icon)
  }

  const openPopup = () => {
    setIsPopupOpen(true)
  }
  const closePopup = () => {
    setIsPopupOpen(false)
    setQuery('')
  }

  const onQueryChange: SearchBarOnChange = (e) => {
    const searchQuery = e.target.value
    setQuery(searchQuery)
  }
  const handleMenuClick: MenuClickCallback = (action) => {
    if (action === Action.add) return setIsPopupOpen(true)
    if (action === Action.edit) return openPopup()
    if (action === Action.delete) return unsetIcon()
    return new Error('Unsupported action')
  }

  const providers = getProviders(options)
  const tabProviders = [ALL_CONFIGURATIONS_PROVIDER, ...providers]
  const hideTabs = providers.length === 1
  const searchResultsProps = {
    onSelect: setIcon,
    results,
    selected,
    loading,
    query,
  }

  return <Card>hi</Card>
}

export default IconPicker

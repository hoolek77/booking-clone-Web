import React from 'react'
import SearchBar from './SearchBar'
import { useSearch } from '../../../hooks/useSearch'

export const MainPageView = () => {
  const [hotels, search] = useSearch()

  return (
    <div id="MainPageView">
      <SearchBar onSearchSubmit={search} />
    </div>
  )
}

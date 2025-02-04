import { useNavigate, useSearchParams } from 'react-router'
import { makeGalleryRoute } from '../../utils/makeRoutes'
import { useScrollToTop } from '../shared/useScrollToTop'

export const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48] as const
export type ItemsPerPage = (typeof ITEMS_PER_PAGE_OPTIONS)[number]

const DEFAULT_PAGE = 1
const DEFAULT_ITEMS_PER_PAGE: ItemsPerPage = 6

type GalleryState = {
  page: number
  itemsPerPage: ItemsPerPage
}

function isValidItemsPerPage(value: number): value is ItemsPerPage {
  return [6, 12, 24, 48].includes(value)
}

function getUrlParams(params: URLSearchParams): {
  page: number
  items: number
} {
  const page = Number.parseInt(params.get('page') ?? 'NaN', 10)
  const items = Number.parseInt(params.get('items') ?? 'NaN', 10)
  return { page, items }
}

function getStateFromUrlOrDefaults(params: URLSearchParams): GalleryState {
  const { page, items } = getUrlParams(params)

  return {
    page: Number.isNaN(page) ? DEFAULT_PAGE : Math.max(1, page),
    itemsPerPage: isValidItemsPerPage(items) ? items : DEFAULT_ITEMS_PER_PAGE,
  }
}

export function useGalleryState() {
  const navigate = useNavigate()
  const { ref, scrollToTop } = useScrollToTop()
  const [searchParams] = useSearchParams()

  const { page, itemsPerPage } = getStateFromUrlOrDefaults(searchParams)

  const handlePageChange = (newPage: number) => {
    if (newPage !== page) {
      navigate(makeGalleryRoute(newPage, itemsPerPage))
      scrollToTop()
    }
  }

  const handleItemsPerPageChange = (newLimit: ItemsPerPage) => {
    if (newLimit !== itemsPerPage) {
      navigate(makeGalleryRoute(1, newLimit))
      scrollToTop()
    }
  }

  return {
    page,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    ref,
  }
}

import { useEffect, useReducer, useState } from 'react'
import { IPageContext } from '@/types/pages'
import { useMediaQuery } from '@mui/material'
import { navigate } from 'gatsby'
import { theme } from 'src/theme/ThemeProvider'
import { localizePath } from './localize'

// Got from https://usehooks.com/useLockBodyScroll/
export function useLockBodyScroll() {
  useEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow

    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden'

    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = originalStyle
    }
  }, []) // Empty array ensures effect is only run on mount and unmount
}

export const useIsMobile = () => useMediaQuery(theme.breakpoints.down('md'))

export const useIsDesktopLarge = () => useMediaQuery(theme.breakpoints.up('lg'))

export const useDataWithColor = (
  //todo: types
  key: string,
  data: Array<any>, // {key: string}
  colors: Array<any>, // {key: string, fill: string}
) =>
  data.map((datum) => {
    return { ...datum, fill: colors.find((c) => c[key] == datum[key])?.fill || theme.palette.background.paper }
  })

function getWindowDimensions() {
  if (typeof window !== `undefined`) {
    const { innerWidth: width, innerHeight: height } = window
    return {
      width,
      height,
    }
  } else {
    return { height: 900, width: 1440 }
  }
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions())

  useEffect(() => {
    if (typeof window !== `undefined`) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowDimensions
}

//@ts-ignore
export const useIsFirefox = () => typeof InstallTrigger !== 'undefined'

export const useLocalizePage = (pageContext: IPageContext, location: Location) => {
  useEffect(() => {
    const { defaultLocale, slug } = pageContext
    const locale = (typeof localStorage !== `undefined` && localStorage.getItem('locale')) || defaultLocale

    const localizedPath = localizePath(locale, defaultLocale, slug)

    if (locale && location.pathname !== localizedPath) navigate(localizedPath)
  }, [location.pathname, pageContext])
}

export const useLocalStorage = (key: string) => {
  const [value, setValue] = useState<any>(undefined)
  useEffect(() => {
    setValue(localStorage.getItem(key))
  }, [])
  return value
}

const fetchReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'loading':
      return { ...state, data: undefined, loading: true }
    case 'fetched':
      return { ...state, data: action.payload, loading: false }
    case 'error':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

export const useFetch = (
  fetchConfig: any,
  options = {
    method: 'get',
    credentials: 'same-origin',
    body: null,
  },
) => {
  const initialState = {
    error: undefined,
    data: undefined,
    loading: true,
  }

  const [{ data, loading, error }, dispatch] = useReducer(fetchReducer, initialState)

  if (typeof fetchConfig === 'string' || typeof fetchConfig === 'undefined') {
    fetchConfig = {
      url: fetchConfig,
      parser: 'json',
    }
  }

  const { url, parser } = fetchConfig
  const { body } = options

  useEffect(() => {
    if (!url) return

    let inEffect = true

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      try {
        // @ts-ignore
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        if (!inEffect) return

        // @ts-ignore
        const data = await response[parser]()
        if (!inEffect) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (!inEffect) return

        dispatch({ type: 'error', payload: error })
      }
    }
    fetchData()

    return () => {
      inEffect = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, parser, body])

  return [data, loading, error]
}

export const useFetchPost = (url: any, values = {}) => {
  const [postData, setPostData] = useState({
    url: undefined,
    values: JSON.stringify(values),
  })

  const fetchState = useFetch(postData.url, {
    method: 'post',
    credentials: 'same-origin',
    //@ts-ignore //todo
    body: postData.values,
  })

  return [
    function submit(values: any) {
      setPostData({
        url,
        values: JSON.stringify(values),
      })
    },
    ...fetchState,
  ]
}

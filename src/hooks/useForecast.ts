import { useState, useEffect, ChangeEvent } from 'react'
import { forcastType, optionType } from '../types'

const useForecast = () => {
  const [term, setTerm] = useState<string>('')
  const [loc, setLoc] = useState<optionType | null>(null)
  const [options, setOptions] = useState<[]>([])
  const [forecast, setForecast] = useState<forcastType | null>(null)

  const getSearchOptions = (value: string) => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(data => setOptions(data))
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setTerm(value)

    if (value === '') return

    getSearchOptions(value.trim())
  }

  const onOptionSelect = (option: optionType) => {
    setLoc(option)
  }

  const getForecast = (loc: optionType) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${loc.lat}&lon=${loc.lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
      .then(data => {
        const forecastData = {
          ...data.city,
          list: data.list.slice(0, 16),
        }
        console.log({ forecastData })
        setForecast(forecastData)
      })
  }

  const onSubmit = () => {
    if (!loc) return
    getForecast(loc)
  }

  useEffect(() => {
    if (loc) {
      setTerm(loc.name)
      setOptions([])
    }
  }, [loc])

  return {
    term,
    options,
    forecast,
    onInputChange,
    onOptionSelect,
    onSubmit,
  }
}

export default useForecast

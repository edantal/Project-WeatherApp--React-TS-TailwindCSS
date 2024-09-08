import { TEXTS } from './index.text'

export const getWindDirection = (deg: number): string => {
  if (deg > 15 && deg <= 75) return TEXTS.windDirection.NE

  if (deg > 76 && deg <= 105) return TEXTS.windDirection.E
  if (deg > 105 && deg <= 165) return TEXTS.windDirection.SE

  if (deg > 166 && deg <= 195) return TEXTS.windDirection.S
  if (deg > 195 && deg <= 255) return TEXTS.windDirection.SW

  if (deg > 255 && deg <= 285) return TEXTS.windDirection.W
  if (deg > 285 && deg <= 345) return TEXTS.windDirection.NW

  return TEXTS.windDirection.N
}

export const getHumidityValue = (level: number): string => {
  if (level <= 55) return TEXTS.humidityValue.low
  if (level > 55 && level <= 65) return TEXTS.humidityValue.moderate

  return TEXTS.humidityValue.high
}

export const getVisibilityValue = (number: number): string => {
  if (number <= 50) return TEXTS.visibilityValue.extremeLow
  if (number > 50 && number <= 500) return TEXTS.visibilityValue.veryLow
  if (number > 500 && number <= 2000) return TEXTS.visibilityValue.low
  if (number > 2000 && number <= 9000) return TEXTS.visibilityValue.moderate

  return TEXTS.visibilityValue.high
}

export const getSunTime = (timestamp: number): string => {
  const date = new Date(timestamp * 1000)
  let hours = date.getHours().toString()
  let minutes = date.getMinutes().toString()

  if (hours.length <= 1) hours = `0${hours}`
  if (minutes.length <= 1) minutes = `0${minutes}`

  return `${hours}:${minutes}`
}

export const getPop = (value: number): string => {
  if (value <= 0.33) return TEXTS.popValue.low
  if (value > 0.33 && value <= 0.66) return TEXTS.popValue.moderate

  return TEXTS.popValue.high
}

import {
  getHumidityValue,
  getPop,
  getSunTime,
  getVisibilityValue,
  getWindDirection,
} from '../helpers'
import { forecastType } from '../types'
import Degree from './Degree'
import Sunrise from './Icons/Sunrise'
import Sunset from './Icons/Sunset'
import Tile from './Tile'

type Props = {
  forecast: forecastType
}

export const TEXTS = {
  overview: {
    highestTempText: 'H',
    lowestTempText: 'L',
    nowText: 'Now',
  },
  details: {
    wind: {
      name: 'Wind',
      info: (windSpeed: number) => `${Math.round(windSpeed)} km/h`,
      description: (windDirection: number, gustsSpeed: number) =>
        `Wind direction ${getWindDirection(
          Math.round(windDirection)
        )}, Gusts ${gustsSpeed.toFixed(1)} km/h`,
    },
    feelsLike: {
      name: 'Feels Like',
      description: (feelsLike: number, temp: number) =>
        `Feels ${
          Math.round(feelsLike) < Math.round(temp) ? 'colder' : 'warmer'
        }`,
    },
    humidity: {
      name: 'Humidity',
      info: (humidity: number) => `${humidity}%`,
      description: (humidity: number) => getHumidityValue(humidity),
    },
    precipitation: {
      name: 'Precipitation',
      info: (pop: number) => `${Math.round(pop * 1000)}%`,
      description: (pop: number, clouds: number) =>
        `${getPop(pop)}, clouds at ${clouds}%`,
    },
    pressure: {
      name: 'Pressure',
      info: (pressure: number) => `${pressure} hPa`,
      description: (pressure: number) =>
        `${Math.round(pressure) < 1013 ? 'Lower' : 'Higher'} than standard`,
    },
    visibility: {
      name: 'Visibility',
      info: (visibility: number) => `${(visibility / 1000).toFixed()}km`,
      description: (visibility: number) => getVisibilityValue(visibility),
    },
  },
}

const Forecast = ({ forecast }: Props): JSX.Element => {
  const today = forecast.list[0]
  // console.log(today.weather[0].main.toLowerCase())

  return (
    <div className='w-full h-full lg:h-auto md:max-w-[700px] py-4 md:py-4 md:px-10 lg:px-24 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg'>
      <div className='mx-auto w-[300px]'>
        {/* HEADING */}
        <section className='text-center'>
          <h2>
            {forecast.name}
            <span className='font-thin'>, {forecast.country}</span>
          </h2>
          <h1 className='text-4xl font-extrabold'>
            <Degree temp={today.main.temp} />
          </h1>
          <p className='text-sm'>
            {today.weather[0].main}{' '}
            <span className='font-thin'>({today.weather[0].description})</span>
          </p>
          <p className='text-sm'>
            {TEXTS.overview.highestTempText}:{' '}
            <Degree temp={today.main.temp_max} fn='up' /> /{' '}
            {TEXTS.overview.lowestTempText}:{' '}
            <Degree temp={today.main.temp_min} fn='down' />
          </p>
        </section>

        {/* FORECAST OVERVIEW */}
        <section className='flex overflow-x-scroll mt-4 pb-2 mb-5'>
          {forecast.list.map((item, i) => (
            <div
              className='inline-block text-center w-[50px] flex-shrink-0'
              key={i}
            >
              <p className='text-sm'>
                {i === 0
                  ? TEXTS.overview.nowText
                  : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p className='text-sm font-bold'>
                <Degree temp={item.main.temp} />
              </p>
            </div>
          ))}
        </section>

        {/* DETAILS */}
        <section className='flex flex-wrap justify-between text-zinc-700'>
          <div className='w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
            <Sunrise />
            <span className='mt-2'>{getSunTime(forecast.sunrise)}</span>
          </div>

          <div className='w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
            <Sunset />
            <span className='mt-2'>{getSunTime(forecast.sunset)}</span>
          </div>

          <Tile
            icon='wind'
            title={TEXTS.details.wind.name}
            info={TEXTS.details.wind.info(today.wind.speed)}
            description={TEXTS.details.wind.description(
              today.wind.deg,
              today.wind.gust
            )}
          />

          <Tile
            icon='feelslike'
            title={TEXTS.details.feelsLike.name}
            info={<Degree temp={today.main.feels_like} />}
            description={TEXTS.details.feelsLike.description(
              today.main.feels_like,
              today.main.temp
            )}
          />

          <Tile
            icon='humidity'
            title={TEXTS.details.humidity.name}
            info={TEXTS.details.humidity.info(today.main.humidity)}
            description={TEXTS.details.humidity.description(
              today.main.humidity
            )}
          />

          <Tile
            icon='precipitation'
            title={TEXTS.details.precipitation.name}
            info={TEXTS.details.precipitation.info(today.pop)}
            description={TEXTS.details.precipitation.description(
              today.pop,
              today.clouds.all
            )}
          />

          <Tile
            icon='pressure'
            title={TEXTS.details.pressure.name}
            info={TEXTS.details.pressure.info(today.main.pressure)}
            description={TEXTS.details.pressure.description(
              today.main.pressure
            )}
          />

          <Tile
            icon='visibility'
            title={TEXTS.details.visibility.name}
            info={TEXTS.details.visibility.info(today.visibility)}
            description={TEXTS.details.visibility.description(today.visibility)}
          />
        </section>
      </div>
    </div>
  )
}

export default Forecast

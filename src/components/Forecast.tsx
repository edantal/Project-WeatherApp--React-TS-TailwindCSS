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

const Forecast = ({ forecast }: Props): JSX.Element => {
  const today = forecast.list[0]

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
            H: <Degree temp={today.main.temp_max} fn='up' /> / L:{' '}
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
                {i === 0 ? 'Now' : new Date(item.dt * 1000).getHours()}
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
          {/* sunrise */}
          <div className='w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
            <Sunrise />
            <span className='mt-2'>{getSunTime(forecast.sunrise)}</span>
          </div>

          {/* sunset */}
          <div className='w-[140px] text-xs font-bold flex flex-col items-center bg-white/20 backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5'>
            <Sunset />
            <span className='mt-2'>{getSunTime(forecast.sunset)}</span>
          </div>

          {/* wind */}
          <Tile
            icon='wind'
            title='Wind'
            info={`${Math.round(today.wind.speed)} km/h`}
            description={`Wind direction ${getWindDirection(
              Math.round(today.wind.deg)
            )}, Gusts ${today.wind.gust.toFixed(1)} km/h`}
          />
          {/* feels like */}
          <Tile
            icon='feels'
            title='Feels Like'
            info={<Degree temp={today.main.feels_like} />}
            description={`Feels ${
              Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? 'colder'
                : 'warmer'
            }`}
          />
          {/* humidity */}
          <Tile
            icon='humidity'
            title='Humidity'
            info={`${today.main.humidity}%`}
            description={getHumidityValue(today.main.humidity)}
          />
          {/* precipitation */}
          <Tile
            icon='pop'
            title='Precipitation'
            info={`${Math.round(today.pop * 1000)}%`}
            description={`${getPop(today.pop)}, clouds at ${today.clouds.all}%`}
          />
          {/* pressure */}
          <Tile
            icon='pressure'
            title='Pressure'
            info={`${today.main.pressure} hPa`}
            description={`${
              Math.round(today.main.pressure) < 1013 ? 'Lower' : 'Higher'
            } than standard`}
          />
          {/* visibility */}
          <Tile
            icon='visibility'
            title='Visibility'
            info={`${(today.visibility / 1000).toFixed()}km`}
            description={getVisibilityValue(today.visibility)}
          />
        </section>
      </div>
    </div>
  )
}

export default Forecast

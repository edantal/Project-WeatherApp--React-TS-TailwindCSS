import { forecastType } from '../types'
import Degree from './Degree'

type Props = {
  forecast: forecastType
}

const Forecast = ({ forecast }: Props): JSX.Element => {
  const today = forecast.list[0]

  return (
    <div className='w-full h-full lg:h-auto md:max-w-[700px] py-4 md:py-4 md:px-10 lg:px-24 bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg'>
      <div className='mx-auto w-[300px]'>
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
      </div>
    </div>
  )
}

export default Forecast

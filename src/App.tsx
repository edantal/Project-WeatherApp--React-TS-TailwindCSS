import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()

  const weather = forecast?.list[0].weather[0].main.trim().toLowerCase()

  const bgImage =
    weather === 'clear'
      ? 'bg-clear'
      : weather === 'rain'
      ? 'bg-rain'
      : weather === 'snow'
      ? 'bg-snow'
      : weather === 'clouds'
      ? 'bg-cloudy'
      : weather === 'thunderstorm'
      ? 'bg-thunderstorm'
      : 'bg-main'

  return (
    <main
      className={`flex justify-center items-center h-[100vh] w-full ${
        forecast ? bgImage : 'bg-main'
      } bg-cover bg-no-repeat bg-fixed`}
    >
      {forecast ? (
        <Forecast forecast={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  )
}

export default App

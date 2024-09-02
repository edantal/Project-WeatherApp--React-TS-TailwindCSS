import Search from './components/Search'
import Forecast from './components/Forecast'
import useForecast from './hooks/useForecast'

const App = (): JSX.Element => {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast()
  return (
    <main
      className={`flex justify-center items-center h-[100vh] w-full ${
        forecast ? `bg-${forecast.list[0].weather[0].main}` : 'bg-main'
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

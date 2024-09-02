import { ChangeEvent } from 'react'
import { optionType } from '../types'
import SearchLineIcon from 'remixicon-react/SearchLineIcon'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main className='flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full'>
      <section className='w-full md:max-w-[700px] h-full lg:h-[600px] flex flex-col items-center justify-center p-4 md:px-10 lg:p-24 bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-center text-zinc-700'>
        <h1 className='text-4xl font-extralight'>
          Die <span className='font-extrabold'>Wettervorhersage</span>
        </h1>
        <p className='text-sm mt-2'>
          Geben Sie einen Ort ein, für den Sie eine Wettervorhersage erhalten
          möchten, und wählen Sie eine Option aus der Dropdown-Liste
        </p>
        <div className='flex mt-10 md:mt-4 relative'>
          <input
            type='text'
            value={term}
            className='px-2 py-1 rounded-l-md border-2 border-white placeholder:font-light placeholder:text-sm placeholder:italic'
            placeholder='Ort...'
            onChange={onInputChange}
          />

          {options.length > 0 && (
            <ul className='absolute top-12 bg-zinc-700 rounded-md before:absolute before:left-0 before:-top-2 before:w-0 before:h-0 before:border-l-[10px] before:border-l-transparent before:border-b-[15px] before:border-b-zinc-700 before:border-r-[10px] before:border-r-transparent before:-z-10'>
              {options.map((option: optionType, index: number) => (
                <li key={`${option.name}-${index}`}>
                  <button
                    className='text-white text-left text-xs w-full hover:bg-white hover:bg-opacity-15 px-2 py-1 cursor-pointer'
                    onClick={() => onOptionSelect(option)}
                  >
                    {option.name}
                    {option.state && `, ${option.state}`}, {option.country}
                  </button>
                </li>
              ))}
            </ul>
          )}

          <button
            className='flex px-2 py-1 rounded-r-md border-2 border-zinc-100 hover:border-zinc-700 bg-transparent hover:bg-zinc-700 text-white hover:text-white cursor-pointer transition-all'
            onClick={onSubmit}
          >
            <SearchLineIcon className='mr-1' /> Suchen
          </button>
        </div>
      </section>
    </main>
  )
}

export default Search

import {
  RiWindyLine,
  RiTempColdLine,
  RiWaterPercentLine,
  RiEyeLine,
  RiSpeedUpFill,
  RiContrastDrop2Line,
} from '@remixicon/react'

type Props = {
  icon: 'wind' | 'feels' | 'humidity' | 'visibility' | 'pressure' | 'pop'
  title: string
  info: string | JSX.Element
  description: string
}

const icons = {
  wind: RiWindyLine,
  feels: RiTempColdLine,
  humidity: RiWaterPercentLine,
  visibility: RiEyeLine,
  pressure: RiSpeedUpFill,
  pop: RiContrastDrop2Line,
}

const Tile = ({ icon, title, info, description }: Props): JSX.Element => {
  const Icon = icons[icon]

  return (
    <article className='w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-lg rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between'>
      <div className='flex flex-col gap-1'>
        <div className='flex items-center text-sm font-bold'>
          <Icon size={20} />
          <h4 className='ml-1 font-black'>{title}</h4>
        </div>
        <h3 className='mt-2 text-2xl font-black'>{info}</h3>
      </div>

      <p className='text-[11px] font-light'>{description}</p>
    </article>
  )
}

export default Tile

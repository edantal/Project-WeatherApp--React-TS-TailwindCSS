type Props = {
  temp: number
  fn?: 'up' | 'down'
}

const Degree = ({ temp, fn }: Props): JSX.Element => (
  <span className='relative inline-block'>
    {fn === 'up'
      ? Math.ceil(temp)
      : fn === 'down'
        ? Math.floor(temp)
        : Math.round(temp)}
    <sup className='absolute top-[.5em] text-[.5em]'>0</sup>
  </span>
)

export default Degree

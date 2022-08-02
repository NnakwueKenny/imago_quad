import React from 'react'
import useWindowSize from '../useWindowSize'
import Confetti from 'react-confetti'

const WinConfetti = () => {
  const { width, height } = useWindowSize();
  return (
    <Confetti
      width={width}
      height={height}
    />
  )
}
export default WinConfetti;
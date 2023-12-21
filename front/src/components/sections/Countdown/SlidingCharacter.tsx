import styled, { keyframes, css } from 'styled-components'

const getAnimation = (id: string) => keyframes`
  0% {
    --id: ${id};
    top: -100%;
  }
`
const getSpecialAnimation = (id: string) => keyframes`
  0% {
    --id: ${id};
    top: -5em;
  }
  100% {
    --id: ${id};
    top: 0em;
  }
`
const getSpecialAnimationMinutesDays = (id: string) => keyframes`
  0% {
    --id: ${id};
    top: -9em;
  }
  100% {
    --id: ${id};
    top: 0em;
  }
`
interface Props {
  animationid?: string
  position?: string
  minandday?: boolean
}

export const SlidingCharacter = styled.p<Props>`
  ${({ animationid }) =>
    animationid &&
    css`
      animation: ${getAnimation(animationid)} 350ms ease-in-out;
    `}
`

export const SlidingTensCharacter = styled.div<Props>`
  ${({ animationid, minandday }) =>
    animationid &&
    css`
      animation: ${minandday
          ? getSpecialAnimationMinutesDays(animationid)
          : getSpecialAnimation(animationid)}
        350ms ease-in-out;
    `}
`

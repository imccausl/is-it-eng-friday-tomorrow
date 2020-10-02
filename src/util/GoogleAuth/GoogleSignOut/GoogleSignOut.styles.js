import styled from 'styled-components'

export const getTextAlign = (alignment) => {
  const ALIGNMENT_MAP = {
    center: 'center',
    left: 'flex-start',
    right: 'flex-end',
  }
  const ALLOWED_ALIGNMENTS = Object.keys(ALIGNMENT_MAP)

  if (ALLOWED_ALIGNMENTS.includes(alignment)) {
    return ALIGNMENT_MAP[alignment]
  }

  return ALIGNMENT_MAP.center
}

export const SignOutButtonStyle = styled.button`
  display: block;
  border: 0;
  padding: 0;
  font-size: 16px;
  margin: 0;
  background-color: transparent;
  width: 100%;
`

export const SignOutButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: ${({ textAlign }) => getTextAlign(textAlign)};
  padding: 10px;
`

export const NameContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;

  p {
    margin: 0;
    padding: 0;
  }
`

export const NameStyle = styled.p`
  color: inherit;
  font-size: 1em;
`

export const EmailStyle = styled.p`
  font-size: 1em;
`

export const Avatar = styled.img`
  border-radius: 50%;
`

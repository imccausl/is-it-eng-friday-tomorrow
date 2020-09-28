import styled from 'styled-components'

export const SignOutButtonStyle = styled.button`
  display: block;
  border: 0;
  padding: 0;
  margin: 0;
  background-color: transparent;
`

export const SignOutButtonContainer = styled.div`
  align-items: center;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
`

export const NameContainer = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: flex-start;
  margin-left: 10px;

  p {
    margin: 0;
    padding: 0;
  }
`

export const NameStyle = styled.p`
  color: inherit;
  font-size: 1.5em;
`

export const EmailStyle = styled.p`
  font-size: 1em;
`

export const Avatar = styled.img`
  border-radius: 50%;
`

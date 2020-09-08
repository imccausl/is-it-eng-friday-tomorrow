import styled, { css } from 'styled-components'

const setBackgroundImage = (imageUrl) => css`
  background-image: url(${imageUrl});
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
`
export const SignOutContainer = styled.button`
  align-items: flex-start;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
`

export const Avatar = styled.div`
  border-radius: 50%;
  height: 60px;
  width: 60px;

  ${({ img }) => img && setBackgroundImage(img)}
`

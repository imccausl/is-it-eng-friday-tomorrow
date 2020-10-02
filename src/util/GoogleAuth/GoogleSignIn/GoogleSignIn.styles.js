import styled from 'styled-components'

export const LoginButton = styled.button`
  background: ${({ loading }) => (loading ? 'white' : 'transparent')};
  border: none;
  color: black;
  font-size: 1em;
  height: 46px;
  padding: 0;
  width: 191px;

  &:hover {
    cursor: pointer;
  }

  img {
    display: block;
  }
`

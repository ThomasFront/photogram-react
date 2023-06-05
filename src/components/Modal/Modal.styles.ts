import styled from "styled-components";

export const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
`

export const HeadingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid ${({theme}) => theme.colors.black[20]};

  p {
    font-weight: 500;
    width: 100%;
    font-size: 18px;
  }

  svg {
    cursor: pointer;
    transition: color 0.2s;
    font-size: 28px;
    color: ${({theme}) => theme.colors.black[100]};

    &:hover {
      color: ${({theme}) => theme.colors.black[70]};
    }
  }
`

export const ContentContainer = styled.div`
  margin: 16px;
  border-radius: 6px;
  max-width: 800px;
  width: 100%;
  background-color: ${({theme}) => theme.colors.pure['white']};
`

export const MainInformationContainer = styled.div`
  padding: 16px;
`

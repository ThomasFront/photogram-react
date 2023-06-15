import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled(motion.div)`
  width: 100%;
  height: 300px;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: filter 0.2s;
  }

  @media(min-width: 600px){
    width: 48%;
    height: 250px;
    margin-left: 3px;
  }

  @media(min-width: 800px){
    width: 31%;
    margin-left: 6px;
  }

  @media(min-width: 1000px){
    width: 23%;
  }

  @media(min-width: 1100px){
    margin-left: 8px;
  }

  &:hover {

    img {
      filter: grayscale(60%);
    }
  }
`

export const DetailsContainer = styled.div`
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: ${({theme}) => theme.colors.pure['white']};

  div {
    display: flex;
    align-items: center;
    gap: 2px;
  }
`
import styled from 'styled-components'

export const LayoutContainerLimiter = styled.div`
  width: 100%;
  margin: 0 auto;
`

export const LayoutContainer = styled.div`
  & {
    width: 100%;  
    min-height: 100vh;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 15px;
    background: #0250c5;
    background: -webkit-linear-gradient(bottom, #0250c5, #d43f8d);
    background: -o-linear-gradient(bottom, #0250c5, #d43f8d);
    background: -moz-linear-gradient(bottom, #0250c5, #d43f8d);
    background: linear-gradient(bottom, #0250c5, #d43f8d);
    position: relative;
    z-index: 1;
  }
  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-image: url('/resources/img-01.png');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
`
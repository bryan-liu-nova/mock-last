import styled from 'styled-components'

export const Container = styled.div`
`

export const Header = styled.div`
  width: 100%;
  height: 116px;
  background: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Logo = styled.img`
  width: 118px;
`

export const Form = styled.div`
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 22px;
  padding-bottom: 34px;
`

export const FormTitle = styled.span`
  font-size: 24px;
  color: #fff;
  line-height: 1.2;
  text-align: center;
  padding-bottom: 44px;

  width: 100%;
  display: block;
`

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  z-index: 1;
  margin-bottom: 44px;
`

export const FocusInput = styled.span`
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 0px 0px;
  color: rgba(211,222,241, 0.6);
`

export const SymbolInput = styled.span`
  font-size: 24px;
  color: #2F2C40;

  display: -webkit-box;
  display: -webkit-flex;
  display: -moz-box;
  display: -ms-flexbox;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 100%;
  background: #D9D9D9;
  pointer-events: none;

  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  transition: all 0.2s;
`

export const Envelope = styled.span`
  &:before {
    content: "\f0e0";
    font-family: FontAwesome;
  }
`

export const Lock = styled.span`
  &:before {
    content: "\f023";
    font-family: FontAwesome;
  }
`

export const Input = styled.input`
  & {
    font-size: 14px;
    line-height: 1.2;

    display: block;
    width: 100%;
    background: #fff;
    height: 50px;
    padding: 0 30px 0 72px;
  }

  &:focus + ${FocusInput} {
    -webkit-animation: anim-shadow 0.5s ease-in-out forwards;
    animation: anim-shadow 0.5s ease-in-out forwards;
  }

  &:focus + ${FocusInput} + ${SymbolInput} {
    color: #d33f8d;
    font-size: 26px;
  }

  @-webkit-keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 60px 20px;
      opacity: 0;
    }
  }
  
  @keyframes anim-shadow {
    to {
      box-shadow: 0px 0px 60px 20px;
      opacity: 0;
    }
  }
`

export const CheckboxWrapper = styled.div`
  margin: auto;
  margin-top: 4px;
`

export const LabelCheckbox = styled.label`
  & {
    font-size: 14px;
    color: #fff;
    line-height: 1.2;

    display: block;
    position: relative;
    padding-left: 28px;
    cursor: pointer;
  }

  &:before {
    content: "\f00c";
    font-family: FontAwesome;
    font-size: 13px;
    color: #fff;

    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 3px;
    background: transparent;
    border: 2px solid #fff;
    left: 0;
    top: 48%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`

export const Checkbox = styled.input`
  & {
    display: none;
  }

  &:checked + ${LabelCheckbox}:before {
    color: transparent;
  }
`

export const ForgetPWButtonWrapper = styled.div`
  width: 100%;
  margin-top: 19px;
  text-align: center;
`

export const ForgotPWButton = styled.a`
  cursor: pointer;
  font-size: 14px;
`

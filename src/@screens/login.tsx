import { SignIn } from '@store/actions/auth'
import { getToken } from '@store/selectors/auth'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../node_modules/font-awesome/css/font-awesome.min.css'
import { Checkbox, CheckboxWrapper, Container, Form, Envelope, FocusInput, ForgetPWButtonWrapper, ForgotPWButton, FormTitle, Input, InputWrapper, LabelCheckbox, Lock, SymbolInput, Header, Logo } from "./login.components"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const token = useSelector(getToken)

  console.log(token)

  const onSubmit = () => {
    dispatch(SignIn.Actions.REQUEST(email, password))
  }

  return (
    <Container>
      <Header>
        <Logo src="/resources/logo.png"/>
      </Header>
      <Form>
        <FormTitle>Login</FormTitle>
        <InputWrapper>
          <Input
            type="email"
            placeholder="email"
            onChange={event => setEmail(event.target.value)}
            onKeyPress={event => event.key === 'Enter' && onSubmit()}/>
          <FocusInput/>
          <SymbolInput>
            <Envelope/>
          </SymbolInput>
        </InputWrapper>
        <InputWrapper>
          <Input
            type="password"
            placeholder="password"
            onChange={event => setPassword(event.target.value)}
            onKeyPress={event => event.key === 'Enter' && onSubmit()}/>
          <FocusInput/>
          <SymbolInput>
            <Lock/>
          </SymbolInput>
        </InputWrapper>
        <CheckboxWrapper>
          <Checkbox id="remember-me" type="checkbox" name="remember-me"/>
          <LabelCheckbox htmlFor="remember-me">
            Remember me
          </LabelCheckbox>
        </CheckboxWrapper>
        <ForgetPWButtonWrapper>
          <ForgotPWButton>Forgot Password?</ForgotPWButton>
        </ForgetPWButtonWrapper>
      </Form>
    </Container>
  )
}

export default Login
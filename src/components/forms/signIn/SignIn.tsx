import { Alert, Button, Checkbox, Form, Input } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInUser } from '../../../api/user';
import { ROUTES } from '../../../consts';
import { ErrorI } from '../../../types';
import { useToken } from '../../../utils/useToken';
import { saveUserInfo } from '../../../store/slices/userSlice';
import '../Form.scss';
import './SignIn.scss';
import { useAppDispatch } from '../../../hooks';

const SignIn = () => {
  const [error, setError] = useState<ErrorI>();
  const { setToken } = useToken();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFinish = (values: any) => {
    const { email, password, remember } = values;
    signInUser({ email, password }).then((result) => {
      if ((result as ErrorI).status) {
        setError(result as ErrorI);
      } else {
        const { firstName, lastName, email, nickname, token } = result;
        dispatch(saveUserInfo({ firstName, lastName, email, nickname }));
        setToken(token, !remember);
        navigate(0);
      }
    });
  };

  return (
    <div className='form-wrapper'>
      {error && <Alert message={error.message} type='error' className='error-alert' showIcon />}
      <div className='form sign-in-form'>
        <div className='form-title'>
          <h1>Sign in</h1>
        </div>
        <Form name='sign-in' initialValues={{ remember: true }} onFinish={onFinish} autoComplete='off'>
          <Form.Item
            label='Email'
            name='email'
            rules={[{ required: true, message: 'Please enter correct email', type: 'email' }]}
            labelCol={{ span: 24 }}
            className='form-item'
          >
            <Input type='email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
            labelCol={{ span: 24 }}
            className='form-item'
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name='remember' valuePropName='checked' className='form-item'>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <div className='btns-wrapper'>
            <Button type='primary' htmlType='submit' className='btn' form='sign-in'>
              Submit
            </Button>
            <Button className='btn' href={ROUTES.PUBLIC.SIGN_UP}>
              Go to Sign up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignIn;

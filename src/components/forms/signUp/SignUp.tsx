import { useState } from 'react';
import { Button, Form, Input } from 'antd';
import { ValidateStatus } from 'antd/es/form/FormItem';
import '../Form.scss';
import { useForm } from 'antd/es/form/Form';
import { isUserExists, signUpUser } from '../../../api/user';
import { Rule } from 'antd/es/form';
import { ROUTES } from '../../../consts';
import { useNavigate } from 'react-router-dom';

type formValidateDataI = { [value: string]: ValidateStatus | undefined };

const SignUp = () => {
  const [formValidateData, setFormValidateData] = useState<formValidateDataI>({});
  const [timeoutId, setTimeoutId] = useState<number>();
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    signUpUser(values).then(() => {
      navigate(ROUTES.PUBLIC.SIGN_IN, { replace: true });
    });
  };

  const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    setTimeoutId(
      window.setTimeout(() => {
        isUserExists(e.target.name, form.getFieldValue(e.target.name)).then((isExist) => {
          setFormValidateData({
            ...formValidateData,
            [e.target.name]: isExist ? 'error' : undefined
          });
        });
      }, 500)
    );
  };

  const fieldsRules: { [val: string]: Rule[] } = {
    nickname: [{ required: true, message: 'Please enter at least 5 symbols', min: 5 }],
    email: [{ required: true, message: 'Please enter correct email', type: 'email' as any }],
    password: [{ required: true, message: 'Please enter at least 5 symbols', min: 5 }]
  };

  return (
    <div className='form-wrapper'>
      <div className='form'>
        <h1 className='form-title'>Sign Up</h1>
        <Form name='sign-up' onFinish={onFinish} autoComplete='on' form={form}>
          <Form.Item
            label='Nickname'
            name='nickname'
            labelCol={{ span: 24 }}
            rules={fieldsRules.nickname}
            hasFeedback
            validateStatus={formValidateData.nickname}
            help={formValidateData.nickname === 'error' ? 'User with such nickname is already exist' : undefined}
            className='form-item'
          >
            <Input
              name='nickname'
              onChange={(e) => {
                if (e.target.value.length < 5) return;
                validateInput(e);
              }}
            />
          </Form.Item>

          <Form.Item
            label='Email'
            name='email'
            labelCol={{ span: 24 }}
            rules={fieldsRules.email}
            hasFeedback
            validateStatus={formValidateData.email}
            className='form-item'
            help={formValidateData.email === 'error' ? 'User with such email is already exist' : undefined}
          >
            <Input name='email' onChange={validateInput} />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            labelCol={{ span: 24 }}
            rules={fieldsRules.password}
            hasFeedback
            className='form-item'
          >
            <Input.Password name='password' />
          </Form.Item>
          <div className='btns-wrapper'>
            <Button type='primary' htmlType='submit' className='btn' form='sign-up'>
              Submit
            </Button>
            <Button className='btn' href={ROUTES.PUBLIC.SIGN_IN}>
              Go to Sign In
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;

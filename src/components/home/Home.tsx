import { Button, Form, Input } from 'antd';
import { updateUser } from '../../api/user';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useToken } from '../../utils/useToken';
import { updateUserInfo } from '../../store/slices/userSlice';
import './Home.scss';
import { UserUpdateI } from '../../types';

const Home = () => {
  const userInfo = useAppSelector((state) => state.user);
  const { token, setToken } = useToken();
  const dispatch = useAppDispatch();

  const onSave = (values: any) => {
    const data: UserUpdateI = {
      firstName: values.firstName || '',
      lastName: values.lastName || ''
    };
    updateUser(data, token || '')
      .then((result) => {
        if (result && (result.status === 401 || result.status === 403)) {
          setToken(undefined);
          window.location.reload();
          return;
        }
        dispatch(updateUserInfo(data));
      })
      .catch(() => {
        return;
      });
  };

  const onLogOut = () => {
    setToken(undefined);
    window.location.reload();
  };

  return (
    <div className='home-wrapper'>
      <div className='home-container'>
        <div className='welcome'>
          <h1>{`Welcome, ${userInfo.nickname}`}</h1>
          <div className='log-out'>
            <Button onClick={onLogOut}>Log out</Button>
          </div>
        </div>
        <div className='edit-wrapper'>
          <h2>Edit</h2>
          <Form
            name='basic'
            initialValues={{ remember: true }}
            onFinish={onSave}
            // onFinishFailed={onFinishFailed}
            autoComplete='off'
          >
            <div className='form-items-wrapper'>
              <Form.Item label='First name' name='firstName' initialValue={userInfo.firstName || ''}>
                <Input />
              </Form.Item>

              <Form.Item label='Last name' name='lastName' initialValue={userInfo.lastName || ''}>
                <Input />
              </Form.Item>

              <Form.Item>
                <Button type='primary' htmlType='submit'>
                  Save
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Home;

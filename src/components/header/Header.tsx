import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../consts';
import './Header.scss';
import { useAppSelector } from '../../hooks';
import { ReactComponent as Logo } from '../../assets/logo.svg';

interface NavItemI {
  name: string;
  url: string;
}

export const getNavs = (): NavItemI[] => Object.entries(ROUTES.NAVS).map((item) => ({ name: item[0], url: item[1] }));

export const Header = () => {
  const userInfo = useAppSelector((state) => state.user);

  return (
    <div className='header-wrapper'>
      <div className='logo'>
        <Logo />
      </div>
      <nav className='nav-wrapper'>
        <Menu mode='horizontal' className='menu' defaultSelectedKeys={[ROUTES.NAVS.HOME]}>
          {getNavs().map((nav) => (
            <Menu.Item key={nav.url}>
              <Link to={nav.url}>{nav.name}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </nav>
      <div className='user-info-wrapper'>
        <span className='nickname'>{userInfo.nickname}</span>
        <span className='name'>{`${userInfo.firstName || ''} ${userInfo.lastName || ''}`}</span>
      </div>
    </div>
  );
};

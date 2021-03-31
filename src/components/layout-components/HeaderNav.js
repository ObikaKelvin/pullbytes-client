import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import Logo from './Logo';
import NavPanel from './NavPanel';
import NavProfile from './NavProfile';
import NavSearch  from './NavSearch';
import utils from 'utils'
import { toggleCollapsedNav, onMobileNavToggle } from 'redux/actions/Theme';
import { NAV_TYPE_TOP, SIDE_NAV_COLLAPSED_WIDTH, SIDE_NAV_WIDTH } from 'constants/ThemeConstant';
import UserService from 'services/UserService'
import { setAuthUser } from 'redux/actions/Auth'

const { Header } = Layout;

export const HeaderNav = props => {
  const { navCollapsed, mobileNav, navType, headerNavColor, toggleCollapsedNav, onMobileNavToggle, isMobile, currentTheme, token, setAuthUser, user } = props;
  const [searchActive, setSearchActive] = useState(false)


  const onSearchClose = () => {
    setSearchActive(false)
  }

  const onToggle = () => {
    if(!isMobile) {
      toggleCollapsedNav(!navCollapsed)
    } else {
      onMobileNavToggle(!mobileNav)
    }
  }

  const isNavTop = navType === NAV_TYPE_TOP ? true : false
  const mode = ()=> {
    if(!headerNavColor) {
      return utils.getColorContrast(currentTheme === 'dark' ? '#00000' : '#ffffff' )
    }
    return utils.getColorContrast(headerNavColor)
  }
  const navMode = mode()
  const getNavWidth = () => {
    if(isNavTop || isMobile) {
      return '0px'
    }
    if(navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`
    } else {
      return `${SIDE_NAV_WIDTH}px`
    }
  }

  useEffect(() => {
    if(!isMobile) {
      onSearchClose()
    }
  })

  useEffect(() => {
    console.log(token)
    UserService.me().then( ({ user }) => {
      setAuthUser(user);
    }).catch(error => {
      // history.push(`/auth/login`)
    })
  }, [token])

  return (
    <Header className={`app-header ${navMode}`} style={{backgroundColor: headerNavColor}}>
      <div className={`app-header-wrapper ${isNavTop ? 'layout-top-nav' : ''}`}>
        <Logo logoType={navMode}/>
        <div className="nav" style={{width: `calc(100% - ${getNavWidth()})`}}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">          
              {
                isNavTop && !isMobile ?
                null
                :
                <li className="ant-menu-item ant-menu-item-only-child" onClick={() => {onToggle()}}>
                  {navCollapsed || isMobile ? <MenuUnfoldOutlined className="nav-icon" /> : <MenuFoldOutlined className="nav-icon" />}
                </li>
              }
            </ul>
          </div>
          <div className="nav-right">
            <NavPanel />
            <NavProfile user={user} />
          </div>
          <NavSearch active={searchActive} close={onSearchClose}/>
        </div>
      </div>
    </Header>
  )
}

const mapStateToProps = ({ theme, userReducer, auth }) => {
  const { navCollapsed, navType, headerNavColor, mobileNav, currentTheme } =  theme;
  const {user, token} = auth;
  return { navCollapsed, navType, headerNavColor, mobileNav, currentTheme, user, token}
};

const mapDispatchToProps = {
  toggleCollapsedNav, onMobileNavToggle, setAuthUser
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNav);
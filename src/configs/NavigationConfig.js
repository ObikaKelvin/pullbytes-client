import { 
  DashboardOutlined,
  UserSwitchOutlined,
  ShoppingOutlined,
  TagOutlined,
  BookOutlined,
  UserOutlined, 
  LockOutlined,
  CreditCardOutlined,
  BellOutlined,
  PoweroffOutlined,
  FileExclamationOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/admin/home`,
    title: 'dashboard',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'home',
        path: `${APP_PREFIX_PATH}/admin/home`,
        title: 'home',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'plans',
        path: `${APP_PREFIX_PATH}/admin/plans`,
        title: 'plans',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'plans-list',
            path: `${APP_PREFIX_PATH}/admin/plans/`,
            title: 'plan list',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'add-plan',
            path: `${APP_PREFIX_PATH}/admin/plans/add`,
            title: 'add plan',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'licenses',
        path: `${APP_PREFIX_PATH}/admin/licenses`,
        title: 'licenses',
        icon: TagOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'license-list',
            path: `${APP_PREFIX_PATH}/admin/licenses/`,
            title: 'license list',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'add-license',
            path: `${APP_PREFIX_PATH}/admin/licenses/add`,
            title: 'add license',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      {
        key: 'users',
        path: `${APP_PREFIX_PATH}/admin/users`,
        title: 'Users',
        icon: UserSwitchOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'users-list',
            path: `${APP_PREFIX_PATH}/admin/users`,
            title: 'user list',
            icon: '',
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'add-user',
            path: `${APP_PREFIX_PATH}/admin/users/add`,
            title: 'add user',
            icon: '',
            breadcrumb: false,
            submenu: []
          }
        ]
      },
      // {
      //   key: 'subscriptions',
      //   path: `${APP_PREFIX_PATH}/admin/subscriptions`,
      //   title: 'Subscriptions',
      //   icon: ShoppingOutlined,
      //   breadcrumb: false,
      //   submenu: []
      // },
      {
        key: 'tickets',
        path: `${APP_PREFIX_PATH}/admin/tickets`,
        title: 'tickets',
        icon: FileExclamationOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'feedback',
        path: `${APP_PREFIX_PATH}/admin/feedback`,
        title: 'feedback',
        icon: TagOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'profile',
        path: `${APP_PREFIX_PATH}/admin/profile`,
        title: 'Profile',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      }
    ]
  }, 
]

const userDashBoardNavTree = [
  {
    key: 'dashboard',
    path: `${APP_PREFIX_PATH}/user/home`,
    title: 'User Dashboard',
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: 'home',
        path: `${APP_PREFIX_PATH}/user/home`,
        title: 'home',
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'plans',
        path: `${APP_PREFIX_PATH}/user/plans`,
        title: 'plans',
        icon: BookOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'licenses',
        path: `${APP_PREFIX_PATH}/user/licenses`,
        title: 'licenses',
        icon: TagOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'tickets',
        path: `${APP_PREFIX_PATH}/user/tickets`,
        title: 'tickets',
        icon: FileExclamationOutlined,
        breadcrumb: false,
        submenu: []
      },
      {
        key: 'feedback',
        path: `${APP_PREFIX_PATH}/user/feedback`,
        title: 'feedback',
        icon: TagOutlined,
        breadcrumb: false,
        submenu: []
      },
      // {
      //   key: 'notifications',
      //   path: `${APP_PREFIX_PATH}/user/notifications`,
      //   title: 'notifications',
      //   icon: BellOutlined,
      //   breadcrumb: false,
      //   submenu: []
      // },
      {
        key: 'profile',
        path: `${APP_PREFIX_PATH}/user/profile`,
        title: 'Profile',
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: 'edit-profile',
            path: `${APP_PREFIX_PATH}/user/profile/edit-profile`,
            title: 'Edit Profile',
            icon: UserOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'change-password',
            path: `${APP_PREFIX_PATH}/user/profile/change-password`,
            title: 'Change Password',
            icon: LockOutlined,
            breadcrumb: false,
            submenu: []
          },
          {
            key: 'billing',
            path: `${APP_PREFIX_PATH}/user/profile/billing`,
            title: 'Billing',
            icon: CreditCardOutlined,
            breadcrumb: false,
            submenu: []
          },
        ]
      },
      {
        key: 'signout',
        path: `${APP_PREFIX_PATH}/user/signout`,
        title: 'sign out',
        icon: PoweroffOutlined,
        breadcrumb: false,
        submenu: []
      },
    ]
  }
]

// const navigationConfig = [
//   ...dashBoardNavTree
// ]

const navigationConfig = {
  dashBoardNavTree,
  userDashBoardNavTree
}

export default navigationConfig;

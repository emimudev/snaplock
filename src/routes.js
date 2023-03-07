import { BsFiles } from 'react-icons/bs'
import { HiOutlineStar } from 'react-icons/hi'
import {
  RiBubbleChartLine,
  // RiDashboardLine,
  RiDeleteBin7Line
} from 'react-icons/ri'

export const SIDEBAR_ROUTES = [
  // {
  //   name: 'Overview',
  //   icon: RiDashboardLine,
  //   path: '/overview'
  // },
  {
    name: 'Files',
    icon: BsFiles,
    path: '/files'
  },
  {
    name: 'Shared with me',
    icon: RiBubbleChartLine,
    path: '/shared'
  },
  {
    name: 'Starred',
    icon: HiOutlineStar,
    path: '/starred'
  },
  {
    name: 'Recycle Bin',
    icon: RiDeleteBin7Line,
    path: '/bin'
  }
]

export const ROUTES = [
  ...SIDEBAR_ROUTES,
  {
    name: 'Search',
    path: '/search'
  }
]

export const ROUTES_TITLE = {
  '/overview': 'Overview',
  '/files': 'My files',
  '/shared': 'Shared with me',
  '/favorites': 'Starred',
  '/bin': 'Recycle Bin',
  '/search': 'Search results'
}

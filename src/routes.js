import { BsFiles } from 'react-icons/bs'
import { HiOutlineStar } from 'react-icons/hi'
import {
  RiBubbleChartLine,
  RiDashboardLine,
  RiDeleteBin7Line
} from 'react-icons/ri'

export const ROUTES = [
  {
    name: 'Overview',
    icon: RiDashboardLine,
    path: '/overview'
  },
  {
    name: 'Files',
    icon: BsFiles,
    path: '/files'
  },
  {
    name: 'Shared',
    icon: RiBubbleChartLine,
    path: '/shared'
  },
  {
    name: 'Starred',
    icon: HiOutlineStar,
    path: '/favorites'
  },
  {
    name: 'Recycle Bin',
    icon: RiDeleteBin7Line,
    path: '/bin'
  }
]

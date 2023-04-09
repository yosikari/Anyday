import { HomePage } from './pages/home-page.jsx'
import { AdminApp } from './pages/admin-app.jsx'
import { BoardDetails } from './pages/board-details.jsx'

// Routes accesible from the main navigation (in AppHeader)
const routes = [
    {
        path: '/',
        component: <HomePage />,
        label: 'Home',
    },
    {
        path: 'board-details',
        component: <BoardDetails />,
        label: 'Board Details'
    },
    {
        path: 'admin',
        component: <AdminApp />,
        label: 'Admin Only'
    }
]

export default routes
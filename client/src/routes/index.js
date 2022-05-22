import AddStudent from '../pages/AddStudent'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Schedule from '../pages/Schedule'
import Student from '../pages/Student'
import SetSchedule from '../pages/SetSchedule'
import AddLocation from '../pages/AddLocation'
import Location from '../pages/Location'

// Public Routes
const publicRoutes = [
   { path: '/', component: Home },
   { path: '/login', component: Login },
   { path: '/register', component: Register },
   { path: '/schedule', component: Schedule },
   { path: '/student', component: Student },
   { path: '/addStudent', component: AddStudent },
   { path: '/setSchedule', component: SetSchedule },
   { path: '/addLocation', component: AddLocation },
   { path: '/location', component: Location },

]

const privateRoutes = [
   
]

export { publicRoutes, privateRoutes };
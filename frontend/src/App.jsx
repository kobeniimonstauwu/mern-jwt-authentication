import Header from './components/Header'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
<>
    <Header />
      <ToastContainer />
      <Container className = 'my-2'> {//It has a margin in the y-axis with a level of 2
      }
      <Outlet />
    </Container>
</>
  )
}
export default App
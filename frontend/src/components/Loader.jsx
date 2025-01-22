import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <Spinner
        animation = "border"
        role = "status"
        style = {{
            width: '100px',
            height: '100px',
            margin: 'auto', //Positions the Spinner to the MIDDLE
            display: 'block'

        }}
    ></Spinner>
  )
}

export default Loader
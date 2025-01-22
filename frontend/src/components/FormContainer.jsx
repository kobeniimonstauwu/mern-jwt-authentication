import { Container, Row, Col } from 'react-bootstrap'

const FormContainer = ({ children }) => { // Props for the forms (login and register screens)
  return (
    <Container>
        <Row className = 'justify-content-md-center mt-5'> {
            //The class has styling properties along with it
            //Justify content anc center on medium screens 
        }
            <Col xs = {12} md = {6} className = 'card p-5'>  {
                // If Screen is extra small (xs), the column should take all 12 slices
                // If Screen is medium (md), the column takes 6 slices
                 //inside both the rows and columns are the forms (Such as login and register screens/forms)
            }
            { children }
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer
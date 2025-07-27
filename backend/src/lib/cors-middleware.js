import Cors from 'cors'
import initMiddleware from './middleware'

// Initialize the cors middleware with specific origin
const cors = initMiddleware(
  Cors({
    // Allow only the frontend domain
    origin: ['https://codepix.live', 'http://codepix.live', 'https://www.codepix.live', 'http://www.codepix.live'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200, // some legacy browsers (IE11) choke on 204
  })
)

export default cors

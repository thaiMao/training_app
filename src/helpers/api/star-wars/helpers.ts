import { createThirdPartyEndpoint } from 'app-constants'
import { Protocol } from 'app-constants/helpers'
import { createEndpoint } from 'helpers/api/helpers'

export const createStarWarsEndpoint = createEndpoint(Protocol.https, 'swapi.co')

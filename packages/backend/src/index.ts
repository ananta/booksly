import { createApp } from './createApp'

const PORT = 3001

/**
 * Main entry point for the application.
 *
 * Initializes the Express application and starts the server on the specified port.
 */
const app = createApp()

app.listen(PORT, () => console.log(`App's running on port ${PORT}}`))

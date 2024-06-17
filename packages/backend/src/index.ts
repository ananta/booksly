import { createApp } from './createApp'

const PORT = 3001

const app = createApp()

app.listen(PORT, () => console.log(`App's running on port ${PORT}}`))

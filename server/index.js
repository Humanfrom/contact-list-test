const express = require("express")
const cors = require("cors")
const tableRouter = require('./routes/table_routes')
const PORT = process.env.PORT || 8080

const app = express();
app.use(express.json())
app.use('/api', tableRouter)

app.use(cors());

app.listen(PORT, () => console.log(`server started on post ${PORT}`))

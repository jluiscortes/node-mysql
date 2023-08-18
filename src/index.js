const { PORT } = require("../src/config/environments");
const app = require("../src/server/server");
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

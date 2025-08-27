import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.PORT, () => {
    console.log(`Servidor ON na porta http://localhost:${env.PORT}`);
});

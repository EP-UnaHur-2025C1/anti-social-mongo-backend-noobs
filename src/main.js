const { conectarDataBase } = require('./db/dbMongo');
const express = require('express');
const PORT = process.env.PORT ?? 3001;
const { userRoute, commentRoute, post_imageRoute, postRoute, tagRoute } = require("./routes");
const app = express()
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, '../docs/', 'swagger.yaml'));


app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/user", userRoute);
app.use("/comment", commentRoute);
app.use("/post_image", post_imageRoute);
app.use("/post", postRoute);
app.use("/tag", tagRoute);


app.listen(PORT, async (err) => {
    if (err) {
        console.error(err.message)
        process.exit(1)
    }
    try {
        await conectarDataBase()
    } catch (deError) {
        console.error(deError.message + "fgvdgfgfg")
        process.exit(1)
    }
    console.log(`App iniciada http://0.0.0.0:${PORT}`)
    console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});
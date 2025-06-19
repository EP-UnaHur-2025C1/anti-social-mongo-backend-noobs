const {conectarABase} = require('./db/dbMongo');
const express = require('express');
const PORT = process.env.PORT ?? 3005;
//const { userRoute, commentRoute, post_imageRoute, postRoute, tagRoute, postTagRoute, followerRoute } = require("./routes");
const { userRoute, postRoute } = require("./routes");
const app = express()

app.use(express.json())
//app.use(logRequest);
app.use("/user", userRoute);
//app.use("/comment", commentRoute);
//app.use("/post_image", post_imageRoute);
app.use("/post", postRoute);
//app.use("/tag", tagRoute);
//app.use("/post_tags", postTagRoute);
//app.use("/follower", followerRoute);


app.listen(PORT, async (err) => {
    if (err) {
        console.error(err.message)
        process.exit(1)
    }
    try {
        await conectarABase()
    } catch (deError) {
        console.error(deError.message)
        process.exit(1)
    }
    console.log(`App iniciada http://0.0.0.0:${PORT}`)
});
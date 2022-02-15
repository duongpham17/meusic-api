module.exports = (app) => {

    const environment = process.env.NODE_ENV === "development";

    const port = process.env.PORT || 8000;

    app.listen(port, () => environment && console.log(`listening on port ${port}`) )
}
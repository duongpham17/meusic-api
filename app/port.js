module.exports = (http) => {

    const environment = process.env.NODE_ENV === "development";

    const port = process.env.PORT || 8000;

    http.listen(port, () => environment && console.log(`listening on port ${port}`) )
}
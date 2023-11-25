function runServer (app) {
    const port: number = 3000;

    app.listen(port, ()=>{
        console.log(`server started http://localhost:${ port }`);
    })
}

module.exports = runServer;
const express = require('express')
const next = require('next')
const url = require('url')

const nextApp = next({
    dev: process.env.NODE_ENV === 'development'
})

nextApp.prepare().then(() => {
    const server = express()

    const handler = nextApp.getRequestHandler()

    server.all('*', (req, res) => {
        const parsedUrl = url.parse(req.url, true)
        return handler(req, res, parsedUrl)
    })

    return server.listen(3000, () => console.log("now listening"))
}).catch(err => console.error(err))

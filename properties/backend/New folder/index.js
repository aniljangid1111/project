const http = require('http')

http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/insert') {
        res.end('insert');
    } else if (req.method === 'GET' && req.url === '/view') {
        res.end('view')
    }
    else {
        res.end('error')
    }
}).listen('4000', () => {
    console.log('server is running on 4000 Port')
})

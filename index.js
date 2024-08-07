addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const url = new URL(request.url)
    if (url.pathname === '/inde.php') {
        return handleIndex(request)
    } else if (url.pathname.startsWith('/secure')) {
        return handleSecure(request)
    } else {
        return new Response('Not Found', { status: 404 })
    }
}

async function handleIndex(request) {
    // Replace this with actual logic to get authenticated user info
    const email = 'user@example.com'
    const timestamp = new Date().toISOString()
    const country = 'US' // Replace this with logic to get the user's country

    const responseBody = `
        ${email} authenticated at ${timestamp} from 
        <a href="/secure/${country}">${country}</a>
    `
    return new Response(responseBody, {
        headers: { 'Content-Type': 'text/html' },
    })
}

async function handleSecure(request) {
    const url = new URL(request.url)
    const country = url.pathname.split('/').pop()
    const flagUrl = `https://r2.youraccount.workers.dev/flags/${country}.png`

    const responseBody = `
        <html>
            <body>
                <img src="${flagUrl}" alt="${country} flag">
            </body>
        </html>
    `
    return new Response(responseBody, {
        headers: { 'Content-Type': 'text/html' },
    })
}

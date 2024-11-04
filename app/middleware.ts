// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { Client, Account } from 'node-appwrite'

// const protectedRoutes = ['/account', '/bookings', '/settings']

// const client = new Client()
//     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

// const account = new Account(client)

// export async function middleware(request: NextRequest) {

//     const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

//     if (isProtectedRoute) {
//         const isAuthenticated = await checkUserAuthentication(request)

//         if (!isAuthenticated) {
//             return NextResponse.redirect(new URL('/login', request.url))
//         }
//     } else {
//     }

//     if (request.nextUrl.pathname === '/login') {
//         const isAuthenticated = await checkUserAuthentication(request)
//         if (isAuthenticated) {
//             return NextResponse.redirect(new URL('/account', request.url))
//         }
//     }

//     return NextResponse.next()
// }

// async function checkUserAuthentication(request: NextRequest): Promise<boolean> {
//     const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID
//     if (!projectId) {
//         console.error('Appwrite Project ID is not set')
//         return false
//     }

//     const sessionName = 'a_session_' + projectId.toLowerCase()
//     const sessionId = request.cookies.get(sessionName)?.value


//     if (!sessionId) {
//         return false
//     }

//     try {
//         const session = await account.getSession(sessionId)
//         return true
//     } catch (error) {
//         console.error('Session verification failed:', error)
//         return false
//     }
// }

// export const config = {
//     matcher: [
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// }
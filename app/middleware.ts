// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { Client, Account } from 'node-appwrite'

// const protectedRoutes = ['/account', '/bookings', '/settings']

// const client = new Client()
//     .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || '')
//     .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '')

// const account = new Account(client)

// export async function middleware(request: NextRequest) {
//     console.log('Middleware triggered for path:', request.nextUrl.pathname)

//     const isProtectedRoute = protectedRoutes.some(route => request.nextUrl.pathname.startsWith(route))

//     if (isProtectedRoute) {
//         console.log('Accessing protected route:', request.nextUrl.pathname)
//         const isAuthenticated = await checkUserAuthentication(request)

//         if (!isAuthenticated) {
//             console.log('User not authenticated, redirecting to login')
//             return NextResponse.redirect(new URL('/login', request.url))
//         }
//         console.log('User authenticated, allowing access to protected route')
//     } else {
//         console.log('Accessing non-protected route')
//     }

//     if (request.nextUrl.pathname === '/login') {
//         const isAuthenticated = await checkUserAuthentication(request)
//         if (isAuthenticated) {
//             console.log('Authenticated user accessing login, redirecting to account')
//             return NextResponse.redirect(new URL('/account', request.url))
//         }
//     }

//     console.log('Allowing request to proceed')
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

//     console.log('Checking authentication, sessionId exists:', !!sessionId)

//     if (!sessionId) {
//         console.log('No session ID found in cookies')
//         return false
//     }

//     try {
//         const session = await account.getSession(sessionId)
//         console.log('Session verified successfully:', session.$id)
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
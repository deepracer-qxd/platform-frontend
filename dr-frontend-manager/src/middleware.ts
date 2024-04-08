import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

const authRoutes = ['/home/*'];

function matchesWildcard(path: string, pattern: string): boolean {
	if (pattern.endsWith('/*')) {
		const basePattern = pattern.slice(0, -2);
		return path.startsWith(basePattern);
	}
	return path === pattern;
}

export async function middleware(request: NextRequest) {
	const login = process.env.NEXT_PUBLIC_BASE_URL ?? '';

	if (authRoutes.some(pattern => matchesWildcard(request.nextUrl.pathname, pattern))) {
		const token = request.cookies.get('deep.auth.token');

    if(token?.value != null) return NextResponse.next()
    else {
      return NextResponse.redirect(login)
    }
  }
}
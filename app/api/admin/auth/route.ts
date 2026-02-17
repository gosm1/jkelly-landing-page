import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { secretKey } = await req.json();
        const adminSecret = process.env.ADMIN_SECRET_CODE;

        if (!adminSecret) {
            return NextResponse.json({ error: 'Server config error' }, { status: 500 });
        }

        if (secretKey === adminSecret) {
            return NextResponse.json({ authenticated: true });
        }

        return NextResponse.json({ error: 'Invalid secret key' }, { status: 401 });
    } catch {
        return NextResponse.json({ error: 'Bad request' }, { status: 400 });
    }
}

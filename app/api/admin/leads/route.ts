import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Lead from '@/models/Lead';

export async function POST(req: Request) {
    try {
        const { secretKey } = await req.json();
        const adminSecret = process.env.ADMIN_SECRET_CODE;

        if (!adminSecret || secretKey !== adminSecret) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await dbConnect();

        const leads = await Lead.find({}).sort({ createdAt: -1 }).lean();

        return NextResponse.json({ leads });
    } catch (error) {
        console.error('Error fetching leads:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

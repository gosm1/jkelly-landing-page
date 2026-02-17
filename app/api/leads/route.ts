import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Lead from '@/models/Lead';
import { scoreLead } from '@/lib/scoreLead';

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.name || !body.email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        await dbConnect();

        // Create lead immediately (fast response for user)
        const lead = await Lead.create(body);

        // Score lead with AI in the background (don't block the response)
        scoreLead(body)
            .then(async (result) => {
                try {
                    await Lead.findByIdAndUpdate(lead._id, {
                        score: result.score,
                        status: result.status,
                        analysis: result.analysis,
                    });
                } catch (err) {
                    console.error('Failed to update lead score:', err);
                }
            })
            .catch((err) => {
                console.error('Lead scoring failed:', err);
            });

        return NextResponse.json({ success: true, data: lead }, { status: 201 });
    } catch (error) {
        console.error('Error creating lead:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

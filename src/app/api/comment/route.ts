import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    useCdn: process.env.NODE_ENV === "production",
    token: process.env.SANITY_API_TOKEN,
}
const client = createClient(config);

export async function POST(req: Request) {
    const res = await req.json();
    const { _id, name, email, comment } = res;

    try {
        await client.create({
            _type: "comment",
            post: {
                _type: "reference",
                _ref: _id,
            },
            name,
            email,
            comment,
        })
    } catch (err) {
        return res.status(500).json({ message: "couldn't submit comment", err })
    }
    return NextResponse.json({ message: "comment submitted" })
}

// export async function GET(req: NextRequest) {
//     return new Response("This is a new API route");
//   }
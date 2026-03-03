import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { error } = await supabase.from("submitted_profiles").insert([
      {
        type: body.type,
        first_name: body.firstName,
        last_name: body.lastName,
        email: body.email,
        location: body.location,
        bio: body.bio || null,
        skills: body.skills ?? [],
        linkedin: body.linkedin || null,
        website: body.website || null,
        agency_name: body.agencyName || null,
        agency_description: body.agencyDescription || null,
        agency_stage: body.agencyStage || null,
        looking_for: body.lookingFor || null,
        status: "pending",
      },
    ]);

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

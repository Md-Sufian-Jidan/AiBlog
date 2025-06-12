import { ConnectDB } from "@/lib/config/db";
import EmailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

const loadDB = async () => {
    await ConnectDB();
}
loadDB();

export async function POST(request) {
    const formData = await request.formData();
    const emailData = {
        email: `${formData.get('email')}`,
    }
    await EmailModel.create(emailData);

    return NextResponse.json({ success: true, message: "Email Subscribed" });
};

export async function GET(request) {
    const emails = await EmailModel.find({});
    return NextResponse.json({ emails })
}

// Creating Api Endpoint To Delete Email
export async function DELETE(request) {
    const id = await request.nextUrl.searchParams.get("id");
    await EmailModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Email Deleted" });
};

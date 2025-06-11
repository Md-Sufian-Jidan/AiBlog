const { NextResponse } = require("next/server");


export async function GET(request) {
    console.log('Blog get hit');
    return NextResponse.json({ message: "Api Working" });
};
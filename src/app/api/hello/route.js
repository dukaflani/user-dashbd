// NextJs Imports
import { NextResponse } from "next/server";
import { cookies } from 'next/headers';


export async function GET(request) {
    const cookieStore = cookies();
    const token = cookieStore.get('d_rt_df');
    const refresh = token ? token?.value : null
    

    if (refresh === null) {
        return NextResponse.json({ error: 'User not logged in' }, { status: 401 })
    } else {
        return NextResponse.json({ token: refresh }, { status: 200 })
    }

}
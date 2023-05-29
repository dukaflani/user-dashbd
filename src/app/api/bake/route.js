import { cookies } from 'next/headers';

export async function POST(request) {
        const res = await request.json();
        const token = res.refreshToken

        if (token) {
            cookies().set({
                name: 'd_rt_df',
                value: token,
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 365,
                sameSite: 'strict',
                path: '/',
                domain: process.env.NODE_ENV !== 'development' && process.env.COOKIE_DOMAIN
              });
        } else {
            return
        }

        
        return new Response('Cookie Successfully Baked. Yummmy!!!', { status: 200 });
}



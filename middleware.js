import { getToken } from 'next-auth/jwt';
import { NextResponse }	from 'next/server'; 





export async function middleware(req){
	//Token Will exist if the user is logged in
	const token = await getToken({req, secret: process.env.JWT_SECRET});
	

	let url = req.url
	//Allow the request if the following is true...
	// 1) Its a request for next-auth session & Provider fetching
	// 2) The token exists

	if(!token && url==='http://localhost:3000/'){
		return NextResponse.redirect("http://localhost:3000/login");
	}

	if(token && url==='/login'){
		return NextResponse.redirect("/");
	}

	

}


import { getProviders , signIn, useSession } from 'next-auth/react'
import Image from "next/image";
import Loader from "../components/Loader";
import {AiOutlineInstagram} from 'react-icons/ai'

function login({providers}){
	const { data: session } = useSession();
	if (session) return <Loader />;
	
	return(
																						
		<div className="bg-black min-h-screen w-full flex flex-col justify-center items-center" >

			<img className="w-52 mb-5" src="https://links.papareact.com/9xl" alt=""/>
			{Object.values(providers).map((provider)=>(
				<div key={provider.name} >
					<button className="bg-[#18D860] text-white p-5 m-5 rounded-full" 
						onClick={()=>signIn(provider.id,{callbackUrl:"/"})}
					>Login with {provider.name}</button>
				</div>
			))}
			<a 
			href="https://spotify-clone-manual.netlify.app"
			className="text-[#18D860] drop-shadow-md shadow-blue-600/50">Click here to Learn How to Use</a>
			<a 
			href="https://www.instagram.com/nuthejashari/"
			className="absolute bottom-2 right-2 text-sm text-white mt-1">
			<AiOutlineInstagram className="h-5 w-5 absolute right-[182px]"/>Made With ❤️ by Thejas Hari
			</a>
		</div>
		)
}

export async function getServerSideProps(){
	const providers = await getProviders();
	return{
		props: {
			providers 

		}
	}

}

export default login;


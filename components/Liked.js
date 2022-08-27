import React,{useState,useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState, saveState } from '../atoms/playlistAtom'
import Settings from './Settings'
import {settingsState} from '../atoms/slideAtom'
import { useSession } from 'next-auth/react'
import { slideBar } from '../atoms/slideAtom'
import { ChevronDownIcon } from '@heroicons/react/outline' 
import {shuffle} from 'lodash'
import Lsongs from './Lsongs'

const colors =[
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
]


function Liked(){

	const [saved,setSaved] = useRecoilState(saveState);
	const [color,setColor] = useState("from-pink-500");
	const [reveal,setReveal] = useRecoilState(settingsState);
	const {data: session} = useSession();
	const [slidebar,setSlidebar] = useRecoilState(slideBar);


	function handleSettings(){
		if(reveal === false){
			setReveal(true)
		}
		if(reveal === true){
			setReveal(false)
		}
	}

	useEffect(()=>{
		setInterval(()=>{
		setColor(shuffle(colors).pop())
		
	},10000)

	},[])
	



	return(

		<div className="flex-grow h-screen w-screen overflow-y-scroll scrollbar-hide">
	
			<Settings func={handleSettings} reveal={reveal} />
			<header className="absolute top-5 right-8" >	
				<div className="flex items-center bg-black space-x-3 opacity-90 
				hover:opacity-80 cursor-pointer rounded-full p-1 text-white pr-2" 
				onClick={handleSettings}
				>
					<img 
					className="rounded-full w-10 h-10" 
					src={session?.user?.image} 
					alt=""
					/>
					<h2 className="hidden md:inline-flex" >{session?.user.name}</h2>
					<ChevronDownIcon className="h-5 w-5"/>
				</div>
			</header>

			<section className={`flex items-end space-x-7
				bg-gradient-to-b to-black ${color} h-80
				text-white p-8`} >
				<img className="h-44 w-44 shadow-2xl rounded-full transition-all duration-500 ease-in-out"
				 src="https://preview.redd.it/rnqa7yhv4il71.jpg?width=640&crop=smart&auto=webp&s=819eb2bda1b35c7729065035a16e81824132e2f1" alt=""/>
				<div>
						
					
					<h1 className={`${slidebar ? "hidden" : ""} text-2xl md:text-3xl xl:text-5xl font-bold`}> 
						Liked Songs
					</h1>
				</div>
			</section>

			<div>
				<Lsongs tracks={saved} />
			</div>

		</div>


		)
}

export default Liked;
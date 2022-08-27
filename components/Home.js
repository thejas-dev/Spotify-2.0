import React,{useState,useEffect} from 'react'
import { ChevronDownIcon } from '@heroicons/react/outline' 
import { IoMdArrowRoundBack } from 'react-icons/io'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil'
import { playlistIdState, playlistState,categoriesState } from '../atoms/playlistAtom'
import {settingsState} from '../atoms/slideAtom'
import {categoryState,categoryImageState} from '../atoms/categoryAtom'
import Settings from './Settings'
import {shuffle} from 'lodash'
import Songs from './Songs'
import { slideBar } from '../atoms/slideAtom'
import Categories from './Categories'

const colors =[
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
]



function Home(){
	const [color,setColor] = useState(null);
	const [reveal,setReveal] = useRecoilState(settingsState);
	const [categories,setCategories] = useRecoilState(categoriesState);
	const [category,setCategory] = useRecoilState(categoryState)
	const [categoryImage,setCategoryImage] = useRecoilState(categoryImageState)
	const {data: session} = useSession();
	const [slidebar,setSlidebar] = useRecoilState(slideBar);
	const spotifyApi = useSpotify();

	useEffect(()=>{
		setColor(shuffle(colors).pop())
		
	}, [])


	function handleSettings(){
		if(reveal === false){
			setReveal(true)
		}
		if(reveal === true){
			setReveal(false)
		}
	}


	useEffect(()=>{
		spotifyApi.getCategories({limit: 50,country: 'IN',offset:2}).then((data)=>{
			setCategories(data.body.categories)
		})
		.catch(err=>{console.log("Categories on Load")})
	},[])

	return(

		<div className="flex-grow h-screen w-screen overflow-y-scroll scrollbar-hide">
		{category && <IoMdArrowRoundBack className="absolute h-7 w-7 text-white rounded-full shadow top-10 ml-[7px] md:top-3 md:ml-2  drop-shadow-md shadow-white
			hover:scale-[1.15] transition duration-300 ease-in-out cursor-pointer"
			onClick={()=>{
				setCategoryImage(false)
				setCategory(false)
			}}
			/>}	
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
				<img className="h-44 w-44 shadow-2xl transition-all duration-500 ease-in-out"
				 src={categoryImage ? categoryImage.icons[0].url :
				 	session?.user?.image } alt=""/>
				<div>
						<p className={`${slidebar ? "hidden" : ""}`} >
							{categoryImage ? "Top Releases From" : "Trending" }
						</p>
					
					<h1 className={`${slidebar ? "hidden" : ""} text-2xl md:text-3xl xl:text-5xl font-bold`}> 
						{categoryImage.name ? categoryImage.name :" TOP CATEGORIES "}
					</h1>
				</div>
			</section>

			<div>
				<Categories/>
			</div>

		</div>




		)
}

export default Home
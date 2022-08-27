import React,{useEffect,useState} from 'react'
import useSpotify from '../hooks/useSpotify';
import {shuffle} from 'lodash'
import { useSession } from 'next-auth/react'
import { useRecoilState } from 'recoil'
import {settingsState} from '../atoms/slideAtom'
import Settings from './Settings'
import { ChevronDownIcon } from '@heroicons/react/outline' 
import {BiSearchAlt} from 'react-icons/bi'
import {searchState,searchResultState} from '../atoms/searchAtom'
import Ssongs from './Ssongs'
import { slideBar } from '../atoms/slideAtom'


const colors =[
	"from-indigo-700",
	"from-blue-700",
	"from-green-700",
	"from-red-700",
	"from-yellow-700",
	"from-pink-700",
	"from-purple-700",
]



function Search(argument) {
	const {data: session} = useSession();
	const [color,setColor] = useState(null);
	const spotifyApi = useSpotify();
	const [search,setSearch] = useRecoilState(searchState)
	const [searchResult,setSearchResult] = useRecoilState(searchResultState)
	const [reveal,setReveal] = useRecoilState(settingsState)
	const [slidebar,setSlidebar] = useRecoilState(slideBar);
	const [artist,setArtist] = useState(false)
	const [limit,setLimit] = useState(25)


	function handleSettings(){
		if(reveal === false){
			setReveal(true)
		}
		if(reveal === true){
			setReveal(false)
		}
	}
	useEffect(()=>{
		setColor(shuffle(colors).pop())
		
	}, [search])
	
	useEffect(()=>{
		console.log("ran")
		if(artist){
			spotifyApi.searchTracks('artist:'+search,{limit:limit,country:'IN'}).then((data)=>{
			setSearchResult(data.body.tracks.items)
			}).catch(err=>{console.log(err)})
		}else{
			spotifyApi.searchTracks(search,{limit:limit,country:'IN'}).then((data)=>{
			setSearchResult(data.body.tracks.items)
			}).catch(err=>{console.log(err)})	
		}
	},[search,limit,artist])



	return(
		<div className="flex-grow h-screen overflow-y-scroll scrollbar-hide  z-auto">
			<Settings func={handleSettings} reveal={reveal} />
			

			<section className={`flex space-x-7
				bg-gradient-to-b to-black ${color} h-80
				text-white p-8 relative z-0 `} >

				<input type="text" className="mt-[194px] text-center w-full h-[50px] text-lg md:text-xl rounded-full
				 bg-gray-700 bg-opacity-70 border border-gray-900 focus:border-none focus:border-red-500 focus:bg-opacity-90 "
				 placeholder={slidebar? " " :  "What do you want to listen to?" }
				 onChange={(e)=>{setSearch(e.target.value)}}
				 />
				 <BiSearchAlt className="button h-7 w-7 absolute left-[20px] top-[237px]" />
				 {artist?  
				 	<p className="button h-7 w-7 text-[13px]  md:text-[17px] opacity-90 absolute right-[60px]
				 	top-[242px] md:right-[70px] md:top-[237px]"
				 	onClick={()=>setArtist(false)}
				 	>Artist</p>
				 	:
				 	<p className="button h-7 w-7 text-[13px]  md:text-[17px] opacity-50 absolute right-[60px]
				 	top-[242px] md:right-[70px] md:top-[237px]"
				 	onClick={()=>setArtist(true)}
				 	>Artist</p>
				  }
				 
				<span className="absolute top-[160px] text-3xl font-bold">Search</span>
			</section>
			







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

			<div>
				<Ssongs/>
			</div>
			<div className={`flex items-center mb-5 justify-center ${searchResult ? "block" : "hidden"} `} onClick={()=>{
				if(limit===25){	
					setLimit(50)
				}else{
					setLimit(25)
				}
			}}>
				<p className="text-white cursor-pointer transition
				 duration-500 ease-in-out hover:scale-[1.2] font-bold" 
				 id="seeMore"
				 >
				 {limit===25 ?  "See More..." : "See Less..."}
				 </p>
			</div>
			<div className={`flex items-center opacity-50 mb-5 justify-center ${searchResult ? "hidden" : "block" } `} >
				<p className="text-white cursor-pointer transition
				 duration-500 ease-in-out hover:scale-[1.2] font-bold" 
				 id="seeMore"
				 >
				 ...Search For Tracks and Artist's Songs...
				 </p>
			</div>
		<br/><br/><br/><br/>
		</div>

		)
	
}
export default Search
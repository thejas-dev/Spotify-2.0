import useSpotify from '../hooks/useSpotify'
import React,{useState,useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { playlistsState } from '../atoms/playlistAtom'
import Settings from './Settings'
import {settingsState} from '../atoms/slideAtom'
import { useSession } from 'next-auth/react'
import { slideBar } from '../atoms/slideAtom'
import { ChevronDownIcon } from '@heroicons/react/outline' 
import {shuffle} from 'lodash'
import PlaylistCard from './PlaylistCard'
import {typeState} from '../atoms/categoryAtom'
import Liked from './Liked'
import Recent from './Recent'
import Recommendation from './Recommendation'
import { saveState } from '../atoms/playlistAtom'
import {currentTrackIdState,isPlayingState } from '../atoms/songAtom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';


const colors =[
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
]

const appId = '626e633e-73a2-4dc6-9af8-ce6d009305ae';
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);

function Library(argument) {
	const spotifyApi = useSpotify()
	const {listening} = useSpeechRecognition();
	const [type,setType] = useRecoilState(typeState)
	const [saved,setSaved] = useRecoilState(saveState);
	const [color,setColor] = useState("from-pink-500");
	const [reveal,setReveal] = useRecoilState(settingsState);
	const {data: session} = useSession();
	const [slidebar,setSlidebar] = useRecoilState(slideBar);
	const [info,setInfo] = useState(null)
	const [artist,setArtist] = useState(null)
	const [recommendations,setRecommendations] = useState(null)
	const [playlists,setPlaylists] = useRecoilState(playlistsState);
	const [favSong,setFavSong] = useState(null)
	const [recentTracks,setRecentTracks] = useState(null)
	const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
	const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
	


	useEffect(()=>{
		spotifyApi.getMyTopArtists().then(data=>{
			setArtist(data.body.items[0])
			spotifyApi.getRecommendations({
				      	min_energy: 0.4,
				      	seed_artists: [data.body.items[0].id],
				      	min_popularity: 50,
				      	limit:10
				    })
				  	.then(function(data) {
				    	let recommendations2 = data.body.tracks;
				    	setRecommendations(recommendations2);
				  	}),function(err) {
				    	console.log("Something wet wrong!", err);
				  	};
			 	}).catch(err=>console.log(err))
			spotifyApi.getMyTopTracks().then(data=>setFavSong(data.body.items[0])).catch(err=>console.log(err))
			spotifyApi.getMe().then((data)=>{setInfo(data.body)}).catch(err=>console.log(err))	
			spotifyApi.getMyRecentlyPlayedTracks({limit : 14}).then(function(data) {setRecentTracks(data.body.items)}, function(err){console.log('Something went wrong!', err)});
	},[])


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
	
	const playFav = () =>{
		spotifyApi.getMyDevices().then(data=>{
 		
 		if(data.body.devices.length !== 0){
			setCurrentTrackId(favSong.id);
 			setIsPlaying(true);
 			spotifyApi.play({
 	 			uris: [favSong.uri],  //uniform resource identifier

 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
 		}else{
 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
 		}

 	}).catch(err=>console.log("something happened",err))
	}


		
		
		

	const openLiked = () =>{
		setType(<Liked/>)
	}




	return(
		<div className="flex-grow h-screen  w-screen overflow-y-scroll scrollbar-hide">
	
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
				<img className="h-44 w-44 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.3)] shadow-pink-600 rounded-full transition-all duration-500 ease-in-out"
				 src="https://upload.wikimedia.org/wikipedia/commons/7/74/Spotify_App_Logo.svg" alt=""/>
				<div>
					<h1 className={`${slidebar ? "hidden" : ""} text-2xl md:text-3xl xl:text-5xl font-bold`}> 
						Your Library
					</h1>	
					
					
				</div>
			</section>

			<div className="px-8 flex flex-col space-y-1 pb-28 text-white" >
				<div class="rounded overflow-hidden shadow-lg">
				  <img class="rounded-full mx-auto shadow-[0px_0px_30px_0px] md:shadow-[0px_0px_50px_0px] mt-10 md:shadow-indigo-600 shadow-indigo-600 " src={session?.user?.image} alt="Sunset in the mountains"/>
				  <div class="px-6 mt-8 py-4">
				  	<div>
				   	 	<div class="font-bold text-2xl text-center mb-2">{info?.product.charAt(0).toUpperCase() + info?.product.slice(1)} Account</div>
				    </div>
				    <div className="grid grid-cols-1 md:grid-cols-2 mt-14 text-center space-y-3" >
					    <div>
						    <div className="font-bold text-xl mb-2">Name :-</div>
						    	<p class="text-gray-700 mb-2 text-base">
						   		  {info?.display_name}
						    	</p>
							 </div>
					    <div>
					    <div>
						    <div className="font-bold text-xl mb-2">Email :-</div>
							    <p class="text-gray-700 mb-2 text-base">
							    	{info?.email}
							    </p>
						    </div>
						</div>
						<div>
					    	<div className="font-bold text-xl mb-2">Followers :-</div>
					    		<p className="text-gray-700 mb-2 text-base">
					    			{info?.followers?.total}
					    		</p>
					    </div>
					    <div>
					    	<div className="font-bold text-xl mb-2">Country :-</div>
					    		<p className="text-gray-700 mb-2 text-base">
					    			{info?.country}
					    		</p>
					    </div>
					    <div>
					    	<div className="font-bold text-xl mb-2">Microphone State:-</div>
					    		<p className="text-gray-700 mb-2 text-base">
					    			{listening ? "On" : "Off"}
					    		</p>
					    </div>
					    <div>
					    	<div className="font-bold text-xl mb-2">Account Level:-</div>
					    		<p className="text-gray-700 mb-2 text-base">
					    			{info?.product === "premium" ? "Premium" : "Non-Premium"}
					    		</p>
					    </div>
					</div>	

					<header className="mt-8 mb-5" >	
						<div className="flex items-center bg-black space-x-3 opacity-90 
						hover:opacity-80 cursor-pointer justify-center shadow-lg shadow-indigo-600 p-3 rounded-full p-1 text-white pr-2"
						onClick={()=>openLiked()}
						>
							<img 
							className="rounded-full w-10 h-10" 
							src="https://community.spotify.com/t5/image/serverpage/image-id/104727iC92B541DB372FBC7/image-size/large?v=v2&px=999"
							alt=""
							/>
							<h2 className="hidden md:inline-flex" > {saved.total} Liked Songs</h2>
							
						</div>
					</header>
					<div className="mt-10">
						<div className="font-bold text-2xl mb-2 text-center">Recently Played</div>
						<hr className="text-gray-700 opacity-40 mt-2 mb-3"/>
						<div className="flex flex-wrap justify-evenly gap-6">
							{recentTracks?.map(recent=>(
								<Recent recent = {recent}/>
							))}
						</div>


					</div>
					<div className="mt-10">
						<div className="font-bold text-2xl mb-2 text-center">Your Favorites</div>
						<hr className="text-gray-700 opacity-40 mt-2 mb-3" / >
							<div className="grid-cols-1 space-y-5 md:grid-cols-2 mt-5 grid">
								<div>
									<p className="text-gray-500 mb-2 text-center">
					    				Favorite Artist
					    			</p>
					    			<img src={artist?.images[2]?.url} className="mx-auto rounded-full h-[15rem] w-[15rem]" alt="..." />
					    			<p className="text-center text-gray-700 mt-2 mb-2">
					    				{artist?.name}
					    			</p>
								</div>
								<div>
									<p className="text-gray-500 mb-2 text-center">
					    				Favorite Song
					    			</p>
					    			<div className="h-50 w-50 cursor-pointer hover:scale-[1.1] transition duration-300 ease-in-out"
					    			onClick={()=>playFav()}
					    			>
					    			<img src={favSong?.album?.images[0]?.url} className=" mx-auto rounded-full h-[15rem] w-[15rem] " alt="..." />
					    			
					    			</div>
					    			<p className="text-center text-gray-700 mt-2 mb-2">
					    				{favSong?.name}
					    			</p>
								</div>
							</div>
						</div>
					</div>
					<div className="mt-5">
						<h1 className="text-center font-bold text-2xl mb-3">Recommended For You</h1>
						<hr className="text-gray-700 opacity-40 mt-2 mb-3" / >
						<div className="grid grid-cols-2 lg:grid-cols-5 md:grid-cols-3 text-center  gap-5">
							{recommendations?.map(recommendation=>(
								<Recommendation recommendation={recommendation} />
							))}
						</div>
					</div>
					<div className="mt-5">
						<h1 className="text-center font-bold text-2xl mb-3">Your Playlists</h1>
						<hr className="text-gray-700 opacity-40 mt-2 mb-3" / >
							<div className="grid grid-cols-2 md:grid-cols-3  text-center ">
								{playlists?.map(playlist=>(
										<PlaylistCard playlist={playlist} />
								))}
						</div>
					</div>
				  
	
				</div>
			</div>

		</div>



		)
}

export default Library
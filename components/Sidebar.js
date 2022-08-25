import {
	HomeIcon,
	SearchIcon,
	LibraryIcon,
	PlusCircleIcon,
	RssIcon,
	MenuAlt2Icon,
	XCircleIcon
} from '@heroicons/react/outline'
// import alanBtn from "@alan-ai/alan-sdk-web";
import { HeartIcon } from '@heroicons/react/solid'
import {currentTrackIdState,isPlayingState } from '../atoms/songAtom'
import wordsToNumbers from 'words-to-numbers';
import { signOut, useSession } from 'next-auth/react'
import { useState,useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import { slideBar } from '../atoms/slideAtom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill';
import {micState} from '../atoms/slideAtom'




function Sidebar(){
	
	const spotifyApi = useSpotify();
	const { data: session, status } = useSession();
	const [playlists,setPlaylists] = useState([]);
	 const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);
	const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
	const [slidebar,setSlidebar] = useRecoilState(slideBar);
	const [mic,setMic] = useRecoilState(micState)
	const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

	useEffect(()=>{
		const alanBtn = require('@alan-ai/alan-sdk-web');
		const alanBtnInstance = alanBtn({
			key:'469321f30d175ed466a2b549ebb87b342e956eca572e1d8b807a3e2338fdd0dc/stage',
			onCommand: (commandData) =>{
				if(commandData.command === "searchSong" ){
					searchSong(commandData.query)
				}
				if(commandData.command === "nextSong"){
					nextSong();
				}
				if(commandData.command === "previousSong"){
					previousSong();
				}
				if(commandData.command === "pauseSong"){
					pauseSong();
				}
				if(commandData.command === "playFavorite"){
					playFavorite();
				}
				if(commandData.command === "howtouse"){
					alert("Please visit to our manual page in the login page");
				}
				if(commandData.command === "playArtists"){
					playArtists();
				}
				if(commandData.command === "playSong"){
					if (isNaN(commandData.query)){
						let n = wordsToNumbers(commandData.query)
						let num = n-1
						playSong(num)
					}else{
					let num = commandData.query - 1
					playSong(num)
					}
				}
			},
			rootEl: document.getElementById("alan-btn"),
		    bottom: '100px',
		    right: '15px',
		    zIndex: 10
		});
	},[])



	useEffect(()=>{
		//if spotifyapi has access token
		if(spotifyApi.getAccessToken()){
			spotifyApi.getUserPlaylists().then((data)=>{
				setPlaylists(data.body.items)
				// own
				setPlaylistId(data.body.items[0].id)
				// own
			}).catch(err=>{});
		};


	},[])

	const revealSearch = () =>{
		let slidebar = document.getElementById('slidebar')
		slidebar.classList.remove('hidden')
		setSlidebar(true)
	}
	const hideSearch = () =>{
		let slidebar = document.getElementById('slidebar')
		slidebar.classList.add('hidden')
		setSlidebar(false)
	}

	function playSong(num){
		console.log("playing")
		spotifyApi.getPlaylist(playlistId).then((data)=>{
			if(num > data?.body.tracks.total || num < 0 ){
				alert(`There are only ${data?.body.tracks.total} Songs in this playlist`)
			}
			let uri = data?.body.tracks.items[num].track.uri
			let id = data?.body.tracks.items[num].track.id
			spotifyApi.getMyDevices().then(data=>{
 				if(data.body.devices.length !== 0){
					setCurrentTrackId(id);
		 			setIsPlaying(true);
		 			spotifyApi.play({
		 	 			uris: [uri],  //uniform resource identifier

		 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
		 		}else{
		 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
		 		}

		 	}).catch(err=>console.log("something happened",err))

		}).catch((error)=>console.log("Playlist On Load"));

	}

	useEffect(()=>{
		// let query = 0
		// let num = query - 1
		// let num = "nine"
		// let num2 = wordsToNumbers(num)
		// playSong(num2-1)
		// searchSong('Vijay')
		// playFavorite();
		// playArtists()
		savedTracks()
	},[])

	function savedTracks(){
		spotifyApi.getMySavedTracks({
			limit:10,
			offset:0
		}).then((data)=>{
			console.log(data.body)
		}).catch(err=>{
			console.log(err)
		})
	}

	function searchSong(name){
		spotifyApi.searchPlaylists(name)
    	// limit:5,
    	// offset:0,
    	// country: 'IN'
	    .then((data)=>{
	    	setPlaylistId(data.body.playlists.items[0].id)
	    },function(err){
	    	console.log("something went wrong",err)
	    })
	}

	function playFavorite(){
		spotifyApi.getMyTopTracks().then((data)=>{
			console.log("playing your Favorite song")
			let uri = data?.body?.items[0].uri
			let id = data?.body?.items[0].id
			spotifyApi.getMyDevices().then(data=>{
 				if(data.body.devices.length !== 0){
					setCurrentTrackId(id);
		 			setIsPlaying(true);
		 			spotifyApi.play({
		 	 			uris: [uri],  //uniform resource identifier

		 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
		 		}else{
		 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
		 		}

		 	}).catch(err=>console.log("something happened",err))
		}).catch(err=>{
			alert("No Favorite Tracks")
		})
	}

	function playArtists(){
		spotifyApi.getMyTopArtists().then((data)=>{
			console.log("playing your artist Favorite song")
			spotifyApi.getArtistAlbums(data.body.items[0].id).then((data)=>{
				spotifyApi.getAlbumTracks(data?.body?.items[0].id,{limit: 5, offset:0}).then(data=>{
					let uri = data?.body?.items[1].uri
					let id = data?.body?.items[1].id
					spotifyApi.getMyDevices().then(data=>{
		 				if(data.body.devices.length !== 0){
							setCurrentTrackId(id);
				 			setIsPlaying(true);
				 			spotifyApi.play({
				 	 			uris: [uri],  //uniform resource identifier

				 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
				 		}else{
				 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
				 		}

				 	}).catch(err=>console.log("something happened",err))
				}).catch(err=>{
					console.log("something went wrong")
				})
				
				
			}).catch((err)=>{
				console.log("something went wrong")
			})
		}).catch(err=>{
			alert("No Favorite Artists")
		})
	}

	function nextSong(){
		spotifyApi.skipToNext().catch(err=>console.log("No Tracks Are Playing"));
	}
	function previousSong(){
		spotifyApi.skipToPrevious().catch(err=>console.log("No Tracks Are Playing"));
	}
	function pauseSong(){
		spotifyApi.pause().catch(err=>console.log("No Tracks Are Playing"));
	}

	useEffect(()=>{
		const appId = "626e633e-73a2-4dc6-9af8-ce6d009305ae"
		const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId);
		SpeechRecognition.applyPolyfill(SpeechlySpeechRecognition);
	})


	const startListening = () => {
		SpeechRecognition.startListening({ continuous: true });
	}

	useEffect(()=>{
		if (mic===true) {
			startListening()
		}else{
			SpeechRecognition.stopListening()
		}
	},[mic])








	return(
	<div>	
		{slidebar ? <button 
		className=" rounded-full mt-2 button text-white shadow ml-12 md:hidden border-r border-gray-100 w-[50px]" 
		onClick={hideSearch}
		>
		close
		</button>:<MenuAlt2Icon 
		onClick={revealSearch}
		id="toggleIcon"
		className="h-7 w-7 text-white fixed md:hidden button  shadow rounded-full" 
		/>

		}

		
		<div 
		id = "slidebar"
		className="text-gray-500 p-5 hidden text-xs lg:text-sm border-r border-gray-900
		overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem]  md:inline-flex pb-36 ">
		 	
			<div className="space-y-4" >
				<img className="w-[100px]" src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png" alt=""/>
				
				<button className="flex items-center space-x-2 
				hover:text-white ">
					<HomeIcon className="h-5 w-5 mt-2"/>
					<p className="mt-2" >Home</p>
				</button>
				<button className="flex items-center space-x-2 
				hover:text-white">
					<SearchIcon 
					className="h-5 w-5"/>
					<p>Search</p>
				</button>
				<button className="flex items-center space-x-2 
				hover:text-white">
					<LibraryIcon className="h-5 w-5"/>
					<p>Your Library</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900 " />

				<button className="flex items-center space-x-2 
				hover:text-white">
					<PlusCircleIcon className="h-5 w-5"/>
					<p>Create Playlist</p>
				</button>
				<button className="flex  items-center space-x-2 
				hover:text-white">
					<HeartIcon className="h-5 w-5 text-blue-500"/>
					<p>Liked Songs</p>
				</button>
				<button className="flex items-center space-x-2 
				hover:text-white">
					<RssIcon className="h-5 w-5 text-green-500"/>
					<p>Your Library</p>
				</button>
				<hr className="border-t-[0.1px] border-gray-900 " />
				<input value={transcript} type="textarea"/>
			{/*Playlists*/}
				{playlists.map((playlist)=>(
					<p
					onClick={()=>setPlaylistId(playlist.id)}
					key = {playlist.id}
					className="cursor-pointer hover:text-white ">{playlist.name}</p>
				))}

				
				

			</div>

		</div>
	</div>
		)

}

export default Sidebar;
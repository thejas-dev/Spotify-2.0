import useSpotify from '../hooks/useSpotify'
import { useSession } from 'next-auth/react'
import {currentTrackIdState,isPlayingState } from '../atoms/songAtom'
import {useRecoilState} from 'recoil'
import {useState,useEffect,useCallback} from 'react'
import useSongInfo from '../hooks/useSongInfo'
import { debounce } from 'lodash';
import {HeartIcon,
	VolumeUpIcon as VolumeDownIcon,
	} from '@heroicons/react/outline'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import {
	RewindIcon,
	SwitchHorizontalIcon,
	FastForwardIcon,
	PauseIcon,
	PlayIcon,
	ReplyIcon,
	VolumeUpIcon,
} from '@heroicons/react/solid'





function Player(){

	const { data: session, status } = useSession();
	const spotifyApi = useSpotify();
	const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState);
	const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState);
	const [volume,setVolume] = useState(50)
	const songInfo = useSongInfo();
	const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

	const fetchCurrentSong = () =>{
		if(!songInfo){
			spotifyApi.getMyCurrentPlayingTrack().then(data=>{
				setCurrentTrackId(data.body?.item?.id);
		 
			spotifyApi.getMyCurrentPlaybackState().then(data=>{
				setIsPlaying(data.body?.is_playing);
			})

			})	

		}
	}



	useEffect(()=>{
		if(volume > 0 && volume < 100 ){
			debouncedAdjustVolume(volume);
		}
	},[volume])

	const debouncedAdjustVolume = useCallback(  // sets the volume of spotify api after 500ms after the volume onChange event stopped
		debounce((volume)=>{

			spotifyApi.setVolume(volume).catch((err)=>{})
		},500), 
		[]
	);


	const handlePlayPause = () =>{
		spotifyApi.getMyCurrentPlaybackState().then((data)=>{
			if(data.body.is_playing){
				spotifyApi.pause().catch(err=>console.log("No Tracks Are Playing"));
				setIsPlaying(false);
			}else{
				spotifyApi.play().catch(err=>console.log("No Tracks Are Playing"));
				setIsPlaying(true);
			}
		}).catch(err=>console.log("No Tracks Are Playing"))
	}


	useEffect(()=>{
		if(spotifyApi.getAccessToken() && !currentTrackId){
			//fetch the song info
			fetchCurrentSong();
			setVolume(50);
		}


	},[currentTrackId,spotifyApi,session])


	return(
		<div className="h-24 bg-gradient-to-b from-black 
		to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8 ">	
			<div className="flex items-center space-x-4 ">
				<img 
				className="hidden md:inline h-10 w-10"  
				src={songInfo?.album?.images?.[0]?.url} 
				alt=""/>
				<div>
				<h3>{songInfo?.name}</h3>
				<p>{songInfo?.artists?.[0]?.name}</p>
			</div>
			</div>
			{/*center*/}
			<div className="flex items-center justify-evenly" >
				<SwitchHorizontalIcon className="button"/>
				<RewindIcon className="button"
				onClick={()=> spotifyApi.skipToPrevious().catch(err=>console.log("No Tracks Are Playing"))} 
				//--- not working(under test)
				/>
				{isPlaying?
					(
						<PauseIcon onClick={handlePlayPause} className="button" />
						):(
							<PlayIcon onClick={handlePlayPause} className="button"/>
							)}
				<FastForwardIcon className="button" 
				onClick={()=> spotifyApi.skipToNext().catch(err=>console.log("No Tracks Are Playing"))} 
				//--- not working(under test)
				/>
				<ReplyIcon className="button"/>


			</div>
			<div className="flex items-center space-x-3
			md:space-x-4 justify-end pr-5" >
				<VolumeDownIcon
				onClick={()=> volume > 0 && setVolume(volume -10)}
				className="button"/>
					<input
					className="w-14 md:w-28" 
					type="range" 
					onChange={(e)=> setVolume(Number(e.target.value))}
					value={volume} 
					min={0} max={100}
					/>
				<VolumeUpIcon 
				onClick={()=> volume < 100 && setVolume(volume + 10)}
				className="button"/>
			</div>


		</div>

		)

}


export default Player;
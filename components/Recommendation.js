import React from 'react'
import useSpotify from '../hooks/useSpotify'
import {useEffect,useState} from 'react'
import {currentTrackIdState,isPlayingState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'



function Recommendation(recommendation) {
	 
	 const spotifyApi = useSpotify();
	 const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
	 const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)
	 const [devices,setDevices] = useState([])



const playSong = () =>{
			spotifyApi.getMyDevices().then(data=>{
	 		
	 		if(data.body.devices.length !== 0){
				setCurrentTrackId(recommendation?.recommendation?.id);
	 			setIsPlaying(true);
	 			spotifyApi.play({
	 	 			uris: [recommendation?.recommendation?.uri],  //uniform resource identifier

	 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
	 		}else{
	 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
	 		}

	 	}).catch(err=>console.log("something happened",err))
	}



	return(
		<div className="relative overflow-hidden bg-no-repeat bg-cover max-w-xs my-1" >
			<img src={recommendation?.recommendation?.album?.images[0]?.url} 
			onClick={playSong}
			className="mx-auto w-40 rounded-full max-w-xs shadow-lg hover:scale-[0.95] transition duration-300 ease-in-out cursor-pointer" alt="..." />
			<p className="text-gray-700 mt-2">{recommendation?.recommendation?.name}</p>
		</div>


		)
}

export default Recommendation;
import React from 'react'
import useSpotify from '../hooks/useSpotify'
import {useEffect,useState} from 'react'
import {currentTrackIdState,isPlayingState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'


function Recent(recent) {

 const spotifyApi = useSpotify();
 const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
 const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)
 const [devices,setDevices] = useState([])

	



	const playSong = () =>{
			spotifyApi.getMyDevices().then(data=>{
	 		
	 		if(data.body.devices.length !== 0){
				setCurrentTrackId(recent?.recent?.track?.id);
	 			setIsPlaying(true);
	 			spotifyApi.play({
	 	 			uris: [recent?.recent?.track?.uri],  //uniform resource identifier

	 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
	 		}else{
	 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
	 		}

	 	}).catch(err=>console.log("something happened",err))
	}



	return(
		<div className="hover:scale-[1.1] cursor-pointer transition ease-in-out duration-300" 
		onClick={()=>playSong()}
		>
			<img src={recent?.recent?.track?.album.images[1].url} 
			className="w-[90px] h-[90px] md:h-[130px] md:w-[130px]"
			alt="..."/>
			
		</div>


		)
	
}

export default Recent;
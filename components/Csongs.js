import useSpotify from '../hooks/useSpotify'
import {useEffect,useState} from 'react'
import {millisToMinutesAndSecond} from '../lib/time'
import {currentTrackIdState,isPlayingState } from '../atoms/songAtom'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import { slideBar } from '../atoms/slideAtom'

function Csongs({track,order}){
	
 const spotifyApi = useSpotify();
 const [currentTrackId,setCurrentTrackId] = useRecoilState(currentTrackIdState)
 const [isPlaying,setIsPlaying] = useRecoilState(isPlayingState)
 const [devices,setDevices] = useState([])
 const [slidebar,setSlidebar] = useRecoilState(slideBar);
	
 const playSong =() =>{
 	spotifyApi.getMyDevices().then(data=>{
 		
 		if(data.body.devices.length !== 0){
			setCurrentTrackId(track.id);
 			setIsPlaying(true);
 			spotifyApi.play({
 	 			uris: [track.uri],  //uniform resource identifier

 			}).catch(err=>alert("Device is not active... Please play an Song in Your Active Spotify Device to active the device again"))
 		}else{
 			alert("No Devices Connected.... Please Connect with an Active Spotify Device...")
 		}

 	}).catch(err=>console.log("something happened",err))
}

 	



	return(
		<div loading="lazy" >

		<div className="grid grid-cols-2 text-gray-500 py-4
		px-5 hover:bg-gray-900 rounded-lg cursor-pointer"
		onClick = {playSong}
		>
			<div className="flex items-center space-x-4" >
				<p>
					{order + 1}
				</p>
				<img
				className="h-10 w-10"
				src={track?.album?.images[0]?.url}
				alt=""
				/>
				<div>
					<p className="w-36 lg:w-64 text-white truncate" >{track.name}</p>
					<p className="w-40" >{track.artists[0].name}</p>
				</div>
			</div>
			<div className="flex items-center justify-between
			ml-auto md:ml-0">
				<p className="w-40 hidden md:inline">{track.album.name}</p>
				{slidebar? "" : <p>{millisToMinutesAndSecond(track.duration_ms)}</p> }
				
			</div>
		</div>
		</div>


		)


}

export default Csongs;
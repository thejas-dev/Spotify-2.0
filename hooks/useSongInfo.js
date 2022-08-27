import {useState,useEffect} from 'react'
import useSpotify from './useSpotify'
import {useRecoilState} from 'recoil'
import {currentTrackIdState,repeatState} from '../atoms/songAtom'


function useSongInfo(){

    const spotifyApi = useSpotify();
    const [currentIdTrack,setCurrentIdTrack] = useRecoilState(currentTrackIdState)
    const [songInfo,setSongInfo] = useState(null)
    const [repeat,setRepeat] = useRecoilState(repeatState)

    useEffect(()=>{
    	const fetchSongInfo = async () =>{
          
    		if(currentIdTrack){
                
    			const trackInfo = await fetch(
    				`https://api.spotify.com/v1/tracks/${currentIdTrack}`,
    				{
    					headers:{
    						Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
    					}
    				}
    			).then(res=> res.json());
                setRepeat(false)
    			setSongInfo(trackInfo);
    		}
    	}

        fetchSongInfo()
    },[currentIdTrack, spotifyApi])

	return songInfo;
}

export default useSongInfo;
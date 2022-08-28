import {useRecoilValue} from 'recoil'
import useSpotify from '../hooks/useSpotify'
import {useEffect} from 'react'
import { playlistState, playlistUri } from '../atoms/playlistAtom'
import Song from './Song'

function Songs(){
	const spotifyApi = useSpotify();
	const playlist = useRecoilValue(playlistState);
	
	



return(
	<div className="px-8 flex flex-col space-y-1 pb-28 text-white overflow-y-hidden" >
		{playlist?.tracks.items.map((track, i) => (
			<Song track={track} order={i} />

		))}
	</div>

	)

}

export default Songs;

// "0zqBZqm5czQ3A4EoSdKFHj"
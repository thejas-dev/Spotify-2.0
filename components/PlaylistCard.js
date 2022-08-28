import React from 'react'
import { useRecoilState } from 'recoil'
import { playlistIdState } from '../atoms/playlistAtom'
import {typeState} from '../atoms/categoryAtom'
import Center from './Center'

function PlaylistCard(playlist){

	const [playlistId,setPlaylistId] = useRecoilState(playlistIdState);
	const [type,setType] = useRecoilState(typeState)

	const handlePlaylist = () =>{

		setPlaylistId(playlist.playlist.id)
		setType(<Center/>)
	}


	

return(

	<div
	onClick={()=>handlePlaylist()}
	>
		<div className="border border-solid m-5 cursor-pointer hover:scale-[1.1] transition ease-in-out duration-400">
			<img src={playlist.playlist.images[0].url} alt="..." className="w-full h-full" />

		</div>
	</div>

	)

}

export default PlaylistCard;
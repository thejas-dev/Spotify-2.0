import React,{useEffect} from 'react'
import Csongs from './Csongs'



function Categoryhandle({songs,songs2}) {
	
	// body...
	
		const songsfinal = songs.concat(songs2)
	
	
	return(
		<div className="px-8 flex flex-col space-y-1 pb-28 text-white overflow-y-hidden " >
			{songsfinal.map((track, i) => (
				<Csongs track={track} order={i} />

				))
			}

		</div>


		)
}

export default Categoryhandle;
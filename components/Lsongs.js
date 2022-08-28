import React from 'react'
import Lsong from './Lsong'



function Lsongs({tracks}){




	return(

		<div className="px-8 flex flex-col space-y-1 pb-28 text-white overflow-y-hidden " >
			{tracks.items.map((track, i) => (
				<Lsong track={track} order={i} />

				))
			}

		</div>

		)
}
export default Lsongs;
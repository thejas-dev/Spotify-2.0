import React from 'react'
import { useRecoilState } from 'recoil'
import {searchResultState} from '../atoms/searchAtom'
import Ssong from './Ssong'


function Ssongs(){

	const [searchResult,setSearchResult] = useRecoilState(searchResultState)


	return(

		<div>
			<div className="px-8 flex flex-col space-y-1 pb-8 text-white overflow-y-hidden " >
				{searchResult?.map((track, i) => (
					<Ssong track={track} order={i} />

				))}
			</div>

		</div>

		)
}
export default Ssongs;
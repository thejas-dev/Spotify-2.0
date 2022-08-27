import React from 'react'
import {categoriesState } from '../atoms/playlistAtom'
import { categoryState, songState, songState2, categoryImageState } from '../atoms/categoryAtom'
import { useRecoilState } from 'recoil'
import Category from './Category'
import useSpotify from '../hooks/useSpotify'
import { slideBar } from '../atoms/slideAtom'

function Categorieshandle({searchPlaylist}){
		const spotifyApi = useSpotify()
		const [categories,setCategories] = useRecoilState(categoriesState);
		const [category,setCategory] = useRecoilState(categoryState)
		const [song,setSong] = useRecoilState(songState)
		const [song2,setSong2] = useRecoilState(songState2)
		const [categoryImage,setCategoryImage] = useRecoilState(categoryImageState)
		const [slidebar,setSlidebar] = useRecoilState(slideBar);

		function searchCategory(name) {
			spotifyApi.getCategory(name,{
				country: 'IN'
			}).then((data)=>{
				setCategoryImage(data?.body)
			}).catch(err=>console.log(err))
			// body...
		}


	function searchPlaylist(name){
			spotifyApi.searchTracks(name,{
				country: 'IN',
				limit:50,
				offset: 0
			}).then(data=>{
				setSong(data.body.tracks.items)
				setCategory(true)
			}).catch(err=>{
				console.log(err)
			})
			spotifyApi.searchTracks(name,{
				country: 'IN',
				limit:50,
				offset: 50
			}).then(data=>{
				setSong2(data.body.tracks.items)
				setCategory(true)
			}).catch(err=>{
				console.log(err)
			})
	}
				return(

						<div>
							<div className={`md:columns-3 z-40 sm:columns-1 columns-2 p-5 text-white text-center space-y-5 m-2 ${slidebar ? "columns-1" : "columns-2"}`}>
								{categories?.items?.map((item,i)=>(

									<Category background={item?.icons[0].url} name={item?.name} index={i} searchPlaylist={searchPlaylist} searchCategory={searchCategory} id={item?.id}/>
								))}


							</div>
							<br/><br/><br/><br/>
						</div>

					)
}

export default Categorieshandle;
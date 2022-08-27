import React,{useState} from 'react'
import Categorieshandle from './Categorieshandle'
import Categoryhandle from './Categoryhandle'
import {categoriesState } from '../atoms/playlistAtom'
import { useRecoilState } from 'recoil'
import {categoryState,songState,songState2} from '../atoms/categoryAtom'
import Csongs from './Csongs'



function Categories(){
	
	const [categories,setCategories] = useRecoilState(categoriesState);
	const [category,setCategory] = useRecoilState(categoryState)
	const [songs,setSongs] = useRecoilState(songState)
	const [songs2,setSongs2] = useRecoilState(songState2)
	



	if(category){
		return	<Categoryhandle songs={songs} songs2={songs2} />
	}
	if(!category){
		return <Categorieshandle />
	}



}

export default Categories
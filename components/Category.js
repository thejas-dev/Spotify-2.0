import React from 'react'




function Category({background,name,id,index,searchPlaylist,searchCategory}) {




	function show(){
		let name= document.getElementById(index+1)
		name.classList.remove('opacity-0')
		name.classList.add('opacity-100')
	}
	function hide(){
		let name= document.getElementById(index+1)
		name.classList.remove('opacity-100')
		name.classList.add('opacity-0')
	}
	function search(){
		searchPlaylist(name)
		searchCategory(id)
	}

	return(
		<div
		onMouseOver={show}
		onMouseOut={hide}
		onClick={search}
		className="items-center transition ease-in-out duration-800 text-center  cursor-pointer text-white relative border-solid border-2 justify-center" >
			<img src={background} alt="" className="hover:opacity-30 w-full" />
			<p className="p-1 md:hidden bg-black w-full h-full ">{name}</p>
			<div className="absolute 
			text-2xl transition ease-in-out duration-1000 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0"
			id={index+1}>
			<h1 className="" >{name}</h1>
			</div>
		</div>


		)
	
}

export default Category


// <img src={background} alt="" className="rounded h-50 w-50"/>
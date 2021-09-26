import pyrite from './Songs/Lemaitre - Iron Pyrite.mp3'
import sparrow from './Songs/Lemaitre, Emelie Hollow - Sparrow.mp3'
import circles from './Songs/Vanic & Machineheart - Circles.mp3'

const Pages = {
	LandingPage: "landingpage",
	DancePage: "dancepage",
}

const Moves = {
	Disco: "Disco",
	Floss: "Floss",
	CanCan: "Can Can",
}

const Songs = {
	IronPyrite: "pyrite",
	Sparrow: "sparrow",
	Circles: "circles"
}

const getSongFromName = (songname) => {
	switch(songname){
		case "pyrite": return pyrite
		case "sparrow": return sparrow
		case "circles": return circles
		default: console.error("Song name " + songname + " not found")
	}
} 
export { Pages, Moves, Songs, getSongFromName }

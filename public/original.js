const URL_SERVER = "https://www.webaudiomodules.com/community/plugins.json";
const BASE_URL_SERVER = "https://www.webaudiomodules.com/community";
let divPlugins;
let URL_DU_PLUGIN;
//const URL_DU_PLUGIN = 'https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/untitled11/index.js';

window.onload = init;

async function init() {
	// appelée quand la page est affichée: quand le DOM est prêt
	console.log("DOM ready, requesting list of plugins")
	const reponseJSON = await fetch(URL_SERVER);
	const listeWams = await reponseJSON.json();
	
	// handle to the ul element that will
	// contain the list
	divPlugins = document.querySelector("#listeWams");
	
	displayWAMs(listeWams);
  }
  async function displayWAMs(listePlugins) {
    for (let i = 0; i < listePlugins.length; i++) {
        let wam = listePlugins[i];
		let link = document.createElement("a");
        link.href = `index2.html?param1=+${BASE_URL_SERVER}/plugins/${wam.path}`; // Définir l'URL du plugin
        link.target = "_self";

		//window.open('index2.html?param1='+URL_DU_PLUGIN,'_self');

        let title = document.createElement("h2");
	  	title.innerHTML = `${wam.name} by ${wam.vendor}`;
		link.appendChild(title);

		// on essaie de connaitre la taille de l'image
		// fetch the thumbnail image
		// and get its size
		/*
		let imag = new Image();
		imag.src = `${BASE_URL_SERVER}/plugins/${wam.thumbnail}`;
		imag.onload = function() {
			console.log("image loaded");
			console.log(img.width);
			console.log(img.height);
			console.log(img.naturalWidth);
			console.log(img.naturalHeight);
			
		}	
*/
	  let img = document.createElement("img");
	  img.width=200;
	  img.src = `${BASE_URL_SERVER}/plugins/${wam.thumbnail}`;
	  let desc= document.createElement("p");
	  desc.innerHTML = `${wam.description}`;
	  console.log(img.naturalWidth);
			console.log(img.naturalHeight);
			link.href+="&param2="+img.naturalWidth+"&param3="+img.naturalHeight;
        //divPlugins.append(title);
	
	   divPlugins.append(link);
		divPlugins.append
        divPlugins.append(img);
    }
  }


/*function displayWAMs(listePlugins) {
	console.log("displaying list of plugins");
	
	listePlugins.forEach(wam => {
	  // title of the plugin
	  let title = document.createElement("h2");
	  title.innerHTML = `${wam.name} by ${wam.vendor}`;

	  divPlugins.append(title);
	  
	  // screenshot
	  let img = document.createElement("img");
	  img.width=200;
	  img.src = `${BASE_URL_SERVER}/plugins/${wam.thumbnail}`
	  divPlugins.append(img);
	  title.onclick = function() {
		
		URL_DU_PLUGIN  = `${BASE_URL_SERVER}/plugins/${wam.path}`;
		//write a audio on the body with document.write
		console.log(URL_DU_PLUGIN);
		localStorage.setItem('url', URL_DU_PLUGIN);
		window.myGlobalVariable = URL_DU_PLUGIN;
		window.open('index2.html?param1='+URL_DU_PLUGIN,'_self');
		return;
		//img.src = 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Logo_universit%C3%A9_c%C3%B4te_azur.png';
	};
	
	});
  }

//affichePlugin('https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/StereoEnhancer/index.js');
//affichePlugin('https://mainline.i3s.unice.fr/PedalEditor/Back-End/functional-pedals/published/untitled11/index.js');
*/
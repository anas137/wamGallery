
//const maVariable = localStorage.getItem('url');
//console.log(maVariable); // Affichera "valeur de maVariable" dans la console
//const URL_DU_PLUGIN = maVariable;
//console.log(window.myGlobalVariable);

function recupererParametresURL() {
	const params = new URLSearchParams(window.location.search);
	document.getElementById('param1').innerText = 'Paramètre 1: ' + params.get('param1');

}
const params = new URLSearchParams(window.location.search);
//document.getElementById('param1').innerText = 'Paramètre 1: ' + params.get('param1');

const a = params.get('param1');
const natWidth = params.get('param2');
const natHeight = params.get('param3');
console.log("natural"+natWidth);
const pluginWidth = params.get('width');
const pluginHeight = params.get('height');

window.onload = recupererParametresURL;

console.log(a);

const player = document.querySelector('#player');
const mount = document.querySelector('#mount');

// Safari...
const audioContext = new AudioContext();
const mediaElementSource = audioContext.createMediaElementSource(player);
const URL_DU_PLUGIN = a;

affichePlugin(URL_DU_PLUGIN);
function affichePlugin(url) {

	// Very simple function to connect the plugin audionode to the host
	const connectPlugin = (audioNode) => {
		// connecte lecteur audio HTML (sous forme de node webaudio) au plugin
		mediaElementSource.connect(audioNode);
		// connecte le plugin à la sortie audio (les hauts parleurs)
		audioNode.connect(audioContext.destination);
	};

	// Very simple function to append the plugin root dom node to the host
	// va afficher la GUI du plugin dans la page
	const mountPlugin = (domNode) => {
		// on affiche dans console.log les attributs width et height du plugin
		console.log(domNode);
		const div = document.createElement('div');
		//div.style.width = pluginWidth + 'px';
		//div.style.height = pluginHeight + 'px';

		changeSizeOfDiv(domNode, div);

		div.appendChild(domNode);

		// J'ajoute à la fin du document le div que je viens de créer...
		document.body.appendChild(div);
	};

function changeSizeOfDiv(gui, div) {
	let width, height;
          if (gui.getAttribute("width") != null && gui.getAttribute("height") != null) {
            width = parseInt(gui.getAttribute("width"))
            height = parseInt(gui.getAttribute("height"))
            // @ts-ignore
          } else if (gui.properties && gui.properties.dataWidth && gui.properties.dataHeight) {
            // @ts-ignore
            width = gui.properties.dataWidth.value

            // @ts-ignore
            height = gui.properties.dataHeight.value
            
          } else {
            width = gui.clientWidth
            height = gui.clientHeight
          }
		  
			div.style.width = natWidth + "px";
		  div.style.height = natHeight + "px";
		  gui.style.width = natWidth + "px";
		  gui.style.height = natHeight + "px";
			
		  
		  
}
	(async () => {
		// Initialisations "de base" du logiciel hôte (la page html)
		// On récupère un objet initialiseWamHost qui permet de renvoyer un id de groupe de plugin
		// qui sera nécessaire pour charger un plugin...
		const { default: initializeWamHost } = await import("./utils/sdk/src/initializeWamHost.js");
		const [hostGroupId] = await initializeWamHost(audioContext);

		// Importer un plugin WAM, on utilise son URL. On fait un import dynamique,
		// qui est une opération asyncrhone, d'où le await avant le import.
		// Note : si on utilise await, il faut être dans une fonction précédée de async
		// ici on a créé une "fonction anonyme auto-appelante" avec (async () => { ... })();
		// voir ligne 23 et 54.
		const { default: WAM } = await import(url);

		// L'objet WAM est le plugin, mais c'est en fait une "factory" qui permet d'obtenir
		// la partie "audio" sous la forme d'un noeud WebAudio que l'on peut connecter au graphe
		// WebAudio comme n'importe quel noeud standard de bas niveau...
		// l'objet WAM permet aussi d'obtenir la GUI du plugin, sous la forme d'un noeud DOM (un élément HTML)

		// Create a new instance of the plugin
		// You can can optionnally give more options such as the initial state of the plugin
		const instance = await WAM.createInstance(hostGroupId, audioContext);

		window.instance = instance;

		// Connect the audionode to the host
		connectPlugin(instance.audioNode);

		// Load the GUI if need (ie. if the option noGui was set to true)
		// And calls the method createElement of the Gui module
		const pluginDomNode = await instance.createGui();

		mountPlugin(pluginDomNode);

		player.onplay = () => {
			audioContext.resume(); // audio context must be resumed because browser restrictions
		};
	})();
}


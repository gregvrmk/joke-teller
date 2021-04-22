'use strict';

const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// Disable/Enable button
function toggleButton() {
	button.disabled = !button.disabled;
}

// Pass joke to VoiceRSS API
function tellMe(joke) {
	VoiceRSS.speech({
		key: '635b34c003b048378c56425682920b38',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false,
	});
}

// Get jokes from joke API
async function getJokes() {
	let joke = '';
	const apiUrl = 'https://v2.jokeapi.dev/joke/Miscellaneous,Dark,Pun';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		// Text-to-speech
		tellMe(joke);
		// Disable button
		toggleButton();
	} catch (error) {
		// Catch error
		console.log('whoops', error);
	}
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);

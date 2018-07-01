// //Registering the Service Worker

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
  .register('./service-worker.js', { scope: "./"})
  .then(registration => {
    console.log('Service worker registration succeeded:', registration);
  }).catch(error => {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}


const currencyUrl = "https://free.currencyconverterapi.com/api/v5/currencies";

fetch(currencyUrl)
.then(res => res.json())
.then(data => {
	for (const key in data) {
	  return data[key];
	}
})
.then(datakey => {
	for ( const key2 in datakey) {
		const id = datakey[key2].id;
		const curName = datakey[key2].currencyName;
		console.log(id, curName);
		$('#select-from, #convert-to').append($('<option>').text(`${curName}  ${id}`).attr('value', id));
	}
})
.catch(error => {
	console.log(error);
})
$("#convert").on("click", () => {
  	const $amount = $('#amount').val();
	const $selectFrom = $('#select-from option:selected').val();
	const $convertTo = $('#convert-to option:selected').val();	
  	const query = `${$selectFrom}_${$convertTo}`;
  	const url = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=y`;
  fetch(url)
  	.then(response => response.json())
  	.then(parsedData => {
  		for(let rate in parsedData){
         let calc = (parsedData[rate].val); 
  		let total = (Number($amount) * calc);
  		$('#convert-value').val(Math.round(total * 100) / 100);
  		}
  	})		
});

function uploadFile() {

	// substract variables from html
	const realFileButton = document.getElementById("real-file");
	const customButton = document.getElementById("custom-button");
	const customText = document.getElementById("custom-text");

	// activate realfilebutton when custombutton is clicked
	customButton.addEventListener("click", function() {
		realFileButton.click();
	});

	// if value realfilebutton changes
	realFileButton.addEventListener("change", function() {

		// if a file is chosen
		if (realFileButton.value) {

			// show filename
			customText.innerHTML = document.getElementById("real-file").files[0].name
		
		// if file is not chosen yet
		} else {
			customText.innerHTML = "No file chosen, yet."
		};
	})

	return realFileButton.value
};
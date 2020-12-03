// Start by gathering all the DOM elements we will need

// Container holding the seating chart
const container = document.querySelector('.container');
// Seats in the seating chart
const seats = document.querySelectorAll('.row .seat:not(.unavailable)');
// Counter displaying total number of selected seats
const count = document.getElementById('count');
// Text displaying total cost
const total = document.getElementById('total');
// Movie Selection
const movieSelect = document.getElementById('movie');
// Value of the ticket price
let ticketPrice = +movieSelect.value;

// Functions

// Set Movie Data function
// Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
};

// Seat Count Function
function updateSelectedCount(){
    // collect all the elements containing class names 'row', 'seat', and 'selected' and store in a variable
    const selectedSeats = document.querySelectorAll('.row .seat.selected');

    // Create a seats index variable and copy selected seats into an array using spread operator
    const seatsIndex = [...selectedSeats].map(seat => {
        // Return a new array of indexes
        return [...seats].indexOf(seat);
    });

    // Save it to the local storage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    // Get the number of the above elements and store it in a variable
    const selectedSeatCount = selectedSeats.length;
    // Target the text of the count element (stored in a variable above) and change the text to reflect the number of selected seats
    count.innerText = selectedSeatCount;

    // Calulcate the total and update the DOM to reflect it
    total.innerText = selectedSeatCount * ticketPrice;
}

// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    
    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected')
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
populateUI();


// Event Listeners

// Movie Select Event
// Listen for a change on the movie selection
movieSelect.addEventListener('change', e => {
    // Change the ticket price to the value of the selected movie (the target), convert it to a number if NaN
    ticketPrice = +e.target.value;

    // Run the setMovieData function
    setMovieData(e.target.selectedIndex, e.target.value);

    // Run the seat count function
    updateSelectedCount();
})


// Seat Click Event
// Attach event listener to DOM Element & parent container of seats, container (the variable we declared above)
container.addEventListener('click', e => {
    // If element's class contains 'seat' and does not contain 'unavailable'
    if (
        e.target.classList.contains('seat') 
        && !e.target.classList.contains('unavailable')
    ) {
        // then toggle class name 'selected' and run function 'updateSelectedCount'
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

// Initial Count
updateSelectedCount();
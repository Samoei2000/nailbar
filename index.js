document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('bookingModal');
    const closeModal = modal.querySelector('.close');
    const bookNowBtn = document.getElementById('bookNowBtn');
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');
    const bookingForm = document.getElementById('bookingForm');

    // Function to open modal
    const openModal = () => modal.style.display = 'block';

    // Function to close modal
    const closeModalFunction = () => modal.style.display = 'none';

    // Event listener for book now button to open modal
    bookNowBtn.addEventListener('click', openModal);

    // Event listener for close button to close modal
    closeModal.addEventListener('click', closeModalFunction);

    // Event listener to close modal if user clicks outside of it
    window.addEventListener('click', event => {
        if (event.target == modal) {
            closeModalFunction();
        }
    });

    // Handle form submission for reviews
    reviewForm.addEventListener('submit', event => {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const reviewerName = document.getElementById('reviewerName').value;
        const reviewText = document.getElementById('review').value;

        // Create review element
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = `<strong>${reviewerName}:</strong> ${reviewText}`;

        // Append review to reviews list
        reviewsList.appendChild(reviewItem);
        reviewForm.reset();
    });

    // Handle form submission for booking
    bookingForm.addEventListener('submit', event => {
        event.preventDefault(); 

        // Get input values
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Prepare booking data
        const bookingData = {
            name,
            service,
            date,
            time
        };

        // Make a fetch request to send booking data to the server
        fetch('https://my-json-server.typicode.com/Samoei2000/nailbar/blob/main/db.json/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Booking stored:', data);
            alert('Booking confirmed');
            // Close modal after booking
            closeModalFunction();
        })
        .catch(error => {
            console.error('Error storing booking:', error);
            alert('Failed to confirm booking. Please try again.');
        });
    });
});
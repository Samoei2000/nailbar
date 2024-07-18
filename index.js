// Wait for the DOM to fully load before executing code
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('bookingModal');
    const closeModal = modal.querySelector('.close');
    const bookNowBtn = document.getElementById('bookNowBtn');

    // Function to open modal
    function openModal() {
        modal.style.display = 'block';
    }

    // Function to close modal
    function closeModalFunction() {
        modal.style.display = 'none';
    }

    // Event listener for book now button to open modal
    bookNowBtn.addEventListener('click', openModal);

    // Event listener for close button to close modal
    closeModal.addEventListener('click', closeModalFunction);

    // Event listener to close modal if user clicks outside of it
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // Handle form submission for reviews
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        var reviewerName = document.getElementById('reviewerName').value;
        var reviewText = document.getElementById('review').value;

        // Create review element
        var reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');
        reviewItem.innerHTML = '<strong>' + reviewerName + ':</strong> ' + reviewText;

        // Append review to reviews list
        reviewsList.appendChild(reviewItem);

        // Clear form inputs
        reviewForm.reset();
    });

    // Handle form submission for booking
    const bookingForm = document.getElementById('bookingForm');

    bookingForm.addEventListener('submit', function(booking) {
        event.preventDefault(); // Prevent form submission

        // Get input values
        const name = document.getElementById('name').value;
        const service = document.getElementById('service').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;

        // Display booking confirmation (for demonstration, adjust as needed)
        alert('Booking confirmed');

        // Close modal after booking
        closeModalFunction();
    });
});

// Make a fetch request to send booking data to the server
fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingData)
})
.then(response => response.json())
.then(data => {
    console.log('Booking stored:', data);
    // Display confirmation to user (modify as needed)
    alert('Booking confirmed for ' + name + ' for ' + service + ' on ' + date + ' at ' + time);
    closeModalFunction(); // Close modal after successful booking
})
.catch(error => {
    console.error('Error storing booking:', error);
    // Handle error gracefully (e.g., display error message to user)
    alert('Failed to confirm booking. Please try again.');
});
});

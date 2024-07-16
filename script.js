document.addEventListener('DOMContentLoaded', function() {
    const departureSelect = document.getElementById('departure');
    const destinationSelect = document.getElementById('destination');
    const passengersInput = document.getElementById('passengers');
    const seatsSelection = document.getElementById('seats-selection');
    const price = parseFloat(document.getElementById('price').value);

    // Функція для оновлення списку місць
    function updateSeats() {
        seatsSelection.innerHTML = ''; // Очищуємо контейнер для місць

        const numPassengers = parseInt(passengersInput.value, 10);

        if (numPassengers > 0) {
            for (let i = 0; i < numPassengers; i++) {
                const seatSelect = document.createElement('select');
                seatSelect.className = 'seat';
                seatSelect.name = seat-${i};
                seatSelect.required = true;
                seatSelect.innerHTML = '<option value="" disabled selected>Оберіть місце</option>';

                // Додаємо місця в список
                for (let j = 1; j <= 3; j++) {
                    ['A', 'B'].forEach(row => {
                        const value = ${j}${row};
                        const option = document.createElement('option');
                        option.value = value;
                        option.textContent = value;
                        seatSelect.appendChild(option);
                    });
                }

                seatsSelection.appendChild(seatSelect);
                seatsSelection.appendChild(document.createElement('br'));
            }
        }
    }

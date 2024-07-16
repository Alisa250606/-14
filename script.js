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
                    // Функція для перевірки вибраних місць
    function checkLocations() {
        const departure = departureSelect.value;
        const destination = destinationSelect.value;

        // Перевірка на однакові місця
        if (departure === destination) {
            // Якщо місце прибуття таке ж, як і місце відправлення, то очищуємо місце прибуття
            destinationSelect.value = '';
            alert('Місце відправлення не може бути однакове з місцем прибуття.');
        }

        // Вимикаємо або вмикаємо опції для вибору місця прибуття
        Array.from(destinationSelect.options).forEach(option => {
            if (option.value === departure && departure) {
                option.disabled = true;
            } else {
                option.disabled = false;
            }
        });
    }

    // Оновлюємо місця при зміні кількості пасажирів
    passengersInput.addEventListener('input', updateSeats);

    // Додаємо слухачі подій для перевірки вибраних місць
    departureSelect.addEventListener('change', checkLocations);
    destinationSelect.addEventListener('change', checkLocations);

    document.getElementById('booking-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Запобігає стандартному надсиланню форми

        const fullName = document.getElementById('full-name').value;
        const departure = departureSelect.value;
        const destination = destinationSelect.value;
        const date = document.getElementById('date').value;
        const departureTime = document.getElementById('departure-time').value; // Отримуємо вибраний час вильоту
        const passengers = parseInt(passengersInput.value, 10);
        const seatSelects = document.querySelectorAll('#seats-selection .seat');

        const currentDate = new Date();
        const bookingDate = new Date(date);
        // Перевірка, чи дата бронювання не в минулому
        if (bookingDate < currentDate) {
            alert('Ви не можете забронювати квитки на минулу дату.');
            return;
        }

        // Перевірка, чи всі поля заповнені
        if (!fullName  !departure  !destination  !date  !departureTime  !passengers  seatSelects.length !== passengers) {
            alert('Будь ласка, заповніть всі поля форми та оберіть місця для всіх пасажирів.');
            return;
        }

        // Перевірка на однакові місця відправлення та прибуття
        if (departure === destination) {
            alert('Місце відправлення не може бути однакове з місцем прибуття.');
            return;
        }

        // Перевірка, чи всі місця вибрані
        let allSeatsSelected = true;
        seatSelects.forEach(select => {
            if (!select.value) {
                allSeatsSelected = false;
            }
        });

        if (!allSeatsSelected) {
            alert('Будь ласка, виберіть місце для кожного пасажира.');
            return;
        }

        // Розрахунок загальної суми
        const totalAmount = passengers * price;

        // Формуємо повідомлення підтвердження
        const ticketWord = passengers > 1 ? 'квитки' : 'квиток';
        let seatsList = '';
        seatSelects.forEach(select => {
            seatsList += ${select.value}\n;
        });

        const message = Ви успішно забронювали ${passengers} ${ticketWord} з ${departure} до ${destination} на ${date}, о ${departureTime}.\n\n +
            ПІБ: ${fullName}\n +
            Обрані місця:\n${seatsList}\n +
            Загальна сума до сплати: ${totalAmount} грн.;
    
                // Відображаємо підтвердження на сторінці
        document.getElementById('confirmation-message').textContent = message;
        document.getElementById('confirmation').style.display = 'block';
    });

    // Ініціалізуємо вибір місць при завантаженні сторінки
    updateSeats();
});

function getFlightSchedule() {
    let departureCode = document.getElementById('departure').value.toUpperCase();
    let arrivalCode = document.getElementById('arrival').value.toUpperCase();
    let accessKey = '366ca90a7f99cbbeb5fafc0bf6c1d816';
    
    if (!departureCode || !arrivalCode) {
        alert("Please enter both airport codes");
        return;
    }
    
    let url = `http://api.aviationstack.com/v1/flights?access_key=${accessKey}&dep_iata=${departureCode}&arr_iata=${arrivalCode}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let flights = data.data;
            let resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = "";
            
            if (flights.length === 0) {
                resultsDiv.innerHTML = "<p>No flights found.</p>";
                return;
            }
            
            flights.forEach(flight => {
                let flightInfo = `
                    <p>Flight: ${flight.flight.iata || 'N/A'} | Airline: ${flight.airline.name || 'N/A'}</p>
                    <p>Departure: ${flight.departure.iata} at ${flight.departure.estimated || 'N/A'}</p>
                    <p>Arrival: ${flight.arrival.iata} at ${flight.arrival.estimated || 'N/A'}</p>
                    <button onclick="bookFlight('${flight.flight.iata || 'N/A'}', '${flight.airline.name || 'N/A'}', '${flight.departure.iata}', '${flight.departure.estimated || 'N/A'}', '${flight.arrival.iata}', '${flight.arrival.estimated || 'N/A'}')">Book Flight</button>
                    <hr>
                `;
                resultsDiv.innerHTML += flightInfo;
            });
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById('results').innerHTML = "<p>Error fetching flight data.</p>";
        });
}

function bookFlight(flightNumber, airline, departureCode, departureTime, arrivalCode, arrivalTime) {
    alert(`Flight booked successfully!\n\nFlight: ${flightNumber}\nAirline: ${airline}\nDeparture: ${departureCode} at ${departureTime}\nArrival: ${arrivalCode} at ${arrivalTime}`);
    location.reload();
}

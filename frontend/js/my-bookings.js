// my-bookings.js
//
// Renders the list of bookings on my-bookings.html and lets the
// user cancel a booking. Use rooms.js as your reference.

async function renderBookings() {
  const container = document.getElementById("bookings-list");
  const bookings = await getBookings();

  if (!bookings || bookings.length === 0) {
    container.innerHTML = "<p>No bookings yet.</p>";
    return;
  }

  const cards = await Promise.all(
    bookings.map(async (booking) => {
      const room = await getRoomById(booking.roomId);
      const roomLabel = room ? `${room.name} (${booking.roomId})` : booking.roomId;

      return `
        <div class="booking-item">
          <h3>${roomLabel}</h3>
          <p><strong>Club:</strong> ${booking.clubName}</p>
          <p><strong>Date:</strong> ${booking.date}</p>
          <p><strong>Time:</strong> ${booking.startTime} - ${booking.endTime}</p>
          <p><strong>Purpose:</strong> ${booking.purpose}</p>
          <button type="button" class="cancel-btn" data-id="${booking.id}">Cancel</button>
        </div>
      `;
    })
  );

  container.innerHTML = cards.join("")

  const cancelButtons = container.querySelectorAll(".cancel-btn");
  cancelButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleCancelClick(button.dataset.id);
    });
  });

}

async function handleCancelClick(bookingId) {
  await deleteBooking(bookingId)
  await renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);

<?php

namespace App\Events;

use App\Models\Reservation;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;

class ReservationPlaced implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $reservation;

    /**
     * Create a new event instance.
     *
     * @param Reservation $reservation
     */
    public function __construct(Reservation $reservation)
    {
        $this->reservation = $reservation;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn()
    {
        // Notify the specific seller related to the reservation
        return new PrivateChannel('reservations.' . $this->reservation->user_id);
    }

    /**
     * Define the event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'reservation.placed';
    }
}

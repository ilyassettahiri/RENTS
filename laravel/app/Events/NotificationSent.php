<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class NotificationSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $userId;
    public $message;

    /**
     * Create a new event instance.
     *
     * @param int $userId
     * @param string|array $message
     */
    public function __construct($userId, $message)
    {
        $this->userId = $userId;
        $this->message = $message;


    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return PrivateChannel
     */
    public function broadcastOn()
    {
        $channelName = 'notifications.' . $this->userId;



        return new PrivateChannel($channelName);
    }

    /**
     * The data to broadcast with the event.
     *
     * @return array
     */
    public function broadcastWith()
    {


        return [
            'message' => $this->message,
        ];
    }

    /**
     * Customize the event name for frontend listeners.
     *
     * @return string
     */
    public function broadcastAs()
    {
        return 'notification.sent';
    }
}

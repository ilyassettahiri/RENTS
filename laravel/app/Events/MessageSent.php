<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

use App\Models\Message;


class MessageSent implements ShouldBroadcast
{
    use InteractsWithSockets, SerializesModels;

    public $message;

    /**
     * Create a new event instance.
     *
     * @param Message $message
     */
    public function __construct(Message $message)
    {
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel
     */
    public function broadcastOn()
    {



        return new PrivateChannel('chat.' . $this->message->conversation_id);
    }

    /**
     * Define the event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {


        return 'message.sent';
    }


    public function sendMessage(Request $request)
    {


        $message = Message::create([
            'body' => $request->input('body'),
            'sender_id' => auth()->id(),
            'receiver_id' => $request->input('receiver_id'),
            'conversation_id' => $request->input('conversation_id'),
        ]);



        broadcast(new MessageSent($message))->toOthers();



        return response()->json(['message' => $message], 201);
    }




}

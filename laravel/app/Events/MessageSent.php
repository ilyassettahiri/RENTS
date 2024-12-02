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

        \Log::info('Broadcasting on channel: chat.' . $this->message->conversation_id);

        return new PrivateChannel('chat.' . $this->message->conversation_id);
    }

    /**
     * Define the event's broadcast name.
     *
     * @return string
     */
    public function broadcastAs()
    {

        \Log::info('Broadcasting event: message.sent');
        return 'message.sent';
    }


    public function sendMessage(Request $request)
    {
        \Log::info('sendMessage request:', $request->all());

        $message = Message::create([
            'body' => $request->input('body'),
            'sender_id' => auth()->id(),
            'receiver_id' => $request->input('receiver_id'),
            'conversation_id' => $request->input('conversation_id'),
        ]);

        \Log::info('Message created:', $message->toArray());

        broadcast(new MessageSent($message))->toOthers();

        \Log::info('Message broadcasted:', $message->toArray());

        return response()->json(['message' => $message], 201);
    }




}

<?php

namespace App\Http\Controllers\Api\V2\Front\MessageFrontC;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Core\Document\Error;
use LaravelJsonApi\Core\Responses\ErrorResponse;
use LaravelJsonApi\Core\Responses\DataResponse;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use Illuminate\Support\Facades\Storage;
use App\Enums\ItemStatus;

use App\Events\MessageSent;


use App\Models\Conversation;
use App\Models\Message;

use App\Models\User;


use App\Models\Collection;


use LaravelJsonApi\Contracts\Store\Store;
use LaravelJsonApi\Contracts\Routing\Route as JsonApiRoute;






class MessageFrontController extends JsonApiController
{






    public function getConversations(JsonApiRoute $route, Store $store)
    {
        $authuser = Auth::user();



        // Eager load messages with each conversation
        $conversations = Conversation::where('sender_id', $authuser->id)
            ->orWhere('receiver_id', $authuser->id)  // Add this line to include conversations where the user is the receiver
            ->with('messages')
            ->get();

        // If no conversations found, still return the sender's information
        if ($conversations->isEmpty()) {
            return response()->json([
                'data' => [
                    'type' => 'conversations',
                    'id' => null,
                    'attributes' => [
                        'messages' => [],
                        'receiver' => null,
                        'sender' => [
                            'id' => $authuser->id,
                            'role' => $authuser->role,
                            'email' => $authuser->email,
                            'address' => $authuser->address,
                            'name' => $authuser->name,
                            'lastActivity' => $authuser->updated_at->toIso8601String(),
                            'avatarUrl' => $authuser->profile_image,
                            'phoneNumber' => $authuser->phone_number,
                            'status' => 'online', // Assuming you determine the user's status
                            'created_at' => $authuser->created_at->toIso8601String(),
                        ],
                    ],
                ],
            ]);
        }

        $conversationsData = $conversations->map(function ($conversation) use ($authuser) {
            // Check if the auth user is the sender or the receiver
            $isSender = $conversation->sender_id === $authuser->id;
            $receiver = $isSender ? $conversation->getReceiver() : $conversation->getSender();  // Get the correct receiver
            $sender = $isSender ? $authuser : $conversation->getSender();  // Auth user might be the receiver, not just the sender

            return [
                'type' => 'conversations',
                'id' => $conversation->id,
                'attributes' => [
                    'id' => $conversation->id,
                    'created_at' => $conversation->created_at,
                    'messages' => $conversation->messages->map(function ($message) {
                        return [
                            'id' => $message->id,
                            'body' => $message->body,
                            'sender_id' => $message->sender_id,
                            'receiver_id' => $message->receiver_id,
                            'created_at' => $message->created_at,
                            'read_at' => $message->read_at,
                        ];
                    }),
                    'receiver' => [
                        'id' => $receiver->id,
                        'role' => $receiver->role,
                        'email' => $receiver->email,
                        'address' => $receiver->address,
                        'name' => $receiver->name,
                        'lastActivity' => $receiver->updated_at->toIso8601String(),
                        'avatarUrl' => $receiver->profile_image,
                        'phoneNumber' => $receiver->phone_number,
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $receiver->created_at->toIso8601String(),
                    ],
                    'sender' => [
                        'id' => $sender->id,
                        'role' => $sender->role,
                        'email' => $sender->email,
                        'address' => $sender->address,
                        'name' => $sender->name,
                        'lastActivity' => $sender->updated_at->toIso8601String(),
                        'avatarUrl' => $sender->profile_image,
                        'phoneNumber' => $sender->phone_number,
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $sender->created_at->toIso8601String(),
                    ],
                ],
            ];
        });

        // Ensure JSON:API compliance
        return response()->json([
            'data' => $conversationsData,
        ]);
    }



    public function checkConversation(Request $request)
    {
        $authuser = Auth::user();
        $userId = $request->query('userID');

        // Retrieve the conversation where the authenticated user is either the sender or receiver
        $conversation = Conversation::where(function ($query) use ($authuser, $userId) {
            $query->where('sender_id', $authuser->id)
                  ->where('receiver_id', $userId)
                  ->orWhere(function ($query) use ($authuser, $userId) {
                      $query->where('sender_id', $userId)
                            ->where('receiver_id', $authuser->id);
                  });
        })->with('messages')  // Eager load messages
          ->first();

        // If the conversation does not exist, return the user information
        if (!$conversation) {
            $receiver = User::find($userId);

            if (!$receiver) {
                return response()->json(['error' => 'User not found.'], 404);
            }

            return response()->json([
                'data' => [
                    'type' => 'user',

                    'attributes' => [
                        'id' => $receiver->id,
                        'role' => $receiver->role,
                        'email' => $receiver->email,
                        'address' => $receiver->address,
                        'name' => $receiver->name,
                        'lastActivity' => $receiver->updated_at->toIso8601String(),
                        'avatarUrl' => $receiver->profile_image,
                        'phoneNumber' => $receiver->phone_number, // Assuming you have a phone_number field
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $receiver->created_at->toIso8601String(),
                    ],
                ],
            ], 200); // HTTP 200 OK
        }

        // Get the receiver using the method defined in the Conversation model
        $receiver = $conversation->getReceiver();

        // Map the conversation data along with its messages and receiver information
        $conversationData = [
            'type' => 'conversations',
            'id' => $conversation->id,
            'attributes' => [
                'id' => $conversation->id,
                'created_at' => $conversation->created_at,
                'messages' => $conversation->messages->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'body' => $message->body,
                        'sender_id' => $message->sender_id,
                        'receiver_id' => $message->receiver_id,
                        'created_at' => $message->created_at,
                        'read_at' => $message->read_at,
                    ];
                }),
                'receiver' => [
                    'id' => $receiver->id,
                    'role' => $receiver->role,
                    'email' => $receiver->email,
                    'address' => $receiver->address,
                    'name' => $receiver->name,
                    'lastActivity' => $receiver->updated_at->toIso8601String(),
                    'avatarUrl' => $receiver->profile_image,
                    'phoneNumber' => $receiver->phone_number, // Assuming you have a phone_number field
                    'status' => 'online', // Assuming you determine the user's status
                    'created_at' => $receiver->created_at->toIso8601String(),
                ],
            ],
        ];

        // Return the conversation data as a JSON:API compliant response
        return response()->json([
            'data' => $conversationData,
        ]);
    }





    public function getConversation(Request $request)
    {
        $authuser = Auth::user();
        $id = $request->query('id'); // Retrieve the conversation ID from the query parameter

        // Retrieve the conversation where the authenticated user is either the sender or receiver
        $conversation = Conversation::where(function ($query) use ($authuser) {
            $query->where('sender_id', $authuser->id)
                  ->orWhere('receiver_id', $authuser->id);
        })->where('id', $id)
          ->with('messages')  // Eager load messages
          ->first();

        // If the conversation does not exist or the user is not part of it, return a 404
        if (!$conversation) {
            return response()->json(['error' => 'Conversation not found or unauthorized.'], 404);
        }

        // Get the receiver and sender using the methods defined in the Conversation model
        $receiver = $conversation->getReceiver();
        $sender = $conversation->getSender();

        // Map the conversation data along with its messages and receiver/sender information
        $conversationData = [
            'type' => 'conversations',
            'id' => $conversation->id,
            'attributes' => [
                'id' => $conversation->id,
                'created_at' => $conversation->created_at,
                'messages' => $conversation->messages->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'body' => $message->body,
                        'sender_id' => $message->sender_id,
                        'receiver_id' => $message->receiver_id,
                        'created_at' => $message->created_at,
                        'read_at' => $message->read_at,
                    ];
                }),

                    'sender' => [
                        'id' => $sender->id,
                        'role' => $sender->role,
                        'email' => $sender->email,
                        'address' => $sender->address,
                        'name' => $sender->name,
                        'lastActivity' => $sender->updated_at->toIso8601String(),
                        'avatarUrl' => $sender->profile_image,
                        'phoneNumber' => $sender->phone_number,
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $sender->created_at->toIso8601String(),
                    ],
                    'receiver' => [
                        'id' => $receiver->id,
                        'role' => $receiver->role,
                        'email' => $receiver->email,
                        'address' => $receiver->address,
                        'name' => $receiver->name,
                        'lastActivity' => $receiver->updated_at->toIso8601String(),
                        'avatarUrl' => $receiver->profile_image,
                        'phoneNumber' => $receiver->phone_number,
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $receiver->created_at->toIso8601String(),
                    ],

            ],
        ];

        // Return the conversation data as a JSON:API compliant response
        return response()->json([
            'data' => $conversationData,
        ]);
    }






    public function clickConversation(Request $request)
    {
        $authuser = Auth::user();
        $id = $request->query('id'); // Retrieve the conversation ID from the query parameter

        // Retrieve the conversation where the authenticated user is either the sender or receiver
        $conversation = Conversation::where(function ($query) use ($authuser) {
            $query->where('sender_id', $authuser->id)
                  ->orWhere('receiver_id', $authuser->id);
        })->where('id', $id)
          ->with('messages')  // Eager load messages
          ->first();

        // If the conversation does not exist or the user is not part of it, return a 404
        if (!$conversation) {
            return response()->json(['error' => 'Conversation not found or unauthorized.'], 404);
        }

        // Get the receiver using the method defined in the Conversation model
        $receiver = $conversation->getReceiver();

        // Map the conversation data along with its messages and receiver information
        $conversationData = [
            'type' => 'conversations',
            'id' => $conversation->id,
            'attributes' => [
                'id' => $conversation->id,
                'created_at' => $conversation->created_at,
                'messages' => $conversation->messages->map(function ($message) {
                    return [
                        'id' => $message->id,
                        'body' => $message->body,
                        'sender_id' => $message->sender_id,
                        'receiver_id' => $message->receiver_id,
                        'created_at' => $message->created_at,
                        'read_at' => $message->read_at,
                    ];
                }),
                'receiver' => [
                    'id' => $receiver->id,
                    'role' => 'admin', // Assuming role is a field in the users table
                    'email' => $receiver->email,
                    'address' => $receiver->address,
                    'name' => $receiver->name,
                    'lastActivity' => $receiver->updated_at->toIso8601String(),
                    'avatarUrl' => $receiver->profile_image,
                    'phoneNumber' => $receiver->phone_number, // Assuming you have a phone_number field
                    'status' => 'online', // Assuming you determine the user's status
                    'created_at' => $receiver->created_at->toIso8601String(),
                ],
            ],
        ];

        // Return the conversation data as a JSON:API compliant response
        return response()->json([
            'data' => $conversationData,
        ]);
    }


    public function sendMessage(Request $request)
    {
        $authUser = Auth::user();
        $conversationId = $request->query('id'); // Extract conversation ID from the query string



        // Validate the request data
        $validatedData = $request->validate([
            'body' => 'required|string|max:5000',
            'attachment' => 'nullable|file|mimes:jpeg,png,jpg,gif,svg|max:2048', // Adjust as needed
        ]);

        // Retrieve the conversation by its ID
        $conversation = Conversation::where(function ($query) use ($authUser) {
            $query->where('sender_id', $authUser->id)
                  ->orWhere('receiver_id', $authUser->id);
        })->where('id', $conversationId)
          ->first();

        // If the conversation does not exist or the user is not part of it, return a 404
        if (!$conversation) {
            return response()->json(['error' => 'Conversation not found or unauthorized.'], 404);
        }

        // Determine the receiver of the message
        $userId = $conversation->sender_id === $authUser->id ? $conversation->receiver_id : $conversation->sender_id;

        // Create the message
        $message = new Message();
        $message->body = $validatedData['body'];
        $message->sender_id = $authUser->id;
        $message->receiver_id = $userId;
        $message->conversation_id = $conversation->id;

        // Handle attachment if any
        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $filePath = $file->store('attachments', 'public'); // Save the file in the public disk
            $message->attachment_url = $filePath; // Save the file path in the database
        }

        // Save the message
        $message->save();

        broadcast(new MessageSent($message))->toOthers();


        // Optionally, you can broadcast an event here for real-time updates

        // Return the newly created message as a JSON:API compliant response
        return response()->json([
            'data' => [
                'type' => 'messages',
                'id' => $message->id,
                'attributes' => [
                    'body' => $message->body,
                    'sender_id' => $message->sender_id,
                    'receiver_id' => $message->receiver_id,
                    'conversation_id' => $message->conversation_id,
                    'attachment_url' => $message->attachment_url ?? null,
                    'created_at' => $message->created_at->toIso8601String(),
                ],
            ],
        ], 201); // HTTP 201 Created
    }




    public function createConversation(Request $request)
    {
        $authuser = Auth::user();
        $userId = $request->query('userID');

        // Log the incoming conversation data for debugging
        Log::info('Received conversation data:', $request->all());

        // Extract the first message from the conversation data
        $messageData = $request->input('messages.0'); // Assuming there's only one message in the request

        // If no conversation exists, create a new one
        $conversation = new Conversation();
        $conversation->sender_id = $authuser->id;
        $conversation->receiver_id = $userId;
        $conversation->save();

        // Now, create a new message associated with this conversation
        $message = new Message();
        $message->conversation_id = $conversation->id;
        $message->sender_id = $authuser->id;
        $message->receiver_id = $userId;
        $message->body = $messageData['body']; // Use the extracted body from the message data
        $message->created_at = now(); // Use the current time for created_at
        $message->save();

        $receiver = $conversation->getReceiver();
        $sender = $conversation->getSender();

        // Return the newly created conversation and the message
        return response()->json([
            'data' => [
                'type' => 'conversations',
                'id' => $conversation->id,
                'attributes' => [
                    'id' => $conversation->id,
                    'created_at' => $conversation->created_at,
                    'messages' => [
                        [
                            'id' => $message->id,
                            'body' => $message->body,
                            'sender_id' => $message->sender_id,
                            'receiver_id' => $message->receiver_id,
                            'created_at' => $message->created_at,
                        ],
                    ],



                    'sender' => [
                        'id' => $sender->id,
                        'role' => $sender->role,
                        'email' => $sender->email,
                        'address' => $sender->address,
                        'name' => $sender->name,
                        'lastActivity' => $sender->updated_at->toIso8601String(),
                        'avatarUrl' => $sender->profile_image,
                        'phoneNumber' => $sender->phone_number,
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $sender->created_at->toIso8601String(),
                    ],
                    'receiver' => [
                        'id' => $receiver->id,
                        'role' => $receiver->role,
                        'email' => $receiver->email,
                        'address' => $receiver->address,
                        'name' => $receiver->name,
                        'lastActivity' => $receiver->updated_at->toIso8601String(),
                        'avatarUrl' => $receiver->profile_image,
                        'phoneNumber' => $receiver->phone_number,
                        'status' => 'online', // Assuming you determine the user's status
                        'created_at' => $receiver->created_at->toIso8601String(),
                    ],





                ],
            ],
        ], 201); // 201 Created status
    }



}

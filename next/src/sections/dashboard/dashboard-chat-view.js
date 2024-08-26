'use client';

import { useState, useEffect, useCallback } from "react";
import CrudService from "src/services/cruds-service";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { paths } from 'src/routes/paths';
import { useRouter, useSearchParams } from 'src/routes/hooks';
import { useBoolean } from 'src/hooks/use-boolean';
import { EmptyContent } from 'src/components/empty-content';
import { useCollapseNav } from 'src/sections/chat/hooks/use-collapse-nav';

import { Layout } from 'src/sections/chat/layout';
import { ChatNav } from 'src/sections/chat/chat-nav';
import { ChatRoom } from 'src/sections/chat/chat-room';
import { ChatHeaderCompose } from 'src/sections/chat/chat-header-compose';
import { ChatMessageList } from 'src/sections/chat/chat-message-list';
import { ChatMessageInput } from 'src/sections/chat/chat-message-input';
import { ChatHeaderDetail } from 'src/sections/chat/chat-header-detail';

// ----------------------------------------------------------------------

export default function DashboardChatPage() {
  const loading = useBoolean(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  const [conversationList, setConversationList] = useState(null);
  const [currentConversation, setCurrentConversation] = useState(null);
  const [recipients, setRecipients] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [currentSender, setCurrentSender] = useState([]);

  const userID = searchParams.get('userID');
  const selectedConversationId = searchParams.get('id') || '';

  const roomNav = useCollapseNav();
  const conversationsNav = useCollapseNav();

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getConversations();



        const conversations = response.data.map((conversation) => conversation.attributes);
        setConversationList(conversations);

        // Extracting receivers from all conversations
        const receivers = conversations.map((conversation) => conversation.receiver);
        setRecipients(receivers);

        // Extracting sender from the first conversation (since the sender is the same across all conversations)
        const sender = conversations[0]?.sender;



        setCurrentSender(sender);
      } catch (error) {
        console.error('Failed to fetch listing:', error);
      }
    })();
  }, []);

  useEffect(() => {
    if (userID) {
      (async () => {
        try {
          const response = await CrudService.checkConversation(userID);
          const conversationData = response.data;

          if (conversationData.id) {
            setCurrentConversation(conversationData);
            console.log('checkConversation:', conversationData);
            setParticipants(conversationData.attributes.receiver);

            // Redirect to the chat page with the conversation ID
            router.push(`${paths.eCommerce.chat}?id=${conversationData.id}`);
          } else {
            setParticipants([conversationData.attributes]);
          }
        } catch (error) {
          console.error('Failed to fetch conversation:', error);
        }
      })();
    }
  }, [userID, router]);

  useEffect(() => {
    if (selectedConversationId) {
      (async () => {
        try {
          const response = await CrudService.getConversation(selectedConversationId);
          const conversationData = response.data.attributes;
          setCurrentConversation(conversationData);
          setParticipants(conversationData.receiver);
          setCurrentSender(conversationData.sender);

          console.log('getConversation:', conversationData);
        } catch (error) {
          console.error('Failed to fetch conversation:', error);
        }
      })();
    }
  }, [selectedConversationId]);

  const handleConversationClick = (conversationData) => {
    setCurrentConversation(conversationData);
    setParticipants(conversationData.receiver);
  };

  useEffect(() => {
    const fakeLoading = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      loading.onFalse();
    };
    fakeLoading();
  }, [loading]);

  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);




  const handleMessageSent = (newMessage) => {
    setConversationList((prevConversations) => {
      let updatedConversations;

      if (selectedConversationId) {
        // Update the existing conversation
        updatedConversations = prevConversations.map((conv) => {
          if (conv.id === selectedConversationId) {
            return {
              ...conv,
              messages: [...conv.messages, newMessage],
            };
          }
          return conv;
        });
      } else {
        // Create a new conversation
        const newConversation = {
          id: newMessage.id,
          messages: [newMessage],
          participants: recipients,
          unreadCount: 0,
          receiver: recipients[0], // Assuming there's only one recipient for simplicity
          sender: currentSender,
        };

        updatedConversations = [newConversation, ...prevConversations];
      }

      // Reorder conversations by the latest message's timestamp
      updatedConversations.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        return new Date(b.messages[b.messages.length - 1].created_at) - new Date(a.messages[a.messages.length - 1].created_at);
      });

      return updatedConversations;
    });

    if (selectedConversationId) {
      // Update the current conversation's messages in the state
      setCurrentConversation((prevConversation) => ({
        ...prevConversation,
        messages: [...(prevConversation?.messages || []), newMessage],
      }));
    }
  };




  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Chat
      </Typography>

      <Layout
        sx={{
          minHeight: 0,
          flex: '1 1 0',
          borderRadius: 2,
          position: 'relative',
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.card,
        }}
        slots={{
          header: selectedConversationId ? (
            <ChatHeaderDetail collapseNav={roomNav} participants={[participants]} />
          ) : (
            <ChatHeaderCompose contacts={participants} onAddRecipients={handleAddRecipients} />
          ),

          nav: (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '70vh',
                overflow: 'hidden',
              }}
            >
              <ChatNav
                contacts={recipients}
                conversations={conversationList}
                sender={currentSender}
                selectedConversationId={selectedConversationId}
                collapseNav={conversationsNav}
                onConversationClick={handleConversationClick}
              />
            </Box>
          ),
          main: (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '70vh',
                overflow: 'hidden',
              }}
            >
              {selectedConversationId ? (
                <ChatMessageList
                  messages={currentConversation?.messages ?? []}
                  participants={[participants]}
                  sender={currentSender}
                />
              ) : (
                <EmptyContent
                  imgUrl={`${process.env.NEXT_PUBLIC_STATIC_IMAGE_BASE_URL}/empty/ic-chat-active.svg`}
                  title="Good morning!"
                  description="Write something awesome..."
                />
              )}

              <ChatMessageInput
                recipients={recipients}
                selectedConversationId={selectedConversationId}
                disabled={!recipients.length && !selectedConversationId}
                onMessageSent={handleMessageSent}
                sender={currentSender}
              />
            </Box>
          ),

          details: selectedConversationId && (
            <ChatRoom collapseNav={roomNav} participants={participants} messages={currentConversation?.messages ?? []} />
          ),
        }}
      />
    </>
  );
}

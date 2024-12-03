'use client';

import { useState, useEffect, useCallback, useMemo } from "react";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import initializeEcho from 'src/utils/echo'; // Import Laravel Echo

import CrudService from "src/services/cruds-service";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { paths as getPaths } from 'src/routes/paths';
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


  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);

  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const [recipients, setRecipients] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [currentSender, setCurrentSender] = useState([]);

  const userID = searchParams.get('userID');
  const selectedConversationId = searchParams.get('id') || '';

  const roomNav = useCollapseNav(true);
  const conversationsNav = useCollapseNav();




    // Fetch all conversations
    const { data: conversationList, isLoading: isConversationsLoading, error: conversationsError } = useQuery({
      queryKey: ['conversations'],
      queryFn: () => CrudService.getConversations().then((res) => res.data.map((conv) => conv.attributes)),
      onError: (error) => {
        console.error('Failed to fetch conversations:', error);
      },
    });

    // Fetch current conversation by user ID
    const { data: userConversation, isLoading: isUserConversationLoading, error: userConversationError } = useQuery({
      queryKey: ['conversation', userID],
      queryFn: () => CrudService.checkConversation(userID),
      enabled: !!userID,
      onError: (error) => {
        console.error('Failed to fetch conversation:', error);
      },
    });



    // Fetch selected conversation by conversation ID
    const { data: currentConversation, isLoading: isConversationDetailLoading, error: conversationDetailError } = useQuery({
      queryKey: ['conversationDetail', selectedConversationId],
      queryFn: () => CrudService.getConversation(selectedConversationId).then((res) => res.data.attributes),
      enabled: !!selectedConversationId,
      onError: (error) => {
        console.error('Failed to fetch conversation detail:', error);
      },
    });



    useEffect(() => {

      if (!selectedConversationId) {
        return () => {
          // No-op cleanup function when there's no conversation selected
        };
      }

      const echo = initializeEcho(); // Initialize Echo if authToken exists
      if (!echo) {
        console.log('Echo not initialized due to missing auth token.');
        return;
      }

      const channel = echo.private(`chat.${selectedConversationId}`);

      channel.listen('.message.sent', (event) => {

        // Update the messages dynamically
        queryClient.setQueryData(['conversationDetail', selectedConversationId], (prev) => ({
          ...prev,
          messages: [...(prev?.messages || []), event.message],
        }));
      });

      channel.error((err) => {
        console.error('Channel error:', err);
      });

      return () => {
        channel.stopListening('.message.sent');
      };
    }, [selectedConversationId, queryClient]);



    // Update recipients and sender after fetching conversations
    useEffect(() => {
      if (conversationList) {
        const receivers = conversationList.map((conversation) => conversation.receiver);
        setRecipients(receivers);

        const sender = conversationList[0]?.sender;
        setCurrentSender(sender);
      }
    }, [conversationList]);



    useEffect(() => {
      if (userConversation?.data?.id) {
        // Correctly access the receiver and redirect
        setParticipants(userConversation.data.attributes.receiver);
        router.push(`${paths.eCommerce.chat}?id=${userConversation.data.id}`);
      } else if (userConversation) {
        // Handle the case when there is no conversation but user data exists
        setParticipants([userConversation.data.attributes]);
      }
    }, [userConversation, router, paths.eCommerce.chat]);



    // Update participants and sender after fetching selected conversation
    useEffect(() => {
      if (currentConversation) {
        setParticipants(currentConversation.receiver);
        setCurrentSender(currentConversation.sender);
      }
    }, [currentConversation]);





  const handleConversationClick = (conversationData) => {

    setParticipants(conversationData.receiver);
  };



  const handleAddRecipients = useCallback((selected) => {
    setRecipients(selected);
  }, []);



  const handleMessageSent = (newMessage) => {
    queryClient.setQueryData(['conversations'], (oldConversations) => {
      let updatedConversations;
      if (selectedConversationId) {
        updatedConversations = oldConversations.map((conv) =>
          conv.id === selectedConversationId
            ? { ...conv, messages: [...conv.messages, newMessage] }
            : conv
        );
      } else {
        const newConversation = {
          id: newMessage.id,
          messages: [newMessage],
          participants: recipients,
          unreadCount: 0,
          receiver: recipients[0],
          sender: currentSender,
        };
        updatedConversations = [newConversation, ...oldConversations];
      }

      updatedConversations.sort((a, b) => {
        const lastMessageA = a.messages[a.messages.length - 1];
        const lastMessageB = b.messages[b.messages.length - 1];
        return new Date(lastMessageB.created_at) - new Date(lastMessageA.created_at);
      });

      return updatedConversations;
    });

    queryClient.setQueryData(['conversationDetail', selectedConversationId], (prevConversation) => ({
      ...prevConversation,
      messages: [...(prevConversation?.messages || []), newMessage],
    }));
  };



    // Memoized values for conversations, participants, and sender
    const memoizedData = useMemo(() => {
      if (!conversationList) return { filteredConversations: [], participants: [], sender: null };

      const filteredConversations = conversationList.filter((conv) => conv.messages.length > 0);
      const allParticipants = filteredConversations.map((conv) => conv.receiver);
      const mainSender = filteredConversations[0]?.sender || null;

      return { filteredConversations, participants: allParticipants, sender: mainSender };
    }, [conversationList]);


  return (
    <>
      <Typography variant="h5" sx={{ mb: 3 }}>
      {t('Chat')}
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
            <ChatHeaderDetail
              collapseNav={roomNav}
              participants={[participants]}
              loading={isConversationDetailLoading}
            />
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
                conversations={memoizedData.filteredConversations}
                sender={memoizedData.sender}
                selectedConversationId={selectedConversationId}
                collapseNav={conversationsNav}
                onConversationClick={handleConversationClick}
                loading={isConversationsLoading}

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
                  loading={isConversationDetailLoading}

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
            <ChatRoom
              collapseNav={roomNav}
              participants={participants}
              messages={currentConversation?.messages ?? []}
              loading={isConversationDetailLoading}

            />
          ),
        }}
      />
    </>
  );
}

import PropTypes from 'prop-types'; // Import PropTypes
import { useRef, useMemo, useState, useCallback } from 'react';
import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { formatISO } from 'date-fns';

import { uuidv4 } from 'src/utils/uuidv4';
import { Iconify } from 'src/components/iconifyy';
import CrudService from 'src/services/cruds-service';

export function ChatMessageInput({
  disabled,
  recipients,
  sender,
  selectedConversationId,
  onMessageSent, // Callback to notify the parent component
}) {
  const router = useRouter();
  const fileRef = useRef(null);
  const [message, setMessage] = useState('');

  const messageData = useMemo(
    () => ({
      id: uuidv4(),
      attachments: [],
      body: message,
      contentType: 'text',
      createdAt: formatISO(new Date()), // Set the current time in ISO format
      sender_id: sender.id, // Include sender_id
    }),
    [message, sender.id]
  );

  const conversationData = useMemo(
    () => ({
      id: uuidv4(),
      messages: [messageData],
      participants: recipients,
      type: recipients.length > 1 ? 'GROUP' : 'ONE_TO_ONE',
      unreadCount: 0,
    }),
    [messageData, recipients]
  );

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleSendMessage = useCallback(
    async (event) => {
      if (event.key === 'Enter') {
        try {
          if (message) {
            let response;

            if (selectedConversationId) {
              response = await CrudService.sendMessage(messageData, selectedConversationId);
              if (onMessageSent) {
                onMessageSent(messageData); // Send the new message data to the parent
              }
            } else {
              response = await CrudService.createConversation(conversationData, recipients[0].id);
              const newConversationId = response.data.id;

              if (onMessageSent) {
                onMessageSent(response.data.attributes.messages[0]); // Send the first message of the new conversation to the parent
              }

              router.push(`${paths.eCommerce.chat}?id=${newConversationId}`);
            }

            setMessage('');
          }
        } catch (error) {
          console.error('Failed to send message or create conversation:', error);
        }
      }
    },
    [conversationData, message, messageData, onMessageSent, recipients, router, selectedConversationId]
  );

  return (
    <>
      <InputBase
        name="chat-message"
        id="chat-message-input"
        value={message}
        onKeyUp={handleSendMessage}
        onChange={handleChangeMessage}
        placeholder="Type a message"
        disabled={disabled}
        startAdornment={
          <IconButton>
            <Iconify icon="eva:smiling-face-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton onClick={handleAttach}>
              <Iconify icon="solar:gallery-add-bold" />
            </IconButton>
            <IconButton onClick={handleAttach}>
              <Iconify icon="eva:attach-2-fill" />
            </IconButton>
            <IconButton>
              <Iconify icon="solar:microphone-bold" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input type="file" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}

// Define prop types
ChatMessageInput.propTypes = {
  disabled: PropTypes.bool.isRequired,
  recipients: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
  sender: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  selectedConversationId: PropTypes.string,
  onMessageSent: PropTypes.func.isRequired,
};

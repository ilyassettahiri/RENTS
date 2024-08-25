import PropTypes from 'prop-types'; // Import PropTypes
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Scrollbar from 'src/components/scrollbar';
import { Lightbox, useLightBox } from 'src/components/lightboxx';
import { ChatMessageItem } from './chat-message-item';
import { useMessagesScroll } from './hooks/use-messages-scroll';

// ----------------------------------------------------------------------

export function ChatMessageList({ messages = [], participants, sender, loading }) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const slides = messages
    .filter((message) => message.contentType === 'image')
    .map((message) => ({ src: message.body }));

  const lightbox = useLightBox(slides);

  if (loading) {
    return (
      <Stack sx={{ flex: '1 1 auto', position: 'relative' }}>
        <LinearProgress
          color="inherit"
          sx={{
            top: 0,
            left: 0,
            width: 1,
            height: 2,
            borderRadius: 0,
            position: 'absolute',
          }}
        />
      </Stack>
    );
  }

  return (
    <>
      <Scrollbar ref={messagesEndRef} sx={{ px: 3, pt: 5, pb: 3, flex: '1 1 auto' }}>
        {messages.map((message) => (
          <ChatMessageItem
            key={message.id}
            message={message}
            sender={sender}
            participants={participants}
            onOpenLightbox={() => lightbox.onOpen(message.body)}
          />
        ))}
      </Scrollbar>

      <Lightbox
        slides={slides}
        open={lightbox.open}
        close={lightbox.onClose}
        index={lightbox.selected}
      />
    </>
  );
}

// Define prop types
ChatMessageList.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired,
      contentType: PropTypes.string,
    })
  ).isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  sender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  loading: PropTypes.bool.isRequired,
};

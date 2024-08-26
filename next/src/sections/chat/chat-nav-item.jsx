import { useCallback } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import PropTypes from 'prop-types'; // Import PropTypes
import { paths } from 'src/routes/paths';

import { useRouter } from 'src/routes/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { fToNow } from 'src/utils/format-time';
import CrudService from 'src/services/cruds-service';

// ----------------------------------------------------------------------

export function ChatNavItem({ selected, collapse, conversation, onCloseMobile, onConversationClick }) {


  const router = useRouter();
  const mdUp = useResponsive('up', 'md');

  const { receiver, sender, unreadCount } = conversation;

  const lastMessage = conversation.messages && conversation.messages.length > 0
  ? conversation.messages[conversation.messages.length - 1]
  : null;

  const { name, avatarUrl, status } = receiver;

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

      const response = await CrudService.clickConversation(conversation.id);
      const conversationData = response.data.attributes;

      onConversationClick(conversationData);

      router.push(`${paths.eCommerce.chat}?id=${conversation.id}`);
    } catch (error) {
      console.error('Failed to fetch conversation:', error);
    }
  }, [conversation.id, mdUp, onCloseMobile, router, onConversationClick]);

  const renderSingle = (
    <Badge key={status} variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Avatar alt={name} src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${avatarUrl}`}sx={{ width: 48, height: 48 }} />
    </Badge>
  );

  const isLastMessageFromSender = lastMessage.sender_id === sender.id;
  const lastMessageText = isLastMessageFromSender ? `You: ${lastMessage.body}` : lastMessage.body;
  const lastMessageTime = fToNow(lastMessage.created_at);

  return (
    <Box component="li" sx={{ display: 'flex' }}>
      <ListItemButton
        onClick={handleClickConversation}
        sx={{
          py: 1.5,
          px: 2.5,
          gap: 2,
          ...(selected && { bgcolor: 'action.selected' }),
        }}
      >
        <Badge
          color="error"
          overlap="circular"
          badgeContent={collapse ? unreadCount : 0}
        >
          {renderSingle}
        </Badge>

        {!collapse && (
          <>
            <ListItemText
              primary={name}
              primaryTypographyProps={{ noWrap: true, component: 'span', variant: 'subtitle2' }}
              secondary={lastMessageText}
              secondaryTypographyProps={{
                noWrap: true,
                component: 'span',
                variant: unreadCount ? 'subtitle2' : 'body2',
                color: unreadCount ? 'text.primary' : 'text.secondary',
              }}
            />

            <Stack alignItems="flex-end" sx={{ alignSelf: 'stretch' }}>
              <Typography
                noWrap
                variant="body2"
                component="span"
                sx={{ mb: 1.5, fontSize: 12, color: 'text.disabled' }}
              >
                {lastMessageTime}
              </Typography>

              {!!unreadCount && (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: 'info.main',
                    borderRadius: '50%',
                  }}
                />
              )}
            </Stack>
          </>
        )}
      </ListItemButton>
    </Box>
  );
}

// Define prop types
ChatNavItem.propTypes = {
  selected: PropTypes.bool.isRequired,
  collapse: PropTypes.bool.isRequired,
  conversation: PropTypes.shape({
    id: PropTypes.number.isRequired,
    receiver: PropTypes.shape({
      name: PropTypes.string.isRequired,
      avatarUrl: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    }).isRequired,
    sender: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
    unreadCount: PropTypes.number.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        sender_id: PropTypes.number.isRequired,
        body: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  onCloseMobile: PropTypes.func.isRequired,
  onConversationClick: PropTypes.func.isRequired,
};

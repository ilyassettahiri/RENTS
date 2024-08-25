import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fToNow } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconifyy';

import { useMessage } from './hooks/use-message';

// ----------------------------------------------------------------------

export function ChatMessageItem({ message, participants, sender, onOpenLightbox }) {
  const currentUser = sender;
  const otherParticipant = participants[0]; // Since participants only contains the receiver


  // Determine if the message is from the current user
  const isMessageFromCurrentUser = message.sender_id === currentUser.id;

  // Explicitly handle cases where senderDetails may be undefined
  const firstName = isMessageFromCurrentUser ? currentUser.name : otherParticipant?.name;
  const avatarUrl = isMessageFromCurrentUser ? currentUser.avatarUrl : otherParticipant?.avatarUrl;

  // Ensure body and createdAt are defined correctly
  const body = message?.body || '';
  const createdAt = message?.createdAt || message?.created_at || new Date().toISOString(); // Fallback to current time if createdAt is empty

  console.log('ChatMessageItem - createdAt:', createdAt);

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{ mb: 1, color: 'text.disabled', ...(!isMessageFromCurrentUser && { mr: 'auto' }) }}
    >
      {!isMessageFromCurrentUser && `${firstName}, `}
      {fToNow(new Date(createdAt))}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        p: 1.5,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(isMessageFromCurrentUser && { color: 'grey.800', bgcolor: 'primary.lighter' }),
        ...(false && { p: 0, bgcolor: 'transparent' }), // hasImage is set to false since we don't have image logic here
      }}
    >
      {false ? (
        <Box
          component="img"
          alt="attachment"
          src={body}
          onClick={() => onOpenLightbox(body)}
          sx={{
            width: 400,
            height: 'auto',
            borderRadius: 1.5,
            cursor: 'pointer',
            objectFit: 'cover',
            aspectRatio: '16/11',
            '&:hover': { opacity: 0.9 },
          }}
        />
      ) : (
        body
      )}
    </Stack>
  );

  const renderActions = (
    <Stack
      direction="row"
      className="message-actions"
      sx={{
        pt: 0.5,
        left: 0,
        opacity: 0,
        top: '100%',
        position: 'absolute',
        transition: (theme) =>
          theme.transitions.create(['opacity'], { duration: theme.transitions.duration.shorter }),
        ...(isMessageFromCurrentUser && { right: 0, left: 'unset' }),
      }}
    >
      <IconButton size="small">
        <Iconify icon="solar:reply-bold" width={16} />
      </IconButton>

      <IconButton size="small">
        <Iconify icon="eva:smiling-face-fill" width={16} />
      </IconButton>

      <IconButton size="small">
        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
      </IconButton>
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={isMessageFromCurrentUser ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      {!isMessageFromCurrentUser && <Avatar alt={firstName} src={avatarUrl} sx={{ width: 32, height: 32, mr: 2 }} />}

      <Stack alignItems={isMessageFromCurrentUser ? 'flex-end' : 'flex-start'}>
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{ position: 'relative', '&:hover': { '& .message-actions': { opacity: 1 } } }}
        >
          {renderBody}
          {renderActions}
        </Stack>
      </Stack>
    </Stack>
  );
}

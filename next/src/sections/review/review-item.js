import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useBoolean } from 'src/hooks/use-boolean';
import { fDate } from 'src/utils/format-time';
import CrudService from 'src/services/cruds-service';

// ----------------------------------------------------------------------

const AVATAR_SIZE = 48;
const WIDTH = `calc(100% - ${AVATAR_SIZE + 20}px)`;

export default function ReviewItem({
  id,
  name,
  rating,
  message,
  tagUser = '',
  createdAt,
  hasReply = false,
  profile_image = '',
  helpful = 0,
  replies = [],
  onLike,
  category,
  url,
  onNewReply,
}) {
  const replyOpen = useBoolean();
  const [replyMessage, setReplyMessage] = useState('');
  const { t } = useTranslation();

  const handleReplySubmit = async () => {
    try {
      const response = await CrudService.createReviewReply({ message: replyMessage }, category, url, id);
      if (response.data) {
        onNewReply(id, response.data.attributes);
        setReplyMessage('');
        replyOpen.onFalse();
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          py: 3,
          alignItems: 'flex-start',
          ...(hasReply && {
            ml: 'auto',
            width: WIDTH,
          }),
        }}
      >
        <Avatar
          alt={name}

          src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile_image}`}

          sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 2.5 }}
        />

        <Stack sx={{ width: 1 }}>
          <Stack
            spacing={1}
            alignItems={{ sm: 'center' }}
            direction={{ xs: 'column', sm: 'row' }}
            justifyContent={{ sm: 'space-between' }}
          >
            <Typography variant="subtitle2">{name}</Typography>

            {!hasReply && <Rating size="small" value={rating} precision={0.5} readOnly />}
          </Stack>

          {createdAt && (
            <Typography
              variant="body2"
              sx={{
                mb: 1,
                mt: { xs: 1, sm: 0.5 },
                color: 'text.disabled',
              }}
            >
              {fDate(createdAt)}
            </Typography>
          )}

          <Typography variant="body2">
            {tagUser && <strong>{`@${tagUser} `}</strong>}
            {message}
          </Typography>

          {!hasReply && (
            <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 2 }}>
              <Button size="small" color="inherit" onClick={() => onLike(id)}>
                 {t('Helpful')} ({helpful})
              </Button>

              <Box
                sx={{
                  width: 4,
                  height: 4,
                  bgcolor: 'text.disabled',
                  borderRadius: '50%',
                }}
              />

              <Button
                size="small"
                color={replyOpen.value ? 'primary' : 'inherit'}
                onClick={replyOpen.onToggle}
              >
                {t('Reply')}
              </Button>
            </Stack>
          )}

          {!hasReply && replyOpen.value && (
            <>
              <TextField
                fullWidth
                hiddenLabel
                placeholder="Write comment..."
                InputProps={{ sx: { height: 48 } }}
                sx={{ mt: 3 }}
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <Button onClick={handleReplySubmit}> {t('Submit')} </Button>
            </>
          )}

          {replies.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {replies.map((reply) => (
                <Stack key={reply.id} direction="row" sx={{ mt: 2 }}>
                  <Avatar
                    alt={reply.name}

                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${reply.profile_image}`}

                    sx={{ width: AVATAR_SIZE, height: AVATAR_SIZE, mr: 2.5 }}
                  />
                  <Box>
                    <Typography variant="subtitle2">{reply.name}</Typography>
                    <Typography variant="body2" sx={{ color: 'text.disabled', mb: 1 }}>
                      {fDate(new Date(reply.created_at))}
                    </Typography>
                    <Typography variant="body2">{reply.message}</Typography>
                  </Box>
                </Stack>
              ))}
            </Box>
          )}
        </Stack>
      </Stack>

      <Divider sx={{ ml: 'auto', width: WIDTH }} />
    </>
  );
}

ReviewItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  hasReply: PropTypes.bool,
  rating: PropTypes.number.isRequired,
  helpful: PropTypes.number,
  message: PropTypes.string.isRequired,
  tagUser: PropTypes.string,
  profile_image: PropTypes.string,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  onLike: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  onNewReply: PropTypes.func.isRequired,
  replies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      picture: PropTypes.string,
      profile_image: PropTypes.string,

      message: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};

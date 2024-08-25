import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useBoolean } from 'src/hooks/use-boolean';
import { Iconify } from 'src/components/iconifyy';

export function ChatRoomSingle({ participant }) {
  const collapse = useBoolean(true);



  const renderInfo = (
    <Stack alignItems="center" sx={{ py: 5 }}>
      <Avatar
        alt={participant?.name}
        src={participant?.avatarUrl}
        sx={{ width: 96, height: 96, mb: 2 }}
      />
      <Typography variant="subtitle1">{participant?.name}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {participant?.role || 'No role specified'}
      </Typography>
    </Stack>
  );

  const renderContact = (
    <Stack spacing={2} sx={{ px: 2, py: 2.5 }}>
      {[
        { icon: 'mingcute:location-fill', label: 'Address', value: participant?.address || 'No address provided' },
        { icon: 'solar:phone-bold', label: 'Phone', value: participant?.phoneNumber || 'No phone number provided' },
        { icon: 'fluent:mail-24-filled', label: 'Email', value: participant?.email || 'No email provided' },
      ].map((item) => (
        <Stack
          key={item.icon}
          spacing={1}
          direction="row"
          sx={{ typography: 'body2', wordBreak: 'break-all' }}
        >
          <Iconify icon={item.icon} sx={{ flexShrink: 0, color: 'text.disabled' }} />
          <Typography variant="body2" sx={{ color: 'text.primary', ml: 1 }}>
            <strong>{item.label}: </strong>{item.value}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );

  return (
    <>
      {renderInfo}

      <Button onClick={collapse.onToggle} variant="text">
        Information
      </Button>

      <Collapse in={collapse.value}>{renderContact}</Collapse>
    </>
  );
}

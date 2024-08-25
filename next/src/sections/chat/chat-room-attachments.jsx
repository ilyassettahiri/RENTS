import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { useBoolean } from 'src/hooks/use-boolean';
import { fDateTime } from 'src/utils/format-time';
import { FileThumbnail } from 'src/components/file-thumbnail';

export function ChatRoomAttachments({ attachments }) {
  const collapse = useBoolean(true);
  const totalAttachments = attachments.length;

  const renderList = attachments.map((attachment, index) => (
    <Stack key={attachment.name + index} spacing={1.5} direction="row" alignItems="center">
      {attachment.preview && (
        <FileThumbnail
          imageView

          onDownload={() => console.info('DOWNLOAD')}
          slotProps={{ icon: { width: 24, height: 24 } }}
          sx={{ width: 40, height: 40, bgcolor: 'background.neutral' }}
        />
      )}
      <ListItemText
        primary={attachment.name}
        secondary={fDateTime(attachment.createdAt)}
        primaryTypographyProps={{ noWrap: true, typography: 'body2' }}
        secondaryTypographyProps={{
          mt: 0.25,
          noWrap: true,
          component: 'span',
          typography: 'caption',
          color: 'text.disabled',
        }}
      />
    </Stack>
  ));

  return (
    <>
      <Button
        onClick={collapse.onToggle}
        variant="text"
        disabled={!totalAttachments}
      >
        {`Attachments (${totalAttachments})`}
      </Button>

      {!!totalAttachments && (
        <Collapse in={collapse.value}>
          <Stack spacing={2} sx={{ p: 2 }}>
            {renderList}
          </Stack>
        </Collapse>
      )}
    </>
  );
}

import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types'; // Import PropTypes
import Scrollbar from 'src/components/scrollbar';
import { ChatRoomSkeleton } from './chat-skeleton';

import { ChatRoomSingle } from './chat-room-single';

const NAV_WIDTH = 280;
const NAV_DRAWER_WIDTH = 320;

export function ChatRoom({ collapseNav, participants, messages, loading }) {
  const theme = useTheme();
  const { collapseDesktop, openMobile, onCloseMobile } = collapseNav;
  const attachments = messages.map((msg) => msg.attachments).flat() || [];



  const renderContent = loading ? (
    <ChatRoomSkeleton />
  ) : (
    <Scrollbar>
      <div>
        <ChatRoomSingle participant={participants} />
      </div>
    </Scrollbar>
  );

  return (
    <>
      <Stack
        sx={{
          minHeight: 0,
          flex: '1 1 auto',
          width: NAV_WIDTH,
          display: { xs: 'none', lg: 'flex' },
          borderLeft: `solid 1px ${theme.palette.divider}`,
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(collapseDesktop && { width: 0 }),
        }}
      >
        {!collapseDesktop && renderContent}
      </Stack>

      <Drawer
        anchor="right"
        open={openMobile}
        onClose={onCloseMobile}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: NAV_DRAWER_WIDTH } }}
      >
        {renderContent}
      </Drawer>
    </>
  );
}

// Define prop types for the component
ChatRoom.propTypes = {

  loading: PropTypes.bool.isRequired,

  collapseNav: PropTypes.shape({
    collapseDesktop: PropTypes.bool.isRequired,
    openMobile: PropTypes.bool.isRequired,
    onCloseMobile: PropTypes.func.isRequired,
  }).isRequired,
  participants: PropTypes.object.isRequired,  // Assuming participants is an object
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      attachments: PropTypes.array,
    })
  ).isRequired,
};

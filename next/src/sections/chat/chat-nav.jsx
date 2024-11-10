import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import { useTheme } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import { useTranslation } from 'react-i18next';

import { paths as getPaths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconifyy';
import Scrollbar from 'src/components/scrollbar';

import { ToggleButton } from './styles';
import { ChatNavItem } from './chat-nav-item';
import { ChatNavAccount } from './chat-nav-account';
import { ChatNavItemSkeleton } from './chat-skeleton';
import { ChatNavSearchResults } from './chat-nav-search-results';

// ----------------------------------------------------------------------

const NAV_WIDTH = 320;
const NAV_COLLAPSE_WIDTH = 96;

// ----------------------------------------------------------------------

export function ChatNav({
  loading,
  contacts,
  conversations,
  collapseNav,
  selectedConversationId,
  sender,
  onConversationClick,
}) {
  const theme = useTheme();
  const router = useRouter();
  const mdUp = useResponsive('up', 'md');
  const { t } = useTranslation();

  const { locale } = useRouter(); // Get the current language
  const paths = getPaths(locale);

  const {
    openMobile,
    onOpenMobile,
    onCloseMobile,
    onCloseDesktop,
    collapseDesktop,
    onCollapseDesktop,
  } = collapseNav;

  const [searchContacts, setSearchContacts] = useState({ query: '', results: [] });

  useEffect(() => {
    if (!mdUp) {
      onCloseDesktop();
    }
  }, [onCloseDesktop, mdUp]);

  const handleToggleNav = useCallback(() => {
    if (mdUp) {
      onCollapseDesktop();
    } else {
      onCloseMobile();
    }
  }, [mdUp, onCloseMobile, onCollapseDesktop]);

  const handleClickCompose = useCallback(() => {
    if (!mdUp) {
      onCloseMobile();
    }
    router.push(paths.eCommerce.chat);
  }, [mdUp, onCloseMobile, router, paths.eCommerce.chat]);

  const handleSearchContacts = useCallback(
    (inputValue) => {
      setSearchContacts((prevState) => ({ ...prevState, query: inputValue }));

      if (inputValue) {
        const results = contacts.filter((contact) =>
          contact.name.toLowerCase().includes(inputValue)
        );

        setSearchContacts((prevState) => ({ ...prevState, results }));
      }
    },
    [contacts]
  );

  const handleClickAwaySearch = useCallback(() => {
    setSearchContacts({ query: '', results: [] });
  }, []);

  const handleClickResult = useCallback(
    (result) => {
      handleClickAwaySearch();
      router.push(`${paths.eCommerce.chat}?id=${result.id}`);
    },
    [handleClickAwaySearch, router, paths.eCommerce.chat]
  );

  const renderLoading = <ChatNavItemSkeleton />;

  const renderList = (
    <nav>
      <Box component="ul" sx={{ px: 0 }}>
        {conversations &&
          conversations.map((conversation) => (
            <ChatNavItem
              key={conversation.id}
              collapse={collapseDesktop}
              conversation={conversation}
              selected={conversation.id === selectedConversationId}
              onCloseMobile={onCloseMobile}
              onConversationClick={onConversationClick}
            />
          ))}
      </Box>
    </nav>
  );

  const renderListResults = (
    <ChatNavSearchResults
      query={searchContacts.query}
      results={searchContacts.results}
      onClickResult={handleClickResult}
    />
  );

  const renderSearchInput = (
    <ClickAwayListener onClickAway={handleClickAwaySearch}>
      <TextField
        fullWidth
        value={searchContacts.query}
        onChange={(event) => handleSearchContacts(event.target.value)}
        placeholder={t('Searchcontacts')}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
        sx={{ mt: 2.5 }}
      />
    </ClickAwayListener>
  );

  const renderContent = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="center" sx={{ p: 2.5, pb: 0 }}>
        {!collapseDesktop && (
          <>
            <ChatNavAccount sender={sender} />
            <Box sx={{ flexGrow: 1 }} />
          </>
        )}

        <IconButton onClick={handleToggleNav}>
          <Iconify
            icon={collapseDesktop ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
          />
        </IconButton>

        {!collapseDesktop && (
          <IconButton onClick={handleClickCompose}>
            <Iconify width={24} icon="solar:user-plus-bold" />
          </IconButton>
        )}
      </Stack>

      <Box sx={{ p: 2.5, pt: 0 }}>{!collapseDesktop && renderSearchInput}</Box>

      {loading ? (
        renderLoading
      ) : (
        <Scrollbar sx={{ pb: 1 }}>
          {searchContacts.query && !!conversations.length ? renderListResults : renderList}
        </Scrollbar>
      )}
    </>
  );

  return (
    <>
      <ToggleButton onClick={onOpenMobile} sx={{ display: { md: 'none' } }}>
        <Iconify width={16} icon="solar:users-group-rounded-bold" />
      </ToggleButton>

      <Stack
        sx={{
          minHeight: 0,
          flex: '1 1 auto',
          width: NAV_WIDTH,
          display: { xs: 'none', md: 'flex' },
          borderRight: `solid 1px ${theme.palette.divider}`,
          transition: theme.transitions.create(['width'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(collapseDesktop && { width: NAV_COLLAPSE_WIDTH }),
        }}
      >
        {renderContent}
      </Stack>

      <Drawer
        open={openMobile}
        onClose={onCloseMobile}
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: NAV_WIDTH } }}
      >
        {renderContent}
      </Drawer>
    </>
  );
}

// Define prop types
ChatNav.propTypes = {
  loading: PropTypes.bool.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  conversations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  collapseNav: PropTypes.shape({
    openMobile: PropTypes.func.isRequired,
    onOpenMobile: PropTypes.func.isRequired,
    onCloseMobile: PropTypes.func.isRequired,
    onCloseDesktop: PropTypes.func.isRequired,
    collapseDesktop: PropTypes.bool.isRequired,
    onCollapseDesktop: PropTypes.func.isRequired,
  }).isRequired,
  selectedConversationId: PropTypes.number,
  sender: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  onConversationClick: PropTypes.func.isRequired,
};

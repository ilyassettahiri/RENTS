import PropTypes from 'prop-types';
import { useState, useCallback, useEffect  } from 'react';
import { format } from 'date-fns';
import { useResponsive } from 'src/hooks/use-responsive';
import { useTranslation } from 'react-i18next';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/en';
import 'dayjs/locale/fr';
import 'dayjs/locale/ar';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';
import CardActionArea from '@mui/material/CardActionArea';
import useAuthDialog from 'src/hooks/use-authdialog';
import CrudService from 'src/services/cruds-service';

import { capitalizeFirstLetter } from 'src/utils/format-time';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';
import Iconify from 'src/components/iconify';
import LoginDialog from 'src/sections/auth/login-dialog';


dayjs.extend(relativeTime);


// ----------------------------------------------------------------------
// Define the specific social media icons
const socialMediaIcons = [
  { label: 'Facebook', icon: 'eva:facebook-fill', color: '#3b5998' },
  { label: 'Instagram', icon: 'ant-design:instagram-filled', color: '#E4405F' },
  { label: 'TikTok', icon: 'cib:tiktok', color: '#000000' },
  { label: 'Twitter', icon: 'eva:twitter-fill', color: '#1DA1F2' },
  { label: 'LinkedIn', icon: 'eva:linkedin-fill', color: '#0077B5' },
];

const StyledButton = styled((props) => (
  <CardActionArea sx={{ borderRadius: 1, mr: 1 }}>
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.divider}`,
}));


export default function ListingHeader({ tour, seller, favorites = [], onFavoriteToggle }) {
  const { attributes } = tour;
  const { title, city,phone, created_at, average_rating, total_reviews,category,url, id } = attributes;
  const { name, profile_image, id: sellerId, url: sellerUrl, created_at : sellerCreated_at  } = seller;


  const { i18n } = useTranslation();


  dayjs.locale(i18n.language);


  const formattedDuration = dayjs(new Date(created_at)).fromNow();



  const { t } = useTranslation();

  const mdUp = useResponsive('up', 'md');


  const year = format(new Date(sellerCreated_at), 'yyyy');


  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();

  const isFavorite = favorites.includes(id);
  const [favorite, setFavorite] = useState(isFavorite);
  const router = useRouter();


  const [open, setOpen] = useState(null);
  const [opencall, setOpencall] = useState(null);


  const handleOpen = useCallback((event) => {
    setOpen(event.currentTarget);
  }, []);

  const handleOpenCall = useCallback((event) => {
    setOpencall(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(null);
  }, []);

  const handleCloseCall = useCallback(() => {
    setOpencall(null);
  }, []);




  const handleChangeFavorite = useCallback(() => {
    requireAuth(async () => {
      try {
        const response = await CrudService.createFavorite(category, url, id);
        setFavorite(response.favorite);
        onFavoriteToggle(id, response.favorite);
      } catch (error) {
        console.error('Failed to update favorite:', error);
      }
    });
  }, [requireAuth, category, url, id, onFavoriteToggle]);


  const handleChatClick = useCallback(() => {
    requireAuth(() => {
      router.push(`${paths.eCommerce.chat}?userID=${sellerId}`);
    });
  }, [requireAuth, sellerId, router]);





  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);


  return (
    <>
      <Stack
        spacing={3}
        direction={{ xs: 'row', md: 'row' }}
        sx={{
          mb: 2,
        }}
      >
        <Typography variant="h3" component="h1" sx={{ flexGrow: 1, pr: { md: 10 } }}>

          {capitalizeFirstLetter(title)}
        </Typography>

        <Stack direction="row" alignItems="center" flexShrink={0}>
          <IconButton onClick={handleOpen} color={open ? 'primary' : 'default'}>
            <Iconify icon="carbon:share" />
          </IconButton>

          <Checkbox
            color="error"
            checked={favorite}
            onChange={handleChangeFavorite}
            icon={<Iconify icon="carbon:favorite" />}
            checkedIcon={<Iconify icon="carbon:favorite-filled" />}
          />
        </Stack>
      </Stack>

      <Stack spacing={3} direction={{ xs: 'row', md: 'row' }}>



        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:location" sx={{ mr: 0.4 }} /> {capitalizeFirstLetter(city)}
        </Stack>

        <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
          <Iconify icon="carbon:time" sx={{ mr: 0.4 }} /> {formattedDuration}

        </Stack>




          {mdUp &&<Stack spacing={0.5} direction="row" alignItems="center">
            <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />

            <Box sx={{ typography: 'h6' }}>
              {Number.isInteger(average_rating) ? `${average_rating}.0` : average_rating}
            </Box>

            <Link variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(total_reviews)} {t('Reviews')})
            </Link>
          </Stack>}





      </Stack>


      <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

      <Stack spacing={{ xs: 3, lg: 0 }} direction={{ xs: 'column', md: 'row' }}>




          <Box
            sx={{
              flexGrow:  1,
              gap: 1,
              display: 'grid',
              gridTemplateColumns: {
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(1, 1fr)',
                md: 'repeat(1, 1fr)',
                lg: 'repeat(2, 1fr)',
              },
            }}
          >



            <Stack spacing={1} direction="row" alignItems="center">
              <Avatar
                variant="rounded"
                alt={NamedNodeMap}
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile_image}`}
                sx={{ width: 45, height: 45 }}
              />

              <Stack spacing={0.2}>




                  {sellerUrl ? (
                    <Link
                      component={RouterLink}
                      href={`${paths.eCommerce.stores}/${sellerUrl}`}  // Conditionally set href
                      variant="subtitle2"
                      color="inherit"
                    >
                      {capitalizeFirstLetter(name)}
                    </Link>
                  ) : (
                      <Link variant="subtitle2" color="inherit" >

                        {capitalizeFirstLetter(name)}
                      </Link>
                  )}





                    {sellerUrl ? (

                            <Stack
                            direction="row"
                            alignItems="center"
                            sx={{ typography: 'body2', color: 'text.secondary' }}
                            >
                              <Iconify icon="carbon:store"  sx={{ mr: 0.3 }}/>
                              <Link component={RouterLink}

                              href={`${paths.eCommerce.stores}/${sellerUrl}`}
                              variant="body2" sx={{ color: 'text.secondary' }}>

                                <Box sx={{ typography: 'body2' }}>

                                  {t('ViewStore')}
                                </Box>

                              </Link>


                            </Stack>

                    ) : (

                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ typography: 'body2', color: 'text.secondary' }}
                      >

                          <Link  variant="body2" sx={{ color: 'text.secondary' }}>

                            <Box sx={{ typography: 'body2' }}>
                            {t('Joined')}: {year}

                            </Box>

                          </Link>


                      </Stack>


                    )}

              </Stack>

            </Stack>

          </Box>


        <Stack direction="row" alignItems="center" flexShrink={0}>

          <StyledButton onClick={() => window.open(`https://wa.me/${phone}`, '_blank')}>
            <Iconify icon="mdi:whatsapp" width={26} />
            <Typography variant="subtitle2" sx={{ ml:-1.3 }}> {t('Whatsapp')}</Typography>

          </StyledButton>

          <StyledButton onClick={handleChatClick}>
            <Iconify icon="carbon:chat" width={26} />
            <Typography variant="subtitle2" sx={{ ml:-1.3 }}> {t('Chat')}</Typography>

          </StyledButton>

          <StyledButton onClick={handleOpenCall} color={opencall ? 'primary' : 'default'}>
            <Iconify icon="carbon:phone" width={26} />
            <Typography variant="subtitle2" sx={{ ml:-1.3 }}> {t('Call')}</Typography>

          </StyledButton>


        </Stack>






      </Stack>




      <Popover
        open={!!opencall}
        onClose={handleCloseCall}
        anchorEl={opencall}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 300,p: 3  },
          },
        }}
      >
            <Typography variant="subtitle2" >

              {t('reference')}
            </Typography>

          <Divider sx={{ borderStyle: 'dashed', my: 3 }} />


          <StyledButton>
            <Iconify icon="carbon:mobile" width={24} />
            <Typography variant="subtitle2">

              <Box component="span" sx={{ color: 'primary.main' }}>

                    <a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {phone}
                    </a>
              </Box>
            </Typography>
          </StyledButton>
      </Popover>

      <Popover
        open={!!open}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: { width: 220 },
          },
        }}
      >
        {socialMediaIcons.map((social) => (
          <MenuItem key={social.label} onClick={handleClose}>
            <Iconify icon={social.icon} width={24} sx={{ mr: 1, color: social.color }} />

            {t('Sharevia')} {social.label}
          </MenuItem>
        ))}
      </Popover>

      <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

    </>
  );
}

ListingHeader.propTypes = {
  tour: PropTypes.shape({
    attributes: PropTypes.shape({
      title: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      average_rating: PropTypes.number.isRequired,
      total_reviews: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,

  seller: PropTypes.shape({
    profile_image: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
    sellerId: PropTypes.number,
    sellerUrl: PropTypes.string,
    url: PropTypes.string,
    created_at: PropTypes.string.isRequired,
    sellerCreated_at: PropTypes.string.isRequired,


  }).isRequired,
};

ListingHeader.defaultProps = {
  favorites: [],
};

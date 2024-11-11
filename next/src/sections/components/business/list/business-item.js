


import PropTypes from 'prop-types';
import { useState, useCallback, useEffect , useMemo} from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import Checkbox from '@mui/material/Checkbox';
import { capitalizeFirstLetter } from 'src/utils/format-time';
import { useRouter } from 'src/routes/hooks';

import Markdown from 'src/components/markdown';

import useAuthDialog from 'src/hooks/use-authdialog';
import CrudService from 'src/services/cruds-service';
import { useTranslation } from 'react-i18next';

import { paths as getPaths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fCurrency, fShortenNumber } from 'src/utils/format-number';
import Popover from '@mui/material/Popover';
import CardActionArea from '@mui/material/CardActionArea';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import LoginDialog from 'src/sections/auth/login-dialog';
import { height } from '@mui/system';

// ----------------------------------------------------------------------




const StyledButton = styled((props) => (
  <CardActionArea >
    <Stack direction="row" alignItems="center" spacing={2} {...props} />
  </CardActionArea>
))(({ theme }) => ({
  ...theme.typography.subtitle2,
  padding: `${theme.spacing(0)} ${theme.spacing(0)}`,


}));



export default function BusinessItem({ business, vertical, favorites = [], onFavoriteToggle }) {

  const { t } = useTranslation();

  const { i18n } = useTranslation();
  const paths = useMemo(() => getPaths(i18n.language), [i18n.language]);
  const { attributes } = business;
  const { name,description,profile,id,totalReviews,averageRating, city,phone,picture, created_at, category, url, } = attributes;

  const router = useRouter();

  const { requireAuth, loginDialogOpen, handleLoginDialogClose } = useAuthDialog();

  const isFavorite = favorites.includes(id);
  const [favorite, setFavorite] = useState(isFavorite);

  const [opencall, setOpencall] = useState(null);




  const year = format(new Date(created_at), 'yyyy');





  const handleOpenCall = useCallback((event) => {
    setOpencall(event.currentTarget);
  }, []);

  const handleCloseCall = useCallback(() => {
    setOpencall(null);
  }, []);


  const handleChangeFavorite = useCallback(() => {
    requireAuth(async () => {
      try {
        const response = await CrudService.createFavoriteStore( url, id);

        console.log('Response Favorite:', response.favorite);

        setFavorite(response.favorite);
        onFavoriteToggle(id, response.favorite);
      } catch (error) {
        console.error('Failed to update favorite:', error);
      }
    });
  }, [requireAuth, url, id, onFavoriteToggle]);




  const handleChatClick = useCallback(() => {
    requireAuth(() => {
      router.push(`${paths.eCommerce.chat}?userID=${id}`);
    });
  }, [requireAuth, id, router, paths.eCommerce.chat]);






  useEffect(() => {
    setFavorite(isFavorite); // Ensure state is updated when favorites prop changes
  }, [isFavorite]);


  return (


      <>

        <Card
          sx={{
            display: { sm: 'flex' },

            ...(vertical && {
              flexDirection: 'column',
            }),
          }}
        >
          <Box sx={{ flexShrink: { sm: 0 } }}>



            <Link
              href={`${paths.eCommerce.stores}/${url}`}

              component={RouterLink}
            >
                      <Image
                        alt={name}
                        src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${picture}`}


                        sx={{
                          objectFit: 'cover',
                          width: { xs: '100%', sm: 320 },
                          height: {  sm: 1 },
                          ...(vertical
                            ? {
                                aspectRatio: '6/4', // Aspect ratio for vertical layout
                              }
                            : {
                                aspectRatio: '6/4', // Aspect ratio for horizontal layout
                              }),
                        }}
                      />

            </Link>


          </Box>





              <Checkbox
                color="error"
                checked={favorite}
                onChange={handleChangeFavorite}
                icon={<Iconify icon="carbon:favorite" />}
                checkedIcon={<Iconify icon="carbon:favorite-filled" />}
                sx={{ color: 'common.white',
                  top: 12,
                  left: 12,
                  position: 'absolute',
                  textTransform: 'lowerpercase',
                }}
              />


          <Stack spacing={3} sx={{ p: 2 }}>
            <Stack
              spacing={{
                xs: 3,
                sm: vertical ? 3 : 1,
              }}
            >


              <Stack spacing={1}>
                <Link component={RouterLink}  color="inherit"

                    href={`${paths.eCommerce.stores}/${url}`}
                  >
                  <TextMaxLine variant="h6" line={1}>

                    {capitalizeFirstLetter(name)}
                  </TextMaxLine>
                </Link>


                <TextMaxLine variant="h6" line={1}>


                <Markdown content={description}  />

                </TextMaxLine>

              </Stack>
            </Stack>

            <Stack
              spacing={1.5}
              direction="row"
              alignItems="center"
              flexWrap="wrap"
              divider={<Divider orientation="vertical" sx={{ height: 20, my: 'auto' }} />}
            >



              <Stack spacing={0.5} direction="row" alignItems="center">
                <Iconify icon="carbon:star-filled" sx={{ color: 'warning.main' }} />
                <Box sx={{ typography: 'h6' }}>
                  {Number.isInteger(averageRating) ? `${averageRating}.0` : averageRating}
                </Box>


                  <Link variant="body2" sx={{ color: 'text.secondary' }}>
                    ({fShortenNumber(totalReviews)} reviews)
                  </Link>

              </Stack>

              <Stack direction="row" sx={{ typography: 'subtitle2' }}>
              {t('Membersince')} {year}

              </Stack>
            </Stack>




            <Stack spacing={4} direction={{ xs: 'row', md: 'row' }} sx={{ py: 0 }}>




                <Box
                  sx={{
                    flexGrow:  1,
                    gap: 1,
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: 'repeat(1, 1fr)',
                      sm: 'repeat(1, 1fr)',
                      md: 'repeat(1, 1fr)',
                      lg: 'repeat(1, 1fr)',
                    },
                  }}
                >



                  <Stack spacing={1} direction="row" alignItems="center">
                    <Avatar
                      variant="rounded"
                      alt={NamedNodeMap}
                      src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${profile}`}
                      sx={{ width: 40, height: 40 }}
                    />

                    <Stack spacing={0}>
                        <Link variant="subtitle2" color="inherit"

                        href={`${paths.eCommerce.stores}/${url}`}
                        >




                        <TextMaxLine variant="subtitle2" line={1}>

                        {capitalizeFirstLetter(name)}
                        </TextMaxLine>

                        </Link>
                      <Stack
                        direction="row"
                        alignItems="center"
                        sx={{ typography: 'body2', color: 'text.secondary' }}
                      >
                          <Iconify icon="carbon:location" width={13} sx={{ mr: 0.3 }} />


                            <Box sx={{ typography: 'caption' }}>
                            {capitalizeFirstLetter(city)}
                            </Box>



                      </Stack>

                    </Stack>

                  </Stack>

                </Box>


                <Stack spacing={2} direction="row" alignItems="center" flexShrink={0}>

                  <StyledButton>

                    <Iconify icon="carbon:phone" width={24} onClick={handleOpenCall} color={opencall ? 'primary' : 'default'}/>
                  </StyledButton>


                  <StyledButton>

                    <Iconify icon="mdi:whatsapp" width={24}  onClick={() => window.open(`https://wa.me/${phone}`, '_blank')}/>
                  </StyledButton>



                  <StyledButton>

                    <Iconify icon="carbon:chat" width={24} onClick={handleChatClick}/>

                  </StyledButton>









                </Stack>







            </Stack>




            <Divider
              sx={{
                borderStyle: 'dashed',

                ...(vertical && {
                  display: 'block',
                }),
              }}
            />

            <Stack
              direction="row"
              flexWrap="wrap"
              alignItems="center"
              sx={{ color: 'text.disabled', '& > *:not(:last-child)': { mr: 2.5 } }}
            >
              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>

                <Iconify icon="carbon:location"  sx={{ mr: 0.4 }}/> {capitalizeFirstLetter(city)}

              </Stack>

              <Stack direction="row" alignItems="center" sx={{ typography: 'body2' }}>
                <Iconify icon="carbon:skill-level-advanced"

                  sx={{ mr: 1 }}
                />
                Beginner
              </Stack>
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
                sx: { width: 300,p: 2  },
              },
            }}
          >
                <Typography variant="subtitle2" >

                  Don&apos;t forget to mention the property reference when you call.

                </Typography>

              <Divider sx={{ borderStyle: 'dashed', my: 3 }} />

              <StyledButton>

                <Iconify icon="carbon:phone" width={24} />
                <Typography variant="subtitle2">

                  <Box component="span" sx={{ color: 'primary.main' }}>

                    <a href={`tel:${phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {phone}
                    </a>
                  </Box>
                </Typography>
              </StyledButton>

          </Popover>

        </Card>
        <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />

      </>

  );
}

BusinessItem.propTypes = {
  business: PropTypes.shape({
    attributes: PropTypes.shape({
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      profile: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      averageRating: PropTypes.number.isRequired,
      totalReviews: PropTypes.number.isRequired,


      id: PropTypes.number.isRequired,


      picture: PropTypes.string.isRequired,
      created_at: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  vertical: PropTypes.bool,

  favorites: PropTypes.array,
  onFavoriteToggle: PropTypes.func.isRequired,
};

BusinessItem.defaultProps = {
  favorites: [],
};

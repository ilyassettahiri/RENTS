import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'src/routes/hooks';
import { useTranslation } from 'react-i18next';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormHelperText from '@mui/material/FormHelperText';

import FormProvider, { RHFTextField } from 'src/components/hook-form';
import CrudService from 'src/services/cruds-service';

export default function ReviewNewForm({ onClose, category, url, ...other }) {

  const { t } = useTranslation();


  const router = useRouter();

  const defaultValues = {
    rating: 0,
    review: '',
    name: '',
    email: '',
  };

  const NewReviewSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    rating: Yup.number().min(1, 'Rating must be greater than or equal to 1'),
    review: Yup.string().required('Review is required'),
    email: Yup.string().required('Email is required').email('That is not an email'),
  });

  const methods = useForm({
    resolver: yupResolver(NewReviewSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = {
        ...data,
        description: data.review,
        rating: data.rating,
      };

      await CrudService.createReview(payload, category, url);
      reset();
      onClose();
      router.reload();
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ typography: 'h3', pb: 3 }}>Review</DialogTitle>

        <DialogContent sx={{ py: 0 }}>
          <Stack spacing={2.5}>
            <div>
              <Typography variant="subtitle2" gutterBottom>
              {t('Yourrating')} :
              </Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={Number(field.value)}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                    }}
                  />
                )}
              />

              {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}
            </div>

            <RHFTextField multiline rows={3} name="review" label={t('Review')} />

            <RHFTextField name="name" label={t('Name')} />

            <RHFTextField name="email" label={t('Emailaddress')} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
          {t('Cancel')}
          </Button>

          <LoadingButton color="inherit" type="submit" variant="contained" loading={isSubmitting}>
          {t('PostReview')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ReviewNewForm.propTypes = {
  onClose: PropTypes.func,
  category: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

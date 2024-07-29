import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useEffect, useCallback, useState } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

import { PostDetailsPreview } from './post-details-preview';

import { createPost, getPostData } from 'src/actions/blog-ssr'; // Import the createPost function

// ----------------------------------------------------------------------

export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'Title is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  thumb: schemaHelper.file({ message: { required_error: 'Cover is required!' } }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  metaKeywords: zod.string().array().nonempty({ message: 'Meta keywords is required!' }),
  // Not required
  metaTitle: zod.string(),
  blogcategory: zod.string().min(1, { message: 'Must have at least 1 item!' }),
  author: zod.string().min(1, { message: 'Must have at least 1 item!' }),
  metaDescription: zod.string(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm({ currentPost }) {
  const router = useRouter();
  const preview = useBoolean();
  const [postData, setPostData] = useState({ authors: [], tags: [], blogCategories: [] });

  const defaultValues = useMemo(
    () => ({
      title: currentPost?.title || '',
      description: currentPost?.description || '',
      content: currentPost?.content || '',
      thumb: currentPost?.thumb || null,
      tags: currentPost?.tags || [],
      metaKeywords: currentPost?.metaKeywords || [],
      metaTitle: currentPost?.metaTitle || '',
      author: currentPost?.author || '',
      blogcategory: currentPost?.blogcategory || '',
      metaDescription: currentPost?.metaDescription || '',
    }),
    [currentPost]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
    }
  }, [currentPost, defaultValues, reset]);

  useEffect(() => {
    async function fetchData() {
      const data = await getPostData();
      setPostData(data.data);
      console.log('Fetched Data:', data.data);
    }
    fetchData();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (!currentPost) {
        // Create a new post
        await createPost(data);
        toast.success('Create success!');
      } else {
        // Update existing post logic here (if needed)
        toast.success('Update success!');
      }
      reset();
      preview.onFalse();
      router.push(paths.dashboard.post.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while creating the post');
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('thumb', null);
  }, [setValue]);

  const renderDetails = (
    <Card>
      <CardHeader title="Details" subheader="Title, short description, image..." sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Post title" />

        <Field.Text name="description" label="Description" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Content</Typography>
          <Field.Editor name="content" sx={{ maxHeight: 480 }} />
        </Stack>

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Cover</Typography>
          <Field.Upload name="thumb" maxSize={3145728} onDelete={handleRemoveFile} />
        </Stack>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader
        title="Properties"
        subheader="Additional functions and attributes..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
          name="tags"
          label="Tags"
          placeholder="+ Tags"
          multiple
          freeSolo
          disableCloseOnSelect
          options={postData.tags.map((option) => option.attributes.name)}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Field.Autocomplete
          name="blogcategory"
          label="Blog Category"
          placeholder="+ Blog Category"
          freeSolo
          disableCloseOnSelect
          options={postData.blogCategories.map((option) => option.attributes.name)}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Field.Autocomplete
          name="author"
          label="Author"
          placeholder="+ Author"
          freeSolo
          disableCloseOnSelect
          options={postData.authors.map((option) => option.attributes.name)}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <Field.Text name="metaTitle" label="Meta title" />

        <Field.Text name="metaDescription" label="Meta description" fullWidth multiline rows={3} />

        <Field.Autocomplete
          name="metaKeywords"
          label="Meta keywords"
          placeholder="+ Keywords"
          multiple
          freeSolo
          disableCloseOnSelect
          options={postData.tags.map((option) => option.attributes.name)}
          getOptionLabel={(option) => option}
          isOptionEqualToValue={(option, value) => option === value}
          renderOption={(props, option) => (
            <li {...props} key={option}>
              {option}
            </li>
          )}
          renderTags={(selected, getTagProps) =>
            selected.map((option, index) => (
              <Chip
                {...getTagProps({ index })}
                key={option}
                label={option}
                size="small"
                color="info"
                variant="soft"
              />
            ))
          }
        />

        <FormControlLabel
          control={<Switch defaultChecked inputProps={{ id: 'comments-switch' }} />}
          label="Enable comments"
        />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Box display="flex" alignItems="center" flexWrap="wrap" justifyContent="flex-end">
      <FormControlLabel
        control={<Switch defaultChecked inputProps={{ id: 'publish-switch' }} />}
        label="Publish"
        sx={{ pl: 3, flexGrow: 1 }}
      />

      <div>
        <Button color="inherit" variant="outlined" size="large" onClick={preview.onTrue}>
          Preview
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'Create post' : 'Save changes'}
        </LoadingButton>
      </div>
    </Box>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', mb: 5, maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
        {renderProperties}
        {renderActions}
      </Stack>

      <PostDetailsPreview
        isValid={isValid}
        onSubmit={onSubmit}
        title={values.title}
        open={preview.value}
        content={values.content}
        onClose={preview.onFalse}
        thumb={values.thumb}
        isSubmitting={isSubmitting}
        description={values.description}
      />
    </Form>
  );
}

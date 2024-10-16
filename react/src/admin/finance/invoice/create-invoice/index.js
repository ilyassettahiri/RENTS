// react-router-dom components
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CrudService from "services/cruds-service";
import { AbilityContext } from "Can";
import { useAbility } from "@casl/react";
import { format } from 'date-fns';


// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import { FormControl, FormLabel, InputLabel } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/SoftBox";
import MDButton from "components/SoftButton";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";
import MDEditor from "components/MDEditor";
import {
  Autocomplete,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  TextField,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";
import FormField from "admin/components/FormField";
import { useNavigate } from "react-router-dom";

import CrudService from "services/cruds-service";

const createDateFormat = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  let newDate;
  if (month > 9 && day > 9) {
    newDate = `${date.getFullYear()}-${month}-${day}`;
  }
  if (month > 9 && day < 9) {
    newDate = `${date.getFullYear()}-${month}-0${day}`;
  }
  if (month < 9 && day > 9) {
    newDate = `${date.getFullYear()}-0${month}-${day}`;
  }
  if (month < 9 && day < 9) {
    newDate = `${date.getFullYear()}-0${month}-0${day}`;
  }
  return newDate;
};

const CreateInvoice = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [chosenTags, setChosenTags] = useState([]);
  const [image, setImage] = useState("");
  const [fileState, setFileState] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const today = new Date();
  const initialDate = createDateFormat(today);
  const [item, setItem] = useState({
    name: "",
    excerpt: "",
    homepage: false,
    category: "",
    date: initialDate,
    status: "",
  });

  const [error, setError] = useState({
    name: false,
    excerpt: false,
    homepage: false,
    category: false,
    tags: false,
    date: false,
    status: false,
    description: false,
    image: false,
    error: false,
    textError: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const response = await CrudService.getCollections();
        setCategories(response.data);
      } catch (err) {
        console.error(err);
        return null;
      }
      try {
        const response = await CrudService.getTags();
        setTags(response.data);
      } catch (err) {
        console.error(err);
        return null;
      }
    })();
  }, []);

  const changeHandler = (e) => {
    setItem({
      ...item,
      [e.target.name]: e.target.value,
    });
  };

  const changeImageHandler = (e) => {
    const formData = new FormData();
    formData.append("attachment", e.target.files[0]);
    setFileState(formData);
    setImageUrl(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (item.name.trim().length === 0) {
      setError({
        name: true,
        excerpt: false,
        homepage: false,
        category: false,
        tags: false,
        date: false,
        status: false,
        image: false,
        description: false,
        textError: "The name is required",
      });
      return;
    }

    if (item.excerpt.trim().length === 0) {
      setError({
        name: false,
        excerpt: true,
        homepage: false,
        category: false,
        tags: false,
        date: false,
        status: false,
        description: false,
        image: false,
        textError: "The excerpt is required",
      });
      return;
    }

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags.length === 0) {
      setError({
        name: false,
        excerpt: false,
        homepage: false,
        category: false,
        tags: false,
        date: false,
        status: false,
        image: false,
        description: true,
        textError: "The description is required",
      });
      return;
    }
    // console.lo
    if (value.id == null || value === "") {
      setError({
        name: false,
        excerpt: false,
        homepage: false,
        category: true,
        tags: false,
        date: false,
        status: false,
        description: false,
        image: false,
        textError: "The category is required",
      });
      return;
    }

    if (chosenTags.length < 1) {
      setError({
        name: false,
        excerpt: false,
        homepage: false,
        category: false,
        tags: true,
        date: false,
        status: false,
        description: false,
        image: false,
        textError: "The tags are required",
      });
      return;
    }

    if (item.status.length < 1) {
      setError({
        name: false,
        excerpt: false,
        homepage: false,
        category: false,
        tags: false,
        date: false,
        status: true,
        description: false,
        image: false,
        textError: "The status are required",
      });
      return;
    }

    if (!image) {
      setError({
        name: false,
        excerpt: false,
        homepage: false,
        category: false,
        tags: false,
        date: false,
        status: false,
        description: false,
        image: true,
        textError: "The image is required",
      });
      return;
    }

    const newItem = {
      data: {
        type: "items",
        attributes: {
          name: item.name,
          excerpt: item.excerpt,
          description,
          is_on_homepage: item.homepage,
          image: null,
          status: item.status,
          date_at: item.date,
        },
        relationships: {
          category: {
            data: {
              type: "categories",
              id: value.id.toString(),
            },
          },
          user: {
            data: {
              type: "users",
              id: "1",
            },
          },
          tags: {
            data: chosenTags.map((tag) => {
              return { type: "tags", id: tag.id };
            }),
          },
        },
      },
    };

    try {
      const res = await CrudService.createItem(newItem);
      const id = res.data.id;
      // issue for new item and user: i can't add the image only after the user/item is created because i need the id
      // if the image throws an error the user/item is still created and is saved with no image
      try {
        const { url } = await CrudService.itemImageUpload(fileState, id);
        const itemData = {
          data: {
            type: "items",
            id: id,
            attributes: {
              image: `${process.env.REACT_APP_IMAGES}${url}`,
            },
          },
        };
        try {
          await CrudService.updateItem(itemData, id);
        } catch (err) {
          console.error(err);
        }
      } catch (err) {
        console.error(err);
      }
      navigate("/examples-api/item-management", {
        state: { value: true, text: "The item was sucesfully created" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setError({ ...error, error: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }
  };

  return (
    <DashboardLayout>
      
      <MDBox mt={5} mb={9}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={8}>
            <MDBox mt={6} mb={8} textAlign="center">
              <MDBox mb={1}>
                <MDTypography variant="h3" fontWeight="bold">
                  Add New Item
                </MDTypography>
              </MDBox>
              <MDTypography variant="h5" fontWeight="regular" color="secondary">
                This information will describe more about the item.
              </MDTypography>
            </MDBox>
            <Card>
              <MDBox
                component="form"
                method="POST"
                onSubmit={submitHandler}
                encType="multipart/form-data"
              >
                <MDBox display="flex" flexDirection="column" px={3} my={4}>
                  <MDBox display="flex" flexDirection="column">
                    <FormField
                      label="Name"
                      placeholder="Alec"
                      name="name"
                      value={item.name}
                      onChange={changeHandler}
                      error={error.name}
                    />
                    {error.name && (
                      <MDTypography variant="caption" color="error" fontWeight="light" pt={1}>
                        {error.textError}
                      </MDTypography>
                    )}
                  </MDBox>
                  <MDBox display="flex" flexDirection="column" mt={2}>
                    <FormField
                      label="Excerpt"
                      placeholder="excerpt"
                      name="excerpt"
                      value={item.excerpt}
                      onChange={changeHandler}
                      error={error.excerpt}
                    />
                    {error.excerpt && (
                      <MDTypography variant="caption" color="error" fontWeight="light" pt={1}>
                        {error.textError}
                      </MDTypography>
                    )}
                  </MDBox>

                  <MDBox mt={2}>
                    <MDBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <MDTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                      >
                        Description&nbsp;&nbsp;
                      </MDTypography>
                    </MDBox>
                    <MDEditor value={description} onChange={setDescription} />
                    {error.description && (
                      <MDTypography variant="caption" color="error" fontWeight="light">
                        {error.textError}
                      </MDTypography>
                    )}
                  </MDBox>

                  <MDBox display="flex" flexDirection="column" fullWidth>
                    <MDBox display="flex" flexDirection="column" fullWidth marginTop="2rem">
                      <MDTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                      >
                        Category
                      </MDTypography>
                      <Autocomplete
                        defaultValue=""
                        options={categories}
                        getOptionLabel={(option) => (option ? option.attributes.name : "")}
                        value={value}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        renderInput={(params) => (
                          <FormField {...params} label="" InputLabelProps={{ shrink: true }} />
                        )}
                      />
                      {error.category && (
                        <MDTypography variant="caption" color="error" fontWeight="light" pt={1}>
                          {error.textError}
                        </MDTypography>
                      )}
                    </MDBox>
                  </MDBox>

                  <MDBox display="flex" flexDirection="column" fullWidth marginTop="2rem">
                    <MDBox display="flex" flexDirection="column" fullWidth>
                      <MDTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                      >
                        Tags
                      </MDTypography>
                      <Autocomplete
                        multiple
                        defaultValue={[]}
                        getOptionLabel={(option) => option.attributes.name}
                        options={tags}
                        filterSelectedOptions={true}
                        onChange={(e, value) => {
                          setChosenTags(value);
                        }}
                        renderInput={(params) => <MDInput {...params} variant="standard" />}
                      />
                      {error.tags && (
                        <MDTypography variant="caption" color="error" fontWeight="light" pt={1}>
                          {error.textError}
                        </MDTypography>
                      )}
                    </MDBox>
                  </MDBox>

                  <MDBox display="flex" flexDirection="column">
                    <FormControl>
                      <FormLabel
                        id="demo-radio-buttons-group-label"
                        sx={{ fontSize: "0.875rem", fontWeight: "400", mt: "24px" }}
                      >
                        Status
                      </FormLabel>
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        value={item.status}
                        name="radio-buttons-group"
                        onChange={(e) => setItem({ ...item, status: e.target.value })}
                      >
                        <FormControlLabel
                          sx={{ fontSize: "0.875rem", fontWeight: "400" }}
                          value="published"
                          control={<Radio />}
                          label="Published"
                        />
                        <FormControlLabel
                          sx={{ fontSize: "0.875rem", fontWeight: "400" }}
                          value="draft"
                          control={<Radio />}
                          label="Draft"
                        />
                        <FormControlLabel
                          sx={{ fontSize: "0.875rem", fontWeight: "400" }}
                          value="archive"
                          control={<Radio />}
                          label="Archive"
                        />
                      </RadioGroup>
                    </FormControl>
                    {error.status && (
                      <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                        {error.textError}
                      </MDTypography>
                    )}
                  </MDBox>

                  <MDBox display="flex" alignItems="center" mb={3} ml={-1.5}>
                    <MDBox mt={0.5}>
                      <Switch
                        checked={item.homepage}
                        onChange={() => setItem({ ...item, homepage: !item.homepage })}
                        name="homepage"
                      />
                    </MDBox>
                    <MDBox width="80%" ml={0.5}>
                      <MDTypography variant="button" fontWeight="regular" color="text">
                        Homepage
                      </MDTypography>
                    </MDBox>
                  </MDBox>

                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                      label="Date"
                      inputFormat="MM/dd/yyyy"
                      name="date"
                      value={item.date}
                      onChange={(newValue) => {
                        const newDate = createDateFormat(newValue);
                        setItem({ ...item, date: newDate });
                      }}
                      renderInput={(params) => <TextField {...params} />}
                    />
                  </LocalizationProvider>

                  <MDBox
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    justifyContent="space-between"
                    fullWidth
                  >
                    <MDBox mt={2} display="flex" flexDirection="column">
                      <InputLabel id="demo-simple-select-label">Image</InputLabel>
                      <MDInput
                        fullWidth
                        type="file"
                        name="attachment"
                        onChange={changeImageHandler}
                        id="file-input"
                        accept="image/*"
                        sx={{ mt: "16px" }}
                      ></MDInput>
                      {error.image && (
                        <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                          {error.textError}
                        </MDTypography>
                      )}
                    </MDBox>

                    {imageUrl && (
                      <MDBox ml={4} mt={2}>
                        <MDAvatar src={imageUrl} alt="profile-image" size="xxl" shadow="sm" />
                      </MDBox>
                    )}
                  </MDBox>
                  {error.error && (
                    <MDTypography variant="caption" color="error" fontWeight="light" pt={2}>
                      {error.textError}
                    </MDTypography>
                  )}
                  <MDBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                    <MDBox mx={2}>
                      <MDButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        px={2}
                        mx={2}
                        onClick={() =>
                          navigate("/examples-api/item-management", {
                            state: { value: false, text: "" },
                          })
                        }
                      >
                        Back
                      </MDButton>
                    </MDBox>
                    <MDButton variant="gradient" color="dark" size="small" type="submit">
                      Save
                    </MDButton>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
};

export default CreateInvoice;

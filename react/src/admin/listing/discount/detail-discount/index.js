
import { useEffect, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";
import SoftEditor from "components/MDEditor";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TeamProfileCard from "examples/Cards/TeamCards/TeamProfileCard";

import Icon from "@mui/material/Icon";

import Divider from "@mui/material/Divider";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

import FormField from "admin/components/FormField";
import { useNavigate, useParams } from "react-router-dom";

import CrudService from "services/cruds-service";

const DetailDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState({
    id: "",
    name: "",
  });
  const [error, setError] = useState({
    name: false,
    description: false,
    error: false,
    textError: "",
  });

  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const res = await CrudService.getDiscount(id);
        setDiscount({
          id: res.data.id,
          name: res.data.attributes.name,
        });
        setDescription(res.data.attributes.description);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  const changeNameHandler = (e) => {
    setDiscount({ ...discount, name: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (discount.name.trim().length < 1) {
      setError({ ...error, name: true, textError: "The discount name is required" });
      return;
    }

    let descNoTags = description.replace(/(<([^>]+)>)/gi, "");
    if (descNoTags < 1) {
      setError({
        ...error,
        description: true,
        textError: "The discount description is required",
      });
      return;
    }

    const discountUpdated = {
      data: {
        type: "discounts",
        id: discount.id.toString(),
        attributes: {
          name: discount.name,
          description,
        },
      },
    };

    try {
      await CrudService.updateDiscount(discountUpdated, discountUpdated.data.id);
      navigate("/listing/discount", {
        state: { value: true, text: "The discount was sucesfully updated" },
      });
    } catch (err) {
      if (err.hasOwnProperty("errors")) {
        setError({ ...discount, error: true, textError: err.errors[0].detail });
      }
      console.error(err);
    }
  };






  const [menu, setMenu] = useState(null);

  const openMenu = (event) => setMenu(event.currentTarget);
  const closeMenu = () => setMenu(null);

  const renderMenu = (
    <Menu
      anchorEl={menu}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      open={Boolean(menu)}
      onClose={closeMenu}
      keepMounted
    >
      <MenuItem onClick={closeMenu}>Status: Paid</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Refunded</MenuItem>
      <MenuItem onClick={closeMenu}>Status: Canceled</MenuItem>
      <Divider sx={{ margin: "0.5rem 0" }} />
      <MenuItem onClick={closeMenu}>
        <SoftTypography variant="button" color="error" fontWeight="regular">
          Remove Filter
        </SoftTypography>
      </MenuItem>
    </Menu>
  );




  // TeamProfileCard dropdown menu state
  const [marketingMenu, setMarketingMenu] = useState(null);
  const [designMenu, setDesignMenu] = useState(null);

  // TeamProfileCard dropdown menu handlers
  const openMarketingMenu = (event) => setMarketingMenu(event.currentTarget);
  const closeMarketingMenu = () => setMarketingMenu(null);
  const openDesignMenu = (event) => setDesignMenu(event.currentTarget);
  const closeDesignMenu = () => setDesignMenu(null);

  // Dropdown menu for the digital marketing TeamProfileCard
  const renderMarketingMenu = (
    <Menu
      anchorEl={marketingMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(marketingMenu)}
      onClose={closeMarketingMenu}
      keepMounted
    >
      <MenuItem onClick={closeMarketingMenu}>Action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMarketingMenu}>Something else here</MenuItem>
    </Menu>
  );

  // Dropdown menu for the design TeamProfileCard
  const renderDesignMenu = (
    <Menu
      anchorEl={designMenu}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(designMenu)}
      onClose={closeDesignMenu}
      keepMounted
    >
      <MenuItem onClick={closeDesignMenu}>Action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Another action</MenuItem>
      <MenuItem onClick={closeDesignMenu}>Something else here</MenuItem>
    </Menu>
  );




  return (
    <DashboardLayout>
      
      <SoftBox mb={3}>


          <SoftBox display="flex" justifyContent="flex-end" mb={2}>

            <SoftBox mr={3}>
              <SoftButton variant="gradient" color="info" >
                New Listing
              </SoftButton>
            </SoftBox>

            <SoftBox display="flex">
              <SoftButton variant={menu ? "contained" : "gradient"} color="white" onClick={openMenu}>
                More Action &nbsp;
                <Icon>keyboard_arrow_down</Icon>
              </SoftButton>
              {renderMenu}
              
            </SoftBox>
          </SoftBox>


        <Grid container spacing={3}>



          <Grid item xs={12} lg={8}>
           
            <Card>
              <SoftBox component="form" method="POST" onSubmit={submitHandler}>
                <SoftBox display="flex" flexDirection="column" px={3} my={2}>
                  <SoftBox p={1}>
                    <FormField
                      type="text"
                      label="Name"
                      name="name"
                      value={discount.name}
                      onChange={changeNameHandler}
                      error={error.name}
                    />
                    {error.name && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {error.textError}
                      </SoftTypography>
                    )}
                  </SoftBox>
                  <SoftBox mt={2}>
                    <SoftBox mb={1} ml={0.5} lineHeight={0} display="inline-block">
                      <SoftTypography
                        component="label"
                        variant="button"
                        fontWeight="regular"
                        color="text"
                      >
                        Description&nbsp;&nbsp;
                      </SoftTypography>
                    </SoftBox>
                    <SoftEditor value={description} onChange={setDescription} />
                    {error.description && (
                      <SoftTypography variant="caption" color="error" fontWeight="light">
                        {error.textError}
                      </SoftTypography>
                    )}
                  </SoftBox>
                  <SoftBox ml="auto" mt={4} mb={2} display="flex" justifyContent="flex-end">
                    <SoftBox mx={2}>
                      <SoftButton
                        variant="gradient"
                        color="dark"
                        size="small"
                        px={2}
                        mx={2}
                        onClick={() =>
                          navigate("/listing/discount", {
                            state: { value: false, text: "" },
                          })
                        }
                      >
                        Back
                      </SoftButton>
                    </SoftBox>
                    <SoftButton variant="gradient" color="dark" size="small" type="submit">
                      Save
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </SoftBox>
            </Card>
          </Grid>


          <Grid item xs={12} lg={4}>


              <Grid item xs={12}>
                <SoftBox mb={3}>
                  <TeamProfileCard
                    title="digital marketing"
                    description="A group of people who collectively are responsible for all of the work necessary to produce working, validated assets."
                    industry="marketing team"
                    rating={4.5}
                    
                    dropdown={{
                      action: openMarketingMenu,
                      menu: renderMarketingMenu,
                    }}
                  />
                </SoftBox>
              </Grid>


              <Grid item xs={12}>
                <SoftBox mb={3}>
                  <TeamProfileCard
                    title="design"
                    description="Because it's about motivating the doers. Because I’m here to follow my dreams and inspire other people to follow their dreams, too."
                    industry="design team"
                    rating={5}
                    
                    dropdown={{
                      action: openDesignMenu,
                      menu: renderDesignMenu,
                    }}
                  />
                </SoftBox>
              </Grid>
            
          </Grid>



        </Grid>


      </SoftBox>
      
    </DashboardLayout>
  );
};

export default DetailDiscount;

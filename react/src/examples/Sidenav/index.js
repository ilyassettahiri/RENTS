

import { useEffect, useState } from "react";

// react-router-dom components
import { useLocation, NavLink } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import { useTranslation } from 'react-i18next';
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import SidenavCollapse from "examples/Sidenav/SidenavCollapse";
import SidenavList from "examples/Sidenav/SidenavList";
import SidenavItem from "examples/Sidenav/SidenavItem";

// Custom styles for the Sidenav
import SidenavRoot from "examples/Sidenav/SidenavRoot";
import sidenavLogoLabel from "examples/Sidenav/styles/sidenav";

// Soft UI Dashboard PRO React context
import { useSoftUIController,setMiniSidenav } from "context";

function Sidenav({ color, brand, brandName, routes, hasStore,
  
  listingAll, 
  listingCompleted, 
  listingDraft, 
  listingBoosted, 
  reservationUpcoming, 
  reservationCheckout, 
  reservationCurrently, 
  reservationAll,
  
  
  ...rest }) {

  const { t } = useTranslation();

  const [openCollapse, setOpenCollapse] = useState(false);
  const [openNestedCollapse, setOpenNestedCollapse] = useState(false);
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentSidenav } = controller;
  const location = useLocation();
  const { pathname } = location;
  const collapseName = pathname.split("/").slice(1)[0];
  const itemName = pathname.split("/").slice(1)[1];

  const closeSidenav = () => setMiniSidenav(dispatch, true);

  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {

      setMiniSidenav(dispatch, window.innerWidth < 1200);
    }

    /** 
     The event listener that's calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);




  // Function to get count based on key
  const getCount = (key) => {
    switch (key) {
      case "All":
        return listingAll;
      case "Completed":
        return listingCompleted;
      case "Draft":
        return listingDraft;
      case "Boosted":
        return listingBoosted;
      case "Upcoming":
        return reservationUpcoming;
      case "Checking out":
        return reservationCheckout;
      case "Currently hosting":
        return reservationCurrently;
      case "All Reservations":
        return reservationAll;
      default:
        return undefined;
    }
  };
  

    // Filter the routes based on the hasStore prop
    const filteredRoutes = routes.map((route) => {
      if (route.key === "store" && route.collapse) {
        // Replace the store routes based on hasStore
        return {
          ...route,
          collapse: route.collapse.filter((r) => {
            if (r.key === "create-store" && hasStore) return false;
            if (r.key === "detail-store" && !hasStore) return false;
            return true;
          }),
        };
      }
      return route;
    });

  // Render all the nested collapse items from the routes.js
  const renderNestedCollapse = (collapse) => {
    const template = collapse.map(({ name, route, key, href }) =>
      href ? (
        <Link
          key={key}
          href={href}
          target="_blank"
          rel="noreferrer"
          sx={{ textDecoration: "none" }}
        >
          <SidenavItem name={t(name)}  nested  />
        </Link>
      ) : (
        <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
          <SidenavItem name={t(name)} active={route === pathname} nested />
        </NavLink>
      )
    );

    return template;
  };

  // Render the all the collpases from the routes.js
  const renderCollapse = (collapses) =>
    collapses.map(({ name, collapse, route, href, key }) => {
      let returnValue;

      if (collapse) {
        returnValue = (
          <SidenavItem
            key={key}
            name={t(name)}
            active={key === itemName}
            open={openNestedCollapse === name}
            count={getCount(name)} // Pass the count here

            onClick={() =>
              openNestedCollapse === name
                ? setOpenNestedCollapse(false)
                : setOpenNestedCollapse(name)
            }
          >
            {renderNestedCollapse(collapse)}
          </SidenavItem>
        );
      } else {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavItem name={t(name)} active={key === itemName} count={getCount(name)} />
          </Link>
        ) : (
          <NavLink to={route} key={key} sx={{ textDecoration: "none" }}>
            <SidenavItem name={t(name)} active={key === itemName} count={getCount(name)}/>
          </NavLink>
        );
      }
      return <SidenavList key={key}>{returnValue}</SidenavList>;
    });

  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = filteredRoutes.map(
    ({ type, name, icon, title, collapse, noCollapse, key, href, route }) => {
      let returnValue;

      if (type === "collapse") {
        if (href) {
          returnValue = (
            <Link
              href={href}
              key={key}
              target="_blank"
              rel="noreferrer"
              sx={{ textDecoration: "none" }}
            >
              <SidenavCollapse
                name={name}
                icon={icon}
                active={key === collapseName}
                noCollapse={noCollapse}
                count={getCount(name)}
              />
            </Link>
          );
        } else if (noCollapse && route) {
          returnValue = (
            <NavLink to={route} key={key}>
              <SidenavCollapse
                name={t(name)}
                icon={icon}
                noCollapse={noCollapse}
                active={key === collapseName}
                count={getCount(name)}
              >
                {collapse ? renderCollapse(collapse) : null}
              </SidenavCollapse>
            </NavLink>
          );
        } else {
          returnValue = (
            <SidenavCollapse
              key={key}
              name={t(name)}
              icon={icon}
              active={key === collapseName}
              open={openCollapse === key}
              onClick={() => (openCollapse === key ? setOpenCollapse(false) : setOpenCollapse(key))}
              count={getCount(name)}
            >
              {collapse ? renderCollapse(collapse) : null}
            </SidenavCollapse>
          );
        }
      } else if (type === "title") {
        returnValue = (
          <SoftTypography
            key={key}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            opacity={0.6}
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </SoftTypography>
        );
      } else if (type === "divider") {
        returnValue = <Divider key={key} />;
      }

      return returnValue;
    }
  );






  
  return (
    <SidenavRoot {...rest} variant="permanent" ownerState={{ transparentSidenav, miniSidenav }}>
      <SoftBox pt={3} pb={1} px={4} textAlign="center" >
        
        <SoftBox component={NavLink} to="https://rents.ma/" display="flex" alignItems="center">
          {brand && <SoftBox component="img" src={brand} alt="Rents.ma" width="5rem" />}
          
        </SoftBox>
      </SoftBox>
      <Divider />
      <List>{renderRoutes}</List>

      
    </SidenavRoot>
  );
}

// settings default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary", "info", "success", "warning", "error", "dark"]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
  hasStore: PropTypes.bool.isRequired, 

  listingAll: PropTypes.number.isRequired,
  listingCompleted: PropTypes.number.isRequired,
  listingDraft: PropTypes.number.isRequired,
  listingBoosted: PropTypes.number.isRequired,
  reservationUpcoming: PropTypes.number.isRequired,
  reservationCheckout: PropTypes.number.isRequired,
  reservationCurrently: PropTypes.number.isRequired,
  reservationAll: PropTypes.number.isRequired,

};

export default Sidenav;



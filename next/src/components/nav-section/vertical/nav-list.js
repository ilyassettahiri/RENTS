import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './nav-item';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps, onItemClick }) {
  const pathname = usePathname();


  const [openMenu, setOpenMenu] = useState();



  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={handleToggleMenu}
        //
        title={data.title}
        value={data.value}


        icon={data.icon}
        info={data.info}
        roles={data.roles}
        caption={data.caption}
        disabled={data.disabled}
        //
        depth={depth}
        hasChild={!!data.children}
        currentRole={slotProps?.currentRole}




        onItemClick={onItemClick}  // Pass down to NavItem

      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit>
          <NavSubList data={data.children} depth={depth} slotProps={slotProps}

          onItemClick={onItemClick}  // Pass down to NavSubList

          />
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.object,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
  onItemClick: PropTypes.func,  // Add prop types for onItemClick

};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps, onItemClick  }) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps}

        onItemClick={onItemClick}  // Pass onItemClick to each NavList

        />
      ))}
    </>
  );
}

NavSubList.propTypes = {
  data: PropTypes.array,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
  onItemClick: PropTypes.func,  // Add prop types for onItemClick

};

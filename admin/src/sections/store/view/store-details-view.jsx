'use client';

import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { varAlpha } from 'src/theme/styles';
import { PRODUCT_PUBLISH_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

import { ProductDetailsReview } from 'src/sections/product/product-details-review';
import { ProductDetailsSummary } from 'src/sections/product/product-details-summary';
import { ProductDetailsToolbar } from 'src/sections/product/product-details-toolbar';
import { ProductDetailsCarousel } from 'src/sections/product/product-details-carousel';
import { ProductDetailsDescription } from 'src/sections/product/product-details-description';

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: '100% original',
    description: 'Chocolate bar candy canes ice cream toffee cookie halvah.',
    icon: 'solar:verified-check-bold',
  },
  {
    title: '10 days replacement',
    description: 'Marshmallow biscuit donut dragée fruitcake wafer.',
    icon: 'solar:clock-circle-bold',
  },
  {
    title: 'Year warranty',
    description: 'Cotton candy gingerbread cake I love sugar sweet.',
    icon: 'solar:shield-check-bold',
  },
];

// ----------------------------------------------------------------------

export function StoreDetailsView({ store }) {

  console.log('store data:', store);


  const tabs = useTabs('description');

  const [publish, setPublish] = useState('');

  useEffect(() => {
    if (store) {
      setPublish(store?.publish);
    }
  }, [store]);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  return (
    <DashboardContent/>


  );
}

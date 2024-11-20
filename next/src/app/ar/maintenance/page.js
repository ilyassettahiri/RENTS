import MaintenanceView from 'src/sections/status/maintenance-view';
import Script from 'next/script';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Maintenance',
};

export default function MaintenancePage() {
  return <MaintenanceView />;
}

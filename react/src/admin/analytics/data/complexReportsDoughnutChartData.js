

const imagePath = process.env.REACT_APP_IMAGE_PATH || '';

// Define the dynamic paths for each image
const adobeXD = `${imagePath}/small-logos/logo-xd.svg`;
const atlassian = `${imagePath}/small-logos/logo-atlassian.svg`;
const slack = `${imagePath}/small-logos/logo-slack.svg`;
const spotify = `${imagePath}/small-logos/logo-spotify.svg`;
const jira = `${imagePath}/small-logos/logo-jira.svg`;

export {
  adobeXD,
  atlassian,
  slack,
  spotify,
  jira
};


const complexReportsDoughnutChartData = {
  images: [adobeXD, atlassian, slack, spotify, jira],
  labels: ["Adobe XD", "Atlassian", "Slack", "Spotify", "Jira"],
  datasets: {
    label: "Referrals",
    backgroundColors: ["primary", "info", "warning", "success", "dark"],
    data: [25, 3, 12, 7, 10],
  },
};

export default complexReportsDoughnutChartData;

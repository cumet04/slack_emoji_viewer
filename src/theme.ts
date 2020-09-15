type Theme = {
  "--color-text": string;
  "--color-background": string;
  "--color-primary": string;
  "--color-success": string;
  "--color-info": string;
  "--color-warning": string;
  "--color-danger": string;
};

const themes = {
  light: {
    "--color-text": "#1D1C1D",
    "--color-background": "#FFFFFF",
    // https://colors.eva.design/
    "--color-primary": "#1976D2",
    "--color-success": "#31AA41",
    "--color-info": "#1861F4",
    "--color-warning": "#FFBF00",
    "--color-danger": "#FF2D26",
  } as Theme,
};

export default themes;

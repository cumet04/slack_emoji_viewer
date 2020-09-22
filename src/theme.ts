type ColorScheme = {
  "--color-text-primary": string;
  "--color-text-secondary": string;
  "--color-text-label": string;
  "--color-panel": string;
  "--color-border": string;
  "--color-background": string;
  "--color-primary": string;
  "--color-success": string;
  "--color-info": string;
  "--color-warning": string;
  "--color-danger": string;
};

export const Themes = {
  Light: {
    "--color-text-primary": "#1D1C1D", // slack light theme's text
    "--color-text-secondary": "#616061", // slack light theme's timestamp
    "--color-text-label": "#FFF", // for text on primary/success/info/warning... (ex. button)
    "--color-panel": "#FFFFFF", // slack light theme's background
    "--color-border": "#8D8D8D", // panel + primary*0.5
    "--color-background": "#EDEDED", // panel + (B-7)
    // https://colors.eva.design/
    "--color-primary": "#1976D2",
    "--color-success": "#31AA41",
    "--color-info": "#1861F4",
    "--color-warning": "#FFBF00",
    "--color-danger": "#FF2D26",
  },
  Dark: {
    "--color-text-primary": "#D1D2D3", // slack dark theme's text
    "--color-text-secondary": "#ABABAD", // slack dark theme's timestamp
    "--color-text-label": "#FFF", // for text on primary/success/info/warning... (ex. button)
    "--color-panel": "#1A1D21", // slack dark theme's background
    "--color-border": "#76777A", // panel + primary*0.5
    "--color-background": "#282D33", // panel + (B+7)
    "--color-primary": "#1976D2",
    "--color-success": "#31AA41",
    "--color-info": "#1861F4",
    "--color-warning": "#FFBF00",
    "--color-danger": "#FF2D26",
  },
} as { [key in Theme]: ColorScheme };

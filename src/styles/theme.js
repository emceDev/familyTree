import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import brown from "@material-ui/core/colors/brown";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#00a456",
		},
		secondary: {
			main: "#fd8a11",
		},
	},
	overrides: {
		// Style sheet name ⚛️
		MuiAppBar: {
			text: {
				color: brown[500],
			},
		},
		MuiButton: {
			// Name of the rule
			variant: "contained",
		},
		MuifocusVisible: {
			text: {
				background: "green",
			},
		},
	},
});

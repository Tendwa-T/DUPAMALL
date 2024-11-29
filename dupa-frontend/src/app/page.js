import { Box } from "@mui/material";
import LandingSection from "./components/LandingSection";
import NavBarComponent from "./components/Navbar";
import PreviewsComponent from "./components/LandingPreviews";

export default function Home() {
  return (
    <Box sx={{ bgcolor: "whitesmoke", height: "100vh" }}>
      <NavBarComponent selected={0} />
      <LandingSection />
      <PreviewsComponent />
    </Box>
  );
}

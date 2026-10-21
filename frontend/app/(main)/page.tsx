"use client";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import Footer from "../(main)/components/Footer";
import Image from "next/image";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TopBar from "./components/Topbar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function EVENTHome() {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <Container>
        <Image
          src="/event1.jpg"
          width={1500}
          height={500}
          alt="Picture of the event promotion"
          style={{
            objectFit: "cover",
            borderRadius: "10px",
            margin: "auto",
          }}
          className="h-auto"
          loading="eager"
        />
        <Grid
          container
          rowSpacing={1}
          columnSpacing={2}
          direction="row"
          wrap="nowrap"
          className="pt-8"
        >
          <Grid size={{ xs: 6 }}>
            <Item>
              <Typography
                sx={{ fontFamily: "var(--futura)" }}
                variant="h3"
                component="div"
              >
                EVENT <br /> MANAGEMENT
              </Typography>
            </Item>
          </Grid>

          <Grid size={{ xs: 6 }} sx={{ alignContent: "center" }}>
            <Item>
              <Typography
                sx={{ fontFamily: "var(--futura)" }}
                variant="h4"
                component="div"
              >
                Urmeaza la noi aici si crea un eveniment de visul tau
              </Typography>
            </Item>
          </Grid>
        </Grid>

        <Divider className="py-8" />

        <Box sx={{ my: 2 }}>
          <Typography>
            We know that organizing an event can be a complex and often tedious
            process. We therefore offer you our 10 years experience in
            organizing and hosting events. Our dedicated event managers will be
            pleased to assist you in coordinating all logistics issues.
          </Typography>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

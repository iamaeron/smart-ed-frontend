import { Box, Container } from "@mantine/core";
import Logo from "@/components/logo";

const Footer = () => {
  return (
    <Box py="xl" bg="primary2" mt={40}>
      <Container size="1200px">
        <Logo imgSize={40} withDiv white />
      </Container>
    </Box>
  );
};

export default Footer;

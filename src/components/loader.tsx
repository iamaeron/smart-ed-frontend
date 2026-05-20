import { Center, Image } from "@mantine/core";
import logo from "@/assets/smarted-logo.png";

const Loader = () => {
  return (
    <Center mih="100vh" bg="lightBackground">
      <Image src={logo} h={80} w={80} />
    </Center>
  );
};

export default Loader;

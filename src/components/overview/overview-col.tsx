import { Box, Card, Center, Group, Text } from "@mantine/core";
import type { Icon } from "@solar-icons/react/lib/types";

type QuickViewColProps = { label: string; value: string; icon: Icon };

const OverviewCol = ({ label, value, icon }: QuickViewColProps) => {
  const Icon = icon;

  return (
    <Card
      w="100%"
      bg="white"
      // withBorder
      p="lg"
      c="mainText"
      radius="lg"
      // bd="1px solid rgba(0,0,0,0.1)"
      shadow="xl"
    >
      <Group justify="space-between">
        <Box>
          <Text mt={2} mb={20} fw={600}>
            {label}
          </Text>
          <Text
            style={{
              textShadow:
                "0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075)",
            }}
            fz={40}
            fw={600}
            lts={2}
            lh={1}
          >
            {value}
          </Text>
        </Box>

        <Center
          style={{ borderRadius: "999px" }}
          bg="lightBackground"
          w={50}
          h={50}
        >
          <Icon color="#2C68FF" weight="BoldDuotone" size={30} />
        </Center>
      </Group>
    </Card>
  );
};

export default OverviewCol;

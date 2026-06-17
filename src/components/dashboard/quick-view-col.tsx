import { Box, Card, Center, Group, Text } from "@mantine/core";
import type { Icon } from "@solar-icons/react/lib/types";

type QuickViewColProps = {
  label: string;
  value: string;
  icon: Icon;
  onClick?: () => void;
};

const QuickViewCol = ({ label, value, icon, onClick }: QuickViewColProps) => {
  const Icon = icon;

  return (
    <Card
      w="100%"
      onClick={onClick ? onClick : undefined}
      bg="rgba(255,255,255,0.3)"
      withBorder
      p="lg"
      c="white"
      radius="lg"
      bd="1px solid rgba(255,255,255,0.5)"
    >
      <Group justify="space-between">
        <Box>
          <Text mt={2} mb={20}>
            {label}
          </Text>
          <Text
            style={{
              textShadow:
                "0px 1px 0px rgb(0 0 0 / 0.075), 0px 1px 1px rgb(0 0 0 / 0.075), 0px 2px 2px rgb(0 0 0 / 0.075)",
            }}
            fz={45}
            fw={600}
            lts={2}
            lh={1}
          >
            {value}
          </Text>
        </Box>

        <Center style={{ borderRadius: "999px" }} bg="white" w={50} h={50}>
          <Icon color="#2C68FF" weight="BoldDuotone" size={30} />
        </Center>
      </Group>
    </Card>
  );
};

export default QuickViewCol;

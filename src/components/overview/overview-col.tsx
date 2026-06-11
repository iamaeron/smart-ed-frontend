import { Box, Card, Center, Group, Skeleton, Text } from "@mantine/core";
import type { Icon } from "@solar-icons/react/lib/types";

type QuickViewColProps = {
  label: string;
  value: string;
  icon: Icon;
  highlighted?: boolean;
  loading?: boolean;
};

const OverviewCol = ({
  label,
  value,
  icon,
  highlighted,
  loading = false,
}: QuickViewColProps) => {
  const Icon = icon;

  return (
    <Card
      w="100%"
      bg={highlighted ? "primary" : "white"}
      // withBorder
      p="lg"
      c={highlighted ? "white" : "mainText"}
      radius="lg"
      // bd="1px solid rgba(0,0,0,0.1)"
      shadow="xl"
    >
      <Group justify="space-between">
        <Box flex={1}>
          <Text mt={2} mb={20} fw={600}>
            {label}
          </Text>
          {loading ? (
            <Skeleton h={40} w="80%" opacity={highlighted ? 0.5 : undefined} />
          ) : (
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
          )}
        </Box>

        <Center
          style={{ borderRadius: "999px" }}
          bg="lightBackground"
          w={50}
          h={50}
        >
          <Icon
            color="#2C68FF"
            className="custom-duotone"
            weight="BoldDuotone"
            size={30}
          />
        </Center>
      </Group>
    </Card>
  );
};

export default OverviewCol;

import { useAuth } from "@/contexts/auth.context";
import { Text, Group, ActionIcon, Flex } from "@mantine/core";
import { UserCircle } from "lucide-react";

const UserProfile = () => {
  const { user } = useAuth();

  // console.log(user);

  return (
    <Group>
      <Flex direction="column" align="end">
        <Text size="sm" fw={500} m={0}>
          {user?.name}
        </Text>

        {/* <Text size="xs" c="longText" m={0}>
          {user?.assignment?.school_name ?? user?.role}
        </Text> */}
      </Flex>
      <ActionIcon variant="subtle" color="gray">
        <UserCircle size={22} />
      </ActionIcon>
    </Group>
  );
};

export default UserProfile;

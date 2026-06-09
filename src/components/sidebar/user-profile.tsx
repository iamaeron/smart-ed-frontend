import { useAuth } from "@/contexts/auth.context";
import { Text, Group, ActionIcon } from "@mantine/core";
import { UserCircle } from "lucide-react";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <Group>
      <Text size="sm" fw={500}>
        {user?.name}
      </Text>
      <ActionIcon variant="subtle" color="gray">
        <UserCircle size={22} />
      </ActionIcon>
    </Group>
  );
};

export default UserProfile;

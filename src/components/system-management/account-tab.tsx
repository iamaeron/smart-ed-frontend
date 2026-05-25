import { useFetchUserAccounts } from "@/lib/fetcher/user.fetcher";
import {
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Skeleton,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import { AltArrowDown, Filter, Magnifier } from "@solar-icons/react";
import { Plus } from "lucide-react";
import AccountList from "./account-list";

const AccountTab = () => {
  const { data, isPending } = useFetchUserAccounts();

  return (
    <Paper bg="white" p={26} radius="lg">
      <Flex gap={4}>
        <Title order={4}>User Accounts</Title>
        {!isPending && (
          <Title order={4} c="longText">
            ({data.results.users.length})
          </Title>
        )}
      </Flex>
      <Flex mt={18} mb={26} justify="space-between">
        <Group>
          <TextInput
            variant="filled"
            placeholder="Search accounts ..."
            styles={{
              input: {
                backgroundColor: "#F3F5FF",
              },
            }}
            leftSection={<Magnifier size={16} />}
          />

          <Select
            placeholder="Pick value"
            variant="filled"
            leftSection={<Filter size={16} />}
            rightSection={<AltArrowDown size={16} />}
            data={["React", "Angular", "Vue", "Svelte"]}
            styles={{
              input: {
                backgroundColor: "#F3F5FF",
              },
            }}
          />

          <Select
            placeholder="Pick value"
            variant="filled"
            leftSection={<Filter size={16} />}
            rightSection={<AltArrowDown size={16} />}
            data={["React", "Angular", "Vue", "Svelte"]}
            styles={{
              input: {
                backgroundColor: "#F3F5FF",
              },
            }}
          />
        </Group>

        <Button leftSection={<Plus size={16} />}>Add Account</Button>
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
        </Stack>
      ) : (
        <AccountList data={data.results.users} />
      )}
    </Paper>
  );
};

export default AccountTab;

import { useFetchUserAccounts } from "@/lib/fetcher/user.fetcher";
import {
  Button,
  Flex,
  Group,
  Paper,
  Select,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import { AltArrowDown, Filter } from "@solar-icons/react";
import { Plus } from "lucide-react";
import AccountList from "./account-list";
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";

const AccountTab = () => {
  const { data, isPending } = useFetchUserAccounts({ per_page: 5 });
  const [accounts, setAccounts] = useState([]);

  console.log(data);
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
        {isPending ? (
          <Flex gap={10}>
            <Skeleton h={36} width={200} />
            <Skeleton h={36} width={200} />
            <Skeleton h={36} width={200} />
          </Flex>
        ) : (
          <Group>
            <TabSearchBar
              placeholder="Search accounts ..."
              callbackFn={(v) => {
                const filteredAccounts = data.results.users.filter((act: any) =>
                  act.name.toLowerCase().includes(v.toLowerCase()),
                );
                setAccounts(filteredAccounts);
              }}
            />

            <ListFilter
              all="All Roles"
              data={data.results.users}
              accessor="role"
              callbackFn={(v) => {
                const filteredAccounts = data.results.users.filter(
                  (acc: any) => acc.role === v,
                );
                setAccounts(filteredAccounts);
              }}
            />

            {/* <ListFilter
              all="All Schools"
              data={baseList}
              accessor="user.school"
              callbackFn={(v) => setSchoolFilter(v)}
            /> */}

            {/* <Select
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
            /> */}
          </Group>
        )}

        <Button leftSection={<Plus size={16} />}>Add Account</Button>
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
        </Stack>
      ) : (
        <AccountList
          data={accounts.length > 0 ? accounts : data.results.users}
        />
      )}
    </Paper>
  );
};

export default AccountTab;

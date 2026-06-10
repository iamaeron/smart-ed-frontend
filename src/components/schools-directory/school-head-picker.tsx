import { useFetchUserAccounts } from "@/lib/fetcher/user.fetcher";
import type { SchoolData } from "@/types/form/school.schema";
import {
  Box,
  Divider,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Check, ChevronDown } from "lucide-react";
import { Controller, type Control, type FormState } from "react-hook-form";
import ErrorMessage from "../form/error-message";
import { useState } from "react";

const SchoolHeadPicker = ({
  control,
  formState,
}: {
  control: Control<SchoolData>;
  formState: FormState<SchoolData>;
}) => {
  const { data: accounts, isPending: isAccountsDataFetching } =
    useFetchUserAccounts();

  const [selectedAccount, setSelectedAccount] = useState<{
    [k: string]: string;
  } | null>(null);

  const accountsList =
    accounts?.results?.users.map((user: any) => ({
      value: user.name,
      label: user.name,
      username: user.username,
    })) || [];

  return (
    <>
      <Divider mt={24} mb={12} />

      <Title order={5} mb={14}>
        School Head
      </Title>

      <Controller
        name="school_head"
        control={control}
        render={({ field }) => (
          <Box flex={1}>
            <Select
              {...field}
              allowDeselect={false}
              labelProps={{ style: { marginBottom: 6 } }}
              placeholder="Enter account name ..."
              rightSection={<ChevronDown size={16} />}
              radius="sm"
              searchable
              clearable
              onChange={(v) => {
                field.onChange(v);
                const foundUser = accounts?.results?.users.find(
                  (acc: any) => acc.name === v,
                );

                if (foundUser) {
                  setSelectedAccount({
                    phone_number: foundUser.phone_number,
                    email: foundUser.email,
                  });
                } else {
                  setSelectedAccount(null);
                }
              }}
              onClear={() => {
                field.onChange(null);
                setSelectedAccount({ phone_number: "", email: "" });
              }}
              filter={({ search }) => {
                return accountsList.filter(
                  (option: any) =>
                    option.label
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()) ||
                    option.value
                      .toLowerCase()
                      .includes(search.toLowerCase().trim()),
                );
              }}
              comboboxProps={{
                shadow: "xl",
              }}
              renderOption={({ option, checked }: any) => {
                return (
                  <Group>
                    {checked ? <Check size={16} /> : null}
                    <Stack gap={0}>
                      <Text size="sm" fw={600}>
                        {option.value}
                      </Text>
                      <Text size="sm" mt={-2} c="longText">
                        @{option.username}
                      </Text>
                    </Stack>
                  </Group>
                );
              }}
              styles={{
                dropdown: {
                  padding: 0,
                },
                option: {
                  borderRadius: 0,
                  borderBottom: "1px solid var(--mantine-color-default-border)",
                  paddingTop: "var(--mantine-spacing-sm)",
                  paddingBottom: "var(--mantine-spacing-sm)",
                  paddingLeft: "var(--mantine-spacing-md)",
                  paddingRight: "var(--mantine-spacing-md)",
                },
              }}
              data={accountsList}
            />
            <ErrorMessage
              atEnd={false}
              error={formState.errors.school_code?.message}
            />
          </Box>
        )}
      />

      <Group gap={16} my={14}>
        <Box flex={1}>
          <TextInput
            labelProps={{
              mb: 6,
              fw: 400,
              c: "dark",
            }}
            label="Phone Number"
            radius="sm"
            defaultValue={selectedAccount?.phone_number ?? ""}
            disabled={!selectedAccount}
          />
        </Box>
        <Box flex={1}>
          <TextInput
            labelProps={{
              mb: 6,
              fw: 400,
              c: "dark",
            }}
            label="Email"
            radius="sm"
            defaultValue={selectedAccount?.email ?? ""}
            disabled={!selectedAccount}
          />
        </Box>
      </Group>
    </>
  );
};

export default SchoolHeadPicker;

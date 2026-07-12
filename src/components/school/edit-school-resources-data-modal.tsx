import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Paper,
  Skeleton,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";
import EditSchoolDataConfirmModal from "./edit-school-data-confirm-modal";
import type { SubmitEvent } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";
import ReturnedWarningCard from "./returned-warning-card";
import ApprovedInfoCard from "./approved-info-card";
import RequestEditDataConfirmModal from "./request-edit-data-confirm-modal";

const EditSchoolResourcesDataModal = ({
  data,
  loading,
  review,
  submissionId,
}: {
  data: any;
  loading: boolean;
  review?: boolean;
  submissionId?: string;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAuth();

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (review) formData.append("_method", "PUT");
    formData.append("type", "resource");

    const resourceNodes = document.querySelectorAll("[data-resource]");
    resourceNodes.forEach((resourceNode, index) => {
      const inventoryCount = (
        resourceNode.querySelector("[data-inventory-count]") as HTMLInputElement
      ).value;
      const requirementCount = (
        resourceNode.querySelector(
          "[data-requirement-count]",
        ) as HTMLInputElement
      ).value;
      const resource = resourceNode.getAttribute("data-resource") ?? "";

      formData.append(`details[${index}][resource_name]`, resource);
      formData.append(`details[${index}][inventory]`, inventoryCount);
      formData.append(`details[${index}][requirement]`, requirementCount);
    });

    try {
      const reqFunc = review
        ? api.post(`/api/submissions/${submissionId}`, formData)
        : api.post(`/api/submissions`, formData);

      const res = await reqFunc;

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        if (review) {
          queryClient.invalidateQueries({
            queryKey: ["submission", submissionId, {}],
          });
        }
        close();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const rows = data.map((element: any) => (
    <Table.Tr data-resource={element.resource_name} key={element.resource_name}>
      <Table.Td fw={600} ta="left">
        {element.resource_name}
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <TextInput
          data-inventory-count
          classNames={{
            input: "custom-data-input",
          }}
          type="number"
          onFocus={(e) => e.target.select()}
          defaultValue={element.inventory}
          className="w-full"
        />
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <TextInput
          data-requirement-count
          classNames={{
            input: "custom-data-input",
          }}
          type="number"
          onFocus={(e) => e.target.select()}
          defaultValue={element.requirement}
          className="w-full"
        />
      </Table.Td>
    </Table.Tr>
  ));

  const thProps = {
    w: "20%",
    fw: "400",
    fz: 14,
    c: "longText",
    pr: 10,
    pl: 10,
  };

  const pendingResourcesData = user?.submission_data?.find(
    (f) => f.type === "resource" && f.status === "pending",
  );

  const returnedResourcesData = user?.submission_data?.find(
    (f) => f.type === "resource" && f.status === "returned",
  );

  const approvedResourcesData = user?.submission_data?.find(
    (f) => f.type === "resource" && f.status === "approved",
  );

  const hasApprovedResourcesData = approvedResourcesData ? true : false;
  const hasPendingResourcesData = pendingResourcesData ? true : false;
  const hasReturnedResourcesData = returnedResourcesData ? true : false;

  const isReturned = hasReturnedResourcesData && !review;
  const isApproved = hasApprovedResourcesData && !review;

  const isTableDisabled = isReturned || isApproved;

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="lg"
        centered
        padding={0}
      >
        <Card
          pos={"sticky"}
          top={0}
          py="md"
          style={{ zIndex: 20, borderBottom: "1px solid #EAEAFF" }}
          px="lg"
        >
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Edit Resources Data
            </Text>

            <ActionIcon
              onClick={close}
              variant="subtle"
              color="gray"
              type="button"
            >
              <X size={18} />
            </ActionIcon>
          </Group>
        </Card>

        <form id="edit-school-data-form" onSubmit={onSubmit}>
          <Paper p="lg">
            {isReturned ? (
              <ReturnedWarningCard subId={returnedResourcesData?.id} />
            ) : null}

            {isApproved ? <ApprovedInfoCard /> : null}

            <Paper
              h={isTableDisabled ? 200 : "max-content"}
              style={
                isTableDisabled
                  ? { overflow: "hidden", position: "relative" }
                  : {}
              }
            >
              <Paper
                withBorder
                radius="md"
                style={
                  isTableDisabled
                    ? {
                        opacity: 0.8,
                        cursor: "not-allowed",
                      }
                    : { overflow: "hidden" }
                }
              >
                <Table
                  style={{
                    pointerEvents: isTableDisabled ? "none" : "all",
                  }}
                  highlightOnHover
                  layout="fixed"
                  horizontalSpacing="md"
                >
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th w="60%" fw="400" fz={14} c="longText">
                        Resources
                      </Table.Th>
                      <Table.Th {...thProps}>Inventory</Table.Th>
                      <Table.Th {...thProps}>Requirement</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{rows}</Table.Tbody>
                </Table>
              </Paper>

              {isTableDisabled ? (
                <div
                  style={{
                    position: "absolute",
                    height: 100,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    cursor: "not-allowed",
                    // background: "linear-gradient(to top, white, transparent)",
                    backgroundImage:
                      "linear-gradient(to top, white, transparent)",
                  }}
                ></div>
              ) : null}
            </Paper>

            <Flex justify="flex-end" mt={20} gap={8}>
              <Button
                onClick={close}
                tt="uppercase"
                variant="outline"
                color="primary"
                c="primary"
                type="button"
              >
                Cancel
              </Button>
              {isApproved ? (
                <RequestEditDataConfirmModal
                  subId={approvedResourcesData?.id}
                />
              ) : (
                <EditSchoolDataConfirmModal disabled={isReturned} />
              )}
            </Flex>
          </Paper>
        </form>
      </Modal>

      {loading ? (
        <Skeleton w={60} h={26} />
      ) : hasPendingResourcesData ? (
        <Button
          size="compact-sm"
          radius="sm"
          px="md"
          variant="outline"
          color="yellow"
        >
          Submission Pending
        </Button>
      ) : (
        <Button
          onClick={open}
          size="compact-sm"
          radius="sm"
          px="md"
          variant="outline"
          color="blue"
        >
          Edit
        </Button>
      )}
    </>
  );
};

export default EditSchoolResourcesDataModal;

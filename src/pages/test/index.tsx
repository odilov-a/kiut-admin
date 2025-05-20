import { Button, DotBtn } from "components";
import { CreateDoc } from "assets/images/icons";
import { useHooks, usePost } from "hooks";
import { Modal, notification, Table } from "antd";
import Container from "modules/container";

const Test = () => {
  const { get, queryClient, t, navigate } = useHooks();
  const { mutate } = usePost();
  const onDeleteHandler = (row: any) => {
    const id = get(row, "_id");
    Modal.confirm({
      title: t("Do you confirm the deletion") + "?",
      okText: t("YES"),
      okType: "danger",
      cancelText: t("NO"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: any) => {
    if (id) {
      mutate(
        { method: "delete", url: `/tests/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`tests`],
            });
            notification["success"]({
              message: t("Successfully deleted!"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: t(
                get(error, "response.data.error", "An error occurred!")
              ),
              duration: get(error, "response.data.message") ? 4 : 2,
            });
          },
        }
      );
    }
  };

  return (
    <div>
      <Container.All url="/tests/teacher/tests" name="tests">
        {({ items }) => {
          return (
            <div>
              <div className="page-heading">
                <div className="page-heading__right">
                  <Button
                    size="large"
                    icon={<CreateDoc />}
                    title={t("Create test")}
                    onClick={() => navigate("/test/create")}
                  />
                </div>
              </div>
              <Table
                dataSource={items}
                pagination={{ pageSize: 12 }}
                columns={[
                  {
                    key: "name",
                    align: "left",
                    title: t("Test name"),
                    dataIndex: "name",
                    className: "w-[80px]",
                    render: (value) => (
                      <div className="flex items-center">{value}</div>
                    ),
                  },
                  {
                    title: t("Actions"),
                    align: "center",
                    className: "w-[1px]",
                    render: (value, row) => (
                      <DotBtn
                        row={row}
                        editFunction={() =>
                          navigate(`/test/update/${get(row, "_id")}`)
                        }
                        deleteFunction={() => onDeleteHandler(row)}
                      />
                    ),
                  },
                ]}
              />
            </div>
          );
        }}
      </Container.All>
    </div>
  );
};

export default Test;

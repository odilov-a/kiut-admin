import { Modal, notification, Table } from "antd";
import { Button, DotBtn } from "components";
import { useHooks, usePost } from "hooks";
import Container from "modules/container";
import { CreateDoc } from "assets/images/icons";

const Information = () => {
  const { t, get, queryClient, navigate } = useHooks();
  const { mutate } = usePost();

  const onDeleteHandler = (row: any) => {
    const id = get(row, "_id");
    Modal.confirm({
      title: t("Do you confirm the deletion") + "?",
      cancelText: t("NO"),
      okType: "danger",
      okText: t("YES"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: any) => {
    if (id) {
      mutate(
        { method: "delete", url: `/informations/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`informations`],
            });
            notification["success"]({
              message: t("Deleted successfully!"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: t(
                get(error, "response.data.error", "Error occurred")
              ),
              duration: get(error, "response.data.message") ? 4 : 2,
            });
          },
        }
      );
    }
  };

  return (
    <>
      <div className="content-panel">
        <div>
          <Container.All url="/informations/type/1" name="informations">
            {({ meta, items }) => {
              return (
                <div>
                  <div className="page-heading">
                    <div className="page-heading__right">
                      <Button
                        icon={<CreateDoc />}
                        title={t("Create new information")}
                        onClick={() => navigate("/informations/create")}
                      />
                    </div>
                  </div>
                  <Table
                    dataSource={items}
                    pagination={{ pageSize: 12 }}
                    columns={[
                      {
                        key: "title",
                        align: "center",
                        title: t("Title"),
                        dataIndex: "title",
                        className: "w-[80px]",
                        render: (value) => (
                          <div className="flex items-center">{value}</div>
                        ),
                      },
                      {
                        key: "description",
                        align: "center",
                        title: t("Description"),
                        dataIndex: "description",
                        className: "w-[180px]",
                        render: (value) => (
                          <span
                            className="dark:text-[#e5e7eb] line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: value }}
                          />
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
                              navigate(`/informations/update/${get(row, "_id")}`)
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
      </div>
    </>
  );
};

export default Information;
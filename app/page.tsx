"use client";

import getUser from "@/api/users/users";
import { User } from "@/types/user";
import { Table, Tag, message } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export default function HomeTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data: User[] = await getUser();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        message.error("Failed to fetch users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns: ColumnsType<User> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 60,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 180,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: 150,
      render: (username) => <Tag color="blue">@{username}</Tag>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 220,
    },
    {
      title: "Company",
      dataIndex: ["company", "name"],
      key: "company",
      width: 180,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 180,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: 150,
    },
  ];

  return (
    <div className="p-15">
      <div>
        <h1 className="text-2xl font-bold">Users</h1>
        <p className="text-gray-500">List of registered users</p>
      </div>

      <Table<User>
        rowKey="id"
        columns={columns}
        dataSource={users}
        loading={loading}
        scroll={{ x: 1000 }}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} of ${total} users`,
        }}
      />
    </div>
  );
}

export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginationUsers } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UsersTable } from './ui/UsersTable';
import { User } from "@/interfaces";

export default async function OrdersPage() {

  const { ok, users = [] } = await getPaginationUsers();
  const convertedUsers: User[] = users.map((user) => ({
    ...user,
    emailVerified: user.emailVerified?.toISOString() || null,
  }));

  if (!ok) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={ convertedUsers } />

        <Pagination totalPages={ 1 } />
      </div>
    </>
  );
}
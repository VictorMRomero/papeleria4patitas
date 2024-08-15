export const revalidate = 0;

// https://tailwindcomponents.com/component/hoverable-table
import {  getPaginationUsers } from "@/actions";
import { Pagination, Title } from "@/components";

import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { UsersTable } from './ui/UsersTable';
import { User } from "@/interfaces";


interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function UsersPage({searchParams}: Props) {

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { users, currenPage, totalPages } = await getPaginationUsers({page});


  if (!users) {
    redirect("/auth/login");
  }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={ users } />

        <Pagination totalPages={ totalPages } />
      </div>
    </>
  );
}
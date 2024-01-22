export const revalidate = 0;
import { getPaginationUsers } from '@/actions';
import { Pagination, Title } from '@/components';



import { redirect } from 'next/navigation';

import { UsersTable } from './ui/UsersTable';

export default async function orders() {



  const { ok, users } = await getPaginationUsers();

  if (!ok) {
    redirect('/auth/login');
  }


  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users}/>
        <Pagination totalPages={1} />
      </div>
    </>
  );
}
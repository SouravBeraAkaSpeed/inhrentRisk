import { db } from "@/lib/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import BankSetup from "@/components/bank-setup/bank-setup";

const DashBoard = async () => {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return redirect(`/login`);

  const bank = await db.bank.findFirst({
    where: {
      users: {
        some: { email: user.email },
      },
    },
  });

  console.log(bank);
  if (!bank) redirect(`/onboarding`);

  redirect(`/dashboard/${bank.id}`);
};

export default DashBoard;

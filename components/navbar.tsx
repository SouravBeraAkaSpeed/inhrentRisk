import React from "react";
import SideBar from "./SideBar";
import { ModeToggle } from "./mode-toggle";
import Notifications from "@/components/notifications";
import SignOut from "./signout";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const NavBar = async () => {
  cookies().getAll();
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  const bank = await db.bank.findFirst({
    where: {
      users: {
        some: { email: user.email },
      },
    },
  });

  return (
    <div className="flex w-full  shadow-xl border-b-2">
      <div className="flex w-full m-5">{bank && <SideBar />}</div>

      <div className="flex-1  flex m-5 items-center gap-x-1.5">
        <div className="flex">
          <Notifications />
        </div>
        <div className="flex">
          <ModeToggle />
        </div>
        <div className="flex bg-white rounded-full">
          <SignOut />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

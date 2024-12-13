'use server';

import { signOut } from "@/services/auth";
import { redirect } from "next/navigation";

const logoutAction = async () => {
    await signOut();
    redirect("/login");
};

export default logoutAction;

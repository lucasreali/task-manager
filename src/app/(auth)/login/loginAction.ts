'use server';

import { signIn } from "@/services/auth";

const loginAction = async (formData: FormData) => {
    await signIn('credentials', FormData);

};

export default loginAction;

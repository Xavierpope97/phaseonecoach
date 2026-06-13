"use server";

import { createSupabaseClient } from "@/lib/supabase";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { status: "error", message: "Please fill out every field." };
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("contact_submissions")
    .insert({ name, email, message });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  return { status: "success", message: "Thanks — we'll be in touch soon." };
}

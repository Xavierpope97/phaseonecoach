"use server";

import { createSupabaseClient } from "@/lib/supabase";
import { sendLeadMagnetEmail, sendAdminNotification } from "@/lib/email";

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

  sendAdminNotification({
    subject: "New contact form submission — phaseonecoach.com",
    body: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  }).catch(() => {});

  return { status: "success", message: "Thanks — we'll be in touch soon." };
}

export type LeadMagnetState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitLeadMagnetForm(
  _prevState: LeadMagnetState,
  formData: FormData
): Promise<LeadMagnetState> {
  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();

  if (!name || !email) {
    return { status: "error", message: "Please fill out every field." };
  }

  const supabase = createSupabaseClient();

  const { error } = await supabase
    .from("lead_magnet_signups")
    .insert({ name, email });

  if (error) {
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  try {
    await sendLeadMagnetEmail(name, email);
  } catch {
    return {
      status: "error",
      message:
        "You're on the list, but the email failed to send. We'll follow up shortly.",
    };
  }

  sendAdminNotification({
    subject: "New lead magnet signup — phaseonecoach.com",
    body: `Name: ${name}\nEmail: ${email}`,
  }).catch(() => {});

  return {
    status: "success",
    message: "Check your inbox — your guide is on its way!",
  };
}

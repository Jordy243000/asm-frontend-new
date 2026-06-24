import axios from "axios";

export async function submitContactMessage({
  name,
  email,
  phone,
  subject,
  message,
}) {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_ENDPOINT}/massages/submit`,
    {
      data: {
        name,
        email,
        phone,
        subject,
        message,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

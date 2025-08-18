import axios from "axios";

export async function getRegister({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const config = {
    headers: { "Content-Type": "application/json" },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/users",
      body,
      config
    );

    return res.data;
  } catch (unknownError) {
    if (unknownError instanceof Error) {
      console.error(unknownError.message);
      throw new Error(unknownError.message);
    } else {
      console.error("An unknown error occurred");
      throw new Error("An unknown error occurred");
    }
  }
}

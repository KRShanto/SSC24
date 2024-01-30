import { SITE_NAME } from "@/lib/const";
import Logo from "@/components/Logo";
import { Form, Input, Link, Links, Submit, Title } from "@/components/Form";
import SubmitButton from "./Submit";
import GoogleSignIn from "@/components/GoogleSignIn";

export const metadata = {
  title: `Register`,
  description: `Register to ${SITE_NAME}`,
  keywords: ["register", `register to ${SITE_NAME}`],
  alternates: {
    canonical: "/register",
  },
  openGraph: {
    title: `Register`,
    description: `Register to ${SITE_NAME}`,
    url: process.env.NEXT_PUBLIC_URL + "/register",
    type: "website",
    siteName: SITE_NAME,
  },
};

export default function Register() {
  return (
    <Form>
      <Title>
        Register to <Logo />
      </Title>

      <Input label="Name" name="name" type="name" required autoFocus />
      <Input label="Email" name="email" type="email" required autoFocus />
      <Input label="Password" name="password" type="password" required />

      <Links>
        <Link href="/login">Already have an account? Login</Link>
      </Links>

      <SubmitButton />

      <GoogleSignIn />
    </Form>
  );
}

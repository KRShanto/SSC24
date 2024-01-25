import { SITE_NAME } from "@/lib/const";
import Logo from "@/components/Logo";
import { Form, Input, Link, Links, Submit, Title } from "@/components/Form";
import SubmitButton from "./Submit";
import GoogleSignIn from "@/components/GoogleSignIn";

export const metadata = {
  title: `Register | ${SITE_NAME}`,
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

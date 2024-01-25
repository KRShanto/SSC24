import { SITE_NAME } from "@/lib/const";
import Logo from "@/components/Logo";
import { Form, Input, Link, Links, Submit, Title } from "@/components/Form";
import SubmitButton from "./Submit";
import GoogleSignIn from "@/components/GoogleSignIn";

export const metadata = {
  title: `Login | ${SITE_NAME}`,
};

export default function Login() {
  return (
    <Form>
      <Title>
        Login to <Logo />
      </Title>

      <Input label="Email" name="email" type="email" required autoFocus />
      <Input label="Password" name="password" type="password" required />

      <Links>
        <Link href="/register">Don&rsquo;t have an account? Register</Link>
      </Links>

      <SubmitButton />

      <GoogleSignIn />
    </Form>
  );
}

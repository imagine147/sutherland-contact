import RegistrationForm from "@/component/registrationForm";
import Image from "next/image";
import Logo from "../icons/sutherland-logo-colour.webp"

export default function Home() {
  return (
    <div className="w-full container mx-auto px-8">
      <div className="p-8"><Image src={Logo} width={250} height={250} alt="sutherland-logo" /></div>
      <RegistrationForm/>
    </div>
  );
}

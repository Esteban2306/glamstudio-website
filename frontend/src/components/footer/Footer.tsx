import Image from "next/image";
import FooterLinks from "./FooterLinks";
import FooterSocial from "./footerSocial";
import logoGlam from "@/public/logos/IMG_2865-removebg-preview 4-1.png";

export default function Footer() {
  return (
    <footer className="bg-[#FFEFD3] pt-16">
      <div className="max-w-6xl mx-auto border-t border-[#D6C58B]" />

      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="space-y-4">
          <Image src={logoGlam} alt="GlamStudio" width={140} height={40} />
          <p className="text-sm text-[#716D6D] max-w-xs">
            Servicios profesionales de cejas y pestañas para la mujer moderna.
          </p>
        </div>

        <FooterLinks />

        <FooterSocial />
      </div>

      <div className="max-w-6xl mx-auto border-t border-[#D6C58B]" />

      <div className="text-center text-sm text-[#716D6D] py-6">
        © 2025 GlamStudio. All rights reserved.
      </div>
    </footer>
  );
}

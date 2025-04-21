import { LandingPage } from "@/components/landing-page"
import { AuthInitializer } from "@/components/auth/auth-initializer"

export default function Home() {
  return (
    <>
      <AuthInitializer />
      <LandingPage />
    </>
  )
}

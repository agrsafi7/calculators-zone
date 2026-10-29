import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import { uniqueCalculators } from "@/lib/calculator-utils";

const totalCalcs = uniqueCalculators.length;

const AboutPage = () => (
  <div>
    <SEO
      title="About Us"
      description="About TheCalculator.us — who we are, how our free calculators are built and tested, and our commitment to accuracy and privacy."
      canonical="/about"
    />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
    <div className="container mx-auto px-4 pb-12 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black mb-6">About TheCalculator.us</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
        <p>
          <strong className="text-foreground">TheCalculator.us</strong> is an independent,
          free-to-use collection of {totalCalcs} online calculators covering finance, health,
          mathematics, science, unit conversions, date and time, and everyday life. Our goal is
          simple: give anyone, anywhere, fast and accurate answers to the numerical questions
          that come up in daily life — without sign-ups, paywalls, or downloads.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-6">How our calculators are built</h2>
        <p>
          Each calculator is developed individually and implements well-established, published
          formulas — for example, the standard amortization formula for loans, the Mifflin-St
          Jeor equation for calorie needs, and WHO BMI categories for body mass index. Every
          tool shows the formula it uses, and calculations run entirely in your browser, so
          your inputs never leave your device.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-6">Our commitment to accuracy</h2>
        <p>
          We test our calculators against known reference values and cross-check results
          between tools. That said, calculators are decision-support tools, not professional
          advice: financial calculators don't replace a financial advisor, and health
          calculators don't replace a doctor. Please read our{" "}
          <Link to="/disclaimer" className="text-primary hover:underline font-medium">
            Disclaimer
          </Link>{" "}
          before acting on any result.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-6">Privacy by design</h2>
        <p>
          Because calculations happen on your device, we don't need your personal data to run
          the tools. We don't require accounts, and we don't sell data. Details are in our{" "}
          <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
            Privacy Policy
          </Link>
          .
        </p>

        <h2 className="text-lg font-bold text-foreground mt-6">How the site stays free</h2>
        <p>
          All {totalCalcs} calculators on TheCalculator.us are free for everyone, and no
          ads are displayed yet — the site is under review for Google AdSense, which, if
          approved, will help keep the calculators free.
        </p>

        <h2 className="text-lg font-bold text-foreground mt-6">Contact</h2>
        <p>
          Found an error, have a calculator request, or want to partner with us? We read every
          message —{" "}
          <Link to="/contact" className="text-primary hover:underline font-medium">
            contact us here
          </Link>
          .
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;

import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import SEO from "@/components/SEO";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const LegalPage = ({
  title,
  description,
  canonical,
  children,
}: {
  title: string;
  description: string;
  canonical: string;
  children: React.ReactNode;
}) => (
  <div className="animate-stagger-1">
    <SEO title={title} description={description} canonical={canonical} />
    <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />
    <div className="container mx-auto px-4 pb-12 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black mb-6">{title}</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalPage
    title="Privacy Policy"
    description="Privacy Policy for TheCalculator.us — what data we collect, how cookies work, and your choices."
    canonical="/privacy-policy"
  >
    <p><strong className="text-foreground">Last updated:</strong> October 26, 2026</p>
    <p>
      TheCalculator.us ("we", "us", or "our") operates the thecalculator.us website (the
      "Service"). This Privacy Policy explains what information we collect, how we use it,
      and the choices you have. No third-party advertising currently runs on this site,
      and no advertising cookies are currently set.
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">Information We Collect</h2>
    <p>We collect a limited amount of information to operate and improve the Service:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Usage Data:</strong> we do not currently run any analytics service, so no usage analytics (pages visited, time spent, browser or device details) is collected. If an analytics service is added in the future, this policy will be updated before it goes live.</li>
      <li><strong className="text-foreground">Contact information you provide:</strong> if you email us or use the contact form, we receive your name, email address, and message content so we can respond.</li>
      <li><strong className="text-foreground">Calculator inputs:</strong> numbers you enter into calculators are processed locally in your browser and are never sent to our servers.</li>
    </ul>

    <h2 className="text-lg font-bold text-foreground mt-6">Cookies and Similar Technologies</h2>
    <p>
      We use cookies and similar technologies only to keep the site functional (e.g.,
      remembering your cookie-consent choice and recently used calculators). No
      advertising cookies are currently set, and no analytics cookies are currently used.
      If advertising or analytics is enabled in the future, this section will be updated
      before it goes live. You can control cookies through your browser settings;
      blocking cookies may affect some site features.
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">Advertising</h2>
    <p>
      No third-party advertising currently runs on TheCalculator.us, and no advertising
      cookies are currently set — including Google's advertising cookies such as the{" "}
      <strong className="text-foreground">DoubleClick DART cookie</strong>. The information
      below describes what will apply if advertising is enabled in the future.
    </p>
    <p>
      If advertising is enabled in the future (for example, Google AdSense), the
      advertising companies may use cookies to serve ads based on your prior visits to our
      website and other websites. You will then be able to opt out of personalized
      advertising by visiting{" "}
      <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
        Google Ads Settings
      </a>
      . You will also be able to opt out of third-party vendors' use of cookies for
      personalized advertising by visiting{" "}
      <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
        aboutads.info/choices
      </a>{" "}
      or, if you are in the EU/UK,{" "}
      <a href="https://www.youronlinechoices.eu/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
        youronlinechoices.eu
      </a>
      .
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">How We Use Information</h2>
    <ul className="list-disc pl-5 space-y-1">
      <li>To provide, maintain, and improve the Service</li>
      <li>To respond to your messages and support requests</li>
      <li>To monitor usage, detect technical issues, and prevent abuse</li>
      <li>To serve and measure advertising that keeps the Service free, if advertising is enabled in the future</li>
    </ul>
    <p>We do not sell your personal information to anyone.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Data Retention</h2>
    <p>
      Contact messages are retained only as long as needed to handle your request.
      No analytics data is currently collected, and no advertising cookies are currently
      set. If analytics or advertising is enabled in the future, their retention periods
      will be described here before they go live.
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">Children's Privacy</h2>
    <p>
      Our Service is not directed at children under 13, and we do not knowingly collect
      personal information from children under 13. If you believe a child has provided us
      with personal information, please contact us and we will delete it.
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">Your Rights</h2>
    <p>
      Depending on your location (including the EU/UK under GDPR and California under
      CCPA), you may have the right to access, correct, or delete personal information we
      hold about you, and to object to certain processing. To exercise these rights,{" "}
      <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link>.
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">Changes to This Policy</h2>
    <p>
      We may update this Privacy Policy from time to time. Changes take effect when posted
      on this page, with the "Last updated" date revised accordingly.
    </p>

    <h2 className="text-lg font-bold text-foreground mt-6">Contact Us</h2>
    <p>
      Questions about this Privacy Policy? Email us at{" "}
      <strong className="text-foreground">support@thecalculator.us</strong> or use our{" "}
      <Link to="/contact" className="text-primary hover:underline font-medium">contact form</Link>.
    </p>
  </LegalPage>
);

export const TermsOfService = () => (
  <LegalPage
    title="Terms of Service"
    description="Terms of Service for TheCalculator.us — the rules for using our free online calculators."
    canonical="/terms-of-service"
  >
    <p><strong className="text-foreground">Last updated:</strong> October 15, 2026</p>
    <p>Please read these Terms of Service ("Terms") carefully before using TheCalculator.us.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Acceptance of Terms</h2>
    <p>By accessing or using TheCalculator.us, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Use of the Service</h2>
    <p>TheCalculator.us provides online calculators for informational and educational purposes only. The results provided by our calculators should not be considered as professional financial, medical, or legal advice.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Acceptable Use</h2>
    <p>You agree not to misuse the Service — including attempting to disrupt it, scrape it aggressively, or use it for unlawful purposes.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Accuracy Disclaimer</h2>
    <p>While we strive to provide accurate calculations, we make no warranties or representations about the accuracy, reliability, or completeness of any information on this site. Users should verify results independently before making important decisions.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Intellectual Property</h2>
    <p>The Service and its original content, features, and functionality are owned by TheCalculator.us and are protected by international copyright, trademark, and other intellectual property laws.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Limitation of Liability</h2>
    <p>In no event shall TheCalculator.us be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Contact</h2>
    <p>Questions about these Terms? <Link to="/contact" className="text-primary hover:underline font-medium">Contact us</Link>.</p>
  </LegalPage>
);

export const Disclaimer = () => (
  <LegalPage
    title="Disclaimer"
    description="Disclaimer for TheCalculator.us — the limitations of our calculators for financial, health, and general decisions."
    canonical="/disclaimer"
  >
    <p><strong className="text-foreground">Last updated:</strong> October 15, 2026</p>

    <h2 className="text-lg font-bold text-foreground mt-6">General Disclaimer</h2>
    <p>The information provided by TheCalculator.us is for general informational and educational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Financial Disclaimer</h2>
    <p>The financial calculators on TheCalculator.us are provided for illustrative purposes only. They are not intended to provide specific financial, investment, tax, legal, accounting, or other professional advice. Always consult a qualified professional before making financial decisions.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Health Disclaimer</h2>
    <p>Health-related calculators (BMI, calorie, etc.) are provided for general reference only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">No Liability</h2>
    <p>Under no circumstances shall TheCalculator.us be responsible for any loss or damage resulting from reliance on information or calculator results provided through this website.</p>
  </LegalPage>
);

export const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in Name, Email, and Message.", variant: "destructive" });
      return;
    }
    setSending(true);

    try {
      const { data, error } = await supabase.functions.invoke("send-contact-email", {
        body: { name: form.name, email: form.email, subject: form.subject, message: form.message },
      });

      if (error) throw error;

      toast({ title: "Message sent!", description: "Thank you for reaching out. We'll get back to you soon." });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact form error:", err);
      toast({ title: "Error", description: "Failed to send message. Please try again.", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <LegalPage
      title="Contact Us"
      description="Contact TheCalculator.us — questions, feedback, error reports, and partnership inquiries."
      canonical="/contact"
    >
      <p>We'd love to hear from you! Whether you have a question about our calculators, feedback, or partnership inquiries, feel free to reach out.</p>

      <h2 className="text-lg font-bold text-foreground mt-6">Get in Touch</h2>
      <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-6 space-y-4 not-prose">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Name *</label>
          <input
            type="text" name="name" value={form.name} onChange={handleChange}
            placeholder="Your name"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Email *</label>
          <input
            type="email" name="email" value={form.email} onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Subject</label>
          <input
            type="text" name="subject" value={form.subject} onChange={handleChange}
            placeholder="What's this about?"
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-1.5">Message *</label>
          <textarea
            name="message" value={form.message} onChange={handleChange}
            placeholder="Tell us more..." rows={5}
            className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={sending}
          className="w-full py-2.5 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {sending ? "Sending..." : "Send Message"}
        </button>
      </form>

      <h2 className="text-lg font-bold text-foreground mt-6">Other Ways to Reach Us</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Email:</strong> support@thecalculator.us</li>
        <li><strong className="text-foreground">Business Inquiries:</strong> partners@thecalculator.us</li>
      </ul>
    </LegalPage>
  );
};

import { useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumbs from "@/components/Breadcrumbs";
import { toast } from "@/hooks/use-toast";

const LegalPage = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="animate-stagger-1">
    <Breadcrumbs items={[
      { label: "Home", href: "/" },
      { label: title },
    ]} />
    <div className="container mx-auto px-4 pb-12 max-w-3xl">
      <h1 className="text-2xl md:text-3xl font-black mb-6">{title}</h1>
      <div className="prose prose-sm max-w-none text-muted-foreground space-y-4 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  </div>
);

export const PrivacyPolicy = () => (
  <LegalPage title="Privacy Policy">
    <p><strong className="text-foreground">Last updated:</strong> March 9, 2026</p>
    <p>CalcHub ("we", "us", or "our") operates the CalcHub website. This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Information We Collect</h2>
    <p>We collect several types of information for various purposes to provide and improve our Service to you:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li><strong className="text-foreground">Usage Data:</strong> We may collect information on how the Service is accessed and used, including your browser type, pages visited, time spent, and other diagnostic data.</li>
      <li><strong className="text-foreground">Cookies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information.</li>
    </ul>

    <h2 className="text-lg font-bold text-foreground mt-6">Use of Data</h2>
    <p>CalcHub uses the collected data for various purposes:</p>
    <ul className="list-disc pl-5 space-y-1">
      <li>To provide and maintain the Service</li>
      <li>To notify you about changes to our Service</li>
      <li>To provide customer care and support</li>
      <li>To provide analysis or valuable information to improve the Service</li>
      <li>To monitor the usage of the Service</li>
      <li>To detect, prevent and address technical issues</li>
    </ul>

    <h2 className="text-lg font-bold text-foreground mt-6">Advertising</h2>
    <p>We may use third-party advertising companies, including Google AdSense, to serve ads when you visit our website. These companies may use cookies to serve ads based on your prior visits to our website or other websites.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Contact Us</h2>
    <p>If you have any questions about this Privacy Policy, please <Link to="/contact" className="text-primary hover:underline font-medium">contact us</Link>.</p>
  </LegalPage>
);

export const TermsOfService = () => (
  <LegalPage title="Terms of Service">
    <p><strong className="text-foreground">Last updated:</strong> March 9, 2026</p>
    <p>Please read these Terms of Service ("Terms") carefully before using CalcHub.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Acceptance of Terms</h2>
    <p>By accessing or using CalcHub, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Use of the Service</h2>
    <p>CalcHub provides online calculators for informational and educational purposes only. The results provided by our calculators should not be considered as professional financial, medical, or legal advice.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Accuracy Disclaimer</h2>
    <p>While we strive to provide accurate calculations, we make no warranties or representations about the accuracy, reliability, or completeness of any information on this site. Users should verify results independently before making important decisions.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Intellectual Property</h2>
    <p>The Service and its original content, features, and functionality are owned by CalcHub and are protected by international copyright, trademark, and other intellectual property laws.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Limitation of Liability</h2>
    <p>In no event shall CalcHub be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the Service.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Contact</h2>
    <p>Questions about these Terms? <Link to="/contact" className="text-primary hover:underline font-medium">Contact us</Link>.</p>
  </LegalPage>
);

export const Disclaimer = () => (
  <LegalPage title="Disclaimer">
    <p><strong className="text-foreground">Last updated:</strong> March 9, 2026</p>

    <h2 className="text-lg font-bold text-foreground mt-6">General Disclaimer</h2>
    <p>The information provided by CalcHub is for general informational and educational purposes only. All information on the site is provided in good faith; however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, or completeness of any information on the site.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Financial Disclaimer</h2>
    <p>The financial calculators on CalcHub are provided for illustrative purposes only. They are not intended to provide specific financial, investment, tax, legal, accounting, or other professional advice. Always consult a qualified professional before making financial decisions.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">Health Disclaimer</h2>
    <p>Health-related calculators (BMI, calorie, etc.) are provided for general reference only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider.</p>

    <h2 className="text-lg font-bold text-foreground mt-6">No Liability</h2>
    <p>Under no circumstances shall CalcHub be responsible for any loss or damage resulting from reliance on information or calculator results provided through this website.</p>
  </LegalPage>
);

export const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Missing fields", description: "Please fill in Name, Email, and Message.", variant: "destructive" });
      return;
    }
    setSending(true);

    // Construct mailto link to open user's email client
    const subject = encodeURIComponent(form.subject || "Contact from CalcHub");
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:support@calchub.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setSending(false);
      toast({ title: "Email client opened!", description: "Your default email app should open with the message pre-filled." });
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  return (
    <LegalPage title="Contact Us">
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
          {sending ? "Opening email client..." : "Send Message"}
        </button>
      </form>

      <h2 className="text-lg font-bold text-foreground mt-6">Other Ways to Reach Us</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li><strong className="text-foreground">Email:</strong> support@calchub.com</li>
        <li><strong className="text-foreground">Business Inquiries:</strong> partners@calchub.com</li>
      </ul>

      <div className="bg-secondary/50 rounded-xl p-5 mt-6 not-prose">
        <h3 className="font-bold text-sm text-foreground mb-2">💡 Want messages sent directly to your Gmail?</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          To receive contact form messages directly in your Gmail, you can enable <strong>Lovable Cloud</strong> which provides 
          a backend to send emails via an Edge Function. Just ask me to "set up email sending to my Gmail" and I'll guide you through it!
        </p>
      </div>
    </LegalPage>
  );
};

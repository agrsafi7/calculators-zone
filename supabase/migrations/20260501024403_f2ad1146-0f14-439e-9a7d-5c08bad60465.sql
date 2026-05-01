-- Revoke SELECT from anon and authenticated on contact_messages so submissions are not readable
REVOKE SELECT ON public.contact_messages FROM anon;
REVOKE SELECT ON public.contact_messages FROM authenticated;

-- Add an explicit restrictive SELECT policy denying access to anon/authenticated as defense in depth
CREATE POLICY "No public read access to contact messages"
ON public.contact_messages
FOR SELECT
TO anon, authenticated
USING (false);

-- Add input length constraints to mitigate payload abuse
ALTER TABLE public.contact_messages
  ADD CONSTRAINT contact_messages_name_length CHECK (char_length(name) <= 200),
  ADD CONSTRAINT contact_messages_email_length CHECK (char_length(email) <= 320),
  ADD CONSTRAINT contact_messages_subject_length CHECK (char_length(subject) <= 300),
  ADD CONSTRAINT contact_messages_message_length CHECK (char_length(message) <= 5000);
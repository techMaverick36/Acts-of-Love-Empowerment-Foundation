# Acts of Love Empowerment Foundation — Web App

This is a React + TypeScript + Vite project.

## EmailJS Integration (Forms)

The site uses EmailJS to send submissions to your email on these pages:
- Volunteer application: `src/Pages/GetInvolved.tsx`
- Contact message: `src/Pages/Contact.tsx`

### 1) Install dependency

```
npm i @emailjs/browser
```

### 2) Create EmailJS service and template

1. Go to https://www.emailjs.com/ and sign in.
2. Create a new Email Service (choose your email provider).
3. Create an Email Template with variables used by both forms. Required across both:
   - `name`
   - `email`
   - `message`

   Optional (form-specific):
   - `phone` (Volunteer form)
   - `role` (Volunteer form)
   - `subject` (Contact form)
4. Copy your Service ID, Template ID, and Public Key.

### 3) Add environment variables

Create a `.env` file in the project root (same folder as `package.json`) and add:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Restart the dev server after changing env vars.

### 4) Field mapping

`GetInvolved.tsx` (Volunteer) sends:

```
{
  name: form.name,
  email: form.email,
  phone: form.phone,
  role: form.role || 'Not specified',
  message: form.message
}
```

`Contact.tsx` (Contact) sends:

```
{
  name: form.name,
  email: form.email,
  subject: form.subject || 'General Enquiry',
  message: form.message
}
```

Make sure your EmailJS template references the same variable names, e.g. `{{name}}`, `{{email}}`, etc. Variables that aren’t sent by a given form can be marked optional in the template or wrapped in conditionals.

### 5) UI Behavior

- Both forms disable the button and show “Sending…” while the request is in flight.
- On success, forms clear and a confirmation panel is shown.
- On failure, a small error alert is displayed at the top of the form.

If you need to adjust recipients or email content, do that inside your EmailJS template settings.

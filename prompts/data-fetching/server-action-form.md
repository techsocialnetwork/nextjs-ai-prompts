# Server Action Form with Validation

**Use Case:** Create a form that submits directly to a Server Action with validation, error handling, and optimistic UI.

**Best For:** Contact forms, data entry, CRUD operations

---

## The Prompt

```markdown
## Role
You are a senior Next.js developer specializing in:
- Server Actions and mutations
- Form validation with Zod
- TypeScript with strict types
- Progressive enhancement

## Task
Create a complete form using Server Actions with validation.

## File Structure
Create these files:
- app/contact/page.tsx
- app/contact/loading.tsx
- app/actions/contact-actions.ts
- components/forms/contact-form.tsx
- lib/validations/contact.ts

## Requirements

### Schema (lib/validations/contact.ts)
- Use Zod for validation
- Fields:
  - name: string, min 2, max 50 chars
  - email: valid email format
  - subject: enum ['general', 'support', 'sales']
  - message: string, min 10, max 1000 chars
- Custom error messages
- Type inference for TypeScript

### Server Action (app/actions/contact-actions.ts)
- "use server" directive
- Accept FormData
- Validate with Zod schema
- Return typed result:
  ```typescript
  type ActionResult = 
    | { success: true; message: string }
    | { success: false; errors: Record<string, string[]> }
  ```
- Simulate API delay (1 second)
- Log submission (console.log)

### Form Component (components/forms/contact-form.tsx)
- Client Component ("use client")
- Use react-hook-form with Zod resolver
- Server Action as form action
- Display field errors from server
- Show loading state during submission
- Success message on completion
- Reset form after success
- Accessible form labels and ARIA

### Page (app/contact/page.tsx)
- Server Component
- Render ContactForm
- Metadata for SEO

### Loading (app/contact/loading.tsx)
- Skeleton form layout
- Match actual form structure

### Styling (Tailwind CSS)
- Clean, modern form design
- Error states: red borders, error text
- Focus states: ring, border color
- Submit button with loading spinner
- Responsive layout

## Progressive Enhancement
- Form works without JavaScript
- Server validation always runs
- Client validation for better UX
- Graceful degradation

## Output Format

Provide complete file contents:

1. **contact.ts** - Zod validation schema
2. **contact-actions.ts** - Server Action
3. **contact-form.tsx** - React form component
4. **page.tsx** - Contact page
5. **loading.tsx** - Loading skeleton

Include:
- All imports
- Type definitions
- Error handling
- Comments for complex logic
```

---

## Example Output Structure

### Schema (lib/validations/contact.ts)
```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address'),
  subject: z.enum(['general', 'support', 'sales'], {
    errorMap: () => ({ message: 'Please select a subject' }),
  }),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must be less than 1000 characters'),
});

export type ContactFormData = z.infer<typeof contactSchema>;
```

### Server Action (app/actions/contact-actions.ts)
```typescript
'use server';

import { contactSchema } from '@/lib/validations/contact';

export type ActionResult =
  | { success: true; message: string }
  | { success: false; errors: Record<string, string[]> };

export async function submitContactForm(
  prevState: ActionResult | null,
  formData: FormData
): Promise<ActionResult> {
  // Validate
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Contact form submitted:', parsed.data);

  return {
    success: true,
    message: 'Thank you! We will get back to you soon.',
  };
}
```

---

## Variations

### With Database (Prisma)
```markdown
Additional requirements:
- Save submission to database
- Handle unique constraint errors
- Return created record ID
```

### With Email (Resend)
```markdown
Additional requirements:
- Send email notification
- Handle email service errors
- Include form data in email
```

### With reCAPTCHA
```markdown
Additional requirements:
- Google reCAPTCHA v3 integration
- Verify token server-side
- Reject if score < 0.5
```

---

## Meta

- **Created:** 2026-04-18
- **Model Tested:** GPT-4, Claude 3.5 Sonnet
- **Success Rate:** ~90%
- **Best For:** Contact forms, data entry, user-generated content
- **Struggles With:** Complex multi-step forms
- **Tips:**
  - Always request Zod for validation
  - Ask for react-hook-form integration
  - Specify progressive enhancement requirement

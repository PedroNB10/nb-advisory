/**
 * Centralized contact channels. NB uses no contact form — every CTA resolves
 * to one of these direct channels. Change a number/address once, here.
 */
export const CONTACT = {
  email: 'nb.admin@icloud.com',
  emailHref: 'mailto:nb.admin@icloud.com',
  whatsappHref: 'https://wa.me/5511950498530',
} as const;

export const ADVISOR_LINKS = {
  francisco: {
    linkedinHref: 'https://www.linkedin.com/in/francisco-ueliton/',
  },
  raimundo: {
    linkedinHref: 'https://www.linkedin.com/in/raimundo-almeida-barboza-7114113a',
  },
} as const;

import type { SiteContent } from '../types';

export const es = {
  nav: { advisors: 'Advisors', capabilities: 'Capacidades', contact: 'Conversemos' },
  hero: {
    title: 'Claridad independiente antes de la ejecución crítica.',
    sub: 'NB acompaña a líderes en momentos de decisión operacional crítica — revisando riesgos, reduciendo ambigüedades y mejorando la calidad de la decisión antes de la ejecución.',
  },
  recognition: {
    eyebrow: 'Reconocimiento',
    title: 'Las decisiones avanzan rápido. La claridad no siempre las acompaña.',
    points: [
      'Decisiones críticas que avanzan demasiado rápido.',
      'Muchas reuniones, poca claridad real.',
      'Ejecución en curso, con pérdida de confianza.',
      'Riesgos relevantes aún no explicitados.',
    ],
  },
  perspective: {
    eyebrow: 'La perspectiva de NB',
    title: 'Una capa independiente de claridad ejecutiva.',
    body: 'NB no sustituye al liderazgo, no vende metodología pesada ni añade complejidad. Existe para aportar una lectura externa e imparcial antes de que la ejecución haga que una decisión sea demasiado costosa de corregir.',
  },
  how: {
    eyebrow: 'Cómo actúa NB',
    title: 'Un proceso discreto, aplicado allí donde se toma la decisión.',
    items: [
      'Una lectura independiente de la decisión, sin informes extensos.',
      'Conversaciones directas con quien decide, no con comités.',
      'Recomendaciones objetivas, aplicables antes de que la ejecución avance.',
    ],
  },
  capabilities: {
    eyebrow: 'Donde agregamos valor',
    title: 'Cuatro capacidades estratégicas.',
    descs: [
      'Una segunda lectura independiente de una decisión crítica antes de que se convierta en ejecución.',
      'Una visión clara de dónde divergen la narrativa de la organización y su realidad operativa.',
      'Intervención quirúrgica y dirigida allí donde la ejecución empezó a perder terreno.',
      'El mismo criterio, ampliado mediante arquitectura digital e inteligencia aplicada.',
    ],
  },
  advisors: {
    eyebrow: 'Los advisors de NB',
    title: 'Construida sobre dos trayectorias complementarias.',
    franciscoRole: 'Advisor — Decisiones y Estabilidad',
    franciscoBio:
      'Décadas liderando operaciones industriales complejas — fabricación, calidad, ingeniería y logística — en multinacionales como Nestlé, Nestlé Purina, WABCO North America y Johnson Controls. Su trayectoria abarca Suiza, Chile y América Latina, donde construyó y estabilizó operaciones en períodos de cambio acelerado. Aporta el criterio de quien ha estado en la línea de decisión — en el instante previo a que una elección crítica se convierta en ejecución.',
    raimundoRole: 'Advisor — Arquitectura Digital e IA',
    raimundoBio:
      'Décadas de liderazgo industrial, hoy ampliadas mediante la arquitectura digital, la automatización y la inteligencia artificial aplicada a los negocios. Traduce la experiencia operativa en sistemas — conectando cómo se toma una decisión con la forma en que se ejecuta y se mide. Su foco es la disciplina que mantiene la tecnología al servicio de la decisión, y no al revés.',
    linkedinLabel: 'Perfil en LinkedIn',
  },
  cta: {
    title: 'Una conversación confidencial antes de la decisión.',
    sub: 'Cuando la ejecución puede hacer que una decisión sea demasiado costosa de corregir, NB entra antes para aportar claridad.',
    note: 'Reservado · Directo con los advisors · Sin formularios',
    emailLabel: 'Escribir por correo',
    whatsappLabel: 'Hablar por WhatsApp',
  },
  footer: { tagline: 'Decisions · Coherence · Stability', email: 'nb.admin@icloud.com' },
} satisfies SiteContent;

/* @ds-bundle: {"format":4,"namespace":"NBConsultingDesignSystem_ea9d93","components":[{"name":"AdvisorCard","sourcePath":"components/cards/AdvisorCard.jsx"},{"name":"PillarCard","sourcePath":"components/cards/PillarCard.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Divider","sourcePath":"components/core/Divider.jsx"},{"name":"Eyebrow","sourcePath":"components/core/Eyebrow.jsx"}],"sourceHashes":{"components/cards/AdvisorCard.jsx":"41bfeccd55f9","components/cards/PillarCard.jsx":"74d043d8bbc7","components/core/Button.jsx":"7f2f541b99f1","components/core/Divider.jsx":"9a1078d60824","components/core/Eyebrow.jsx":"0cb87c6f9d91"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.NBConsultingDesignSystem_ea9d93 = window.NBConsultingDesignSystem_ea9d93 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/cards/AdvisorCard.jsx
try { (() => {
/**
 * Advisor bio block for Francisco / Raimundo. Photo is a plain rectangle
 * (no crop shape, no border treatment) — serene, not corporate-glossy.
 */
function AdvisorCard({
  photoSrc,
  name,
  role,
  bio
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '28px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      aspectRatio: '4 / 5',
      background: photoSrc ? `url(${photoSrc}) center/cover no-repeat` : 'var(--nb-navy-700)',
      border: '1px solid var(--color-border-on-dark-subtle)'
    }
  }, !photoSrc && /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-small)',
      color: 'var(--color-text-on-dark-tertiary)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase'
    }
  }, "Photograph pending")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontWeight: 'var(--fw-regular)',
      fontSize: 'var(--fs-h3)',
      color: 'var(--color-text-on-dark-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-label)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: 'var(--color-accent-gold)'
    }
  }, role)), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-relaxed)',
      color: 'var(--color-text-on-dark-secondary)'
    }
  }, bio));
}
Object.assign(__ds_scope, { AdvisorCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/AdvisorCard.jsx", error: String((e && e.message) || e) }); }

// components/cards/PillarCard.jsx
try { (() => {
/**
 * Presents one of NB's four strategic capabilities (Decision Review,
 * Coherence Reading, Stability Restoration, AI World COO). Deliberately
 * unadorned — no icon, no shadow — a number, a name, one line.
 */
function PillarCard({
  index,
  name,
  description
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      padding: '40px 32px',
      borderTop: `1px solid ${hover ? 'var(--nb-gold-500)' : 'var(--color-border-on-dark)'}`,
      transition: 'border-color var(--transition-standard)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-label)',
      letterSpacing: 'var(--ls-label)',
      color: 'var(--color-accent-gold)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-serif)',
      fontWeight: 'var(--fw-regular)',
      fontSize: 'var(--fs-h3)',
      lineHeight: 'var(--lh-snug)',
      color: 'var(--color-text-on-dark-primary)'
    }
  }, name), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-body)',
      lineHeight: 'var(--lh-normal)',
      color: 'var(--color-text-on-dark-secondary)'
    }
  }, description));
}
Object.assign(__ds_scope, { PillarCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/cards/PillarCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
/**
 * NB Consulting primary call-to-action control.
 * Executive tone: no fills, no shouting — a gold hairline that solidifies
 * on hover. Sparingly used; most pages need only one.
 */
function Button({
  children,
  variant = 'primary',
  size = 'md',
  as = 'button',
  href,
  onClick,
  type = 'button',
  disabled = false
}) {
  const Tag = as === 'a' ? 'a' : 'button';
  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-medium)',
    letterSpacing: 'var(--ls-label)',
    textTransform: 'uppercase',
    textDecoration: 'none',
    cursor: disabled ? 'default' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    borderRadius: 'var(--radius-sm)',
    transition: 'background-color var(--transition-standard), border-color var(--transition-standard), color var(--transition-standard)',
    whiteSpace: 'nowrap'
  };
  const sizes = {
    sm: {
      fontSize: '11px',
      padding: '10px 20px'
    },
    md: {
      fontSize: '12px',
      padding: '15px 32px'
    },
    lg: {
      fontSize: '13px',
      padding: '18px 40px'
    }
  };
  const variants = {
    primary: {
      base: {
        background: 'transparent',
        color: 'var(--color-accent-gold-bright)',
        border: '1px solid var(--nb-gold-500)'
      },
      hover: {
        background: 'var(--nb-gold-500)',
        color: 'var(--nb-navy-950)',
        borderColor: 'var(--nb-gold-500)'
      }
    },
    secondary: {
      base: {
        background: 'transparent',
        color: 'var(--color-text-on-dark-primary)',
        border: '1px solid var(--color-border-on-dark-subtle)'
      },
      hover: {
        background: 'transparent',
        color: 'var(--color-text-on-dark-primary)',
        border: '1px solid var(--nb-silver-500)'
      }
    },
    ghost: {
      base: {
        background: 'transparent',
        color: 'var(--color-text-on-light-primary)',
        border: '1px solid var(--color-border-on-light)'
      },
      hover: {
        background: 'transparent',
        color: 'var(--color-text-on-light-primary)',
        border: '1px solid var(--nb-ink-500)'
      }
    }
  };
  const v = variants[variant] || variants.primary;
  const [hover, setHover] = React.useState(false);
  const style = {
    ...base,
    ...sizes[size],
    ...v.base,
    ...(hover && !disabled ? v.hover : {})
  };
  const props = {
    style,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick,
    disabled: Tag === 'button' ? disabled : undefined,
    href: Tag === 'a' ? href : undefined,
    type: Tag === 'button' ? type : undefined
  };
  return /*#__PURE__*/React.createElement(Tag, props, children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Divider.jsx
try { (() => {
/**
 * A single hairline rule. NB uses this instead of shadows/cards to separate
 * ideas — width is intentionally short, never full-bleed, to read as a
 * deliberate mark rather than a layout artifact.
 */
function Divider({
  tone = 'gold',
  width = '64px',
  align = 'left'
}) {
  const colors = {
    gold: 'var(--nb-gold-500)',
    silver: 'var(--color-border-on-dark-subtle)',
    ink: 'var(--color-border-on-light)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '1px',
      width,
      background: colors[tone] || colors.gold,
      marginLeft: align === 'center' ? 'auto' : 0,
      marginRight: align === 'center' ? 'auto' : 0
    }
  });
}
Object.assign(__ds_scope, { Divider });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Divider.jsx", error: String((e && e.message) || e) }); }

// components/core/Eyebrow.jsx
try { (() => {
/**
 * Small uppercase label used above headlines to mark a section's role in the
 * narrative ("02 — The perspective"). Quiet, wide-tracked, never a chip/pill.
 */
function Eyebrow({
  children,
  index,
  tone = 'gold'
}) {
  const colors = {
    gold: 'var(--color-accent-gold)',
    silver: 'var(--color-text-on-dark-secondary)',
    ink: 'var(--color-text-on-light-tertiary)'
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-label)',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: 'var(--ls-label)',
      textTransform: 'uppercase',
      color: colors[tone] || colors.gold
    }
  }, index !== undefined && /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.6,
      fontVariantNumeric: 'tabular-nums'
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("span", null, children));
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Eyebrow.jsx", error: String((e && e.message) || e) }); }

__ds_ns.AdvisorCard = __ds_scope.AdvisorCard;

__ds_ns.PillarCard = __ds_scope.PillarCard;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Divider = __ds_scope.Divider;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

})();

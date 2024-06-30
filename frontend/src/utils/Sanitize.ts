import DOMPurify from 'dompurify';
export default function Sanitize(dirty: string) {
  const clean = DOMPurify.sanitize(dirty, { USE_PROFILES: { html: true } });
  return clean;
}

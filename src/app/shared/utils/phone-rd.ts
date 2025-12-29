/** deja solo dígitos */
export function digitsOnly(value: string): string {
  return (value ?? '').replace(/\D/g, '');
}

/** formatea 10 dígitos como (000)000-0000 */
export function formatRdMask(input: string): string {
  const d = digitsOnly(input).slice(0, 10);
  const a = d.slice(0, 3);
  const b = d.slice(3, 6);
  const c = d.slice(6, 10);

  if (d.length <= 3) return a ? `(${a}` : '';
  if (d.length <= 6) return `(${a})${b}`;
  return `(${a})${b}-${c}`;
}

/** convierte (809)994-9181 o 8099949181 -> +18099949181 */
export function toE164Rd(input: string): string | null {
  const d = digitsOnly(input);
  if (d.length !== 10) return null;
  return `+1${d}`;
}

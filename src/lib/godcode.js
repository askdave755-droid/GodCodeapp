// Transparent GodCode calculation.
// Not scientific, not predictive — a teaching framework only.

export function calculateGodCode(birthDate) {
  // birthDate: "YYYY-MM-DD"
  if (!birthDate) return null;
  const [y, m, d] = birthDate.split("-");
  if (!y || !m || !d) return null;

  const digits = `${m}${d}${y}`.split("").filter((c) => /\d/.test(c)).map(Number);
  const total = digits.reduce((a, b) => a + b, 0);

  const steps = [];
  steps.push({
    label: "Your birth date",
    detail: `${m}/${d}/${y}`,
  });
  steps.push({
    label: "Add every digit",
    detail: `${digits.join(" + ")} = ${total}`,
  });

  let current = total;
  const intermediates = [];
  while (current > 9) {
    const parts = String(current).split("").map(Number);
    const next = parts.reduce((a, b) => a + b, 0);
    intermediates.push(current);
    steps.push({
      label: "Reduce to a single digit",
      detail: `${current} → ${parts.join(" + ")} = ${next}`,
    });
    current = next;
  }

  return {
    birthDate,
    digits,
    total,
    intermediate: total > 9 ? total : null,
    intermediates,
    reduced: current,
    steps,
  };
}

export function formatDateLong(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  return dt.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

// Compatibility: structural comparison of two codes. Reflection only — never destiny.
export function compareCodes(a, b) {
  const diff = Math.abs(a - b);
  const same = a === b;
  const bothEven = a % 2 === 0 && b % 2 === 0;
  const bothOdd = a % 2 === 1 && b % 2 === 1;
  return { a, b, diff, same, bothEven, bothOdd };
}

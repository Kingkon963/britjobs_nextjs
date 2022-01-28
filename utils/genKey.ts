export default function keyGen(): string {
  return `${Date.now()}-${Math.trunc(Math.random() * 10_000_00)}`;
}

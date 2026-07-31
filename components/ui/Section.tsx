import Container from "./Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  background?: "white" | "gray" | "green";
}

const backgrounds = {
  white: "bg-white",
  gray: "bg-gray-50",
  green: "bg-green-600 text-white",
};

export default function Section({
  children,
  background = "white",
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={`py-24 ${backgrounds[background]} ${className}`}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}
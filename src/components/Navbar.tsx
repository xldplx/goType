// src/components/Navbar.tsx
type NavbarProps = {
  className?: string;
};

export default function Navbar({ className }: NavbarProps) {
  return (
    <nav className={`${className} bg-black px-[10rem] py-[2rem]`}>
      <h1 className="text-[2rem] font-bold text-white">goType</h1>
    </nav>
  );
}
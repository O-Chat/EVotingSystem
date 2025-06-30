// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 text-sm text-gray-600 mt-12">
      © {new Date().getFullYear()} eVote System. All rights reserved.
    </footer>
  );
}

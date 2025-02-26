import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Profile page',
};

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col gap-4 px-4 py-4 md:gap-8 md:px-8 md:py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-4xl">Profile</h1>
      </div>
    </main>
  );
}

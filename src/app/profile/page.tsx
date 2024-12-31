'use client';

import { Avatar, Button, Card, CardBody } from '@nextui-org/react';

import { UserIcon } from '@/components/ui/user';

export default function ProfilePage() {
  return (
    <main className="flex min-h-screen flex-col gap-4 px-4 py-4 md:gap-8 md:px-8 md:py-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold md:text-4xl">Profile</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        {/* Profile Info Card */}
        <Card className="col-span-1">
          <CardBody className="flex flex-col items-center gap-3 p-4 md:gap-4 md:p-6">
            <Avatar className="h-16 w-16 md:h-24 md:w-24" icon={<UserIcon />} />
            <div className="text-center">
              <h2 className="text-lg font-semibold md:text-xl">User Name</h2>
              <p className="text-xs text-gray-500 md:text-sm">
                user@example.com
              </p>
            </div>
            <Button
              color="primary"
              className="mt-2 text-sm md:mt-4 md:text-base"
            >
              Edit Profile
            </Button>
          </CardBody>
        </Card>

        {/* Activity Section */}
        <div className="col-span-1 lg:col-span-2">
          <Card>
            <CardBody className="p-4 md:p-6">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">
                Recent Activity
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                <p className="text-sm text-gray-500 md:text-base">
                  No recent activity
                </p>
              </div>
            </CardBody>
          </Card>

          {/* Watchlist */}
          <Card className="mt-4 md:mt-6">
            <CardBody className="p-4 md:p-6">
              <h3 className="mb-3 text-lg font-semibold md:mb-4 md:text-xl">
                My Watchlist
              </h3>
              <div className="flex flex-col gap-3 md:gap-4">
                <p className="text-sm text-gray-500 md:text-base">
                  Your watchlist is empty
                </p>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </main>
  );
}

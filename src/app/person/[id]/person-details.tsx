'use client';

import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { motion } from 'framer-motion';

import ImageComponent from '@/components/shared/image';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { ScrollArea } from '@/components/ui/scroll-area';

interface PersonDetailsProps {
  details: any;
  images: any;
}

export default function PersonDetails({ details, images }: PersonDetailsProps) {
  const profileImages = images.profiles || [];

  return (
    <Card className="h-fit overflow-hidden backdrop-blur-sm backdrop-filter">
      <CardBody className="p-0">
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          <ImageComponent
            src={details.profile_path}
            alt={details.name}
            width={500}
            height={750}
            className="h-full w-full object-cover"
            priority
          />
        </div>

        <div className="space-y-6 p-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold"
            >
              {details.name}
            </motion.h1>
            {details.known_for_department && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-foreground/60"
              >
                {details.known_for_department}
              </motion.p>
            )}
          </div>

          <Tabs aria-label="Person details">
            <Tab key="about" title="About">
              <ScrollArea className="h-[300px] pr-4">
                <div className="space-y-4 py-4">
                  {details.biography && (
                    <div>
                      <h3 className="mb-2 font-semibold">Biography</h3>
                      <p className="text-sm text-foreground/80 [text-wrap:pretty]">
                        {details.biography}
                      </p>
                    </div>
                  )}

                  <div className="space-y-2">
                    {details.birthday && (
                      <div>
                        <h3 className="font-semibold">Born</h3>
                        <p className="text-sm text-foreground/80">
                          {new Date(details.birthday).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                          {details.place_of_birth &&
                            ` in ${details.place_of_birth}`}
                        </p>
                      </div>
                    )}
                    {details.deathday && (
                      <div>
                        <h3 className="font-semibold">Died</h3>
                        <p className="text-sm text-foreground/80">
                          {new Date(details.deathday).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </Tab>

            <Tab key="photos" title="Photos">
              <ScrollArea className="h-[300px] pr-4">
                <AnimatedGroup
                  preset="zoom"
                  className="grid grid-cols-2 gap-4 py-4"
                >
                  {profileImages.map((image: any) => (
                    <div
                      key={image.file_path}
                      className="relative aspect-[2/3] overflow-hidden rounded-lg"
                    >
                      <ImageComponent
                        src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                        alt={details.name}
                        width={500}
                        height={750}
                        className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  ))}
                </AnimatedGroup>
              </ScrollArea>
            </Tab>
          </Tabs>
        </div>
      </CardBody>
    </Card>
  );
}

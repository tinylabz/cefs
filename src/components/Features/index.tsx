import { BiDirections, BiHappyBeaming } from 'react-icons/bi'
import { Box, Heading, SimpleGrid, Stack } from '@chakra-ui/react'
import { FaGraduationCap, FaRegLifeRing } from 'react-icons/fa'

import { CTAButton } from './CTAButton'
import { Feature } from './Feature'
import { Testimonial } from './Testimonial'

export const DarkWithTestimonial = () => {
  return (
    <Box as="section" pb="24">
      <Box bg="gray.800" color="white" pt="24" pb="12rem">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <Stack
            spacing="10"
            direction={{ base: 'column', lg: 'row' }}
            align={{ base: 'flex-start', lg: 'center' }}
            justify="space-between"
          >
            <Heading
              size="2xl"
              lineHeight="short"
              fontWeight="extrabold"
              maxW={{ base: 'unset', lg: '800px' }}
            >
              Your Team, Supercharged with outstanding Design & Support.
            </Heading>
            <CTAButton w={{ base: 'full', md: 'auto' }}>Engage Us</CTAButton>
          </Stack>
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 4 }}
            spacing={{ base: '12', md: '8', lg: '2' }}
            mt={{ base: '12', md: '20' }}
          >
            <Feature icon={<BiDirections />} title="Onboarding">
              The purpose of lorem ipsum is to create a natural looking block of text (sentence,
              paragraph, page, etc.)
            </Feature>
            <Feature icon={<BiHappyBeaming />} title="Customer Success">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </Feature>
            <Feature icon={<FaGraduationCap />} title="Education">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </Feature>
            <Feature icon={<FaRegLifeRing />} title="Technical Support">
              Tristique senectus et netus et malesuada fames ac turpis. Convallis a cras semper
              auctor.
            </Feature>
          </SimpleGrid>
        </Box>
      </Box>
      <Box mt="-24">
        <Box maxW={{ base: 'xl', md: '7xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <SimpleGrid spacing="14" columns={{ base: 1, lg: 2 }}>
            <Testimonial
              image="https://avatars.githubusercontent.com/u/49788350?v=4"
              name="Ian Balijawa"
              role="CEO, ABC Company"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Testimonial>
            <Testimonial
              image="https://avatars.githubusercontent.com/u/49788350?v=4"
              name="Ian Balijawa"
              role="Marketing Manager, ACME Inc."
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco.
            </Testimonial>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  )
}

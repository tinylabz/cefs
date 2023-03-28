import { Box, Heading, Stack, Text } from '@chakra-ui/react'

import { Feature } from './Feature'
import { InvitationForm } from './InvitationForm'

export const CTA = () => (
  <Box as="section" py={{ lg: '12' }}>
    <Box
      bg="blue.600"
      rounded={{ lg: '2xl' }}
      maxW="5xl"
      mx="auto"
      px={{ base: '4', sm: '6', lg: '8' }}
      py={{ base: '12', sm: '16' }}
    >
      <Box maxW="xl" mx="auto" color="white" textAlign="center">
        <Text mb="4" fontSize="lg" color="whiteAlpha.800" fontWeight="semibold">
          Turn your Project into a powerfull asset for your business
        </Text>
        <Heading as="h2" mb="8" size="xl" fontWeight="extrabold" letterSpacing="tight">
          Start Earning From Your Product In No Time.
        </Heading>
        <InvitationForm />
        <Stack
          spacing={{ base: '3', md: '6' }}
          direction={{ base: 'column', md: 'row' }}
          mt="4"
          justify="center"
          align="center"
        >
          <Feature>Benefit from your product</Feature>
          <Feature>Get the best team on your design</Feature>
        </Stack>
      </Box>
    </Box>
  </Box>
)

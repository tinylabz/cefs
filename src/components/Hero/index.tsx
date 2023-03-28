import {
  Badge,
  Box,
  Button,
  HStack,
  Heading,
  Img,
  Stack,
  Text,
  useColorModeValue as mode,
} from '@chakra-ui/react'

import { HiArrowRight } from 'react-icons/hi'

export const Hero = () => {
  return (
    <Box
      as="section"
      bg={mode( 'gray.50', 'gray.800' )}
      pb="24"
      pos="relative"
      px={{ base: '6', lg: '12' }}
    >
      <Box maxW="7xl" mx="auto">
        <Box
          maxW={{ lg: 'md', xl: 'xl' }}
          pt={{ base: '2', lg: '4' }}
          pb={{ base: '16', lg: '24' }}
        >
          <HStack
            className="group"
            as="a"
            href="#"
            px="2"
            py="1"
            bg={mode( 'gray.200', 'gray.700' )}
            rounded="full"
            fontSize="sm"
            mb="8"
            display="inline-flex"
            minW="18rem"
          >
            <Badge
              px="2"
              variant="solid"
              colorScheme="green"
              rounded="full"
              textTransform="capitalize"
            >
              New
            </Badge>
            <Box fontWeight="medium">Product Designs exceeding your expectations</Box>
            <Box
              aria-hidden
              transition="0.2s all"
              _groupHover={{ transform: 'translateX(2px)' }}
              as={HiArrowRight}
              display="inline-block"
            />
          </HStack>
          <Heading as="h1" size="3xl" lineHeight="1" fontWeight="extrabold" letterSpacing="tight">
            Accelerating Your Results With{' '}
            <Box as="mark" color={mode( 'blue.500', 'blue.300' )} bg="transparent">
              Our Comprehensive Solutions
            </Box>
          </Heading>
          <Text mt={4} fontSize="xl" fontWeight="medium" color={mode( 'gray.600', 'gray.400' )}>
            Build and scale with us in your domain. Add value to your customer’s daily life, simplify it, and unlock new opportunities for them.
          </Text>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing="4" mt="8">
            <Button size="lg" colorScheme="blue" height="14" px="8" fontSize="md">
              Get Started Now
            </Button>
            <Button
              size="lg"
              bg="white"
              color="gray.800"
              _hover={{ bg: 'gray.50' }}
              height="14"
              px="8"
              shadow="base"
              fontSize="md"
            >
              Talk to an expert
            </Button>
          </Stack>
        </Box>
      </Box>
      <Box
        pos={{ lg: 'absolute' }}
        insetY={{ lg: '0' }}
        insetEnd={{ lg: '0' }}
        bg="gray.50"
        w={{ base: 'full', lg: '50%' }}
        height={{ base: '96', lg: 'full' }}
        sx={{
          clipPath: { lg: 'polygon(8% 0%, 100% 0%, 100% 100%, 0% 100%)' },
        }}
      >
        <Img
          height="100%"
          width="100%"
          objectFit="cover"
          src="https://images.prismic.io/dribbble/c1c69efc-9a56-48f8-b77f-797176488dc5_18227e4c56b2ae83d4f2d6456df5fb64.webp?auto=compress,format&rect=0,0,1600,1200&w=1200&h=900%201200w,%20https://images.prismic.io/dribbble/c1c69efc-9a56-48f8-b77f-797176488dc5_18227e4c56b2ae83d4f2d6456df5fb64.webp?auto=compress,format&rect=0,0,1600,1199&w=375&h=281%20375w,%20https://images.prismic.io/dribbble/c1c69efc-9a56-48f8-b77f-797176488dc5_18227e4c56b2ae83d4f2d6456df5fb64.webp?auto=compress,format&rect=0,0,1600,1200&w=744&h=558%20744w"
          alt="Lady working"
        />
      </Box>
    </Box>
  )
}

import { Box, Button, FormLabel, Input, LightMode, Stack, chakra } from '@chakra-ui/react'

export const InvitationForm = () => {
  return (
    <chakra.form
      onSubmit={( e ) => {
        e.preventDefault()
        // your submit logic
      }}
    >
      <LightMode>
        <Stack direction={{ base: 'column', md: 'row' }} align={{ md: 'flex-end' }}>
          <Box flex="1">
            <FormLabel htmlFor="email" srOnly>
              Enter work email
            </FormLabel>
            <Input
              id="email"
              name="email"
              size="lg"
              fontSize="md"
              bg="white"
              _placeholder={{ color: 'gray.400' }}
              color="gray.900"
              placeholder="Your work email address"
              focusBorderColor="blue.200"
            />
          </Box>
          <Button type="submit" size="lg" colorScheme="messenger" fontSize="md" px="10">
            Get Invite
          </Button>
        </Stack>
      </LightMode>
    </chakra.form>
  )
}

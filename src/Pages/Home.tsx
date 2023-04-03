import {
  Avatar,
  Box,
  Flex,
  Icon,
  Text,
  Stack,
  Image,
  Button,
  Heading,
  BoxProps,
  Drawer,
  DrawerContent,
  IconButton,
  useDisclosure,
  DrawerOverlay,
  useColorModeValue, HStack,
  VStack,
  Link,
  SimpleGrid,
  Container,
} from '@chakra-ui/react';

import { FaBell } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { Page } from '@/components/Page';
import { useState } from '@/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineMail } from 'react-icons/hi';
import { AiOutlineLike, AiOutlineEye } from 'react-icons/ai';
import { type CardData, ComplaintCard } from '@/components/ComplaintCard';


const cardData: CardData[] = [
  {
    id: 1,
    label: 'Complaints submitted',
    number: 2,
    icon: HiOutlineMail,
  },
  {
    id: 2,
    label: 'Complaints resolved',
    number: 1,
    icon: AiOutlineLike,
  },
  {
    id: 3,
    label: 'Pending complaints',
    number: 4,
    icon: AiOutlineEye,
  },
];

export default function Home() {
  const navigate = useNavigate()

  const { user } = useState()
  useEffect(() => {
    if (!user && process.env.NODE_ENV !== "development") {
      navigate("/login")
    }
  }, [])
  return (
    <Page>
      <Container maxW="7xl" p={{ base: 5, md: 10 }}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5} mt={6} mb={4}>
          {cardData.map((data, index) => (
            <ComplaintCard key={index} data={data} />
          ))}
        </SimpleGrid>
      </Container>
    </Page>
  )
}
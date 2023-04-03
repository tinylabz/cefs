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
  useColorModeValue
} from '@chakra-ui/react';
import { FaBell } from 'react-icons/fa';
import { AiOutlineTeam, AiOutlineHome } from 'react-icons/ai';
import { BsFolder2, BsCalendarCheck } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';
import { PageContainer } from '@/components/PageContainer';
import { useState } from '@/state';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate()

  const { user } = useState()
  useEffect(() => {
    if (!user && process.env.NODE_ENV !== "development") {
      navigate("/login")
    }
  }, [])
  return (
    <PageContainer>
      <h1>Home</h1>
    </PageContainer>
  )
}
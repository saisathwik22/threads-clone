"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import usePreviewImg from "../hooks/usePreviewImg.js";
import useShowToast from "../hooks/useShowToast.js";
// import { SmallCloseIcon } from "@chakra-ui/icons";

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom);
  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
    password: "",
  });
  const fileRef = useRef(null);

  const showToast = useShowToast();

  const { handleImageChange, imgUrl } = usePreviewImg();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/users/update/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, profilePic: imgUrl }),
      });
      const data = await res.json(); // updated user object...
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }
      showToast("Success", "Profile updated successfully", "success");
      setUser(data);
      localStorage.setItem("user-threads", JSON.stringify(data));
    } catch (error) {
      showToast("Error", error, "error");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id='userName'>
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size='xl'
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
              </Center>
              <Center w='full'>
                <Button w='full' onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
                <Input
                  type='file'
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
            </Stack>
          </FormControl>
          <FormControl>
            <FormLabel>Full name</FormLabel>
            <Input
              placeholder='Admin'
              _placeholder={{ color: "gray.500" }}
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              type='text'
            />
          </FormControl>
          <FormControl>
            <FormLabel>User name</FormLabel>
            <Input
              placeholder='admin'
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type='text'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email Address</FormLabel>
            <Input
              placeholder='your-email@example.com'
              _placeholder={{ color: "gray.500" }}
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              type='email'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder='Your bio...'
              _placeholder={{ color: "gray.500" }}
              value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              type='text'
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder='password'
              _placeholder={{ color: "gray.500" }}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type='password'
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.600"}
              color={"white"}
              w='full'
              _hover={{
                bg: "red.800",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.600"}
              color={"white"}
              w='full'
              _hover={{
                bg: "green.800",
              }}
              type='submit'
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}

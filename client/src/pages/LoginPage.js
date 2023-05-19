import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Image,
  Box,
} from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { onGoogleSignIn } from "../utils/socialValidate";
import { useNavigate } from "react-router-dom";
import AdventureAuditLogo from "../assets/AdventureAuditLogo.png";

var component_width = "357px";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      bgColor="#EAE6E0"
      w="100%"
      h="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Image
        src={AdventureAuditLogo}
        mt="100px"
        w={component_width}
        h="200px"
      />

      <Card align="center" bgColor="#F5F6F8" w={component_width}>
        <CardHeader>
          <Heading size="lg">Sign in</Heading>
        </CardHeader>
        <CardBody>
          <GoogleLogin
            logo_alignment="left"
            size="large"
            h="48px"
            w="260px"
            onSuccess={async (credentialResponse) => {
              await onGoogleSignIn(credentialResponse.credential).then(() => {
                navigate("/home");
              });
            }}
          />
        </CardBody>
      </Card>
    </Box>
  );
};

export default LoginPage;
